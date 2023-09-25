const http = require('http');
const qs = require('querystring');
const path=require("path");
const collection=require("./mon")
const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end',async () => {
      const formData = qs.parse(body);
      const data={
            fname:formData.fname,
            lname:formData.lname,
            email:formData.email,
            pwd:formData.pwd,
            username:formData.username
      }
      await collection.insertMany([data]);
      console.log("success");
      res.writeHead(600, {'Content-Type': 'text/html'});
      console.log(`Name: ${formData.fname}\nPassword: ${formData.pwd} \nEmail: ${formData.email} `);
    //   res.end(`Name: ${formData.fname}\n Password: ${formData.password} \nEmail: ${formData.Email} `);
  
    });
  }
   else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`
      not correct
    `);
  }
});

server.listen(5002, () => {
  console.log('Server running on port 3010');
});
