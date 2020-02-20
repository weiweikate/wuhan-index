#!/usr/bin/env sh
set -e

git checkout release
git merge develop

VERSION=`npx select-version-cli`
DATE=`date +%Y%m%d`
read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  # build
  VERSION=$VERSION
  echo "$DATE Releasing $VERSION">>README.md

  # commit
  git add -A
  git commit -m "[build] $VERSION"
  npm version $VERSION --message "[release] $VERSION"
  # git tag -a "v$VERSION" -m "[release] $VERSION"
  git push origin "v$VERSION"

  # publish
  git push origin master
  git checkout develop
  git rebase master
  git push origin develop

fi
