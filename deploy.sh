#!/bin/bash
DEPLOYMENT_SERVER_PASS=$1
DEPLOYMENT_SERVER_USER=$2
DEPLOYMENT_SERVER_IP=$3
CI_REGISTRY_USER=$4
CI_REGISTRY_PASSWORD=$5
CI_REGISTRY=$6
CI_PROJECT_PATH=$7

sshpass -p $DEPLOYMENT_SERVER_PASS scp -o StrictHostKeyChecking=no -o PreferredAuthentications=password -o PubkeyAuthentication=no ./docker-compose.yml ${DEPLOYMENT_SERVER_USER}@${DEPLOYMENT_SERVER_IP}:~/

sshpass -p $DEPLOYMENT_SERVER_PASS ssh -o StrictHostKeyChecking=no -o PreferredAuthentications=password -o PubkeyAuthentication=no $DEPLOYMENT_SERVER_USER@$DEPLOYMENT_SERVER_IP "echo ${DEPLOYMENT_SERVER_PASS} | sudo -S ls && docker login -u ${CI_REGISTRY_USER} -p ${CI_REGISTRY_PASSWORD} ${CI_REGISTRY}; sudo docker-compose -f docker-compose.yml stop; sudo docker-compose -f docker-compose.yml rm web --force; sudo docker pull ${CI_REGISTRY}/${CI_PROJECT_PATH}:latest; sudo docker-compose -f docker-compose.yml up -d"