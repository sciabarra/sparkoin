#!/bin/bash
source /etc/profile.d/java.sh
mkdir /app/cassandra/logs
touch /app/cassandra/logs/system.log
sed -i -e "s/start_rpc: false/start_rpc: true/" /app/cassandra/conf/cassandra.yaml
sed -i -e "s/localhost/$(hostname -f)/" /app/cassandra/conf/cassandra.yaml
sed -i -e "s/127.0.0.1/$(hostname -i)/" /app/cassandra/conf/cassandra.yaml
sudo chown -Rvf app /app/data/cassandra
/app/cassandra/bin/cassandra >/dev/null
tail -f /app/cassandra/logs/system.log
