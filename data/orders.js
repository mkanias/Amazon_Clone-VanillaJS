export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    orders.unshift(order);
    saveToStoreage();
}

function saveToStoreage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}