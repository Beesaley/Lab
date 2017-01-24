var request = require("request");

class boxContainer {
    constructor() {
        this.boxes = [];
        this.counter = 0;
    }

    addToBoxes(email) {
        if (this.boxes.indexOf(email) == -1) {
            this.boxes.push(email);
        }
    }

    print() {
        console.log(this.boxes);
    }
}

var myBoxes = new boxContainer();

var parseMyAwesomeHtml = (html) => {
    var re = /[A-z0-9]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}/ig;

    var emails = html.match(re);
    if (emails && emails.length) {
        for (var i = 0; i < emails.length; i++) {
            myBoxes.addToBoxes(emails[i]);
        }
    }

    var reHref = /href="(.*?)"/ig;

    var hrefs = html.match(reHref);

    if (hrefs && hrefs.length) {
        for (var i = 0; i < hrefs.length; i++) {

            var href = hrefs[i];
            href = href.split('"')[1];
            if (href.indexOf("mailto") == -1 && href.indexOf("favicon") == -1 && href[0] != '#' && href[0] != '/') {
                myBoxes.counter = myBoxes.counter + 1;
                if (myBoxes.counter < 10) {
                    getOverHere(href)
                }
                else if (myBoxes.counter == 10) {
                    myBoxes.print();

                }
            }


        }
    }

};


function getOverHere(url) {
    console.log(myBoxes.counter + ' '+url);
    if (myBoxes.counter < 10) {
        request(url, (error, response, body) => {
            if (!error) {
                parseMyAwesomeHtml(body);
            } else {
                console.log(error);
            }
        });
    }

}


getOverHere("http://mosigra.ru/page/corporate");
