function myFunction(){
    document.getElementById("links").classList.add('show');
}


window.onclick = function(e) {

    if (!e.target.matches('.icon'))
    {
        var dropdown = document.getElementById("links");
        if (dropdown.classList.contains('show'))
        {
            dropdown.classList.remove('show');
        }
    }  

}

var sIndex = 1;

sSlides(sIndex);

function movePics(x)
{
    sSlides(sIndex += x);
}

function currentPic(x)
{
    sSlides(sIndex = x);
}

function sSlides(x)
{
    var i;
    var pics = document.getElementsByClassName("reviews");

    if (x > pics.length)
    {
        sIndex = 1
    }

    if (x < 1)
    {
        sIndex = pics.length
    }

    for (i = 0; i < pics.length; i++)
    {
        pics[i].style.display = "none";
    }

    pics[sIndex-1].style.display = "block";
}

function formAlert(){
    var fname = document.getElementById("fname").value; 
    var email = document.getElementById("email").value;
    if(email == "")
    {
        alert("Please enter a vaild email address");
    }
    else{
    alert("Thank you " + fname + "look in E-mail for instructions");
    }
}
