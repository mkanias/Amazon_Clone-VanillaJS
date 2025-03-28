export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    orders.length = 0;
    orders.push(order);
    saveToStoreage();
}

function saveToStoreage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

export function findOrder(orderId) {
    return orders.find(order => order.id === orderId) || null;
}