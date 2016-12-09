const fs = require('fs');

class myHeap {
    constructor() {
        this.ipArray = {};
    }
    addIp (ip) {

        var key = ip.split('.').splice(0,3).join('.');

        if(this.ipArray[key]) {
            if(this.ipArray[key].indexOf(ip) == -1) {
                this.ipArray[key].push(ip);
            }
        }
        else  {
            this.ipArray[key] = [];
            this.ipArray[key].push(ip);
        }
    }

    print() {
        for(var key in this.ipArray) {
            console.log(key + ":");
            for(var i =0; i< this.ipArray[key].length; i++) {
                console.log(this.ipArray[key][i]);
            }
        }
    }
}

fs.readFile('access.log', 'utf8', (err, data) => {
    if (err) throw err;

    var heap = new myHeap;

    var re = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/ig;

    var ips = data.match(re);

    for (var i = 0; i< ips.length; i++) {
        heap.addIp(ips[i]);
    }
    heap.print();
})