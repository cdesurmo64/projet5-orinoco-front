/**
 * To listen to events on elements dynamically created by JS
 */


// To refresh the page
const refreshPage = () => {
    location.reload();
};

document.addEventListener('click', function (event) {

    // To execute refreshPage when the refresh button is clicked
    if(event.target && event.target.id === 'refresh-btn'){
        refreshPage();
    }


});
