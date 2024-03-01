const express = require('express');
const router = express.Router();
const { fetchProducts, getProduct } = require('../controllers/productController');

router.get('/products', fetchProducts);

router.get('/products/:id', getProduct);

module.exports = router;