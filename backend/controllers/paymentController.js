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
  } = req.body.cartDetail;

  const customerEmail = req.body.user.email;

  const chargedAmount = Number(totalPrice) * 100;

  const stripe = new Stripe(process.env.STRIPE_CODE);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: chargedAmount,
    currency: 'usd',
    receipt_email: customerEmail,
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
