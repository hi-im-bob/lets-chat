# run locally
docker build -t hiimbob/chatroom-client ./client
docker push hiimbob/chatroom-client

docker build -t hiimbob/chatroom-server ./server
docker push hiimbob/chatroom-server

# run on server:
docker rm -f $(docker ps -a -q)

docker pull hiimbob/chatroom-client:latest
docker rmi hiimbob/chatroom-client:current || true
docker tag hiimbob/chatroom-client:latest hiimbob/chatroom-client:current

docker pull hiimbob/chatroom-server:latest
docker rmi hiimbob/chatroom-server:current || true
docker tag hiimbob/chatroom-server:latest hiimbob/chatroom-server:current

docker run -d --net chat --restart always --name mongo_service -p 27017:27017 -v ~/data:/data/db mongo
docker run -d --net chat --restart always --name client -p 3000:3000 hiimbob/chatroom-client:current
sleep 10
docker run -d --net chat --restart always --name server -p 3001:3001 hiimbob/chatroom-server:current
