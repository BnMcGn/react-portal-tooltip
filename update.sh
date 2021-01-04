#! /bin/sh

set -e

git merge master
npm install
npm run build
git commit -a -m "Update build"
