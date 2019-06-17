require('dotenv').config();
const express = require('express')
const next = require('next')
const api = require('./src/api/routes');
const bodyParser = require('body-parser')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: './src/views' });
const handle = app.getRequestHandler();
const alloweOrigin = require('./configs/allow-origin')[process.env.NODE_ENV];
const env = require('./configs/env')[process.env.NODE_ENV];
const session = require('express-session');
var KnexSessionStore = require('connect-session-knex')(session);
const context = require('./src/api/configs/connections');
const cookieParser = require('cookie-parser');
const userService = require('./src/api/services/authenticate.services');

app
  .prepare()
  .then(() => {
    const server = express();
    const sessionOption = {
      secret: env.tokenSecret,
      resave: false,
      saveUninitialized: true,
      cookie: {},
      store: new KnexSessionStore({
        knex: context,
        tablename: 'SessionSSO'
      })
    };
    if (process.env.NODE_ENV === 'production') {
      server.set('trust proxy', 1); // trust first proxy
      sessionOption.cookie.secure = true;
    }
    server.use(express.static('public'));
    server.use(session(sessionOption));
    server.use(cookieParser());
    server.get('/logout', (req, res) => {
      req.session.destroy();
      const redirect = req.query.continue ? req.query.continue : '/'
      res.redirect(redirect)
    });
    server.get('/', (req, res) => {
      console.log(req.sessionID);
      const actualPage = '/login';
      const url = alloweOrigin[req.query.continue];
      const query = { continue: url != null && url != undefined ? url.consumer : "", url: req.query.continue };
      app.render(req, res, actualPage, query)
    });

    server.get('/login', (req, res) => {
      console.log(req.sessionID);
      const actualPage = '/login';
      app.render(req, res, actualPage)
    });

    server.get('/dashboard', (req, res) => {
      console.log(req.sessionID);
      const actualPage = '/dashboard';
      app.render(req, res, actualPage)
    });

    server.get('/register', (req, res) => {
      console.log(req.sessionID);
      const actualPage = '/register';
      app.render(req, res, actualPage)
    });

    server.use(bodyParser.json({
      limit: "100mb"
    }));
    server.use('/api', api);
    server.use((err, req, res, next) => {
      res.status(err).send('Something broke!')
    });

    server.get('*', (req, res) => {
      return handle(req, res)
    })



    const appChat = server.listen(1002, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:1002')
    });

    const io = require("socket.io")(appChat);
    io.on('connection', (socket) => {
      console.log("connect", socket.id);
      socket.on('disconnect', function () {
        console.log('Got disconnect!', socket.id);
        userService.removeSocket(socket.id);
      });
      setInterval(async () => {
        const users = await userService.getUser();
        io.emit("users", users);
      }, 3000);
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })

