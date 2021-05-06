
// Update the count down every 1 second
let x = setInterval(function() {

    // get required section
    let orderTables = document.getElementsByClassName("orderTable")
    for (let i=0; i < orderTables.length; i++){
        let tds = orderTables[i].getElementsByTagName("td")
        let timeStamp;
        let orderTime;
        let timeRemaining;
        
        for (let j=0; j < tds.length; j++){
            if (tds[j].className == "dicountTime"){
                timeStamp = parseInt(tds[j].innerHTML)
            }
            if (tds[j].className == "orderTime"){
                orderTime = new Date(tds[j].innerHTML)
            }
            if (tds[j].className == "timeRemaining"){
                timeRemaining = tds[j]
            }
        }
        let countDownDate =  new Date(orderTime.getTime() + timeStamp * 60 * 1000)

        // Get today's date and time
        let now = new Date().getTime();


        // Find the distance between now and the count down date
        let distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="timeRemaining"
        timeRemaining.innerHTML = minutes + "m " + seconds + "s ";

        // If the count down is over, write some text
        if (distance < 0) {
            timeRemaining.innerHTML = "20% off award";
        }
    }

}, 1000);

// list order food details of outstanding orders
let orderDetail = document.getElementsByClassName("orderTable")

for (let i=0; i < orderDetail.length; i++){
    console.log(orderDetail.length)
    let tds = orderDetail[i].getElementsByTagName("td");
    let foods;
    let details;
    
    for (let j=0; j < tds.length; j++){
        if (tds[j].className == "detail"){
            foods = JSON.parse(tds[j].innerHTML);
            console.log(foods);
            details = tds[j];
        } 
    }
    details.innerHTML = ``;
    for (let j=0; j<foods.length; j++){
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

// list order food details of fulfilled orders
let completedOrderDetail = document.getElementsByClassName("completedTable")

for (let i=0; i < completedOrderDetail.length; i++){
    console.log(completedOrderDetail.length)
    let tds = completedOrderDetail[i].getElementsByTagName("td");
    let foods;
    let details;
    
    for (let j=0; j < tds.length; j++){
        if (tds[j].className == "detail"){
            foods = JSON.parse(tds[j].innerHTML);
            console.log(foods);
            details = tds[j];
        } 
    }
    details.innerHTML = ``;
    for (let j=0; j<foods.length; j++){
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