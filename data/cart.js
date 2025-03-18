export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
      cart = [{
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

function saveToStoreage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
    let matchingItem;
  
      cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      const productQuantity = Number(document.querySelector(
        `.js-quantity-selector-${productId}`).value);

      if (matchingItem) {
        matchingItem.quantity += productQuantity;
  
      } else {
        cart.push({
          productId: productId,
          quantity: productQuantity,
          deliveryOptionId: '1'
        })
      }

      addedToCartAnimation(productId);
      
      saveToStoreage();
    }
    
let currTimeOuts = {};
function addedToCartAnimation(productId) {
    const addedToCartMsg = document.querySelector(`.js-added-to-cart-${productId}`);
    addedToCartMsg.classList.add('added-to-cart-animation');

    if (currTimeOuts[productId]) {
      clearTimeout(currTimeOuts[productId]);
    }

    currTimeOuts[productId] = setTimeout(() => {
      addedToCartMsg.classList.remove('added-to-cart-animation');
      delete currTimeOuts[productId];
    }, 2000);
}

export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;

    saveToStoreage();
}


export function calculateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity
    });

    return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
    cart.forEach((cartItem) => {
      if (cartItem.productId === productId) {
          cartItem.quantity = newQuantity;
      }
  });
  saveToStoreage();
}


export function updateDeliveryOption(productId, deliveryOptionId) {
	let matchingItem;
  
	cart.forEach((cartItem) => {
	if (productId === cartItem.productId) {
		matchingItem = cartItem;
	  }
	});

	matchingItem.deliveryOptionId = deliveryOptionId;
	saveToStoreage();
}