import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// --Desc: Fetch all products
// --Route: GET /api/products
// --access: Public Route

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// --Desc: Fetch product by ID
// --Route: GET /api/products/id
// --access: Public Route

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product Not Found');
  }
});

// --Desc: Delete Product
// --Route: Delete /api/products/:id
// --access: Private Route/Admin Only

const deleteProduct = asyncHandler(async (req, res) => {
  const productToDelete = await Product.findByIdAndDelete(req.params.id);

  if (productToDelete) {
    res.json({ message: 'The product has been deleted' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// --Desc: Create Product
// --Route: POST /api/products
// --access: Private Route/Admin Only

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    user,
    image,
    brand,
    category,
    description,
    countInStock,
  } = req.body;

  const product = new Product({
    name,
    price,
    user,
    image,
    brand,
    category,
    description,
    countInStock,
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});

export { getProductById, getProducts, deleteProduct, createProduct };
