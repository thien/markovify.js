

class Text {
	constructor(input_text, state_size, chain) {
		// input_text: A string.
        // state_size: An integer, indicating the number of words in the model's state.
        // chain: A trained markovify.Chain instance for this text, if pre-processed.
		this.input_text = input_text;
		this.state_size = state_size;
		runs = [this.generate_corpus(input_text)];

		// Rejoined text lets us assess the novelty of generated sentences.
		this.rejoined_text = this.sentence_join(
			runs.map(this.word_join)
		);
		this.chain = chain || Chain(runs, state_size);
	}
	sentence_split(text){
		// Splits full-text string into a list of sentences.
		return split_into_sentences(text);
	}

	sentence_join(sentences){
		// Re-joins a list of sentences into the full text.
		// return " ".join(sentences);
		return sentences.join(" ");
	}

	// this.word_split_pattern = 'r"\s+"';
	// this.word_split_pattern.compile(word_split_pattern);
	// var word_split_pattern = re.compile(r"\s+");

	word_split(sentence){
		return sentence.split(r"\s+");
	}

	word_join(words){
		// Re-joins a list of words into a sentence.
		return words.join(" ");
		// return " ".join(words);
	}

	test_sentence_input(sentence){
		// A basic sentence filter. This one rejects sentences that contain the type of punctuation that would look strange on its own in a randomly-generated sentence.
		var reject_pat = re.compile(r"(^')|('$)|\s'|'\s|[\"(\(\)\[\])]");
	  //   // Decode unicode, mainly to normalize fancy quotation marks
	  //   if (sentence.name == "str"){
			// var decoded = sentence;
	  //   } else {
	  //       var decoded = decodeURIComponent(escape(sentence));
	  //   }
	     // Sentence shouldn't contain problematic characters
	    if sentence.match(reject_pat){
	    	return False;
	    }
	    return True;
	}

	generate_corpus(text){
		// Given a text string, returns a array of arrays; that is, a list of "sentences," each of which is a list of words. Before splitting into words, the sentences are filtered through `this.test_sentence_input`
		var sentences = this.sentence_split(text);
	    var passing = sentences.filter(test_sentence_input);
	    // var runs = map(word_split, passing);
	    var runs = passing.map(word_split);
	    return runs
	}

	function test_sentence_output(words, max_overlap_ratio, max_overlap_total){
		//  Given a generated list of words, accept or reject it. This one rejects sentences that too closely match the original text, namely those that contain any identical sequence of words of X length, where X is the smaller number of (a) `max_overlap_ratio` (default: 0.7) of the total number of words, and (b) `max_overlap_total` (default: 15).
		//  Reject large chunks of similarity
		var overlap_ratio = Math.floor(Math.round(max_overlap_ratio * words.length));
		var overlap_max = Math.min(max_overlap_total, overlap_ratio);
		var overlap_over = overlap_max + 1;
		var gram_count = Math.max((words.length - overlap_max), 1);


		var grams;
		for (int i = 0; i < gram_count.length; i++){
			var k = words.slice(i, i+overlap_over);
			grams.push(k);
		}
		// var grams = [ words[i:i+overlap_over] for i in range(gram_count) ];

		for (g in grams){
			var gram_joined = this.word_join(g);
		    if (gram_joined in this.rejoined_text){
		        return False;
		    }
		}
		return True;
	}

	function make_sentence(init_state, tries, max_overlap_ratio, max_overlap_total){

	    // Attempts `tries` (default: 10) times to generate a valid sentence, based on the model and `test_sentence_output`. Passes `max_overlap_ratio` and `max_overlap_total` to `test_sentence_output`.

	    // If successful, returns the sentence as a string. If not, returns None.

	    // If `init_state` (a tuple of `self.chain.state_size` words) is not specified, this method chooses a sentence-start at random, in accordance with the model.
	    // """

	    // var tries = kwargs.get('tries', DEFAULT_TRIES);
	    // var mor = kwargs.get('max_overlap_ratio', DEFAULT_MAX_OVERLAP_RATIO);
	    // var mot = kwargs.get('max_overlap_total', DEFAULT_MAX_OVERLAP_TOTAL);

	    var mor = max_overlap_ratio;
	    var mot = max_overlap_total;

	    for (int i = 0; i < tries; i++){
	        if (init_state != None){
	            if (init_state[0] == BEGIN){
	                prefix = list(init_state[1:]);
	            }
	            else{
	                prefix = list(init_state);
	            }
	        }
	        else:
	            prefix = []
	        var words = prefix + this.chain.walk(init_state);
	        if (this.test_sentence_output(words, mor, mot)){
	            return this.word_join(words)
	        }
	    }
	    return None
	}

	function make_short_sentence(self, char_limit, **kwargs){
	    // Tries making a sentence of no more than `char_limit` characters`, passing **kwargs to `self.make_sentence`.

	    tries = kwargs.get('tries', DEFAULT_TRIES)
	    for _ in range(tries):
	        sentence = self.make_sentence(**kwargs)
	        if sentence and len(sentence) < char_limit:
	            return sentence
	}

	function make_sentence_with_start(self, beginning, **kwargs){
	        // Tries making a sentence that begins with `beginning` string,
	        // which should be a string of one or two words known to exist in the
	        // corpus. **kwargs are passed to `self.make_sentence`.

	        split = self.word_split(beginning)
	        word_count = len(split)
	        if (word_count == self.state_size){
	        	init_state = tuple(split);
	        }
	        else if (word_count > 0 and word_count < self.state_size){
	            init_state = tuple([ BEGIN ] * (self.state_size - word_count) + split)
	        }
	        else{
	            err_msg = "`make_sentence_with_start` for this model requires a string containing 1 to {0} words. Yours has {1}: {2}".format(self.state_size, word_count, str(split))
	            raise ParamError(err_msg)
	        }
	        return self.make_sentence(init_state, **kwargs);
	}
}



class NewlineText(Text){
    // A (usable) example of subclassing markovify.Text. This one lets you markovify
    // text where the sentences are separated by newlines instead of ". "
    def sentence_split(self, text):
        return re.split(r"\s*\n\s*", text)
}