git add .
git commit -m "Comment"
git push
git push heroku master

{
  "name": "marula",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon app.js",
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install && npm run build"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.19.0",
    "cookie-parser": "^1.4.5",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "express-jwt": "^5.3.3",
    "express-validator": "^5.3.1",
    "formidable": "^1.2.2",
    "google-trends-api": "^4.9.0",
    "jsonwebtoken": "^8.5.1",
    "lodash": "^4.17.15",
    "mongodb": "^3.5.9",
    "mongoose": "^5.9.18",
    "morgan": "^1.10.0",
    "nodemon": "^2.0.4",
    "uuid": "^8.1.0"
  }
}
