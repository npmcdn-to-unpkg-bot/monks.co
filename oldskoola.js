// oldskoola
// js library for making websites look like old documents
// andrew monks 2014

// bookmarklet(?) to make shit oldskool
// 1. convert images to sepia
// 2. change fonts
// 3. change background to old paper

// include pixastic library
var pixasticJSCode = document.createElement('script');
pixasticJSCode.setAttribute('src', 'https://raw2.github.com/amonks/algorithms-ai/master/oldskoola/pixastic.sepia.js');
document.body.appendChild(pixasticJSCode);

// convert images to sepia
function oldskoolaImages() {

	// iterate through images
	var images = document.getElementsByTagName("img");
	while(images.length > 0){
		Pixastic.process(images[0], 'sepia');
	}
}

function oldskoolaBackground() {
	document.body.style.backgroundImage="url('https://raw2.github.com/amonks/algorithms-ai/master/oldskoola/paper.jpg')";
}


function oldskoolaFonts() {
	WebFontConfig = {
		google: {
			families: ['IM+Fell+DW+Pica:400,400italic:latin', 'Pinyon+Script::latin', 'Germania+One::latin', 'Miltonian::latin', 'Fruktur::latin']
		}
	};
	(function () {
		var wf = document.createElement('script');
		wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
			'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
		wf.type = 'text/javascript';
		wf.async = 'true';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(wf, s);
	})();

	changeFontsTo("h1", "'IM Fell DW Pica', cursive")

}

function changeFontsTo(element, font){
	var h1Elements = document.getElementsByTagName(element);
	for(var i = 0; i < h1Elements.length; i++) {
		h1Elements[i].style.fontFamily = font;
	}
}