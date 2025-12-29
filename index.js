const restify = require("restify");
const app = require("./app"); // your existing app.js

// Azure gives PORT dynamically
const port = process.env.PORT || 3978;

// Create HTTP server
const server = restify.createServer();
server.use(restify.plugins.bodyParser());

// Bot Framework / Teams endpoint
server.post("/api/messages", async (req, res) => {
  await app.run(req, res);
});

// Health check (optional but recommended)
server.get("/", (req, res) => {
  res.send(200, "MCSAP C-IQ Teams Bot is running");
});

server.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
