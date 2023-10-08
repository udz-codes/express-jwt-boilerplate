const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("/api/example");
});

router.get('/test', async (req, res) => {
  res.send('/api/example/test');
})

module.exports = router;
