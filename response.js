const headers = {
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, PATCH, OPTIONS",
  "Content-Type": "application/json"
};
module.exports = {
  success(res, data) {
    res.writeHead(200, headers);
    res.write(JSON.stringify({
      "status": "success",
      data,
    }));
    res.end();
  },
  fail(res, statusCode, message) {
    res.writeHead(statusCode, headers);
    res.write(JSON.stringify({
      "status": "fail",
      message,
    }));
    res.end();
  },
  options(res) {
    res.writeHead(200, headers);
    res.end();
  }
};
