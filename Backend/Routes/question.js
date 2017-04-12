const express = require("express");
const mongoose =  require("mongoose");

const router = express.Router();

const questionColl = require("../models/Questions");

// router.get("/", (req,res) => {
//     res.send("default question get");
// })

router.post("/", async(req, res) => {
    const questionData = new questionColl({
        title: req.body.title,
        body: req.body.body,
        tags: JSON.parse(req.body.tags),
        user: req.body.user
    })

    await questionData.save().then((msg) => {
        res.status(201).send({
            msg: "Successfully submitted you question"
        })
    }).catch((err) => res.status(400).send(err))
})

router.get("/", async (req, res) => {
    questionColl.aggregate([
        {
            $lookup: {
                from: "comments",
                let: { question_id: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$question_id", "$$question_id"],  //first one comments collection qid
                            },
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            comment: 1,
                            created_at: 1
                        }
                    }
                ],
                as: "comments",
            }
        },

        {
            $lookup: {
                from: "answers",
                let: { question_id: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$question_id", "$$question_id"],  //first one answers collection qid
                            },
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            answer: 1,
                            created_at: 1
                        }
                    }
                ],
                as: "answers",
            }
        },

    ])
        .exec()
        .then((questionDetails) => {
            res.status(200).send(questionDetails);
        })
        .catch((err) => {
            res.status(400).send(err)
        })
})

//question details

router.get("/:id", async(req, res) => {
    questionColl.aggregate([
        {
            $match: { _id: mongoose.Types.ObjectId(req.params.id) },
        },
        {
            $lookup: {
                from: "comments",
                let: { question_id: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$question_id", "$$question_id"],  //first one comments collection qid
                            },
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            comment: 1,
                            created_at: 1,
                            user: 1,
                        }
                    }
                ],
                as: "comments",
            }
        },

        {
            $lookup: {
                from: "answers",
                let: { question_id: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$question_id", "$$question_id"],  //first one answers collection qid
                            },
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            answer: 1,
                            created_at: 1,
                            user: 1
                        }
                    }
                ],
                as: "answersDetails",
            }
        },

    ])
        .exec()
        .then((questionDetails) => {
            res.status(200).send(questionDetails);
        })
        .catch((err) => {
            console.log("Error", err);
            res.status(400).send(err)
        })
})

module.exports = router