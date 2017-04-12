const express = require("express");
const router = express.Router();
const middleware = require("../middleware");

const questionRouter = require('./question');
const answerRouter = require('./answer');
const commentRouter = require('./comment');

router.get('/', (req,res) => {
    res.send("welcome to sackoverflow");
})

router.use('/question', questionRouter);
router.use('/answer', answerRouter);
router.use('/comment', commentRouter);

module.exports = router;
