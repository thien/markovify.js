var ascii_lowercase = "abcdefghijklmnopqrstuvwxyz";
var ascii_uppercase = ascii_lowercase.toUpperCase().split(/(?!$)/u);
var exceptions = "U.S.|U.N.|E.U.|F.B.I.|C.I.A.".split("|");
var abbr_capped = [
    "ala|ariz|ark|calif|colo|conn|del|fla|ga|ill|ind|kan|ky|la|md|mass|mich|minn|miss|mo|mont|neb|nev|okla|ore|pa|tenn|vt|va|wash|wis|wyo",
    "u.s",
    "mr|ms|mrs|msr|dr|gov|pres|sen|sens|rep|reps|prof|gen|messrs|col|sr|jf|sgt|mgr|fr|rev|jr|snr|atty|supt",
    "ave|blvd|st|rd|hwy",
    "jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec",
    ascii_lowercase.split(/(?!$)/u).join("|")
].join("|").split("|");
var abbr_lowercase = "etc|v|vs|viz|al|pct".split("|")

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function is_abbrevation(dotted_word) {
    clipped = dotted_word.substring(0, dotted_word.length - 1);
    if (isInArray(clipped[0],ascii_uppercase)) {
        if (isInArray(clipped.toLowerCase(),abbr_capped)) {
            return true;
        } else {
            return false;
        }
    }
    if (isInArray(clipped, abbr_lowercase)) {
        return true;
    } else {
        return false;
    }
}

function is_sentence_ender(word) {
    if (isInArray(word,exceptions)) {
        return false;
    }
    if(isInArray(word[word.length-1],["?","!"])) {
        return true;
    }
    if (word.replace(/[^a-z]/,"").length > 1) {
        return true;
    }
    if ((word[word.length-1] == ".") && (!is_abbrevation(word))) {
        return true;
    }
    return false;
}

function split_into_sentences(text) {
    text = text.replace(/['"]+/g, '');
    text += ".";
    var potential_end_pat = new RegExp(/([\w\.'’&\]\)]+([\.\?!]+))/g);
    var matches = text.match(potential_end_pat);
    var sentences = [];
    var prevIndex = 0;
    for (var i = 0; i < matches.length; i++) {
        if (is_sentence_ender(matches[i])) {
            var index = text.indexOf(matches[i]) + matches[i].length;
            sentences.push(text.slice(prevIndex,index).trim());
            prevIndex = index;
        }
    }
    return sentences;
}

exports.split_into_sentences = split_into_sentences;