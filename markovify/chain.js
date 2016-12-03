// class Chain {
//     // data is array of strings
//     // this.corpus = {};
//     constuctor(data) {
//         for (var i = 0; i < data.length; i++) {
//             if (typeof corpus[data[i]]) {
//             }
//         }
//     }
// }

function markov(chain){
	// chain is an array of arrays
	// chain.corpus is the entire corpus

	// choose a start
	var start_size = chain.start.length;
	console.log("the size of the starts is " + start_size);
	var start_item = Math.floor((Math.random() * start_size) + 0);
	console.log("the chosen start item is " + start_item);
	console.log(link(chain,start_item));
}

function link(chain, key){
	// check if key exists
	console.log(chain.corpus.key);
	if (chain.corpus.key){
		console.log("key exists");
		// get the size of the key's contents
		var key_size = chain.corpus[key].length;
		// generate a number referring to a random index of the key's array.
		var rand_item = Math.floor((Math.random() * key_size) + 0);
		// randomly choose it's key contents.
		var next = chain.corpus[key][rand_item];

		console.log(next);
		link(chain,next);
	} else {
		return key;
	}
}

var chain = {
	start : ["the"],
	corpus : {
		"the": ["dog", "cat"],
		"dog": ["ate", "pooped"],
		"ate": ["a"],
		"a":   ["bacon"],
		"cat": ["cried"]
	}
}

var x = markov(chain);