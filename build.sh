if which docker-machine >/dev/null
then docker-machine start sparkoin
     eval $(docker-machine env sparkoin)
     docker-compose kill
     yes | docker-compose rm
fi
cd services
sh download.sh
sh build.sh 
