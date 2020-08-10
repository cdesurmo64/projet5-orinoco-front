// FUNCTIONS

/**
 * Displays confirmed order information on the confirmation page
 */
const displayConfirmedOrderInformation = function () {

    const orderResume = JSON.parse(localStorage.getItem('orderResume'));
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
