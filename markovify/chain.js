function accumulate(iterable, function(operator.add)){
	// cumulative calculations. (summation, by default.)
	for i in
}

function Chain(sc, mo, cor){

	// corpus: list of lists, where each outer list is a 'run'  of the process (e.g., a single sentence), and each inner list contains the steps (e.g., words) in the run. If you want to simulate an infinite process, you can come very close by passing just one, very long run.

	// state_size:  An integer indicating the number of items the model uses to represent its state. For text generation, 2 or 3 are typical.

	var state_size = sc;
	var model = model || build(cor,state_size)
	precompute_begin_state();

	function build(corpus, state_size){
		// Building a Javascript representation of the Markov Model. Returns a dict of dicts where the keys of the outer dict represent all possible states, and point to the inner dicts. The inner dicts represent all possibilities for the "next" item in the chain, along with the count of times it appears.

		if (corpus instanceof Array == false || corpus[0]  instanceof Array == false){
			return new Error("`corpus` must be array of arrays");
		}
	}

	// using a default hash table here would be a lot more convenient, however the memory usage is far higher.
	model = {};

	for (run in corpus){
		var items = (state_size) + run;
		for (int i = 0; i < run.length + 1; i++){
			var state =
		}
	}
	return model
}