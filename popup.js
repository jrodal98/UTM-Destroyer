document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('destroy');
    checkPageButton.addEventListener('click', function() {
        var original_url = document.getElementById('url').value;
        // https://stackoverflow.com/a/5717133/9063770
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        if (pattern.test(original_url)) {
            // https://stackoverflow.com/a/51188719/9063770
            var text = original_url.replace(/(\?)utm[^&]*(?:&utm[^&]*)*&(?=(?!utm[^\s&=]*=)[^\s&=]+=)|\?utm[^&]*(?:&utm[^&]*)*$|&utm[^&]*/gi, '$1');

            if (text == original_url) {
                return;
            }
            const el = document.createElement('textarea');
            el.value = text;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);

            chrome.storage.sync.get({links: {}}, function(data) {
                var getLocation = function(href) {
                    var l = document.createElement("a");
                    l.href = href;
                    return l;
                };

                var hostname = getLocation(text).hostname;

                if (hostname in data.links) {
                    data.links[hostname]++;
                } else {
                    data.links[hostname] = 1;
                }

                chrome.storage.sync.set({links: data.links});

                // temp logging
                var object = data.links;
                var output = '';
                for (var property in object) {
                    output += property + ': ' + object[property]+'; ';
                }
                alert(output);
            });
        } else {
            alert("Invalid URL")
        }
    }, false);
}, false);
