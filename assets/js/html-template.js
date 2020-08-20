// FUNCTION WHICH CREATE HTML ELEMENTS CALLED IN VARIOUS PLACES

/**
 * Creates a button to go back to the home page
 */

const createBackToHomeButton = function () {

    const backHomeButtonWrapper = document.createElement('div');
    backHomeButtonWrapper.classList.add('home-page-button-wrapper');
    backHomeButtonWrapper.innerHTML = '<a id="btn-back-home" class="btn-common btn-inverted-colors" href="index.html">Revoir les teddies<span class="teddy-bear-head-icon"></span></a>\n';

    return backHomeButtonWrapper;
};

