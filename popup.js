document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('destroy');
    checkPageButton.addEventListener('click', function() {
        var text = document.getElementById('url').value;
        // https://stackoverflow.com/a/5717133/9063770
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        if (pattern.test(text)) {
            alert(text.replace(/(\&)utm([_a-z0-9=]+)/g, ""));
        } else {
            alert("Invalid URL")
        }
    }, false);
}, false);
