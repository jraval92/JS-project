function menu(){
    var x = document.getElementById("menu");
    var y = document.getElementById("links");

    if (x.style.display == "block" && y.style.display == "block")
    {
        x.style.display = "none";
        y.style.display = "none";
    }

    else
    {
        x.style.display = "block";
        x.style.width = "500px";
        y.style.display = "block";
        y.style.width = "500px";
    }
}