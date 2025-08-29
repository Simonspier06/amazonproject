import {cart,removefromCart, updateDeliveryOption} from '../../data/cart.js'; 
import {products,getproduct} from '../../data/products.js';
import { formatCurrenty } from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions,getdeliveryoption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './PaymentSummary.js';





export function renderOrderSummery(){

let CartSummaryHTML='';

cart.forEach((CartItem) => {
  const productId=CartItem.productId;
  const matchingproduct=getproduct(productId);
const deliveryOptionId=CartItem.deliveryOptionId;
const deliveryOption=getdeliveryoption(deliveryOptionId); 
const today= dayjs();
    const deliveryDate=today.add(deliveryOption.deliveryDays,'days');
    const datestring=deliveryDate.format('dddd,MMMM D');



  CartSummaryHTML+=
  `
<div class="cart-item-container 
js-cart-item-container-${matchingproduct.id}">
  <div class="delivery-date">
    Delivery date: ${datestring}
  </div>

  <div class="cart-item-details-grid">
    <img class="product-image"
      src="${matchingproduct.image}">

    <div class="cart-item-details">
      <div class="product-name">
        ${matchingproduct.name}
      </div>
      <div class="product-price">
       $${formatCurrenty(matchingproduct.priceCents)}
      </div>
      <div class="product-quantity">
        <span>
          Quantity: <span class="quantity-label">${CartItem.quantity}</span>
        </span>
        <span class="update-quantity-link link-primary">
          Update
        </span>
        <span class="delete-quantity-link link-primary
         js-delete-link " data-product-id="${matchingproduct.id}">
          Delete
        </span>
      </div>
    </div>

    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
     ${deliveryOptionsHTML(matchingproduct,CartItem)}
    </div>
  </div>
</div>
  `
});

function deliveryOptionsHTML(matchingproduct,CartItem)
{
  let html=' ';
  deliveryOptions.forEach((deliveryOption)=>{

    const today= dayjs();
    const deliveryDate=today.add(deliveryOption.deliveryDays,'days');
    const datestring=deliveryDate.format('dddd,MMMM D');
    const priceString=deliveryOption.priceCents===0?'Free':`$${formatCurrenty(deliveryOption.priceCents)} -`;

    const isChecked=Number(deliveryOption.id) ===Number(CartItem.deliveryOptionId);
    
    html+=
    `
    <div class="delivery-option js-delivery-option"
     data-product-id= "${matchingproduct.id}"
     data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked?'checked':''}
        
          class="delivery-option-input"
          name="delivery-option-${matchingproduct.id}">
        <div>
          <div class="delivery-option-date">
            ${datestring}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `

  })
  return html;

}
document.querySelector('.js-order-summary').innerHTML=CartSummaryHTML;
document.querySelectorAll('.js-delete-link')
.forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId=link.dataset.productId;
    removefromCart(productId);
    let container=document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();

    renderPaymentSummary();
    

  });
});


document.querySelectorAll('.js-delivery-option')
.forEach((element)=>{
  element.addEventListener('click',()=>{
    const {productId,deliveryOptionId}=element.dataset;
    updateDeliveryOption(productId,deliveryOptionId);
    renderOrderSummery();
    renderPaymentSummary();
  });
});
}
renderOrderSummery();