/**
 * To request info on every teddy in the API, and display the received info on an item card for each teddy
 * or display an error message and a refresh button when the API send nothing
 */

document.addEventListener('DOMContentLoaded', function (event) {

    const itemListContainer = document.getElementById('item-list-container');

    let askItemsInfo = new XMLHttpRequest();

    askItemsInfo.onreadystatechange = function () {

        if (this.readyState === XMLHttpRequest.DONE) {

            if (this.status === 200) {

                // When the request is successful :
                // dynamically add a new item wrapper for each object (= each teddy) sent by the API
                // and add the HTML structure for the item card inside of the wrapper,
                // filled with the teddy information
                let teddies = JSON.parse(this.responseText);

                for (let teddy of teddies)
                {
                    const newItemWrapper = document.createElement('div');
                    itemListContainer.appendChild(newItemWrapper);
                    newItemWrapper.classList.add('col-12', 'col-lg-8', 'my-5', 'mx-lg-auto');

                    newItemWrapper.innerHTML =
                        '                            <div class=\"card bg-white shadow\">' +
                        '                                <div class=\"card-body\">' +
                        '                                    <div class=\"card-image item-image\">' +
                        '                                       <img src=\"' + teddy.imageUrl + '\">' +
                        '                                    </div>' +
                        '                                    <div class=\"item-info\">' +
                        '                                       <h2 class=\"card-title item-name\">' +
                        teddy.name +
                        '                                       </h2>' +
                        '                                       <div class=\"card-text\">' +
                        '                                           <p class=\"item-description\">' +
                        teddy.description +
                        '                                           </p>' +
                        '                                           <div class=\"item-price\">' +
                        '                                               Prix: <span class=\"item-price__number\">' + teddy.price + ' €</span>' +
                        '                                           </div>' +
                        '                                       </div>' +
                        '                                    </div>' +
                        '                                    <a class=\"btn btn-primary btn-select\" role=\"button\">' +
                        '                                    Sélectionner ' + teddy.name + '<span class=\"beating-heart-icon heart-icon-love-pink\"></span>' +
                        '                                    </a>' +
                        '                                </div>' +
                        '                            </div>';
                }
            }

            else {
                // When the request did not went as excepted :
                // reuse and modify the inner structure of the .bear-form-wrapper element
                // to show that there was an error during communication with the API,
                // and ask the visitor to refresh the page thanks to the newly created button
                const errorWrapper = document.querySelector('.bear-form-wrapper');
                errorWrapper.classList.add('error-wrapper');

                const errorMessage = document.querySelector('.bear-form-wrapper h1');
                errorMessage.classList.add('api-error-msg');
                errorMessage.innerHTML = 'Oups, une erreur est survenue.<br> Essayez de rafraichir la page svp ❤';

                const errorImage = document.querySelector('.bear-form-wrapper img');
                errorImage.setAttribute('src', 'assets/images/teddy-bear-head-down.png');
                errorImage.setAttribute('alt', 'Ours en peluche renversé la tête en bas');
                errorImage.classList.add('api-error-img');

                const refreshButton = document.createElement('button');
                errorWrapper.appendChild(refreshButton);
                refreshButton.setAttribute('id', 'refresh-btn');
                refreshButton.setAttribute('type', 'button');
                refreshButton.setAttribute('aria-label', 'Bouton pour rafraîchir la page');
                refreshButton.classList.add('refresh-button');
            }
        }
    };

    askItemsInfo.open('GET', 'http://localhost:3000/api/teddies/');
    askItemsInfo.send();
});



