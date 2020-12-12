#!/bin/bash
if [ $# -ne 1 ]; then
  echo "Error : Please specify dump file path"
  exit 1
fi

FILE_PATH=$1
FILE_NAME="${FILE_PATH##*/}"
docker cp $FILE_PATH `docker-compose ps -q db`:/tmp/
docker-compose exec -T db pg_restore -d netlabi -U netlabi "/tmp/${FILE_NAME}"
docker-compose exec db rm "/tmp/${FILE_NAME}"
exit 0
