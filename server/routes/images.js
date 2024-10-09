// ... existing code ...

// Get user's images
router.get('/user', auth, async (req, res) => {
  try {
    const images = await Image.find({ user: req.user.id }).sort({ date: -1 });
    res.json(images);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ... rest of the code ...