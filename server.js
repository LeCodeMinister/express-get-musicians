const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")

const port = 3000;
app.use(express.json())

//TODO
// app.get("/musicians", async (req,res) => {
//     const myMusicians = await Musician.findAll();
//     const jsonContent = JSON.stringify(myMusicians);
//     res.send(jsonContent);
// })

// app.get("/musicians/:id", async (req,res) => {
//     const myMusician = await Musician.findByPk(req.params.id);
//     const jsonContent = JSON.stringify(myMusician);
//     res.send(jsonContent);
// })

app.post("/musicians/", async (req, res) => {
    try {
        await Musician.create(req.body);
        let myMusicians = await Musician.findAll();
        res.status(201).send(myMusicians);
    } catch (error) {
        res.status(500).send({err: error.message});
    }
})

app.put("/musicians/:id", async (req, res) => {
    try {
        let chosenMusician = await Musician.findByPk(req.params.id);
        await chosenMusician.update(req.body);
        let myMusicians = await Musician.findAll();
        res.status(202).send(myMusicians);
    } catch (error) {
        res.status(500).send({err: error.message});
    }
})

app.delete("/musicians/:id", async (req, res) => {
    try {
        let chosenMusician = await Musician.findByPk(req.params.id);
        await chosenMusician.destroy();
        let myMusicians = await Musician.findAll();
        res.status(200).send(myMusicians);
    } catch (error) {
        res.status(500).send({err: error.message});
    }
})

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})