document.addEventListener('DOMContentLoaded', function() {
    var destroyButton = document.getElementById('destroy');
    var statsButton = document.getElementById('stats');
    var csvButton = document.getElementById('csv');

    destroyButton.addEventListener('click', function() {
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
            document.getElementById('url').value = "";
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
                var pattern = /^((http|https|ftp):\/\/)/;

                if(!pattern.test(text)) {
                    text = "http://" + text;
                }

                var hostname = (new URL(url)).hostname.replace('www.','');

                if (hostname in data.links) {
                    data.links[hostname]++;
                } else {
                    data.links[hostname] = 1;
                }

                chrome.storage.sync.set({links: data.links});
            });
        } else {
            alert("Invalid URL")
        }
    }, false);

    statsButton.addEventListener('click', function() {
        chrome.storage.sync.get({links: {}}, function(data) {
            var object = data.links;
            var output = '';
            for (var property in object) {
                output += property + ': ' + object[property]+'\n';
            }
            alert(output);
        });
    }, false);


    csvButton.addEventListener('click', function() {
        chrome.storage.sync.get({links: {}}, function(data) {
            var object = data.links;
            // https://stackoverflow.com/a/14966131/9063770
            let csvContent = "data:text/csv;charset=utf-8,hostname,number of times stripped\n";
            for (var property in object) {
                csvContent += property + ',' + object[property]+'\n';
            }
            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "utm_stripping_data.csv");
            document.body.appendChild(link); // Required for FF

            link.click(); // This will download the data file named "my_data.csv".
        });
    }, false);
}, false);
