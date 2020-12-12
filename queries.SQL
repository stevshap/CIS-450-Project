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
    SELECT hometown,
        COUNT(*) AS num_players_produced
    FROM Players
    GROUP BY hometown
    ORDER BY num_players_produced DESC
    LIMIT 5
), WITH PasserPlaysFromTop5 AS (
    SELECT t.hometown,
        COUNT(*) AS num_passer_plays
    FROM Players p
        JOIN Top5HomeCities t ON p.hometown = t.hometown
        JOIN Plays play ON p.nflID = play.passer_player_id
    GROUP BY t.hometown
),
WITH ReceiverPlaysFromTop5 AS (
    SELECT t.hometown,
        COUNT(*) AS num_receiver_plays
    FROM Players p
        JOIN Top5HomeCities t ON p.hometown = t.hometown
        JOIN Plays play ON p.nflID = play.receiver_player_id
    GROUP BY t.hometown
),
WITH RusherPlaysFromTop5 AS (
    SELECT t.hometown,
        COUNT(*) AS num_rusher_plays
    FROM Players p
        JOIN Top5HomeCities t ON p.hometown = t.hometown
        JOIN Plays play ON p.nflID = play.rusher_player_id
    GROUP BY hometown
)
SELECT t.hometown,
    AVG(p.num_passer_plays) AS avg_passer_plays,
    AVG(re.num_receiver_plays) AS avg_reciver_plays,
    AVG(ru.num_rusher_plays) AS avg_rusher_plays
FROM Top5HomeCities t
    JOIN PasserPlaysFromTop5 p ON t.hometown = p.hometown
    JOIN ReceiverPlaysFromTop5 re ON t.hometown = re.hometown
    JOIN WITH RusherPlaysFromTop5 ru ON t.hometown = ru.hometown
GROUP BY t.hometown;
/**************** Query 3 ****************/
WITH Lowest5HomeCities AS (
    SELECT hometown,
        COUNT(*) AS num_players_produced
    FROM Players
    GROUP BY hometown
    ORDER BY num_players_produced
    LIMIT 5
), WITH AvgPasserPlaysFromLow5AS (
    SELECT l.hometown,
        COUNT(*) AS num_passer_plays
    FROM Players p
        JOIN Lowest5HomeCities l ON p.hometown = l.hometown
        JOIN Plays play ON p.nflID = play.passer_player_id
    GROUP BY l.hometown
),
WITH AvgReceiverPlaysFromLow5 AS (
    SELECT l.hometown,
        COUNT(*) AS num_receiver_plays
    FROM Players p
        JOIN Lowest5HomeCities l ON p.hometown = l.hometown
        JOIN Plays play ON p.nflID = play.receiver_player_id
    GROUP BY l.hometown
),
WITH AvgRusherPlaysFromLow5 AS (
    SELECT l.hometown,
        COUNT(*) AS num_rusher_plays
    FROM Players p
        JOIN Low5HomeCities l ON p.hometown = l.hometown
        JOIN Plays play ON p.nflID = play.rusher_player_id
    GROUP BY l.hometown
)
SELECT l.hometown,
    AVG(p.num_passer_plays) AS avg_passer_plays,
    AVG(re.num_receiver_plays) AS avg_reciver_plays,
    AVG(ru.num_rusher_plays) AS avg_rusher_plays
FROM Lowest5HomeCities l
    JOIN PasserPlaysFromLow5 p ON t.hometown = p.hometown
    JOIN ReceiverPlaysFromLow5 re ON t.hometown = re.hometown
    JOIN WITH RusherPlaysFromLow5 ru ON t.hometown = ru.hometown
GROUP BY l.hometown;
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