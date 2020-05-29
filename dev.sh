docker run --name='vscode' --hostname='vscode' \
-v $PWD/data/config:/root/.local/share/code-server \
-v $PWD/data/config/extensions/octref.vetur-0.23.0:/workspace \
-it -p 8080:8080 --rm haozhi/vscode
