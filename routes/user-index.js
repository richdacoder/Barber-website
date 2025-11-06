const express = require("express");
const router = express.Router();

router.get('/', (req,res) => {
res.render('user-pages/index');
})

module.exports = router;
