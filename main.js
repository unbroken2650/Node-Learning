const http = require("http");
const fs = require("fs");
const url = require("url");

const templateHTML = (title, list, body) => {
  return `<!doctype html>
  <html>

  <head>
  <title>WEB1 - ${title}</title>
  <meta charset="utf-8">
  </head>

  <body>
  <h1><a href="/">WEB</a></h1>
  ${list}
  ${body}
  </body>

  </html>`;
};

const templateList = (fileList) => {
  let list = "<ul>";
  for (let i = 0; i < fileList.length; i++) {
    list = list + `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
  }
  list = list + "</ul>";
  return list;
};

const app = http.createServer((request, response) => {
  let _url = request.url;
  const queryData = url.parse(_url, true).query;
  const pathname = url.parse(_url, true).pathname;

  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("./data", (err, fileList) => {
        let title = "Welcome";
        description = "Hello, Node.js";
        const list = templateList(fileList);
        const template = templateHTML(
          title,
          list,
          `<h2>${title}</h2>${description}`
        );
        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir("./data", (err, fileList) => {
        fs.readFile(`data/${queryData.id}`, "utf-8", (err, description) => {
          let title = queryData.id;
          const list = templateList(fileList);
          const template = templateHTML(
            title,
            list,
            `<h2>${title}</h2>${description}`
          );
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else {
    response.writeHead(404);
    response.end("Not Found");
  }
});
app.listen(3000);
