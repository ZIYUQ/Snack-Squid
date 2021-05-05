// function showDetails(foods) {
//     // var template = Handlebars.compile(
//     //     "<ul> \
//     //         <li><b>Item</b>:{{this.name}}</li> \
//     //     </ul> ");
//     alert(foods)


//     var detail = '';
//     for (i = 0; i < foods.length; i++) {
//         detail += JSON.stringify(foods[i])
//     };

//     document.getElementById("details").innerHTML = detail;
// }

// Set the date we're counting down to
// let countDownDate = new Date("Jan 5, 2022 15:37:25").getTime();

// Update the count down every 1 second
let x = setInterval(function() {

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

        // Output the result in an element with id="demo"
        timeRemaining.innerHTML = minutes + "m " + seconds + "s ";

        // If the count down is over, write some text
        if (distance < 0) {
            timeRemaining.innerHTML = "20% off award";
        }
    }

}, 1000);
