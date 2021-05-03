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

function remainingTime(time) {
    console.log(time)
    // Set the date we're counting down to
    var countDownDate = new Date(time).getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = now - countDownDate;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
        document.getElementById("time").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("time").innerHTML = "20% off";
        }
    }, 1000);
    
    
}
