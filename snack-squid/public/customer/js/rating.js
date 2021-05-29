const widgets = document.querySelectorAll(".star-widget");

for (let i=0; i<widgets.length; i++){
    let widget = widgets[i]
    console.log(widget)
    let btn = widget.querySelector("button");
    let post = widget.querySelector(".ratingPost");
    let editBtn = widget.querySelector(".ratingEdit")
    let rate1 = widget.querySelector("#rate-1")
    let rate2 = widget.querySelector("#rate-2")
    let rate3 = widget.querySelector("#rate-3")
    let rate4 = widget.querySelector("#rate-4")
    let rate5 = widget.querySelector("#rate-5")
    if (rate1.checked){
    }
    btn.onclick = () =>{
        widget.style.display = "none";
        post.style.display = "block"
        return false;
    }
}