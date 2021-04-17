let addCarts = document.querySelectorAll('.addCart');
let removeCarts = document.querySelectorAll('.removeCart');

let products = [
    {
        food_name: "Product A",
        price: 100,
        quantity: 0
    },
    {
        food_name: "Product B",
        price: 50,
        quantity: 0
    }
]

// increase number for cart icon
function addCartNumber(product){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setAddItems(product);
}

// add item into localStorage
function setAddItems(product){
    let cartItems = localStorage.getItem('inCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null){
        if (cartItems[product.food_name] == undefined){
            cartItems = {
                ...cartItems,
                [product.food_name]: product
            }
            cartItems[product.food_name].quantity = 0;
        }
        cartItems[product.food_name].quantity += 1;
    } else{
        product.quantity = 1;
        cartItems = {
            [product.food_name]: product
        }
    }
    localStorage.setItem("inCart", JSON.stringify(cartItems));
}

// decrease number for cart icon
function subCartNumber(product){
    let cartItems = localStorage.getItem('inCart');
    cartItems = JSON.parse(cartItems);
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (cartItems[product.food_name].quantity >= 1){
        localStorage.setItem('cartNumbers', productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers;
    } else {
        localStorage.setItem('cartNumbers', 0);
        document.querySelector('.cart span').textContent = 0;
    }
    setRemoveItems(product);
}

//
function setRemoveItems(product){
    let cartItems = localStorage.getItem('inCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.food_name].quantity > 0) {
            cartItems[product.food_name].quantity -= 1;
        }
    }
    if (cartItems[product.food_name].quantity == 0){
        delete cartItems[product.food_name];
    }

    localStorage.setItem("inCart", JSON.stringify(cartItems));
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function addTotalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    if (cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }
}

function subTotalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    if (cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost - product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }
}

// when "+" is clicked, do everything required
for (let i=0; i < addCarts.length; i++){
    addCarts[i].addEventListener('click', () => {
        addCartNumber(products[i]);
        onLoadCartNumbers();
        addTotalCost(products[i]);
        displayCart();
    })
}

// when "-" is clicked, do everything required
for (let i=0; i < removeCarts.length; i++){
    removeCarts[i].addEventListener('click', () => {
        subCartNumber(products[i]);
        onLoadCartNumbers();
        subTotalCost(products[i]);
        displayCart();
    })
}


function displayCart(){
    let cartItems = localStorage.getItem("inCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
    console.log(cartItems);

    if (cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
                <div class="product">
                    <ion-icon name="close-circle"></ion-icon>
                    <img src="./images/${item.food_name}.jpg">
                    <span>${item.food_name}</span>
                </div>
                <div class="price">${item.price},00</div>
                <div class=""quantity>
                <ion-icon class="decrease"
                name="arrow-dropright-circle"></ion-icon>
                </div>
                <div class="total">
                    $${item.quantity * item.price},00
                </div>
                `;
            
        });

        productContainer.innerHTML += `
            <div class="bassketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    $${cartCost},00
                </h4>
        `;
    }
}

onLoadCartNumbers();

