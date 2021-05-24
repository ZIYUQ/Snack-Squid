// const { model } = require("mongoose");

// Update the count down every 1 second
let x = setInterval(function () {

    // get required section
    let orderTables = document.getElementsByClassName("orderTable");
    let timeStamp = parseInt(document.getElementById("discountTime").innerHTML);
    let totalPrices = document.getElementsByClassName("totalPrice");
    let discountedPrices = document.getElementsByClassName("discountedPrice");
    for (let i = 0; i < orderTables.length; i++) {
        let tds = orderTables[i].getElementsByTagName("td")
        let orderTime;
        let timeRemaining;
        let orderid;
        let discount;

        for (let j = 0; j < tds.length; j++) {
            if (tds[j].className == "orderid") {
                orderid = tds[j].innerHTML;
            }
            if (tds[j].className == "discount"){
                discount = tds[j];
                discount.innerHTML = (discount.innerHTML.trim) ? discount.innerHTML.trim() : discount.innerHTML.replace(/^\s+/,'');

            }
            if (tds[j].className == "updateTime") {
                orderTime = new Date(tds[j].innerHTML)
            }
            if (tds[j].className == "timeRemaining") {
                timeRemaining = tds[j]
            }
        }
        let countDownDate = new Date(orderTime.getTime() + timeStamp * 60 * 1000)

        // Get today's date and time
        let now = new Date().getTime();


        // Find the distance between now and the count down date
        let distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // If the count down is over, write some text
        if (distance < 0) {
            if (discount.innerHTML == ''){
                timeRemaining.innerHTML = "20% off awarded !";
                let total = totalPrices[i].innerHTML.substring(8, totalPrices[i].innerHTML.length)
                total = Math.round(parseInt(total) * 0.8);
                discountedPrices[i].innerHTML = "Total after discount: $" + total.toString();
            
                document.getElementById('discountOrder'+ String(orderid)).submit();
                discount.innerHTML = 'true';
            }
        } else{
            // Output the result in an element with id="timeRemaining"
            timeRemaining.innerHTML = "Discount in: " + minutes + "m " + seconds + "s ";

        }
    }

}, 1000);

// list order food details of outstanding orders
let orderDetail = document.getElementsByClassName("orderTable")

for (let i = 0; i < orderDetail.length; i++) {
    let tds = orderDetail[i].getElementsByTagName("td");
    let foods;
    let details;

    for (let j = 0; j < tds.length; j++) {
        if (tds[j].className == "detail") {
            foods = JSON.parse(tds[j].innerHTML);
            details = tds[j];
        }
    }
    details.innerHTML = ``;
    for (let j = 0; j < foods.length; j++) {
        details.innerHTML += `
        <tr>
        <td>${foods[j].quantity}</td>
        <td>${foods[j].foodName}</td>
        <br>
        </tr>
        `

    }
}

// list order food details of fulfilled orders
let completedOrderDetail = document.getElementsByClassName("completedTable")

for (let i = 0; i < completedOrderDetail.length; i++) {
    let tds = completedOrderDetail[i].getElementsByTagName("td");
    let foods;
    let details;

    for (let j = 0; j < tds.length; j++) {
        if (tds[j].className == "detail") {
            foods = JSON.parse(tds[j].innerHTML);
            details = tds[j];
        }
    }
    details.innerHTML = ``;
    for (let j = 0; j < foods.length; j++) {
        details.innerHTML += `
        <tr>
        <td>foodname: </td>
        <td>${foods[j].foodName}</td>
        <td>quantity: </td>
        <td>${foods[j].quantity}</td>
        </tr>
        `

    }

}
