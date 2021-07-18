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
    id,
    status,
    email_address,
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
      isPaid: true,
      paymentResult: {
        status,
        id,
        email_address,
      },
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// --Desc: Get Order by ID
// --Route: Get /api/orders/:id
// --access: Private Route

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order && order.user._id.equals(req.user._id)) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('no order found');
  }
});

// --Desc: Get Orders
// --Route: Get /api/orders/myorders
// --access: Private Route

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate('user', 'name email')
    .sort({ createdAt: 'desc' });

  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error('no orders found');
  }
});

export { addOrder, getOrderById, getOrders };
