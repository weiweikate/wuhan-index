#!/usr/bin/env sh
set -e
echo "正常发版请升级中间版本号，紧急修复请选择最后一位版本号"
NOW=$(date "+%F.%H.%M")
DATE=`date +%Y%m%d`
# 默认分支为当前分支
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

 # ***********目前大部分项目不允许使用命令行操作master代码，以下代码暂时废弃************** #
  # 用户确认目标分支 https://ask.helplib.com/bash/post_113951
  BRANCH="release"

  read -p" 请确保当前环境代码已提交 (y: 正常发布，预发布分支develop ; n: 紧急修复，预发布分支${CURRENT_BRANCH}; c: cancel) " -n 1 -r
  echo "\n"

  case $REPLY in
    y)
     BRANCH="release"
     git checkout develop
     git pull
     ;;
    n)
       #read -p"Please enter the target branch (For example, master): " -r
       #BRANCH=$REPLY
       BRANCH="hotfix"
     ;;
     *)
       echo "canceled"
       exit 5
     ;;
   esac


   VERSION=`npx select-version-cli`
   echo    # (optional) move to a new line

  # build
  VERSION=$VERSION
  BRANCH="${BRANCH}-v${VERSION}-${NOW}"
  echo "准备发布$BRANCH ..."

  # 切到branch
   git -C "${REPO}" checkout -b $BRANCH

  npm run changelog
  git add -A
  git commit -m "docs: ${NOW} v${VERSION}" --no-verify

  npm version $VERSION --message "chore: ${NOW} v${VERSION}"

  git push origin "v$VERSION"
  git -C "${REPO}" push origin  "${BRANCH}"
  git checkout "${CURRENT_BRANCH}"
  git branch -D "${BRANCH}"
  git tag --delete "v$VERSION"
  # commit
    echo "$BRANCH 已推送远程 ..."
