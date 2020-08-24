// FUNCTIONS WHICH ARE USED TO VALIDATE THE ORDER ON THE CART PAGE &
// TO DISPLAY THE CONFIRMED ORDER INFO ON THE CONFIRMATION PAGE

/**
 * To save buyer's contact info in a variable called 'contact'
 */
const saveBuyerContactInfo = function() {

    // Create an object 'contact' containing all the buyer's contact info
    // from the text he entered in the contact form
    const contact = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        email: document.getElementById('email').value,
    };

    return contact;
};


/**
 * To save the ordered products ID in an array called 'products'
 */
const saveOrderedProductsId = function() {

    const products = [];
    const allOrderedProducts = JSON.parse(localStorage.getItem('cart'));

    for (let orderedProduct of allOrderedProducts) {
        products.push(orderedProduct._id);
    }

    return products;
};


/**
 * To submit the order -> If there is a 'cart' in the localStorage :
 *  - Creates the 'data' variable which contains the 'contact' object and the 'products' array
 *  - Tries to post 'data' to the API
 *      -> If the request is successful :
 *          - Stores API answer in the localStorage as 'orderResume' -> it contains the 'contact' object, the 'products' array, and the 'orderID' variable
 *          - Redirects to the confirmation page for this order
 *          - Executes emptyCart() to empty the cart
 *
 *      -> If the communication with the API fails or if the answer does not come with a 200 status code : executes displayApiError()
 *
 * RQ : The button which needs to be clicked to submit the order is only visible
 * when there is something in the cart so no need for an 'else' action.
 */
const submitOrder = async function (event) {

    event.preventDefault(); // To prevent sending the form data and reloading the page
    const allOrderedProducts = JSON.parse(localStorage.getItem('cart'));

    // If there is something in the cart = if there is a 'cart' in the localStorage
    if (allOrderedProducts) {

        let data = {
            contact: saveBuyerContactInfo(), // An object containing all the buyer's contact information
            products: saveOrderedProductsId() // An array containing the IDs of all the ordered items
        };

        try {
            let response = await fetch('http://localhost:3000/api/teddies/order',
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.ok) {
                let orderResume = await response.json();

                localStorage.setItem('orderResume', JSON.stringify(orderResume)); // Stores API answer in the localStorage
                window.location.href = 'confirmation.html?orderId=' + orderResume.orderId; // Redirects to the confirmation page for this order
                emptyCart()
            } else {
                displayApiError();
            }
        }

        catch (e) {
            displayApiError();
        }
    }
};


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

// When DOM content is loaded :
// To execute displayConfirmedOrderInformation() and add the back to home page button in the confirmation page
// OR to execute submitOrder() when the cart page 'contact-form' element is submitted

document.addEventListener('DOMContentLoaded', function (event) {

    const orderId = new URLSearchParams(window.location.search).get('orderId');

    // If we are on the confirmation page (= if there is an 'orderId' in the URL parameters)
    if (orderId) {
        displayConfirmedOrderInformation();

        // To add the back to home page button
        const cardContentWrapper = document.querySelector('.card-content-wrapper .card-text-and-icon');
        cardContentWrapper.appendChild(createBackToHomeButton());
    }
    // If we are on the cart page (= if there is no 'orderId' in the URL parameters)
    else {
        const buyerContactForm = document.getElementById('contact-form');

        buyerContactForm.addEventListener('submit', function (event) {
            submitOrder(event);
        });
    }
});
