# git 常见命令

## git 配置

设置用户名
> $ git config --global user.name "John Doe"

设置邮件地址
> $ git config --global user.email johndoe@example.com

如果使用了 --global 选项，那么该命令只需要运行一次，因为之后无论你在该系统上做任何事情， Git 都会使用那些信息。 当你想针对特定项目使用不同的用户名称与邮件地址时，可以在那个项目目录下运行没有 --global 选项的命令来配置。

检查配置信息
> $ git config --list

## git 命令

### 初始化仓库

> $ git init

### git 仓库

如果你正在使用 HTTPS URL 来推送，Git 服务器会询问用户名与密码。 默认情况下它会在终端中提示服务器是否允许你进行推送。

如果不想在每一次推送时都输入用户名与密码，你可以设置一个 “credential cache”。 最简单的方式就是将其保存在内存中几分钟，可以简单地运行 git config --global credential.helper cache 来设置它。

克隆仓库
> $ git clone <https://github.com/gyxyl>

克隆仓库并重命名
> $ git clone <https://github.com/gyxyl> MyWarehouse

添加远程仓库
> $ git remote add [shortname] [url]

从远程仓库中抓取与拉取
> $ git fetch [remote-name]

### git 提交

跳过使用暂存区域
> $ git commit -a

Git 会自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过 git add 步骤

重新提交 commit 信息，这个命令会将暂存区中的文件提交
> $ git commit --amend

### git 推送远程

> $ git push

强制推送
> $ git push -f

当回退了远程分支的代码，需要提交新代码的时候就会用到，但切记要保留一个正常的分支，或者直接在本地建分支，推远程

### git 撤销

取消暂存的文件
> $ git reset HEAD [file]

软重置会将 HEAD 移至指定的提交（或与 HEAD 相比的提交的索引），而不会移除该提交之后加入的修改！

硬重置直接将整体状态直接重置到特定提交之前的状态

注意：**在命令中加入 --hard 会导致工作目录中所有的当前进度丢失**

撤销对文件的修改
> $ git checkout -- [file]

### git Reverting

另一种撤销修改的方法是执行 git revert。

创建一个包含已还原修改的新提交
> $ git revert [hash]

### git Cherry-picking

对一个提交执行 cherry-pick 时，我们会在活动分支上创建一个新的提交，其中包含由拣选出来的提交所引入的修改。

> $ git cherry-pick [hash]

### git Reflog

可以展示已经执行过的所有动作的日志。包括合并、重置、还原，基本上包含你对你的分支所做的任何修改。

> $ git reflog

### git 对比

查看修改的文件内容
> $ git diff [文件名]

### git 标签

Git 使用两种主要类型的标签：轻量标签（lightweight）与附注标签（annotated）。

附注标签中包含打标签者的名字、电子邮件地址、日期时间；还有一个标签信息；

列出标签
> $ git tag

创建附注标签
> $ git tag -a [标签名] -m '标签内容'

创建轻量标签
> $ git tag [标签名]

查看标签
> $ git show [标签名]

默认情况下，git push 命令并不会传送标签到远程仓库服务器上。 在创建完标签后你必须显式地推送标签到共享服务器上。

推送全部标签
> $ git push origin --tags

删除标签
> $ git tag -d [标签名]

### git 分支

Git 的分支实质上仅是包含所指对象校验和（长度为 40 的 SHA-1 值字符串）的文件，所以它的创建和销毁都异常高效。 创建一个新分支就相当于往一个文件中写入 41 个字节（40 个字符和 1 个换行符），指生成一次快照

查看分支图
> $ git log --graph --all

查看已经合并的分支
> $ git branch --merged

在这个列表中分支名字前没有 * 号的分支通常可以使用 git branch -d 删除掉；

查看未合并的分支
> $ git branch --no-merged

删除远程分支
> $ git push origin --delete [分支名]

切换回之前的分支
> $ git checkout -

移除远程仓库不存在的分支
> $ git fetch -p

------

变基(切换到需要合并的分支)
> $ git rebase master

切换到目标分支，当前是 master
> $ git merge [需要合并的分支]

在当前分支相比于我们要合并的分支没有额外的提交（commit）时，可以执行 fast-forward 合并

使用 no-fast-forward 合并时，Git 会在当前活动分支上创建新的 merging commit。

### git 储藏

储藏会处理工作目录的脏的状态——即跟踪文件的修改与暂存的改动——然后将未完成的修改保存到一个栈上，而你可以在任何时候重新应用这些改动。

储藏工作
> $ git stash

设置储藏信息
> $ git stash save 'message..'

储藏未跟踪的文件
> $ git stash -u

查看储藏
> $ git stash list

应用储藏(不指定储藏名字，默认最近的)
> $ git stash apply [储藏名字]

移除储藏
> $ git stash drop [储藏名字]

应用并移除储藏
> $ git stash pop [储藏名字]

移除所有储藏
> $ git stash clear

### git Rebasing

git rebase 会将当前分支的提交复制到指定的分支之上。

* reword：修改提交信息；
* edit：修改此提交；
* squash：将提交融合到前一个提交中；
* fixup：将提交融合到前一个提交中，不保留该提交的日志消息；
* exec：在每个提交上运行我们想要 rebase 的命令；
* drop：移除该提交。

### git fetch 与 git pull 区别

如果你使用 clone 命令克隆了一个仓库，命令会自动将其添加为远程仓库并默认以 “origin” 为简写。 所以，git fetch origin 会抓取克隆（或上一次抓取）后新推送的所有工作。 必须注意 git fetch 命令会将数据拉取到你的本地仓库——它并不会自动合并或修改你当前的工作。 当准备好时你必须手动将其合并入你的工作。

运行 git pull 通常会从最初克隆的服务器上抓取数据并自动尝试合并到当前所在的分支。

### git merge 与 git rebase 区别

git merge 会把两个分支的最新快照以及二者最近的共同祖先进行三方合并，合并的结果是生成一个新的快照（并提交）。

git rebase 可以提取在分支中引入的补丁和修改，然后在另一个分支的基础上应用一次。 在 Git 中，这种操作就叫做 变基。

## 学习 git 网站

[learngitbranching](https://learngitbranching.js.org/?locale=zh_CN)
