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

create table if not exists ENG_SPEAK.state_slot (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    current INT NOT NULL,
    correct INT NOT NULL,
    incorrect INT NOT NULL,
    questions JSON
);

delete from ENG_SPEAK.giu;
LOAD DATA LOCAL INFILE '/etc/mysql/giu.txt'  INTO TABLE ENG_SPEAK.giu FIELDS TERMINATED BY '\t' ESCAPED BY '"';

DELETE from ENG_SPEAK.state_slot where id = 'test';
INSERT INTO ENG_SPEAK.state_slot values ('test', 2, 2, 1, JSON_ARRAY(
    JSON_OBJECT(
        'key_value', 'GU255S001',
        'cited', 1,
        'unit', 1,
        'genre', 'poop',
        'japanese', 'japoop',
        'eng1', 'eng1poop',
        'eng2', '',
        'eng3', 'fij',
        'correct', true,
        'incorrect', false
    ),
    JSON_OBJECT(
        'key_value', 'GU255S002',
        'cited', 1,
        'unit', 1,
        'genre', 'poop',
        'japanese', 'japoop',
        'eng1', 'eng1poop',
        'eng2', '',
        'eng3', 'fij',
        'correct', false,
        'incorrect', true
    ),
    JSON_OBJECT(
        'key_value', 'GU255S003',
        'cited', 1,
        'unit', 1,
        'genre', 'poop',
        'japanese', 'japoop',
        'eng1', 'eng1poop',
        'eng2', '',
        'eng3', 'fij',
        'correct', true,
        'incorrect', false
    )
));