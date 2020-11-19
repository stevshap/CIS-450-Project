#### code adapted/modified from https://github.com/dolthub/dolthub-etl-jobs/blob/master/adhoc/nfl-play-by-play/import-rosters.py #####

import pandas as pd

url = 'https://raw.githubusercontent.com/guga31bb/nflfastR-data/master/'
roster_path = 'roster-data/roster.csv.gz'


# read rosters csv from which we get teams.csv and players.csv
rosters_url = url + roster_path
rosters_df = pd.read_csv(rosters_url,
                          compression='gzip',
                          low_memory=False)

# get teams table data from rosters_df into a dataframe for cleaning, then to csv for database population
filter_col = [col for col in rosters_df if col.startswith('team.')]

teams_df = rosters_df[filter_col]
teams_df = teams_df.drop_duplicates()
teams_df = teams_df.rename(columns=lambda x: x.replace('team.', ''))

# drop columns we excluded in our schema
teams_df = teams_df.drop(['abbr', 'fullName', 'conferenceAbbr', 'divisionAbbr'], axis=1)

# export to csv
teams_df.to_csv('teams.csv', index=False)

# get players table data from rosters_df into a dataframe for cleaning, then to csv for database population
filter_col = [col for col in rosters_df if col.startswith('teamPlayers.')]
filter_col = filter_col + ['team.season', 'team.teamId']

players_df = rosters_df[filter_col]
players_df = players_df.rename(columns=lambda x: x.replace('team.', ''))
players_df = players_df.rename(columns=lambda x: x.replace('teamPlayers.', ''))

# prepare columns to keep and columns to exclude during clean, based on our original schema
# college may not be in our schema but should be included
cols_tokeep = ['nflId', 'season', 'teamId', 'displayName', 'status', 'position', 'gsisId', 'hometown', 'collegeID', 'college']
exclude = []
for col in players_df.columns.tolist():
    if col not in cols_tokeep:
        exclude.append(col)

players_df = players_df.drop(exclude, axis=1)

# fix empty strings in player.csv
def to_Nil(x):
    x = str(x)
    if x == 'nan':
        return x.replace('nan', 'NIL')
    else:
        return x

players_df['status'] = players_df['status'].apply(to_Nil)

# export to csv
players_df.to_csv('players.csv', index=False)
