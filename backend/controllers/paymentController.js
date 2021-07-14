import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';

const createPaymentIntent = asyncHandler(async (req, res) => {
  const {
    cartProducts,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    totalPrice,
    taxPrice,
    itemsPrice,
  } = req.body;

  const chargedAmount = Number(totalPrice) * 100;

  const stripe = new Stripe(process.env.STRIPE_CODE);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: chargedAmount,
    currency: 'usd',
  });

  if (paymentIntent) {
    const clientSecret = paymentIntent.client_secret;

    res.status(200).json({
      clientSecret: clientSecret,
    });
  } else {
    throw new Error('Payment Intent Failed');
  }
});

export { createPaymentIntent };
