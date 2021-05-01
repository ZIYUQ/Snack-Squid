let addCarts = document.querySelectorAll('.addCart');
let removeCarts = document.querySelectorAll('.removeCart');
let foodSelectors = document.querySelectorAll('.food_price');
let cartSelector = document.querySelector('.cartbutton')

let foods = []
for (let i=0; i < foodSelectors.length; i++){
    let food_name = foodSelectors[i].id;
    let food_price = parseInt(foodSelectors[i].innerHTML.charAt(1));
    food = {
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
    let cartItems = localStorage.getItem('inCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null){
        let flag = 0;
        for (let i=0; i < cartItems.length; i++){
            if (cartItems[i]["food_name"] == food.food_name){
                cartItems[i]["quantity"] += 1;
                flag = 1;
            }
        }
        if (flag == 0){
            food.quantity = 1;
            cartItems.push(food)
        }
    } else{
        food.quantity = 1;
        cartItems = [
            food
        ]
    }
    localStorage.setItem("inCart", JSON.stringify(cartItems));
}

// food quantity - 1 in localStorage
function setRemoveItems(food){
    let cartItems = localStorage.getItem('inCart');
    cartItems = JSON.parse(cartItems);
    for (let i=0; i < cartItems.length; i++){
        if (cartItems[i]["food_name"] == food.food_name){
            if (cartItems != null) {
                if (cartItems[i]["quantity"] > 0) {
                    cartItems[i]["quantity"] -= 1;
                }
            }
            if (cartItems[i]["quantity"] == 0){
                cartItems.splice(i, 1);
                //delete cartItems[i];
            }
        }
    }

    localStorage.setItem("inCart", JSON.stringify(cartItems));
}

function updateCartNumbers(){
    let cartItems = localStorage.getItem('inCart');
    cartItems = JSON.parse(cartItems);
    let cartNumbers = 0
    for (let i=0; i < cartItems.length; i++){
        cartNumbers += cartItems[i].quantity;
    }
    localStorage.setItem('cartNumbers', cartNumbers);
    document.getElementById("basket_span").innerHTML = cartNumbers;
}

function updateTotalCost(){
    let cartItems = localStorage.getItem('inCart');
    cartItems = JSON.parse(cartItems);
    let cartCost = 0;
    for (let i=0; i < cartItems.length; i++){
        let cost = cartItems[i].price * cartItems[i].quantity;
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
    let cartItems = localStorage.getItem("inCart");
    cartItems = JSON.parse(cartItems);
    let foodContainer = document.querySelector(".products-container");
    let cartCost = localStorage.getItem('totalCost');

    if (cartItems && foodContainer){
        foodContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            foodContainer.innerHTML += `
                <div class="overlayfood">
                    <ion-icon name="close-circle"></ion-icon>
                    <span>${item.food_name}</span>
                </div>
                <div class="overlayquantity">${item.quantity}
                    <ion-icon class="decrease" name="arrow-dropright-circle"></ion-icon>
                </div>
                <div class="overlaytotal">
                    $${item.price * item.quantity},00
                </div>
                <div class="line"></div>
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
    let cartItems = localStorage.getItem('inCart');
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: cartItems
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

function off() {
    document.getElementById("overlay").style.display = "none";
}