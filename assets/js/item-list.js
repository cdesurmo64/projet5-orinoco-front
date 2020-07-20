// To add dynamically a new item wrapper for each object (=each teddy) sent by the API, and add the HTML structure for the item card inside of the wrapper, filled with the information of the teddy

document.addEventListener('DOMContentLoaded', function (event) {

    const itemListContainer = document.getElementById('item-list-container');

    let askItemsInfo = new XMLHttpRequest();

    askItemsInfo.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200)
        {
            let teddies = JSON.parse(this.responseText);

            for (let teddy of teddies)
            {
                const newItemWrapper = document.createElement('div');
                itemListContainer.appendChild(newItemWrapper);
                newItemWrapper.classList.add('col', 'col-lg-8', 'my-5', 'mx-lg-auto');

                newItemWrapper.innerHTML =
                    '                            <div class=\"card bg-white shadow\">' +
                    '                                <div class=\"card-body\">' +
                    '                                    <div class=\"card-image item-image\">' +
                    '                                       <img src="' + teddy.imageUrl + '">' +
                    '                                    </div>' +
                    '                                       <h3 class=\"card-title item-name\">' +
                                                                teddy.name +
                    '                                       </h3>' +
                    '                                    <div class=\"card-text\">' +
                    '                                        <p class=\"item-description\">' +
                                                                teddy.description +
                    '                                        </p>' +
                    '                                        <div class=\"item-price\">' +
                    '                                            Prix: <span class=\"item-price__number\">' + teddy.price + ' €</span>' +
                    '                                        </div>' +
                    '                                    </div>' +
                    '                                </div>' +
                    '                            </div>' +
                    '                        </div>';
            }
        }
        else
            {
                // Todo : Handle error here
                // console.log('ststus', this.status);
                // console.log('readyState', this.readyState);
            }
    };

    askItemsInfo.open('GET', 'http://localhost:3000/api/teddies/');
    askItemsInfo.send();
});



