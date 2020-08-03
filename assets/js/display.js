/**
 * When the request did not went as excepted :
 * target the .error-row element (which is present in both product.html & index.html)
 * and inject the following HTML structure inside
 * to show that there was an error during communication with the API,
 * and ask the visitor to refresh the page thanks to the newly created button
 */
const displayApiError = function () {
    const errorRow = document.querySelector('.error-row');

    errorRow.innerHTML =
        '    <div class="bear-form-wrapper error-wrapper">\n' +
        '        <h1 class="api-error-msg">Oups, une erreur est survenue.<br> Essayez de rafraichir la page svp ❤</h1>\n' +
        '        <img src="assets/images/teddy-bear-head-down.png" alt="Ours en peluche renversé la tête en bas" class="api-error-img">\n' +
        '        <button id="refresh-btn" type="button" aria-label="Bouton pour rafraîchir la page" class="refresh-button"></button>\n' +
        '    </div>';
};



/**
 * Create a new item wrapper and display the info of one teddy as an item card inside
 */
const displayTeddyInfo = function (teddy) {
    const itemListContainer = document.getElementById('item-list-container');
    const newItemWrapper = document.createElement('div');

    itemListContainer.appendChild(newItemWrapper);
    newItemWrapper.classList.add('col-12', 'col-lg-8', 'my-5', 'mx-lg-auto');

    newItemWrapper.innerHTML =
        '                            <article class=\"card bg-white shadow\">' +
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
        '                                       </div>' +
        '                                    </div>' +
        '                                    <a class=\"btn btn-primary btn-select\" href="product.html?_id=' + teddy._id +'">' +
        '                                    Découvrir ' + teddy.name + '<span class=\"beating-heart-icon heart-icon-love-pink\"></span>' +
        '                                    </a>' +
        '                                </div>' +
        '                            </article>';
};



/**
 * Create a new product wrapper and display all the info of one product (= 1 teddy) as an item card inside
 */
const displayProductInfo = function (product) {
    const productContainer = document.getElementById('product-container');
    const newProductWrapper = document.createElement('div');

    productContainer.appendChild(newProductWrapper);
    newProductWrapper.classList.add('col-12', 'col-lg-10', 'my-5', 'mx-lg-auto');

    newProductWrapper.innerHTML =
        '                            <article class=\"card bg-white shadow\">' +
        '                                <div class=\"card-body\">' +
        '                                    <div class=\"card-image product-image\">' +
        '                                       <img id=\"product-image\" src=\"' + product.imageUrl + '\" alt=\"Photographie du teddy bear\">' +
        '                                    </div>' +
        '                                    <div class=\"product-info\">' +
        '                                       <h1 id=\"product-name\" class=\"card-title product-name\">' +
        product.name +
        '                                       </h1>' +
        '                                       <div class=\"card-text\">' +
        '                                           <div class=\"product-reference\">' +
        '                                               (Réf. <span id=\"product-id\">' + product._id + '</span>)' +
        '                                           </div>' +
        '                                           <p class=\"product-description\">' +
        product.description +
        '                                           </p>' +
        '                                           <div class=\"product-price\">' +
        '                                               Prix : <span id=\"product-price\" class=\"product-price__number\">' + product.price + '</span>  €' +
        '                                           </div>' +
        '                                       </div>' +
        '                                    </div>' +
        '                                </div>' +
        '                            </article>';


    productPrice = document.getElementById('product-price');
    productName = document.getElementById('product-name');
    productId = document.getElementById('product-id');
    let productImage = document.getElementById('product-image');
    productImageUrl = productImage.getAttribute('src');
};



/**
 * Create a customisation form and display all the possible color customisation choices as a select box inside
 * and another form group to chose the wanted product quantity
 */
