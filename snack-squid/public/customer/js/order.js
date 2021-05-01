function showDetails(foods){
    // var template = Handlebars.compile(
    //     "<ul> \
    //         <li><b>Item</b>:{{this.name}}</li> \
    //     </ul> ");

    var details = '';
    for (i=0; i<foods.length; i++){
        details += JSON.stringify(foods[i])
    };
    
    document.getElementById("details").innerHTML = JSON.stringify(foods);
}

