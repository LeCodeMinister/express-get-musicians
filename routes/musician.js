const express = require("express");
const {Musician} = require("../index");
const { check, validationResult} = require("express-validator")

const musicianRouter = express.Router();
musicianRouter.use(express.json());

musicianRouter.get("/", async (req, res) => {
    const myMusicians = await Musician.findAll();
    let jsonContent = JSON.stringify(myMusicians);
    res.send(jsonContent);
})

musicianRouter.get("/:id", async (req, res) => {
    const myMusician = await Musician.findByPk(req.params.id);
    let myJsonContent = JSON.stringify(myMusician);
    res.send(myJsonContent);
})

musicianRouter.post("/", [
    check("name").not().isEmpty().trim(),
    check("instrument").not().isEmpty().trim()], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(500).json({error: errors.array()})
        } else {
            try {
                await Musician.create(req.body);
                let myMusicians = await Musician.findAll();
                res.status(201).send(myMusicians);
            } catch (error) {
                res.status(500).send({err: error.message})
            }
        }
})

musicianRouter.put("/:id", async (req, res) => {
    try {
        let chosenMusician = await Musician.findByPk(req.params.id);
        await chosenMusician.update(req.body);
        let myMusicians = await Musician.findAll();
        res.status(202).send(myMusicians);
    } catch (error) {
        res.status(500).send({err: error.message})
    }
})

musicianRouter.delete("/:id", async (req, res) => {
    try {
        let chosenMusician = await Musician.findByPk(req.params.id);
        await chosenMusician.destroy();
        let myMusicians = await Musician.findAll();
        res.status(200).send(myMusicians);
    } catch (error) {
        res.status(500).send({err: error.message})
    }
})

module.exports = musicianRouter;