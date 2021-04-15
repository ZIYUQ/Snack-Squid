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
    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null){
        if (cartItems[product.name] == undefined){
            cartItems = {
                ...cartItems,
                [product.name]: product
            }
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

function removeCartNumber(){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers > 1){
        localStorage.setItem('cartNumbers', productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers;
    } else {
        localStorage.setItem('cartNumbers', 0);
        document.querySelector('.cart span').textContent = 0;
    }
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function totalCost(){

}

//
for (let i=0; i < addCarts.length; i++){
    addCarts[i].addEventListener('click', () => {
        addCartNumber(products[i]);
        onLoadCartNumbers();
        totalCost(product[i]);
    })
}

for (let i=0; i < removeCarts.length; i++){
    removeCarts[i].addEventListener('click', () => {
        removeCartNumber();
        onLoadCartNumbers();
    })
}

onLoadCartNumbers();

