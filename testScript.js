document.addEventListener('copy', function(e) {
    var t = document.createElement("input");
    document.body.appendChild(t);
    t.focus();
    document.execCommand("paste");
    var clipboardText = t.value; //this is your clipboard data
    alert(clipboardText)
    document.body.removeChild(t);    
},false);