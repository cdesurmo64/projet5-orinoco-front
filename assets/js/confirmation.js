// FUNCTIONS

/**
 * Gets confirmed order information from three items in the localStorage : 'orderResume', 'orderTotalPrice', 'orderTotalQuantity'
 * and displays these info on the confirmation page
 */
const displayConfirmedOrderInformation = function () {

    // Gets the confirmed order information from the localStorage items
    const orderResume = JSON.parse(localStorage.getItem('orderResume')); // Contains 'products', 'contact' and 'orderId'
    const orderTotalPrice = JSON.parse(localStorage.getItem('orderTotalPrice'));
    const orderTotalQuantity = JSON.parse(localStorage.getItem('orderTotalQuantity'));

    const buyerName = document.getElementById('buyer-name');
    const teddiesNumber = document.getElementById('teddies-number');
    const orderId = document.getElementById('order-id');
    const orderPrice = document.getElementById('order-price');

    buyerName.textContent = orderResume.contact.firstName;
    teddiesNumber.textContent = orderTotalQuantity;
    orderId.textContent = orderResume.orderId;
    orderPrice.textContent = orderTotalPrice;
};





// EVENT LISTENERS

// To execute displayConfirmedOrderInformation() when DOM content is loaded (because it uses DOM elements)
document.addEventListener('DOMContentLoaded', function (event) {
    displayConfirmedOrderInformation();
});
