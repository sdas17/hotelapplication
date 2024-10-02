const express = require('express');
const Person = require("../model/Person");
const { db } = require("../database/db");

const router = express.Router();
// Define routes for /person
router.get('/', async (req, res) => {
    try {
        const persons = await Person.find();
        res.json(persons);
    } catch (error) {
        console.error("Error fetching persons:", error);

        res.status(500).json({ error: "Internal server error" });
    }

});
router.get("/:workdType", async (req, res) => {
    try {
        let workType = await req.params.workdType;
        console.log(workType);

        if (
            workType === "Chef" ||
            workType === "Waiter" ||
            workType === "Manager"
        ) {
            const response = await Person.find({ work: workType });
            console.log(response);

            res.status(200).json(response);
        }
    } catch (error) {
        res.status(404).json({ error: "Invalid Work type" });
    }
});
router.post('/', async (req, res) => {
    try {
        const method = req.body;
        console.log(method);

        // Create a new Person using the model
        const dumydata = new Person(method);
        const savedPerson = await dumydata.save();
        console.log("Saved person to database");

        res.status(201).json(savedPerson);
    } catch (error) {
        console.error("Error saving person:", error);
        res.status(500).json({ error: "Internal server error" });
    }


});

// Placeholder for PUT route
router.put("/:id", async (req, res) => {
    try {
        const dataId = req.params.id;
        const bodyData = req.body;
        const updatedPerson = await Person.findByIdAndUpdate(dataId, bodyData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation

        })
        if (!updatedPerson) {
            return res.status(404).json({
                error: 'Person not found'
            });
        }
        res.json(updatedPerson);
    } catch (error) {
        console.error('Error updating person:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const dataDumyId = req.params.id;
        const bodyDelteId = req.body;
        const dumyData = await Person.findByIdAndUpdate(dataDumyId, bodyDelteId);
        if (!dumyData) {
            return res.status(404).json({ error: 'Person not found' });
        }
        // Send a success message as a JSON response
        res.json({ message: 'Person deleted successfully' });
    } catch (error) {
        console.error('Error deleting person:', error);
        res.status(500).json({ error: 'Internal server error' });

    }
})



module.exports = router;