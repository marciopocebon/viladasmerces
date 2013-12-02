#!/bin/bash

echo 'matando todas as instancias de mongo...'
killall -r mongo
echo 'removendo dbs...'
rm -rf /data/repl_set_merces/*
rm -rf /var/log/repl_set_merces/*

echo 'criando novos dbs...'
mkdir -p /data/repl_set_merces/rs1 /data/repl_set_merces/rs2 /data/repl_set_merces/rs3
mkdir -p /var/log/mongodb/repl_set_merces/

echo 'subindo instancias mongod...'
mongod --replSet repl_set_merces --logpath "/var/log/mongodb/repl_set_merces/rs1.log" --dbpath /data/repl_set_merces/rs1 --port 27017 --smallfiles --fork
mongod --replSet repl_set_merces --logpath "/var/log/mongodb/repl_set_merces/rs2.log" --dbpath /data/repl_set_merces/rs2 --port 27018 --smallfiles --fork
mongod --replSet repl_set_merces --logpath "/var/log/mongodb/repl_set_merces/rs3.log" --dbpath /data/repl_set_merces/rs3 --port 27019 --smallfiles --fork

echo 'iniciando configuracao do replica set...'
mongo --port 27018 <<'EOF'
config = { _id: "repl_set_merces", members:[
          { _id : 0, host : "localhost:27017"},
          { _id : 1, host : "localhost:27018"},
          { _id : 2, host : "localhost:27019"} ]
};

rs.initiate(config);
rs.status();
EOF