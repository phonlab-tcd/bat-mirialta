#!/bin/bash

echo prefixing /qa/bat/ in dist/index.html
sed -i 's/assets\/index/qa\/bat\/assets\/index/g' ./dist/index.html
echo prefixing /qa/bat/ in dist/assets/*.js
sed -i 's/assets\//qa\/bat\/assets\//g' ./dist/assets/*.js
echo syncing to abair.ovh
rsync -a ./dist johnsloan@abair.ovh:/home/johnsloan/web-apps/bat