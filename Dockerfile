# FROM node:12.20.2-slim
FROM ubuntu:18.04
WORKDIR /app
COPY . /app
RUN chmod +x install.sh
RUN chmod +x server_run.sh
RUN apt-get -qq update
RUN apt-get -qq -y install sudo
RUN apt-get -qq -y install curl
RUN ./install.sh
# RUN export ENV=docker
# RUN ./server_run.sh
CMD ["./server_run.sh"]
