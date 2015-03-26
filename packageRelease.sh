#!/bin/sh

# Trivial script to tar up a release of front-end app (static files)
# name like: 	<name>-<branch>-<version|date_time>.tar.gz
#				webtop-dev-master-0.4.0.tar.gz or 
#				webtop-dist-develop-03_23_2015_13_56.tar.gz

# args:
# first arg: filename prefex
# second arg: relative directory to tar
# third arg: if present, should be a version number to use in the filename. If
# 	not present, the current date/time will be used in the file name

if [ -z "$1" ]
  then
    echo "ERROR: No prefix supplied"
    exit
fi

PREFIX=$1

if [ -z "$2" ]
  then
    echo "ERROR: No directory supplied"
    exit
fi

DIR=$2

if [ -n  "$3" ]
  then
  	VERSION=$3
fi

# If we're running in Jenkins, the GIT_BRANCH env var will be set, otherwise 
# the git branch name will be used

if [ -z "$GIT_BRANCH" ]; then
    BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
else
	BRANCH_NAME=${GIT_BRANCH#*/}
fi

# create tarfile
if [ -z "$VERSION" ]
  then
  	DATETIME=$(date '+%m_%d_%Y-%H_%M')
  	cmd="tar -czf ${PREFIX}-${BRANCH_NAME}-${DATETIME}.tar.gz ${DIR}/"
  	echo 'running cmd: ' $cmd
  	eval $cmd
    
else
	cmd="tar -czf ${PREFIX}-${BRANCH_NAME}-${VERSION}.tar.gz ${DIR}/"
	echo 'running cmd: ' $cmd
	eval $cmd
fi
