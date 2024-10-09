// ... existing code ...

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/characters', require('./routes/characters'));
app.use('/api/images', require('./routes/images'));
app.use('/api/subscriptions', require('./routes/subscriptions'));

// ... rest of the code ...