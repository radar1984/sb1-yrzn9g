const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Subscription = require('../models/Subscription');
const User = require('../models/User');

// Get subscription plans
router.get('/plans', async (req, res) => {
  try {
    const plans = [
      { id: 'basic', name: 'Basic', price: 9.99, description: 'Up to 50 images per month' },
      { id: 'pro', name: 'Pro', price: 19.99, description: 'Up to 200 images per month' },
      { id: 'unlimited', name: 'Unlimited', price: 39.99, description: 'Unlimited images' }
    ];
    res.json(plans);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Subscribe to a plan
router.post('/subscribe', auth, async (req, res) => {
  try {
    const { planId, paymentMethod } = req.body;

    // Here you would typically integrate with a payment gateway
    // For this example, we'll assume the payment is always successful

    const subscription = new Subscription({
      user: req.user.id,
      plan: planId,
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
    });

    await subscription.save();

    // Update user's subscription status
    await User.findByIdAndUpdate(req.user.id, { subscription: subscription._id });

    res.json({ success: true, message: 'Subscription successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get current user's subscription
router.get('/current', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('subscription');
    if (!user.subscription) {
      return res.status(404).json({ msg: 'No active subscription found' });
    }
    res.json(user.subscription);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;