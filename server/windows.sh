rm -R ./web && echo "π Removed old web folder" &&
cd .. && echo "π Moved up a directory  to $(pwd)" &&
yarn build && echo "π Built new web folder" &&
cd server && echo "π Moved back to server directory"&&
mkdir web && echo "π Created new web folder" &&
cp -r ../dist/* web/ && echo "π Copied new web folder" &&
go build -o webapp.exe main.go && echo "π Built new webapp" &&
echo "π Done π₯Άπ₯Ά"