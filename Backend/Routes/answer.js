const express = require("express");
const router = express.Router();
const answerColl = require("../models/Answers");

// router.get("/", (req, res) => {
//     res.send("default");
// })

router.post("/", async(req, res) => {
    const answerData = new answerColl({
        question_id: req.body.question_id,
        answer: req.body.answer,
        user: req.body.user,
    })
    await answerData.save().then((msg) => {
        res.status(201).send(msg);
    }).catch(err => res.status(400).send(err))
})

module.exports = router;
