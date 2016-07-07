#! /usr/bin/env bash

# fix permission issues when tmp or .npm folders belong to root
sudo chown -R $USER:$GROUP ~/tmp
sudo chown -R $USER:$GROUP ~/.npm


echo -e "\n--- Setting default user locale en_US.UTF-8 ---\n"
grep -q -F 'export LC_CTYPE=en_US.UTF-8' ~/.bashrc || echo 'export LC_CTYPE=en_US.UTF-8' >> ~/.bashrc
grep -q -F 'cd /vagrant' ~/.bashrc || echo 'cd /vagrant' >> ~/.bashrc


echo -e "\n--- Installing nvm ---\n"
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash
. ~/.nvm/nvm.sh


echo -e "\n--- Installing node 4 ---\n"
nvm install 4
nvm use 4


echo -e "\n--- Installing coffee-script ---\n"
npm install -g coffee-script webpack webpack-dev-server > /dev/null 2>&1


echo -e "\n--- Installing npm modules ---\n"
cd /vagrant
npm install > /dev/null 2>&1


echo -e "\n--- Creating databases ---\n"
mysql -uroot -e "CREATE DATABASE rcg_casino_dev" > /dev/null 2>&1


echo -e "\n--- Copying config file and creating tables ---\n"
cp config/app.json.sample config/app.json
cake db:create_tables
cake db:migrate
