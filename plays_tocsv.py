#### code adapted/modified from https://github.com/dolthub/dolthub-etl-jobs/blob/master/adhoc/nfl-play-by-play/import-play-by-play.py #####
import pandas as pd
import nltk

url = 'https://raw.githubusercontent.com/guga31bb/nflfastR-data/master/data/'

plays_df = pd.DataFrame()

# start grabbing plays data from 2000 up to and including 2019
year = 2010
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

# function takes column values that are blank, converts to string which returns 'nan', change 'nan' to 0
def to_zero(x):
    x = str(x)
    if x == 'nan':
        return x.replace('nan', '0')
    elif len(x) > 10:
        x = '1'
        return x
    else:
        return x

# checks if string is a number, return true or false, used in get_yards()
def is_number(s):
    try:
        float(s)
        return True
    except ValueError:
        pass

    try:
        import unicodedata
        unicodedata.numeric(s)
        return True
    except (TypeError, ValueError):
        pass
    return False

# create tokenizer to split description string tokens on whitespaces
tk = nltk.WhitespaceTokenizer()
# function extracts length of play (in yards) from description string
def get_yards(desc):
    tokens = tk.tokenize(desc)
    if len(tokens) >= 3:
        yards = tokens[len(tokens)-3]
    else:
        return 0

    # handle edge cases where we dont get num yards from string
    if yards == 'no':
        yards = 0
        return yards
    elif not is_number(yards):
        yards = 0
    elif '.' in yards:
        yards = yards.replace('.', '')

    return int(yards)

# cut the columns we want to exclude
plays_df = plays_df.drop(exclude, axis=1)

# clean blank entries to value of 0
plays_df['rusher_player_id'] = plays_df['rusher_player_id'].apply(to_zero)

plays_df['passer_player_id'] = plays_df['passer_player_id'].apply(to_zero)

plays_df['receiver_player_id'] = plays_df['receiver_player_id'].apply(to_zero)

# clean wacky long IDs in rusher/passer/receiver_player_id
indexNames = plays_df[(plays_df['rusher_player_id'] == '1') | (plays_df['passer_player_id'] == '1') | (plays_df['receiver_player_id'] == '1')].index
plays_df = plays_df.drop(indexNames)

# clean description string column by extracting yards gained on play and renaming column to yards_gained
plays_df['desc'] = plays_df['desc'].apply(get_yards)
plays_df = plays_df.rename(columns={'desc': 'yards_gained'})

plays_df.to_csv('plays.csv', index=False)
