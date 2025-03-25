import { getProduct, loadProductsFetch } from "../data/products.js";
import { findOrder } from "../data/orders.js";
import { formatDate } from "../data/deliveryOptions.js";


function renderTrackingPage() {
    const mainContainer = document.querySelector('.js-main-container');
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');
    console.log(findOrder(orderId));

    loadProductsFetch().then(() => {
        const order = findOrder(orderId);
        const products = order.products;
        const orderProduct = findProduct(products, productId);
        const generalProduct = getProduct(productId);
        console.log(orderProduct)
        
        const trackingPageHTML = `
            <div class="order-tracking">
                <a class="back-to-orders-link link-primary" href="orders.html">
                View all orders
                </a>
        
                <div class="delivery-date">
                ${formatDate(orderProduct.estimatedDeliveryTime)}
                </div>
        
                <div class="product-info">
                ${generalProduct.name}
                </div>
        
                <div class="product-info">
                Quantity: ${orderProduct.quantity}
                </div>
        
                <img class="product-image" src="${generalProduct.image}">
        
                <div class="progress-labels-container">
                <div class="progress-label">
                    Preparing
                </div>
                <div class="progress-label current-status">
                    Shipped
                </div>
                <div class="progress-label">
                    Delivered
                </div>
                </div>
        
                <div class="progress-bar-container">
                <div class="progress-bar"></div>
                </div>
            </div>
        `
        mainContainer.innerHTML = trackingPageHTML;
    })

}

renderTrackingPage();

function findProduct(products, productId) {
    console.log(products)
    console.log(productId)
    return products.find(product => product.productId === productId) || null;
  }