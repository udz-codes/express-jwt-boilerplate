const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("/api/example2");
});

router.get('/test', async (req, res) => {
  res.send('/api/example2/test');
})

module.exports = router;
