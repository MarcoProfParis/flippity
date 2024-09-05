function encode(str) {
	str = str.trim()
	str = str.replace(/\s+/g," ") // replace multiple spaces with a single space
	str = str.replace(/%/g,"%25") // replace % with UTF8			
	str = str.replace(/'/g,"%27") // replace single quote with UTF8
	str = encodeURIComponent(str)
	return str
	}
	
function decode(str) {
	str = decodeURIComponent(str)
	if (str.includes("<")) {
		var tags = ["<br>","<sub>","</sub>","<sup>","</sup>"] // acceptable HTML tags
		var tags2 = ["~br~","~sub~","~/sub~","~sup~","~/sup~"] // temp tags
		for (var i=0; i<tags.length; i++) {
			str = str.replace(new RegExp(tags[i],"gi"), tags2[i])
			}
		str = str.replace(/</g,"&lt;") // replace less than sign with html, to sanitize content
		str = str.replace(/>/g,"&gt;") // replace greater than sign with html, to sanitize content
		for (var i=0; i<tags2.length; i++) {
			str = str.replace(new RegExp(tags2[i],"gi"), tags[i]) // swap temp tags for acceptable tags
			}
		}
	return str
	}
