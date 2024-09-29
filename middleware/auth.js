const jwt = require('jsonwebtoken');
const cookie = require('cookie');

function auth(request, response, next) {
  const cookies = cookie.parse(request.headers.cookie || '');
  console.log(request.cookie);
  const token = cookies.token;
  if (!token) {
    response.writeHead(302, { 'Location': '/admins/login' });
    response.end();
    return;
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    request.user = verified;
    next();
  } catch (err) {
    response.writeHead(400, { 'Content-Type': 'text/plain' });
    response.end('Token inválido');
  }
}

module.exports = auth;