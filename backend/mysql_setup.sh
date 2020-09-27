#!/bin/bash

# ---------------------------------
# Sets up the user for postit
# ---------------------------------

read -ep "Enter MYSQL username: " MYSQL_USER
read -ep "Enter desired database username: " MYSQL_DB_USER
read -sep "Enter desired database password: " MYSQL_DB_PASS
echo
read -sep "Confirm desired database password: " MYSQL_DB_PASS_CONFIRM
echo

if [[ "$MYSQL_DB_PASS" != "$MYSQL_DB_PASS_CONFIRM" ]]; then
	echo "Passwords do not match"
	exit 1
fi


echo "Enter ${MYSQL_USER}'s password"
mysql -u $MYSQL_USER -p << EOF
CREATE DATABASE IF NOT EXISTS postit;
CREATE USER "$MYSQL_DB_USER"@"localhost" IDENTIFIED BY "$MYSQL_DB_PASS";
GRANT ALL PRIVILEGES ON postit . * TO "$MYSQL_DB_USER"@"localhost";
FLUSH PRIVILEGES;
exit
EOF

echo "Created user with desired password and granted privs on postit db"
