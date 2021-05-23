var register = function(Handlebars) {
    var helpers = { 
        isExpired: function (updateTime, timeLimit) { 
            let now = new Date();
            let updatetime = new Date(updateTime);
            let timeStamp = parseInt(timeLimit);
            let dist = now - updatetime;
            if ((dist / 1000) / 60 > timeStamp) {
                return false;
            }
            return true;
        },
    };
  
    if (Handlebars && typeof Handlebars.registerHelper === "function") {
      // register helpers
      // for each helper defined above (we have only one, listfood)
      for (var prop in helpers) {
          // we register helper using the registerHelper method
          Handlebars.registerHelper(prop, helpers[prop]);
      }
    } else {
        // just return helpers object if we can't register helpers here
        return helpers;
    }
  
  };

// Handlebars.registerHelper("isExpired", function(updateTime){
//     let now = new Date();
//     let updatetime = new Date(updateTime);
//     let timeStamp = parseInt(document.getElementById("discountTime").innerHTML);
//     console.log(updateTime);
//     console.log(timeStamp);

//     let dist = now - updatetime;
//     if ((dist / 1000) / 60 > timeStamp) {
//         return false;
//     }
//     return true;
// })

  

  // export helpers to be used in our express app
  module.exports.register = register;
  module.exports.helpers = register(null);
