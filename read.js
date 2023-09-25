const http = require('http');
const qs = require('querystring');
const path=require("path");
const collections=require("./mon")
const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end',async () => {
      const formData = qs.parse(body);
            const email=formData.email;
            const pwd=formData.pwd;
            const username=formData.username;
      await collections.findOne({
        username:username,
        pwd:pwd,
      }).then((user) => {
        if (!user) {
          console.log('User not found');
          res.end("failed");
        } else {
          res.end("user signed in successfully");
          console.log(user)
        }
      })
      .catch((error) => {
        console.log('Error finding user:', error);
        res.end("invalid username password");
      });


  
    });
  }
   else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`
      not correct
    `);
  }
});

server.listen(5004, () => {
  console.log('Server running on port 3010');
});
