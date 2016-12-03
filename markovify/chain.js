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

	var start_item = Math.floor((Math.random() * start_size) + 0);
	key = chain.start[start_item];
	var output = "";

	while (key in chain.corpus){
		output += key + " ";

		if (chain.corpus[key]){

			var rand_item = random(chain.corpus[key]);
			var key = chain.corpus[key][rand_item];
		}
	}
	return output;
}

// var test = [
//     "I am not a free man! I am a number!",
//     "Free the slaves",
//     "I am a number of things",
//     "LOL XDXDXDXDXD",
// 	"I JUST LITERALLY",
// 	"PEED",
// 	"MY",
// 	"PANTS",
// 	"JUST A LITTE THOUGH",
// 	"I MEAN ITS A LITTLE SPOT NOT LIKE IT RUINED MY CHAIR R NYTHING LOL BUT FOR REAL EPIC LULZ HIGH FIVES XDDDDDDDDDDDDDD",
// 	"U FRUSTRATED U FRUSTRATED BRO U SO MAD WHY ARE YOU SO MAAAAD I CAN POST ANYTHING I WANT THAT IS HOW IT SAYS IN THE RULES I DONT CARE ABOUT YOUR FAGGOTRY RULES Y SO MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD",
// 	"WHATA FUCK MAN xD i just fall of my chair kuz i couldnt and i CANT stop laugh xDXDXDXDXDDDDDDDDDDDDXXXXXXXXXXXXXXXXXXXDDDDDDDDDDDDDDDDDDD OMGOSH DDDDDXXXXXXXXXXXXXXXXXXXXXXXDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD DDDDDD LOOOOOOOOOLLLLL THIS IS A SHIT XDDDDDDDDDDDDDDDDDDDDXDDDDDDDDDDDDDDDDDDDDD A BIG ONE XDDDDDDDD A GRAT ONE XXXXXXDDDD CONGRATS MAN XD U FRUSTRATED U FRUSTRATED BRO U SO MAD WHY ARE YOU SO MAAAAD I CAN POST ANYTHING I WANT THAT IS HOW IT SAYS IN THE RULES I DONT CARE ABOUT YOUR FAGGOTRY RULES Y SO MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD",
// 	"WHATA FUCK MAN xD i just fall of my chair kuz i couldnt and i CANT stop laugh xDXDXDXDXDDDDDDDDDDDDXXXXXXXXXXXXXXXXXXXDDDDDDDDDDDDDDDDDDD OMGOSH DDDDDXXXXXXXXXXXXXXXXXXXXXXXDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD DDDDDD LOOOOOOOOOLLLLL THIS IS A SHIT hgXDDDDDDDDDDDDDDDDDDDDXDDDDDDDDDDDDDDDDDDDDD A BIG ONE XDDDDDDDD A GRAT ONE XXXXXXDDDD CONGRATS MAN XD",
// 	"WHATA FUCK MAN xD i just fall of my chair kuz i couldnt and i CANT stop laugh",
// 	"xDXDXDXDXDDDDDDDDDDDDXXXXXXXXXXXXXXXXXXXDDDDDDDDDDDDDDDDDDD OMGOSH",
// 	"HOOOOOOOOLLLLLLYYYYY SHIT",
// 	"whatr the HELL",
// 	"WHATA FUCK MAN xD",
// 	"i just fall of my chair kuz i couldnt and i CANT stop laugh",
// 	"xDXDXDXDXDDDDDDDDDDDDXXXXXXXXXXXXXXXXXXXDDDDDDDDDDDDDDDDDDD",
// 	"OMGOSH",
// 	"DDDDDXXXXXXXXXXXXXXXXXXXXXXXDDDDDDDDDDDDDDDDDDDDDDDDDDDD DDDDDD LOOOOOOOOOLLLLL",
// 	"THIS IS A SHIT",
// 	"XDDDDDDDDDDDDDDDDDDDDXDDDDDDDDDDDDDDDDDDDDD",
// 	"A BIG ONE",
// 	"XDDDDDDDD",
// 	"A GRAT ONE",
// 	"XXXXXXDDDD."
// ];

// var c = new Chain(test);
// var x = markov(c);
// console.log(x);

exports.Chain = Chain;
exports.markov = markov;