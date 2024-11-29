const express = require('express');
const { resolve } = require('path');

const app = express();

const port = 3000;

app.use(express.static('static'));

let taxRate = 5; // 5%
let discountedPercentage = 10; // 10%
let loyaltyRate = 2; // 2 points per $1
// Calculate the total price of items in the cart
/*  Declare an endpoint cart-total using the get keyword.

Declare two variables newItemPrice and cartTotalto take the input.

Parse the input as a float to calculate the total cart price.

Return the result as a string.

API Call: <http://localhost:3000/cart-total?newItemPrice=1200&cartTotal=0>

Expected Output: 1200  */

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let finalPrice = newItemPrice + cartTotal;
  res.send(finalPrice.toString());
});

//  Apply a discount based on membership status
/*  Create an endpoint that takes a cartTotal and isMember as a query parameter and returns final price after applying the discount.

Write an Express code snippet.

Declare an endpoint /membership-discount using the get keyword.

Declare two variables cartTotal and isMember to take the input.

Parse the cartTotal as a float to calculate the total cart value.

Return the result as a string.

If the Membership status = true, then the discount percentage is applied

If the Membership status = false, no discount is applied

API Call: <http://localhost:3000e/membership-discount?cartTotal=3600&isMember=true>

Expected Output: 3240  */

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  let finalPrice;
  if (isMember) {
    finalPrice = cartTotal - (cartTotal * discountedPercentage) / 100; //cartTotal * (1 - discountedPercentage);
  } else {
    finalPrice = cartTotal;
  }
  res.send(finalPrice.toString());
});

//  Calculate tax on the cart total
/*  Create an endpoint that takes a cartTotal as a query parameter and returns the tax applied on the Cart Total.

Write an Express code snippet.

Declare an endpoint /calculate-tax using the get keyword.

Declare a variable cartTotal as input.

Parse the cartTotal input as float to calculate the cart amount after applying the tax rate.

Return the result as a string.

API Call: <http://localhost:3000/calculate-tax?cartTotal=3600>

Expected Output: 180 */

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let taxAmount = (cartTotal * taxRate) / 100;
  res.send(taxAmount.toString());
});

//   Estimate delivery time based on shipping method
/*  Create an endpoint that takes a shippingMethod and distance as a query parameter and returns the number of days for delivering the package.

Write an Express code snippet.

Declare an endpoint /estimate-delivery using the get keyword.

Declare 2 variables shippingMethod and distance as inputs.

Parse the distance input as float to calculate the delivery time based on the distance.

Return the result as a string.

If the shippingMethod = Standard, the delivery days will be 1 day per 50 kms.

If the shippingMethod = Express, the delivery days will be 1 day per 100 kms.

API Call: <http://localhost:3000/estimate-delivery?shippingMethod=express&distance=600>

Expected Output: 6  */

function deliveryTime(shippingMethod, distance) {
  let deliveryDays;
  if (shippingMethod === 'standard') {
    deliveryDays = Math.ceil(distance / 50); // 1 day per 50 kms
  } else if (shippingMethod === 'express') {
    deliveryDays = Math.ceil(distance / 100); // 1 day per 100 kms.
  } else {
    throw new Error('invalid shipping method');
  }
  return deliveryDays;
}

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(deliveryTime(shippingMethod, distance).toString());
});

//  Calculate the shipping cost based on weight and distance

/*  Create an endpoint that takes weight and distance as query parameters and returns the shipping cost of the packages.

Write an Express code snippet.

Declare an endpoint /shipping-cost using the get keyword.

Declare 2 variables weight and distance as inputs.

Parse the weight and distance input as float to calculate the price based on the distance.

Return the result as a string.

Note: The formula to calculate shipping cost would be:

weight * distance * 0.1 where weight is 2 kgs.

API Call: <http://localhost:3000/shipping-cost?weight=2&distance=600>

Expected Output: 120  */

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1; // where weight is 2 kgs
  res.send(shippingCost.toString());
});

//   Calculate loyalty points earned from a purchase

/*  Create an endpoint that takes purchaseAmount as query parameters and returns the loyalty points.

Write an Express code snippet.

Declare an endpoint /loyalty-points using the get keyword.

Declare a variable purchaseAmount as an input.

Parse the purchaseAmount input as float to calculate the loyalty points based on the purchase amount.

Return the result as a string.

API Call: <http://localhost:3000/loyalty-points?purchaseAmount=3600>

Expected Output: 7200 */

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyalityPoints = purchaseAmount * loyaltyRate;
  res.send(loyalityPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
