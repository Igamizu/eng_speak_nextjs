SET PERSIST local_infile= 1;

create table if not exists ENG_SPEAK.giu (
    key_value VARCHAR(9) NOT NULL PRIMARY KEY,
    cited INT NOT NULL,
    unit INT NOT NULL,
    genre TEXT NOT NULL,
    japanese TEXT NOT NULL,
    eng1 TEXT NOT NULL,
    eng2 TEXT,
    eng3 TEXT
);

delete from ENG_SPEAK.giu;
LOAD DATA LOCAL INFILE '/etc/mysql/giu.txt'  INTO TABLE ENG_SPEAK.giu FIELDS TERMINATED BY '\t' ESCAPED BY '"';