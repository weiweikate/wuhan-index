 #!/bin/bash

# 当前日期+时间
NOW=$(date "+%F %H:%M")
# 输出目录
OUTPUT="./CHANGELOG.md"
# 输出目录
OUTPUT_DIR="log"


# function，去除字符串两头空格
trim() {
  trimmed=$1
  # https://blog.csdn.net/dongwuming/article/details/50605911
  # 从变量$string的结尾, 删除最长匹配$substring的子串
  trimmed=${trimmed%% }
  # 从变量$string的开头, 删除最长匹配$substring的子串
  trimmed=${trimmed## }
  # TODO 首部空格无法全部移除
  trimmed=${trimmed## }
  echo $trimmed
  # 移除全部空格
  # echo ${trimmed// /}
}
# 生成指定SOURCE TARGET tag差异记录
genSingleTagLog() {
  SOU=$1
  TAR=$2

  if [ ! "$3"x = "0"x ]; then
    if [ $SOU = HEAD ]; then
      # 如果是与最新HEAD对比则将HEAD设为version
      TIT="## [v$(getVersion)](${REMOTE}/compare/${TAR}...v$(getVersion))"
    else
      TIT="## [${SOU}](${REMOTE}/compare/${TAR}...${SOU})"
    fi
    echo
    echo
    echo "${TIT} ($(git -C "${REPO}" log -1 --format=%ad --date=short $SOU))"
  fi

  # 直接使用分支比对查找所有匹配 log
  GIT_PAGER=$(git -C "${REPO}" log --no-merges --reverse --format="${LOG_FORMAT}" "$SOU...$TAR")

  if [ ! -z "$GIT_PAGER" ]; then
    # 字符串分隔符
    IFS="*"
    # 分割字符串为数组
    singleTagArr=($GIT_PAGER)
    # 还原分割符，否则会导致if判断失效
    IFS=""
    # 循环处理数组
    for s in ${singleTagArr[@]}; do
      # 去除字符串两头空格
      s=$(trim $s)
      # 判断字符串非空
      if [ ! -z $s ]; then
        # 替换全角冒号
        s=${s/：/:}
        # 循环commit 类型
        for type in ${TYPE_MAP[@]}; do
          # 组织正则
          reg="${type}:"
          # 判断commit类型
          if [[ ${s} == *"${reg}"* ]]; then
            # 裁剪字符串
            s=${s##*${reg}}
            s=${s%@*}
            # 移除空格
            s=$(trim $s)
            # 动态数组变量赋值
            eval COMMIT_${type}='(${COMMIT_'${type}'[*]} $s)'
            break
          fi
        done
      fi
    done

    # 处理数据
    typeIndex=0
    for type in ${TYPE_MAP[@]}; do
      # 拷贝数组
      eval type='(${COMMIT_'${type}'[*]})'

      # 判断数组是否含有元素
      if [ ${#type[*]} != 0 ]; then
        echo "#### ${TYPE_TITLE_MAP[$typeIndex]}"

        for i in ${type[@]}; do
          echo "* ${i}"
        done
        echo
      fi
      let typeIndex++
    done
  fi
}

# function，获取版本
getVersion() {
  # 判断是否自定义版本
  if [ -z $VERSION ]; then
    # 未传入版本
    if [ -z $REPO ]; then
      # 没有传repo则package文件为当前目录所有
      PKG_PATH="./package.json"
    else
      PKG_PATH="${REPO}/package.json"
    fi

    # 自定义version为空时抓取版本
    while read line; do
      # 抓取定义version行文本
      if [[ ${line} == *"version"* ]]; then
        # 移除双引号
        VERSION=${line//\"/ }
        # 移除键名
        VERSION=${VERSION##*"version :"}
        # 获取版本
        VERSION=${VERSION%%" ,"}
        break
      fi
    done <$PKG_PATH
  fi
  trim $VERSION
}

# 传参覆盖默认值
while getopts "m:a:s:u:S:T:r:v:ftd:h" arg; do
  case $arg in
  m)
    # 模式
    MODE=$OPTARG
    ;;
  a)
    # 作者
    AUTHOR=$OPTARG
    # 已设置作者
    HAS_SET_AUTHOR=1
    ;;
  s)
    # 起始日期
    SINCE=$OPTARG
    ;;
  u)
    # 终止日期
    UNTIL=$OPTARG
    ;;
  h)
    echo "
  Usage:\n
    git-log [options]\n

  Options:\n
    -m  生成模式  默认：无(周报)，可选：branch(分支比对)、tag(标签比对)、changelog(汇总日志)
    -a  想要过滤的作者  默认：$(git config user.name)
    -s  起始日期  默认：上周一，格式：2018-01-01
    -u  终止日期  默认：当天，格式：2018-01-01
    -S  源分支/标签 默认：无，比对模式：当前分支/最近标签
    -T  目标分支/标签 默认：无，比对模式：当前分支/当前HEAD
    -r  Git 仓库本地路径  默认：当前目录
    -v  版本号  默认：无，比对模式：仓库路径下 package.json 中 VERSION 字段值
    -f  覆盖文件  默认：否，不需要传值
    -t  log 首行为生成日期  默认：否，不需要传值
    -d  log 输出目录 默认：仓库路径下 log 文件夹
      "
    exit 2
    ;;
  ?)
    echo "unknown argument"
    exit 3
    ;;
  esac
done

# 获取远程仓库地址
REMOTE=$(git -C "${REPO}" remote -v)
REMOTE=${REMOTE#*git@}
if [ ${REMOTE:0:6}x = "origin"x ]; then
  # 如果是origin开头认为是http(s)协议checkout下来的，否则是ssh
  REMOTE=${REMOTE#*origin}
  REMOTE=${REMOTE%%.git *}
else
  REMOTE=${REMOTE%%.git *}
  REMOTE="http://${REMOTE/://}"
fi

REMOTE=$(trim $REMOTE)

# 格式化 https://ruby-china.org/topics/939
# %H:   commit hash
# %h:   短commit hash
# %an:  提交人名字
# %ae:  提交人邮箱
# %cr:  提交日期, 相对格式(1 day ago)
# %d:   ref名称
# %s:   commit信息标题
# %cd:  提交日期 (--date= 制定的格式)
FORMAT_DEFAULT=" * %s ([%h](${REMOTE}/commit/%H)) "


case $MODE in
changelog)
  LOG_FORMAT="$FORMAT_DEFAULT @%ae"

  # 标签列表
  TAG_LIST=$(git -C "${REPO}" tag)

  # 字符串分隔符
  IFS="v"
  # 分割字符串为数组
  arr=($TAG_LIST)
  # 还原分割符，否则会导致if判断失效
  IFS=""
  # 第一次提交commit, 取duan hash
  LAST_TAG=$(git -C "${REPO}" rev-list --reverse HEAD | head -1)
  LAST_TAG=${LAST_TAG:0:6}
  FIRST_TAG="HEAD"

  len=$((${#arr[@]} - 1))

  (
    # 循环处理数组
    for ((i = $len; i > 0; i--)); do
      s=${arr[$i]}
      # 去除字符串两头空格
      s=v$(trim $s)
      # 判断字符串非空
      if [ ! -z $s ]; then
        # 不知道为什么一定要缓存一下，否则$s值错乱
        TEMP=$s
        echo $(genSingleTagLog $FIRST_TAG $s)
        FIRST_TAG=$TEMP
      fi
    done

    genSingleTagLog $FIRST_TAG $LAST_TAG
  ) >$OUTPUT
;;
esac



echo "Log has been written to '${REPO}'" >$OUTPUT



