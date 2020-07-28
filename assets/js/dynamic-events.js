/**
 * To listen to events on elements dynamically created by JS
 */


// To refresh the page
const refreshPage = () => {
    location.reload();
};

// To execute refreshPage when the refresh button is clicked
document.addEventListener('click', function (event) {

    if (event.target && event.target.id === 'refresh-btn') {
        refreshPage();
    }
});



// To execute addToCart() when the addToCart button is clicked
document.addEventListener('click', function (event) {

    if (event.target && event.target.id === 'btn-add-cart') {
        event.preventDefault(); //to avoid sending it to the server until it's fully functional
        addToCart();
    }
});
