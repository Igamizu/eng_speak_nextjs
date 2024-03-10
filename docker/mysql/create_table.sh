#!/bin/bash
set -euo pipefail

mysql --defaults-file=/.my.cnf --local_infile=1 < /etc/mysql/create_table.sql