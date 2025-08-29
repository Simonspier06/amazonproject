import { cart } from "../../data/cart.js";
import { getproduct } from "../../data/products.js"; 
import { getdeliveryoption } from "../../data/deliveryOptions.js"; 
import { formatCurrenty } from "../utils/money.js";
export function renderPaymentSummary(){
  let ProductPriceCents=0;
  let shippingPriceCents =0;
cart.forEach((cartItem) => {
  const product =getproduct(cartItem.productId);
  ProductPriceCents+=product.priceCents * cartItem.quantity; 
  
  const deliveryOption=getdeliveryoption(cartItem.deliveryOptionId);
  shippingPriceCents+=deliveryOption.priceCents;
  
});

const totalBeforeTaxCents=ProductPriceCents+shippingPriceCents;
const taxCents=totalBeforeTaxCents*0.1;
const totalCents=taxCents+totalBeforeTaxCents;

const PaymentSummaryHTML=
`
<div class="payment-summary-title">
    Order Summary
</div>

<div class="payment-summary-row">
  <div>Items (3):</div>
  <div class="payment-summary-money">$${formatCurrenty(ProductPriceCents)}</div>
  </div>

   <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
   <div class="payment-summary-money">$${formatCurrenty(shippingPriceCents)}</div>
</div>

<div class="payment-summary-row subtotal-row">
 <div>Total before tax:</div>
  <div class="payment-summary-money">$${formatCurrenty(totalBeforeTaxCents)}</div>
</div>

<div class="payment-summary-row">
 <div>Estimated tax (10%):</div>
  <div class="payment-summary-money">$${formatCurrenty(taxCents)}</div>
</div>

<div class="payment-summary-row total-row">
  <div>Order total:</div>
  <div class="payment-summary-money">$${formatCurrenty(totalCents)}</div>
</div>

<button class="place-order-button button-primary">
  Place your order
</button>

`

document.querySelector('.js-payment-summary').innerHTML=PaymentSummaryHTML;

}