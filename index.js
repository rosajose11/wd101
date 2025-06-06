const http=require('http');
const fs=require('fs');
const { isBuffer } = require('util');

let homecontent='';
let projectcontent='';
fs.readFile('home.html',(err,home)=>{
    if(err){
        throw err;
    
    }
    homecontent=home;

});

fs.readFile('project.html',(err,project)=>{
    if(err){
        throw err;
    }
    projectcontent=project;
});



http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        response.write(projectcontent);
        response.end();
        break;
      default:
        response.write(homecontent);
        response.end();
        break;
    }
  })
  .listen(3000);
