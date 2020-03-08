docker run --name='vscode' --hostname='vscode' \
-v $PWD/data/config:/root/.local/share/code-server \
-v $PWD/data/config/extensions/vscode-icons-team.vscode-icons-9.7.0:/workspace \
-it -p 8080:8080 --rm haozhi/vscode
