## background your server
npm run start-test-server &

## poll the server over and over again
## until it's been booted
wait-on http://localhost:3001

## and now run cypress
cypress run