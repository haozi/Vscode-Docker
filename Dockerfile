FROM haozhi/vscode-base:1.41.1

ARG CODE_SERVER=/root/.local/share/code-server
ARG WORKSPACE=/workspace

ADD data/config $CODE_SERVER

WORKDIR $WORKSPACE

CMD ["vscode", "/workspace", "--host=0.0.0.0", "--auth=none"]

EXPOSE 8080

LABEL name='vscode' version='1.41.1' description='vscode' by='github.com/haozi'
