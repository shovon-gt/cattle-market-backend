const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const routes = require('./routes.json');

server.use(middlewares);
server.use(jsonServer.bodyParser); 
// Routes mapping
server.use(jsonServer.rewriter(routes));
server.use(router);

// server.js
const jsonServer = require('json-server');
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
// ✅ Fixed login route using req.body
server.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  const users = router.db.get('users').value();
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.jsonp({ token: user.token });
  } else {
    res.status(401).jsonp({ error: 'Invalid credentials' });
  }
});


// server.listen(3000, () => {
//   console.log('✅ JSON Server running on http://localhost:3000');
// });
