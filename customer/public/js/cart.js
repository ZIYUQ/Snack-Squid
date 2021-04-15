let addCarts = document.querySelectorAll('.addCart');
let removeCarts = document.querySelectorAll('.removeCart');

let products = [
    {
        name: "Product A",
        price: 100,
        inCart: 0
    },
    {
        name: "Product B",
        price: 50,
        inCart: 0
    }
]

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

function setAddItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null){
        if (cartItems[product.name] == undefined){
            cartItems = {
                ...cartItems,
                [product.name]: product
            }
            cartItems[product.name].inCart = 0;
        }
        cartItems[product.name].inCart += 1;
    } else{
        product.inCart = 1;
        cartItems = {
            [product.name]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function subCartNumber(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (cartItems[product.name].inCart >= 1){
        localStorage.setItem('cartNumbers', productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers;
    } else {
        localStorage.setItem('cartNumbers', 0);
        document.querySelector('.cart span').textContent = 0;
    }
    setRemoveItems(product);
}

function deleteItem(input, key) {
    delete input[key];
    return input
}

function setRemoveItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.name].inCart > 0) {
            cartItems[product.name].inCart -= 1;
        }
    }
    if (cartItems[product.name].inCart == 0){
        cartItems = deleteItem(cartItems, product.name);
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
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

//
for (let i=0; i < addCarts.length; i++){
    addCarts[i].addEventListener('click', () => {
        addCartNumber(products[i]);
        onLoadCartNumbers();
        addTotalCost(products[i]);
    })
}

for (let i=0; i < removeCarts.length; i++){
    removeCarts[i].addEventListener('click', () => {
        subCartNumber(products[i]);
        onLoadCartNumbers();
        subTotalCost(products[i]);
    })
}

onLoadCartNumbers();

