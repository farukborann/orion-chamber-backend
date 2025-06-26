#!/bin/bash
echo "Waiting for MongoDB to start..."
sleep 10

echo "Initiating replica set..."
mongosh --host localhost:27017 <<EOF
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "localhost:27017" }
  ]
});
EOF

echo "Replica set initialization completed!" 