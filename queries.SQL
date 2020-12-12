/**************** Query 1 ****************/
SELECT nfl_iD,
    name,
    team_id,
    COUNT(*) AS num_teams_played_for
FROM Players
GROUP BY nfl_iD
ORDER BY num_teams_played_for DESC;

/**************** Query 2 ****************/
WITH Top5HomeCities AS (
    SELECT home_town,
        COUNT(*) AS num_players_produced
    FROM Players
    WHERE home_town <> ''
    GROUP BY home_town
    ORDER BY num_players_produced DESC
    LIMIT 5
), PasserPlaysFromTop5 AS (
    SELECT t.home_town,
        COUNT(*) AS num_passer_plays
    From Players p
        JOIN Top5HomeCities t ON p.home_town = t.home_town
        JOIN Plays play ON p.global_id = play.passer_id
    GROUP BY t.home_town
),
ReceiverPlaysFromTop5 AS (
    SELECT t.home_town,
        COUNT(*) AS num_receiver_plays
    From Players p
        JOIN Top5HomeCities t ON p.home_town = t.home_town
        JOIN Plays play ON p.global_id = play.reciever_id
    GROUP BY t.home_town
),
RusherPlaysFromTop5 AS (
    SELECT t.home_town,
        COUNT(*) AS num_rusher_plays
    From Players p
        JOIN Top5HomeCities t ON p.home_town = t.home_town
        JOIN Plays play ON p.global_id = play.rusher_id
    GROUP BY t.home_town
)
SELECT t.home_town,
    AVG(p.num_passer_plays) AS avg_passer_plays,
    AVG(re.num_receiver_plays) AS avg_receiver_plays,
    AVG(ru.num_rusher_plays) AS avg_rusher_plays
FROM Top5HomeCities t
    JOIN PasserPlaysFromTop5 p ON t.home_town = p.home_town
    JOIN ReceiverPlaysFromTop5 re ON t.home_town = re.home_town
    JOIN RusherPlaysFromTop5 ru ON t.home_town = ru.home_town
GROUP BY t.home_town;

/**************** Query 3 ****************/
WITH Lowest5HomeCities AS (
    SELECT home_town,
        COUNT(*) AS num_players_produced
    FROM Players
    GROUP BY home_town
    ORDER BY num_players_produced
    LIMIT 5
), PasserPlaysFromLow5 AS (
    SELECT t.home_town,
        COUNT(*) AS num_passer_plays
    From Players p
        JOIN Lowest5HomeCities t ON p.home_town = t.home_town
        JOIN Plays play ON p.global_id = play.passer_id
    GROUP BY t.home_town
),
ReceiverPlaysFromLow5 AS (
    SELECT t.home_town,
        COUNT(*) AS num_receiver_plays
    From Players p
        JOIN Lowest5HomeCities t ON p.home_town = t.home_town
        JOIN Plays play ON p.global_id = play.reciever_id
    GROUP BY t.home_town
),
RusherPlaysFromLow5 AS (
    SELECT t.home_town,
        COUNT(*) AS num_rusher_plays
    From Players p
        JOIN Lowest5HomeCities t ON p.home_town = t.home_town
        JOIN Plays play ON p.global_id = play.rusher_id
    GROUP BY t.home_town
)
SELECT t.home_town,
    AVG(p.num_passer_plays) AS avg_passer_plays,
    AVG(re.num_receiver_plays) AS avg_receiver_plays,
    AVG(ru.num_rusher_plays) AS avg_rusher_plays
FROM Lowest5HomeCities t
    JOIN PasserPlaysFromLow5 p ON t.home_town = p.home_town
    JOIN ReceiverPlaysFromLow5 re ON t.home_town = re.home_town
    JOIN RusherPlaysFromLow5 ru ON t.home_town = ru.home_town
GROUP BY t.home_town;

/**************** Query 4 ****************/
SELECT nfl_iD,
    season,
    name,
    COUNT(*) AS num_years_played
FROM Players
WHERE position = 'RB'
    AND home_town LIKE '%CA'
GROUP BY nfl_iD
ORDER BY num_years_played DESC
LIMIT 5;

/**************** Query 5 ****************/
WITH UPennLinebackers AS (
    SELECT nfl_id,
        season,
        team_id,
        name
    FROM Players
    WHERE college LIKE 'Pennsylvania'
        AND position = 'LB'
)
SELECT DISTINCT upenn.name,
    t.nickname AS teamName
FROM UPennLinebackers upenn
    JOIN Teams t ON t.team_id = upenn.team_id;

/**************** Query 6 ****************/
WITH ActivePlayers AS (
    SELECT *
    FROM Players
    WHERE status = 'ACT'
),
UniquePlayers AS (
    SELECT *
    FROM ActivePlayers
    GROUP BY nfl_id
)
SELECT college,
    COUNT(*) AS playerCount
FROM UniquePlayers
GROUP BY college
ORDER BY playerCount DESC
LIMIT 10;

/**************** Query 7 ****************/
WITH runs AS (
    SELECT rusher_id,
        COUNT(*) as count
    From Plays
    WHERE play_type = 'run'
    GROUP BY rusher_id
)
SELECT Players.name as name,
    runs.count AS rushes
FROM runs
    JOIN Players ON runs.rusher_id = Players.global_id
ORDER BY count DESC
LIMIT 10;