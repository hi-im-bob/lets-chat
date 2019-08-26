# client build and upload to docker hub
docker build -t hiimbob/chatroom-client ./client
docker push hiimbob/chatroom-client

# server build and upload to docker hub
docker build -t hiimbob/chatroom-server ./server
docker push hiimbob/chatroom-server


# run on server:

# docker pull hiimbob/chatroom-client:latest
# docker pull hiimbob/chatroom-server:latest

# docker stop client || true
# docker stop server || true

# docker rm client || true
# docker rm server || true

# docker rmi hiimbob/chatroom-client:current || true
# docker rmi hiimbob/chatroom-server:current || true

# docker tag hiimbob/chatroom-client:latest hiimbob/chatroom-client:current
# docker tag hiimbob/chatroom-server:latest hiimbob/chatroom-server:current

# docker rm -f $(docker ps -a -q)

# docker run -d --net chat --restart always --name client -p 3000:3000 hiimbob/chatroom-client:current
# docker run -d --net chat --restart always --name server -p 3001:3001 hiimbob/chatroom-server:current
