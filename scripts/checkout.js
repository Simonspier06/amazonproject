import { renderOrderSummary } from "./checkout/OrderSummary.js";
import { renderPaymentSummary } from "./checkout/PaymentSummary.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js';
import { loadProducts } from "../data/products.js";

loadProducts(()=>{
renderOrderSummary();
renderPaymentSummary();
});
