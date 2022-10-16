rm -R ./web && echo "👍 Removed old web folder" &&
cd .. && echo "👍 Moved up a directory" &&
yarn build && echo "👍 Built new web folder" &&
cd server && echo "👍 Moved back to server directory"&&
mkdir web && echo "👍 Created new web folder" &&
cp -r ../dist/* web/ && echo "👍 Copied new web folder" &&
go build -o webapp.exe main.go && echo "👍 Built new webapp" &&
echo "👍 Done 🥶🥶"