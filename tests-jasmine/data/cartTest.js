import { addToCart, cart, loadFromStorage } from '../../data/cart.js';

describe('Test suite: addToCart', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'; 
    beforeEach(() => {
        document.querySelector('.js-test-container-2').innerHTML = `
            <select class="js-quantity-selector-${productId1}">
              <option selected value="1">1</option>
            </select>
            <div class="js-added-to-cart-${productId1}"></div>
        `;
    })

    it('Adds an existing product to the cart', () => {
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

        addToCart(productId1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual(productId1);
        expect(cart[0].quantity).toEqual(2);
    });

    it('Adds a new product to the cart', () => {
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();

        addToCart(productId1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual(productId1);
        expect(cart[0].quantity).toEqual(1);
    });
});