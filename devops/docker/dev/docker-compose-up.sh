#!/bin/bash
set -e
source ./set-env.sh

docker volume create --name=cybernetically-postgres-volume --label=cybernetically-postgres-volume
docker volume create --name=cybernetically-pgadmin-volume --label=cybernetically-pgadmin-volume

export COMPOSE_INTERACTIVE_NO_CLI=1 && docker-compose -f ./docker/dev/docker-compose.yml --compatibility up -d cybernetically-postgres

until docker exec --tty $(docker ps -aqf "name=cybernetically-postgres") pg_isready -U $PSQL_USERNAME; do
    echo "Waiting for postgres..."
    sleep 2
done

cd ..
npm run migrate
prisma db pull
prisma generate
cd ./devops

export PSQL_HOST=cybernetically-postgres
export PSQL_URL=postgres://${PSQL_USERNAME}:${PSQL_PASSWORD}@${PSQL_HOST}:${PSQL_PORT}/${PSQL_DATABASE}?schema=public

export COMPOSE_INTERACTIVE_NO_CLI=1 && docker-compose -f ./docker/dev/docker-compose.yml --compatibility up -d
