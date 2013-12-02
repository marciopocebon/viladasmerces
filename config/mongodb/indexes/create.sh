#!/bin/bash

mongod --port 27017
sleep 5
mongo merces --port 27017 <<'EOF'
db.categories.ensureIndex( { name : 1 }, { unique : true });
EOF