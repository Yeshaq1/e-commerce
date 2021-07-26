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

export { getProductById, getProducts, deleteProduct };
