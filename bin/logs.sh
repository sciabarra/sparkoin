#!/bin/bash
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT=sparkoin
docker-compose -p $PROJECT -f $HERE/docker-compose.yml -f $HERE/docker-compose-devel.yml logs -f "$@" 
