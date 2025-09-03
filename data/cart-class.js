class Cart {

  cartItem;
  localStorageKey;

  constructor(localStorageKey){
this.localStorageKey=localStorageKey;
 this.loadFromStorage();
  }

  loadFromStorage() {
this.cartItem=JSON.parse(localStorage.getItem(this.localStorageKey))
  ||
 [{
  productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity:2,
  deliveryOptionId:'1'
 },{
  productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity:1,
  deliveryOptionId:'2'
 }];
 }

   SavetoStorage(){
  localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItem));
 }

  AddToCart(productId)
 {
   let matchingItem;
     this.cartItem.forEach((CartItem)=>{
       if(productId===CartItem.productId)
       {
         matchingItem=CartItem;
       }
     });
     if(matchingItem){
       matchingItem.quantity+=1;
     }else{
  this.cartItem.push({
       productId:productId,
       quantity:1,
       deliveryOptionId:'1'
     });
     }
     this.SavetoStorage();
 }

 removefromCart(productId){
  const NewCart=[];
  this.cartItem.forEach((cartItem)=>{
    if(cartItem.productId !== productId)
    {
      NewCart.push(cartItem);
    }
  });
  this.cartItem=NewCart;
  this.SavetoStorage();
 }

  updateDeliveryOption(productId,deliveryOptionId) {

   let matchingItem;
     this.cartItem.forEach((CartItem)=>{
       if(productId===CartItem.productId)
       {
         matchingItem=CartItem;

       }
     });

     matchingItem.deliveryOptionId=deliveryOptionId;
     this.SavetoStorage();
 }




  

}


const cart= new Cart('cart-oop');
const businessCart= new Cart('cart-business'); 


console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);














  
