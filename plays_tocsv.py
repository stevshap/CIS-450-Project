#### code adapted/modified from https://github.com/dolthub/dolthub-etl-jobs/blob/master/adhoc/nfl-play-by-play/import-play-by-play.py #####
import pandas as pd

url = 'https://raw.githubusercontent.com/guga31bb/nflfastR-data/master/data/'

plays_df = pd.DataFrame()

# start grabbing plays data from 2000 up to and including 2019
year = 2000
while year < 2020:
    url_i = url + 'play_by_play_' + str(year) + '.csv.gz?raw=True'
    i_data = pd.read_csv(url_i, compression='gzip', low_memory=False)
    plays_df = plays_df.append(i_data, sort=True)

    year += 1

# Give each row a unique index
plays_df.reset_index(drop=True, inplace=True)

# Clean columns
to_keep = ['playId', 'gameId', 'home_team', 'away_team', 'desc', 'play_type', 'rusher_player_id', 'passer_player_id', 'receiver_player_id']
exclude = []

for col in plays_df.columns.tolist():
    if col not in to_keep:
        exclude.append(col)

def to_zero(x):
    x = str(x)
    if x == 'nan':
        return x.replace('nan', '0')
    else:
        return x


plays_df = plays_df.drop(exclude, axis=1)

plays_df['rusher_player_id'] = plays_df['rusher_player_id'].apply(to_zero)
plays_df['passer_player_id'] = plays_df['passer_player_id'].apply(to_zero)
plays_df['receiver_player_id'] = plays_df['receiver_player_id'].apply(to_zero)

plays_df.to_csv('plays.csv', index=False)

