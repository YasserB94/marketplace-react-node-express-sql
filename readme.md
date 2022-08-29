## Setup
1. Create server folder
    - create package.json
    - installed express
        - npx generate-express -e
            - ejs view engine
    - installed nodemon
        - node filewatcher to restart server on save
    - installed dotenv
        - to keep private data
2. Create Express app


Server
    - Express app with EJS view engine
    - Added nodemon for dev
    - Added dotenv
    - Added DB connection
    - Setup session & SQL session store
    - setup cors 
        - set credentials to true -> Take cookies

Client
    - React App
    - Tested backend connection
    - Created login form to test server side session storage
        - Had to add extra options to postrequest 
        - set withCredentials:true to make sure session? cookies are sent
    - Added Counter
        - Reads data sent by server (counting data -> Sent in body)
    - Try to read straight from  cookie
        - Currently cannot work since JS has no access to httponly cookies!
            - Source: Stackoverflow
            - Solution: install a bunch of npm packages => NOPE
                - Handle it server side! => Yush