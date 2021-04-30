let addCarts = document.querySelectorAll('.addCart');
let removeCarts = document.querySelectorAll('.removeCart');
let foodSelectors = document.querySelectorAll('.food_price');
let cartSelector = document.querySelector('.cartbutton')

let foods = []
for (let i = 0; i < foodSelectors.length; i++) {
    let food_name = foodSelectors[i].id;
    let food_price = parseInt(foodSelectors[i].innerHTML.charAt(1));
    let food = {
        food_name: food_name,
        price: food_price,
        quantity: 0
    }
    foods.push(food)

}

cartNumbers = localStorage.getItem('cartNumbers');
if (cartNumbers == undefined){
    document.getElementById("basket_span").innerHTML = 0;
}
else {
    cartNumbers = parseInt(cartNumbers)
    document.getElementById("basket_span").innerHTML = cartNumbers;
}


// food quantity + 1 in localStorage
function setAddItems(food){
    let cart = localStorage.getItem('inCart');
    cart = JSON.parse(cart);
    if (cart != null){
        let flag = 0;
        for (let i=0; i < cart.length; i++){
            if (cart[i]["food_name"] == food.food_name){
                cart[i]["quantity"] += 1;
                flag = 1;
            }
        }
        if (flag == 0){
            food.quantity = 1;
            cart.push(food)
        }
    } else{
        food.quantity = 1;
        cart = [
            food
        ]
    }
    localStorage.setItem("inCart", JSON.stringify(cart));
}

// food quantity - 1 in localStorage
function setRemoveItems(food){
    let cart = localStorage.getItem('inCart');
    cart = JSON.parse(cart);
    for (let i=0; i < cart.length; i++){
        if (cart[i]["food_name"] == food.food_name){
            if (cart != null) {
                if (cart[i]["quantity"] > 0) {
                    cart[i]["quantity"] -= 1;
                }
            }
            if (cart[i]["quantity"] == 0){
                cart.splice(i, 1);
                //delete cart[i];
            }
        }
    }

    localStorage.setItem("inCart", JSON.stringify(cart));
}

function updateCartNumbers(){
    let cart = localStorage.getItem('inCart');
    cart = JSON.parse(cart);
    let cartNumbers = 0
    for (let i=0; i < cart.length; i++){
        cartNumbers += cart[i].quantity;
    }
    localStorage.setItem('cartNumbers', cartNumbers);
    document.getElementById("basket_span").innerHTML = cartNumbers;
}

function updateTotalCost(){
    let cart = localStorage.getItem('inCart');
    cart = JSON.parse(cart);
    let cartCost = 0;
    for (let i=0; i < cart.length; i++){
        let cost = cart[i].price * cart[i].quantity;
        cartCost += cost;
    }
    localStorage.setItem('cartCost', cartCost);
}

// when "+" is clicked, do everything required
for (let i=0; i < addCarts.length; i++){
    addCarts[i].addEventListener('click', () => {
        setAddItems(foods[i])
        updateCartNumbers();
        updateTotalCost();
        displayCart();
    })
}

// when "-" is clicked, do everything required
for (let i=0; i < removeCarts.length; i++){
    removeCarts[i].addEventListener('click', () => {
        setRemoveItems(foods[i]);
        updateCartNumbers();
        updateTotalCost();
        displayCart();
    })
}

// display cart
function displayCart(){
    let cart = localStorage.getItem("inCart");
    cart = JSON.parse(cart);
    let foodContainer = document.querySelector(".products-container");
    let cartCost = localStorage.getItem('totalCost');

    if (cart && foodContainer){
        foodContainer.innerHTML = '';
        Object.values(cart).map(item => {
            foodContainer.innerHTML += `
                <div class="food">
                    <ion-icon name="close-circle"></ion-icon>
                    <span>${item.food_name}</span>
                </div>
                <div class="price">${item.price},00</div>
                <div class="quantity">
                <ion-icon class="decrease"
                name="arrow-dropright-circle"></ion-icon>
                </div>
                <div class="total">
                    $${item.price * item.quantity},00
                </div>
                `;
            
        });
        // <img src="../images/${item.food_name}.jpg">


        foodContainer.innerHTML += `
            <div class="bassketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    $${localStorage.getItem('cartCost')},00
                </h4>
        `;
    }
}

function placeOrder(){
    let cart = localStorage.getItem('inCart');
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: cart
    };
    // fetch('/menu', options);
    fetch('/menu/van=van_name', options);
    localStorage.removeItem('inCart');
    localStorage.removeItem('totalCost');
    localStorage.removeItem('cartNumbers');
}

function on() {
    document.getElementById("overlay").style.display = "block";
}