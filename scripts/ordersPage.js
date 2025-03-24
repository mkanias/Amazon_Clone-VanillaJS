import { formatDate } from "../data/deliveryOptions.js";
import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

function renderOrderPage() {
    let orderPage = ``;

    loadProductsFetch().then(() => {
        orders.forEach(order => {
            let ordersHTML = ``;
            let productsHTML = ``;

            ordersHTML += `
                <div class="order-container">
                <div class="order-header">
                    <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${formatDate(order.orderTime)}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${formatCurrency(order.totalCostCents)}</div>
                    </div>
                    </div>
        
                    <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${order.id}</div>
                    </div>
                </div>
            `
            const orderProducts = order.products;

            orderProducts.forEach(orderProduct => {

                const product = getProduct(orderProduct.productId);
                console.log(product.name)
    
                productsHTML += `
                <div class="order-details-grid">
                    <div class="product-image-container">
                        <img src="${product.image}">
                    </div>
    
                    <div class="product-details">
                        <div class="product-name">
                        ${product.name}
                        </div>
                        <div class="product-delivery-date">
                        Arriving on: ${formatDate(orderProduct.estimatedDeliveryTime)}
                        </div>
                        <div class="product-quantity">
                        Quantity: ${orderProduct.quantity}
                        </div>
                        <button class="buy-again-button button-primary">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                        </button>
                    </div>
    
                    <div class="product-actions">
                        <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
                        <button class="track-package-button button-secondary">
                            Track package
                        </button>
                        </a>
                    </div>
                </div>
                `     
            });

            orderPage += ordersHTML + productsHTML;

        });
        
        const pageHTML = orderPage ? document.querySelector('.js-orders-grid') : null;

        if (pageHTML) {
            pageHTML.innerHTML = orderPage;}


    });
    
}

renderOrderPage();

