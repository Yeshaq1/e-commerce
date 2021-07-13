import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// --Desc: Create new Order
// --Route: post /api/orders
// --access: Private Route

const addOrder = asyncHandler(async (req, res) => {
  const {
    cartProducts,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const orderItems = cartProducts;

  if (cartProducts && orderItems.length === 0) {
    res.status(400);
    throw new Error('No Order Items');
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// --Desc: Get Order by ID
// --Route: Get /api/orders/:id
// --access: Private Route

const getOrderById = asyncHandler(async (req, res) => {
  const order = Order.findById(req.params.id).populate('user', 'name, email');
});

export { addOrder };