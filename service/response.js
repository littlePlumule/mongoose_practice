const headers = require('./headers');

module.exports = {
  success(res, data) {
    res.writeHead(200, headers);
    res.write(JSON.stringify({
      "status": "success",
      data,
    }));
    res.end();
  },
  fail(res, message) {
    res.writeHead(400, headers);
    res.write(JSON.stringify({
      "status": "fail",
      message,
    }));
    res.end();
  },
};
