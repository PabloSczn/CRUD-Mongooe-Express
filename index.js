// Importing necessary modules
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// Importing the Product model
const Product = require('./models/product')

// Connecting to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => {
        console.log("Mongo Open!")
    })
    .catch(err => {
        console.log("Error occurred in Mongo!")
        console.log(err)
    })

// Setting up the view engine and middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Handling GET request for listing all products
app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', { products });
})

// Handling GET request for creating a new product
app.get('/products/new', (req, res) => {
    res.render('products/new');
})

// Handling POST request for creating a new product
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
})

// Handling GET request for editing a specific product
app.get('/products/:id/edit', async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.render('products/edit', { product });
})

// Handling PUT request for updating a specific product
app.put('/products/:id', async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
})

// Handling GET request for viewing details of a specific product
app.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.render('products/details', { product });
})

// Handling DELETE request for deleting a specific product
app.delete('/products/:id', async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

// Starting the server on port 3000
app.listen(3000, () => {
    console.log("App listening on port 3000")
})
