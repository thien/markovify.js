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
                this.start.push(sentence[0]);
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
        // console.log(this.corpus);
        // console.log(this.start);
    }
}

function markov(chain){
	function random(value){
		var result;
	    var count = 0;
	    for (var prop in value)
	        if (Math.random() < 1/++count)
	           result = prop;
	    return result;
	}

	// chain is an array of arrays
	// chain.corpus is the entire corpus

	// choose a start
	var start_size = chain.start.length;
	// console.log("the size of the starts is " + start_size);
	var start_item = Math.floor((Math.random() * start_size) + 0);
	key = chain.start[start_item];
	var output = "";

	while (key in chain.corpus){
		output += key + " ";
		// console.log(key);
		if (chain.corpus[key]){
			// output += key;
			var rand_item = random(chain.corpus[key]);
			// randomly choose it's key contents.
			var key = chain.corpus[key][rand_item];
		}
	}
	return output;
}

var test = [
    "I am not a free man! I am a number!",
    "Free the slaves",
    "I am a number of things"
];

var c = new Chain(test);
var x = markov(c);
console.log(x);
