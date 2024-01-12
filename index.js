const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const Product = require('./models/product')

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => {
        console.log("Mongo Open!")
    })
    .catch(err => {
        console.log("Error occured in Mongo!")
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))

app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.render('products/index', {products});
})

app.get('/products/new', (req, res) => {
    res.render('products/new')
})

app.post('/products', async(req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
})

app.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.render('products/details', {product})
})

app.listen(3000, () => {
    console.log("App listening in 3000")
})