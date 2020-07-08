var keynum = document.addEventListener('keydown', ShowKeyNum);

function ShowKeyNum(keynum)
{
    var stringCode = String.fromCharCode(keynum.keyCode);
    if(keynum.keyCode == 13)
    {
        stringCode = "Enter/Return";
    }
    else if (keynum.keyCode == 32)
    {
        stringCode = "Space";
    }
    else if (keynum.keyCode == 17)
    {
        stringCode = "CTRL";
    }
    else if (keynum.keyCode == 18)
    {
        stringCode = "ALT";
    }
    else if (keynum.keyCode == 8)
    {
        stringCode = "BACKSPACE";
    }
    else if (keynum.keyCode == 9)
    {
        stringCode = "TAB";
    }
    else if (keynum.keyCode == 16)
    {
        stringCode = "SHIFT";
    }
    else if (keynum.keyCode == 16)
    {
        stringCode = "SHIFT";
    }
    else if (keynum.keyCode == 20)
    {
        stringCode = "CAPSLOCK";
    }
    else if (keynum.keyCode == 144)
    {
        stringCode = "NUMLOCK";
    }
    document.getElementById('keynum').innerHTML = keynum.keyCode + "<br>" + stringCode ;
    console.log(keynum.keyCode);
}