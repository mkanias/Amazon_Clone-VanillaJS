class Cart {
    cartItems;
    currTimeOuts = {};
    localStorageKey;

    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
      
        if (!this.cartItems) {
            this.cartItems = [{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: '1'
            }, {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: '2'
            }];
        }
    }

    saveToStoreage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId) {
        let matchingItem;
      
          this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
              matchingItem = cartItem;
            }
          });
    
          const productQuantity = Number(document.querySelector(
            `.js-quantity-selector-${productId}`).value);
    
          if (matchingItem) {
            matchingItem.quantity += productQuantity;
      
          } else {
            this.cartItems.push({
              productId: productId,
              quantity: productQuantity,
              deliveryOptionId: '1'
            })
          }
    
          this.addedToCartAnimation(productId);
          
          this.saveToStoreage();
    }

    addedToCartAnimation(productId) {
        const addedToCartMsg = document.querySelector(`.js-added-to-cart-${productId}`);
        addedToCartMsg.classList.add('added-to-cart-animation');

        if (this.currTimeOuts[productId]) {
        clearTimeout(currTimeOuts[productId]);
        }

        this.currTimeOuts[productId] = setTimeout(() => {
        addedToCartMsg.classList.remove('added-to-cart-animation');
        delete currTimeOuts[productId];
        }, 2000);
    }

    removeFromCart(productId) {
        const newCart = [];
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });
    
        this.cartItems = newCart;
    
        this.saveToStoreage();
    }

    calculateCartQuantity() {
        let cartQuantity = 0;
    
        this.cartItems.forEach((cartItem) => {
          cartQuantity += cartItem.quantity
        });
    
        return cartQuantity;
    }
    
    updateQuantity(productId, newQuantity) {
        this.cartItems.forEach((cartItem) => {
          if (cartItem.productId === productId) {
              cartItem.quantity = newQuantity;
          }
      });
      this.saveToStoreage();
    }
    
    
    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
      
        this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });
    
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStoreage();
    }     
};


const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');



console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);
