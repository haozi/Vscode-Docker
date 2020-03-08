cat .gitignore | xargs rm -rf

# 创建镜像
docker build -t haozhi/vscode .
