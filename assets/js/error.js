/**
 * To reload the content of the page when the refresh button on the error message is clicked
 */


// To refresh the page
const refreshPage = () => {
    location.reload();
};


// To execute refreshPage() when the refresh-btn (which is dynamically created by JS) is clicked
document.addEventListener('click', function (event) {

    if (event.target && event.target.id === 'refresh-btn') {
        refreshPage();
    }
});
