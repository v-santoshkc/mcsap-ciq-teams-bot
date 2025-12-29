const app = require("./app");

(async () => {
  const port = process.env.PORT || 3978;
  await app.start(port);
  console.log(`Bot started on port ${port}`);
})();