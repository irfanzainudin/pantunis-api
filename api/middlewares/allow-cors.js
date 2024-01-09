const allowCors = (fn) => (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  // TODO: change this sh*t
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Origin", "https://www.pantunis.com");
  // res.setHeader("Vary", "Origin");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return fn(req, res);
};

module.exports = allowCors;
