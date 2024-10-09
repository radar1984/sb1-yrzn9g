const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Character = require('../models/Character');

// Create a character
router.post('/', auth, async (req, res) => {
  try {
    const newCharacter = new Character({
      user: req.user.id,
      ...req.body
    });

    const character = await newCharacter.save();
    res.json(character);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all characters for a user
router.get('/', auth, async (req, res) => {
  try {
    const characters = await Character.find({ user: req.user.id }).sort({ date: -1 });
    res.json(characters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;