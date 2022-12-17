--
-- File generated with SQLiteStudio v3.4.1 on Fri Dec 16 23:03:41 2022
--
-- Text encoding used: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: files
DROP TABLE IF EXISTS files;

CREATE TABLE IF NOT EXISTS files (
    filename    TEXT NOT NULL,
    path        TEXT NOT NULL,
    tags_auto   TEXT,
    tags_manual TEXT,
    object      TEXT NOT NULL
)
STRICT;


-- Table: tags
DROP TABLE IF EXISTS tags;

CREATE TABLE IF NOT EXISTS tags (
    name TEXT PRIMARY KEY
            UNIQUE
);


-- Index: filenameIndex
DROP INDEX IF EXISTS filenameIndex;

CREATE INDEX IF NOT EXISTS filenameIndex ON files (
    filename ASC
);


-- Index: tagIndex
DROP INDEX IF EXISTS tagIndex;

CREATE INDEX IF NOT EXISTS tagIndex ON tags (
    name COLLATE NOCASE ASC
);


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
