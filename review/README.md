# WSP009 Exercise

## Exercise 1

-   design cerate table SQL

```sql
DROP TABLE IF EXISTS memos;
CREATE TABLE memos (
	id SERIAL PRIMARY KEY,
	content TEXT NOT NULL,
	image VARCHAR,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR NOT NULL UNIQUE,
	password VARCHAR NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


```

-   create db

```sql
CREATE DATABASE "memo-wall";

```

-   change current database

```sql
\c

```

-   create tables (copy and paste you create table SQL)

```sql
CREATE TABLE <tableName> (
  <columnName> <columnType> <colConstraint>,
  <columnName> <columnType> <colConstraint>,
  <columnName> <columnType> <colConstraint>
);

```

## Exercise 2

-   [x] get config from `.env`

-   [x] create client from `pg.Client`

-   [x] create connection

-   [x] read xlsx file

-   [x] read xlsx file - user data

-   [x] read xlsx file - memo data

-   [x] build SQL Query

-   [x] run SQL Query