const displayCustomisationMenu = function (product) {
    const productContainer = document.querySelector('.product-info .card-text');

    const customisationForm = document.createElement('form');
    productContainer.appendChild(customisationForm);
    customisationForm.classList.add('customisation-form');
    customisationForm.setAttribute('method', 'get');

    customisationForm.innerHTML =
        '        <p class="customisation-form-title">Personnalisez votre commande</p>' +
        '        <div class="form-group color-form">' +
        '           <label class="color-form-label col-12 col-md-3" for="color-choices">Choisissez sa couleur :</label>' +
        '           <select class="form-control col-7 col-md-3" id="color-choices" required>' +
        '                <option value="" selected disabled>- couleur -</option>' +
        '           </select>' +
        '        </div>' +
        '        <div class="form-group quantity-form">' +
        '           <label class="quantity-form-label col-12 col-md-3" for="quantity-choices">Quantité :</label>' +
        '           <input type="number" id="quantity-choices" class="form-control col-7 col-md-3" value="1" min="1" max="10" step="1" required>' +
        '        </div>' +
        '           <input type="hidden" name="_id" value="' + product._id + '">' +
        '        <button id="btn-add-cart" class="btn btn-primary btn-add-cart btn-fireworks" type="submit" aria-label="Bouton pour ajouter le teddy au panier">Adopter ' + product.name + '<span class="add-to-cart-icon"></span></button>';



    for (let color of product.colors)
    {
        const colorCustomisationSelect = document.getElementById('color-choices');

        const colorCustomisationOption = document.createElement('option');
        colorCustomisationSelect.appendChild(colorCustomisationOption);
        colorCustomisationOption.setAttribute('value', color);
        colorCustomisationOption.textContent = color;
    }

    productQuantity = document.getElementById('quantity-choices');
    productColor = document.getElementById('color-choices');
};




/**
 * Get the quantities of teddies added in the cart from the localStorage
 * Sum all these quantities to have the total number of teddies in the cart
 * and display it on the cart icon.
 */
const displayNumberArticlesCartIcon = function () {
    const numberArticlesCartIcon = document.getElementById('cart-icon-nb-articles');
    const teddiesInCart = JSON.parse(localStorage.getItem('cart'));
    let nbTeddiesInCart = 0;

    if (teddiesInCart) {
        for (let teddyInCart of teddiesInCart)
        {
            nbTeddiesInCart += Number(teddyInCart.quantity);
        }
        numberArticlesCartIcon.textContent = nbTeddiesInCart;
    }
};

// To execute displayNumberArticlesCartIcon() when DOM content is loaded (because it uses DOM elements)
document.addEventListener('DOMContentLoaded', function (event) {
    displayNumberArticlesCartIcon();
});



/**
 * Display important information about one ordered item (i.e. one teddy of one color) in a cart page table row.
 */
const displayCartItemInformation = function (itemInCart) {

    const cartTableContent = document.getElementById('cart-table-content');
    const cartTableContentOneItemRow = document.createElement('tr');
    cartTableContent.appendChild(cartTableContentOneItemRow);
    cartTableContentOneItemRow.classList.add('cart-table-item-row');

    const itemInCartFullPrice = itemInCart.price * itemInCart.quantity;

    cartTableContentOneItemRow.innerHTML =
        '        <td>' +
        '           <a href="product.html?_id=' + itemInCart._id +'">' +
        '               <div class="cart-item-img-name-cell">' +
        '                   <div class="cart-item-img-wrapper">' +
        '                       <img class="cart-item-img" src=\"' + itemInCart.imageUrl + '\" alt=\"Photographie du teddy bear se trouvant dans le panier\">' +
        '                   </div>' +
        '                   <div class="cart-item-name-wrapper">' +
        '                       <h2 class="cart-item-name">' + itemInCart.name + '</h2>' +
        '                   </div>' +
        '               </div>' +
        '           </a>' +
        '        </td>' +
        '        <td class="cart-item-color">' + itemInCart.color + '</td>' +
        '        <td class="cart-item-unitary-price">' + itemInCart.price + '</td>' +
        '        <td class="cart-item-quantity">' + itemInCart.quantity + '</td>' +
        '        <td class="cart-item-full-price">' + itemInCartFullPrice + '</td>'
};


/**
 * Display a message saying that the cart is empty in a cell in a new row of the cart table
 */
const displayEmptyCartMessage = function () {

    const cartTableContent = document.getElementById('cart-table-content');

    const cartTableContentEmptyCartRow = document.createElement('tr');
    cartTableContent.appendChild(cartTableContentEmptyCartRow);

    const cartTableContentEmptyCartCell = document.createElement('td');
    cartTableContentEmptyCartRow.appendChild(cartTableContentEmptyCartCell);
    cartTableContentEmptyCartCell.classList.add('cart-table-empty-msg-cell');
    cartTableContentEmptyCartCell.setAttribute('colspan', '5');
    cartTableContentEmptyCartCell.textContent = 'Votre panier est actuellement vide ☹';
};

