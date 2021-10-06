const express = require("express");
const Computer = require("../models/computerModel");
const { QueryTypes } = require('sequelize');
const sequelize = require("../db/sequelize");

const router = new express.Router();
// 
router.post("/computers", async (req, res) => {
    console.log("POST computers");
    try {
        const computer = await Computer.create(req.body)
        return res.status(201).send(computer)
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            status: 400,
            message: err.computer
        })
    }
})

router.get("/computers", async (req, res) => {
    try {
        const computers = await sequelize.query(
            'SELECT * FROM computers WHERE manufacturer LIKE :search_manufacturer AND model LIKE :search_model AND cpu LIKE :search_cpu AND ram LIKE :search_ram AND disc LIKE :search_disc AND  price >= :search_minPrice AND price <= :search_maxPrice ',
            {
                replacements: {
                    search_manufacturer: req.query.manufacturer || "%",
                    search_model: req.query.model || "%",
                    search_cpu: req.query.cpu || "%",
                    search_ram: req.query.ram || "%",
                    search_disc: req.query.disc || "%",
                    search_minPrice: req.query.minPrice || 0,
                    search_maxPrice: req.query.maxPrice || Number.MAX_SAFE_INTEGER
                },
                type: QueryTypes.SELECT
            }
        );

        // console.log({ computers }); 
        if (computers.length === 0) {
            return res.status(404).send({
                status: 404,
                message: "None computers matches"
            })
        }
        res.send(computers);
    } catch (err) {
        res.status(500).send(err.computer)
    }
})


// router.delete("/computers/:id", async (req, res) => {
// const computerId = req.params.id;

// try {
//     const computer = await Computer.findOneAndDelete({ _id: computerId });
//     if (computer == null) {
//         return res.status(404).send({
//             status: 404,
//             message: "Ad not found."
//         })
//     }

//     res.send(computer)
// } catch (err) {
//     res.status(500).send()
// }
// })

// router.patch("/computers/:id", async (req, res) => {
//     const allowedUpdates = ["content"]
//     const updates = Object.keys(req.body);
//     const isValidOperation = updates.every((update) => { return allowedUpdates.includes(update) })
//     if (!isValidOperation) {
//         return res.status(400).send({
//             status: 400,
//             message: "Invalid update key."
//         })
//     }
//     const _id = req.params.id;
//     const reqObj = req.body;
//     try {
//         const computer = await computer.findOne({ _id })
//         if (computer == null) {
//             return res.status(404).send({
//                 status: 404,
//                 message: "computer not found"
//             })
//         }
//         updates.forEach((update) => { ad[update] = reqObj[update] })
//         await computer.save()
//         res.send(computer);
//     } catch (err) {
//         res.status(400).send({
//             status: 400,
//             message: "Invalid update value."
//         })
//     }
// })


module.exports = router;