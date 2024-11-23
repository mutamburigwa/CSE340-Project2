const express = require('express'); // Ensure express is required
const router = express.Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Welcome']
    res.send('Welcome to Point of Sale'); // Updated welcome message
});

router.use('/products', require('./products'));
router.use('/transactions', require('./transactions'));

module.exports = router;
