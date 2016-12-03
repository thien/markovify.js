var splitters = require('./splitters.js');
class Chain {
    // data is array of strings
    constructor(data) {
        this.corpus = {};
        this.start = [];
        this.loadData(data);
    }
    
    loadData(data) {
        console.log("Start loading data");
        for (var i = 0; i < data.length; i++) {
            var sentences = splitters.split_into_sentences(data[i]);
            for (var n = 0; n < sentences.length; n++) {
                var sentence = sentences[n].split(" ");
                for (var k = 0; k < sentence.length; k++ ) {
                    var word = sentence[k];
                    var nextWord = "";
                    if (typeof sentence[k+1] != undefined) {
                        nextWord = sentence[k+1];
                    } else {
                        nextWord = null;
                    }
                    //console.log(typeof this.corpus[word]);
                    //console.log(word+" "+nextWord);
                    if (typeof this.corpus[word] == "undefined") {
                        this.corpus[word] = [nextWord];
                    } else {
                        this.corpus[word].push(nextWord);
                    }
                }
            }
        }
        console.log(this.corpus);
    }
}

var test = [
    "I am not a free man! I am a number!",
    "Free the slaves",
    "I am a number of things"
];
var c = new Chain(test);