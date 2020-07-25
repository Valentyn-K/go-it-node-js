const http = require("http");

const server = http.createServer((request, response) => {
  console.log("request resieved");

  //1. HTTP method: GET, POST,  ect
  //2. path-params, query-params
  //3. request body,
  //4. header

  const header = request.method;
  const pathParamsQueryPatams = request.url;
  const headers = request.headers;
  let body = "";

  request.on("data", (bodyChank) => {
    console.log("bodyChank", bodyChank);
    body += bodyChank;
  });

  request.on("end", () => {
    //request recieved
    console.log("request", request);
    response.writeHead(201, { "Content-Type": "text/plain" });
    response.end(body);
  });
});

server.listen(80, () => {
  console.log("server up", 80);
});

module.exports;
