const express = require('express');
const MenuItem = require("../model/Menu");
const { db } = require("../database/db");
const router = express.Router();
router.get("/menuitem", async (req, res) => {
    try {
        const persons = await MenuItem.find();
        res.json(persons);
    } catch (error) {
        console.error("Error fetching persons:", error);

        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/menuitem/:taste", async (req, res) => {
    try {
        let SubTate = req.params.taste;
        console.log(SubTate)
        if (SubTate === 'Sweet' || SubTate === 'Spicy' || SubTate === 'Sour') {
            const response = await MenuItem.find({ taste: SubTate })
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(401).json({ error: "Invalid work type" })

    }
})

router.post("/menuItem", async (req, res) => {
    try {
        const method = req.body;

        // Validate required fields
        if (!method.price) {
            return res.status(400).json({ error: "Price is required" });
        }

        // Create a new MenuItem
        const menuItem = new MenuItem(method);
        const savedMenuItem = await menuItem.save();
        console.log("Saved menu item to database");

        res.status(201).json(savedMenuItem);
    } catch (error) {
        console.error("Error saving menu item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// Placeholder for PUT route
router.put("/:id", async (req, res) => {
    try {
        const dataId = req.params.id;
        const bodyData = req.body;
        const updatedPerson = await MenuItem.findByIdAndUpdate(dataId, bodyData, {
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
        const dumyData = await MenuItem.findByIdAndUpdate(dataDumyId, bodyDelteId);
        if (!dumyData) {
            return res.status(404).json({ error: 'Person not found' });
        }
        // Send a success message as a JSON response
        res.json({ message: 'menu deleted successfully' });
    } catch (error) {
        console.error('Error deleting person:', error);
        res.status(500).json({ error: 'Internal server error' });

    }
})
module.exports = router;