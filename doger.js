// doger.js
// translate any text into doge
// andrew monks 2014

Doger = {
    // main function to return a completed doge meme image based on a given article url
    doger: function(container, keywords, embedcontainer) {
        // do the stuff!
        var image = Doger.doge_image();
        var doge_text = Doger.keywords_to_doge_text(keywords);
        var output = Doger.make_doge_image(image, doge_text);
        output.clone().appendTo(container);
        var embed = $('<div>').append(output.clone()).html()
        embedcontainer.text(embed); 
        return embed;
    },

    // function to return a completed doge meme image from a given image and array of doge phrases
    // thought: perhaps it'd be easier to generate a unique hash url to a page with the text overlayed using css? but then people can't tumbl...
    make_doge_image: function(image, doge_text) {
        // superimpose the text over the image in rainbow comic sans
        // dummy output until this function is real
        var div = $("<div class='doger'><img src='" + image.url + "'class='img-rounded' /></div>");
        if (doge_text.length <= 1) {
            return div
        };
        div.find('img').css({
            "position": "absolute",
            "top": "0",
            "left": "0",
            "width": "100%",
            "height": "100%"
        });
        div.css({
            "font-family": "Comic Sans, Comic Sans MS, cursive",
            "font-weight": "bold",
            "font-size": "20px",
            "position": "relative",
            "width": "100%",
            "height": "0",
            "padding-bottom": "" + (image.height / image.width) * 100 + "%"
        });
        for (var i = 0; i <= doge_text.length - 1; i++) {
            var span = $("<span class='dogetext'>" + doge_text[i] + "</span>");
            var x = Math.random() * 100 * .75;
            var y = i * (100 / doge_text.length);
            var color = Doger.random_color();
            var shadow = Doger.random_color();
            span.css({
                "position": "absolute",
                "top": "" + y + "%",
                "left": "" + x + "%",
		        "text-shadow" : "1px 1px" + shadow,
                "color": color
            });
            div.append(span);
        };
        return div;
    },

    // function to return an array of relevant doge phrases given a long string
    keywords_to_doge_text: function(keywords) {
        // see http://the-toast.net/2014/02/06/linguist-explains-grammar-doge-wow/
        var dogeWords = ["such", "much", "very", "many", "so", "how"];
        var dogeEndWords = ["wow", "amaze", "excite"];
        var output = [];
        // add keywords
        for (var i = 0; i <= keywords.length - 1; i++) {
            output.push(Doger.random_from_array(dogeWords) + " " + keywords[i].toLowerCase() + ".");
        };
        // add end word
        output.push(Doger.random_from_array(dogeEndWords) + ".");
        return output;
    },

    // function to return identifying keywords from a given article url
    keywords_from_url: function(url) {
        // get keywords from article
        // using yahoo content analysis api
        // see http://developer.yahoo.com/contentanalysis/
        var query = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20contentanalysis.analyze%20where%20url%3D%22" + escape(url) + "%22&diagnostics=true";
        var response = $(Doger.httpGet(query)); // httpGetdefined below
        // keywords are listed inside <entity><text></text></entity> within the response
        // n.b. it also provides a confidence score for each keyword
        var keywords = response.find("entity");
        var output = []
        for (var i = keywords.length - 1; i >= 0; i--) {
            output.push($(keywords[i]).find('text').text());
        };
        return output
    },

    // function to return identifying keywords from a given article text
    keywords_from_text: function(text) {
        // get keywords from article
        // using yahoo content analysis api
        // see http://developer.yahoo.com/contentanalysis/
        var query = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20contentanalysis.analyze%20where%20text%3D%22" + encodeURI(text.replace(/[^a-zA-Z ]+/g, '')) + "%22&diagnostics=true";
        var response = $(Doger.httpGet(query)); // httpGetdefined below
        // keywords are listed inside <entity><text></text></entity> within the response
        // n.b. it also provides a confidence score for each keyword
        var keywords = response.find("entity");
        var output = []
        for (var i = keywords.length - 1; i >= 0; i--) {
            output.push($(keywords[i]).find('text').text());
        };
        return output
    },

    // function to get the current query string (anything in the location bar after a '?'), and de-base64 it.
    get_query_string: function() {
        if (window.location.href.indexOf('?') == -1) {
            return null;
        } else {
            var queryString = window.location.href.slice(window.location.href.indexOf('?') + 1);
            return atob(queryString);
        };
    },

    // function to check if a string is a url
    check_for_url: function(string) {
        return true;
    },

    // function to get an article's content with the readability api
    get_content_from_url: function(url) {
        var query = "https://readability.com/api/content/v1/parser?url=" + encodeURI(url) + "&token=2d3cae85509d49fc2d2ec8d1b5fd46aef1dc0130";
        var response = Doger.httpGet(query);
        return response;
    },

    // function to return an object with a doge image url, a height, and a width
    doge_image: function() {
        doge_images = [{
            url: "http://amonks.github.io/doger.js/images/shiba-inu_01_lg.jpg",
            width: 622,
            height: 352
        }, {
            url: "http://amonks.github.io/doger.js/images/Shiba-Inu-Main.jpg",
            width: 461,
            height: 400
        }, {
            url: "http://amonks.github.io/doger.js/images/shiba-inu-puppies-pictures.jpg",
            width: 922,
            height: 922
        }, {
            url: "http://amonks.github.io/doger.js/images/001.jpg",
            width: 1023,
            height: 1024
        }, {
            url: "http://amonks.github.io/doger.js/images/Taisen_Shikaki_Inu.jpg",
            width: 800,
            height: 994
        }, {
            url: "http://amonks.github.io/doger.js/images/shiba_inu.jpg",
            width: 460,
            height: 315
        }, {
            url: "http://amonks.github.io/doger.js/images/shiba-inu_04_lg.jpg",
            width: 622,
            height: 352
        }]
        return Doger.random_from_array(doge_images);
    },

    // function to GET a url, needed by keywords_from_url()
    httpGet: function(theUrl) {
        var xmlHttp = null;

        xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl, false);
        xmlHttp.send(null);
        return xmlHttp.responseText;
    },

    // function to return a random member of a given array, needed by keywords_to_doge_text()
    random_from_array: function(array) {
        return array[Math.floor(Math.random() * array.length)];
    },

    // function to return a random hex color, needed by make_doge_image()
    random_color: function() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    },
}
