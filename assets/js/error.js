/**
 * To reload the content of the page when the refresh button on the error message is clicked
 */


// To refresh the page
const refreshPage = () => {
    location.reload();
};


// To listen to events on the element refresh-btn, which is dynamically created by JS
document.addEventListener('click', function (event) {

    if (event.target && event.target.id === 'refresh-btn') {
        refreshPage();
    }
});
