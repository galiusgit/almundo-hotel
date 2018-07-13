----------------
CREATE TABLE hotel (
	id INTEGER NOT NULL
, name TEXT(255), stars INTEGER, price NUMERIC, image TEXT, amenities TEXT(1000), description TEXT(500),
creationdate DATETIME DEFAULT CURRENT_TIMESTAMP
);

----------------

SELECT * from hotel ORDER by creationdate DESC LIMIT 100;


SELECT * FROM hotel 
WHERE
creationdate is not NULL
-- filter name
AND name like '%san%' AND UPPER(name) like '%san%'
-- filter star
AND stars in(3,4)
ORDER by creationdate DESC LIMIT 100