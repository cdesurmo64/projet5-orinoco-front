// To add dynamically the inner HTML structure of the first item card and add the informations of the 1st teddy bear

document.addEventListener('DOMContentLoaded', function (event) {

    const itemListContainer = document.getElementById('item-list-container');

    let askItemsInfo = new XMLHttpRequest();

    askItemsInfo.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let response = JSON.parse(this.responseText);

            itemListContainer.innerHTML = " <div class=\"col col-lg-8 my-5 mx-lg-auto\">\n" +
                "                            <div class=\"card bg-white shadow\">\n" +
                "                                <div class=\"card-body\">\n" +
                "                                    <div class=\"card-image item-image\">\n" +
                "                                       <img src='" + response.imageUrl + "'>" +
                "                                    </div>\n" +
                "\n" +
                "                                    <h3 class=\"card-title item-name\">\n" +
                                                         response.name +
                "                                    </h3>\n" +
                "\n" +
                "                                    <div class=\"card-text\">\n" +
                "                                        <p class=\"item-description\">\n" +
                                                            response.description +
                "                                        </p>\n" +
                "                                        <div class=\"item-price\">\n" +
                "                                            Prix: <span class=\"item-price__number\">"+ response.price + " €</span>\n" +
                "                                        </div>\n" +
                "                                    </div>\n" +
                "                                </div>\n" +
                "                            </div>\n" +
                "                        </div>"
        }
        else {
            // Todo : Handle error here
            // console.log('ststus', this.status);
            // console.log('readyState', this.readyState);
        }
    };

    askItemsInfo.open('GET', 'http://localhost:3000/api/teddies/5be9c8541c9d440000665243');
    askItemsInfo.send();
});



