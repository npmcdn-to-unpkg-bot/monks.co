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


// do the thing

oldskoolaBackground();
oldskoolaFonts();
setTimeout(oldskoolaImages(), 5000);



// function to convert images to sepia
function oldskoolaImages() {

	// iterate through images
	var images = document.getElementsByTagName("img");
	while(images.length > 0){
		Pixastic.process(images[0], 'sepia');
	}
}

// function to change background to old paper texture
function oldskoolaBackground() {
	document.body.style.backgroundImage="url('https://raw2.github.com/amonks/algorithms-ai/master/oldskoola/paper.jpg')";
}

// function to change fonts to oldish looking google fonts
function oldskoolaFonts() {
	// js pasted from google fonts:
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

	// change fonts for elements
	changeFontsTo("h1", "'Fruktur', serif")
	changeFontsTo("body", "'Pinyon Script', cursive")
	changeFontsTo("h2", "'IM Fell DW Pica', serif")
	changeFontsTo("h3", "'IM Fell DW Pica', serif")
	changeFontsTo("h4", "'IM Fell DW Pica', serif")

	// function to change an element's font
	function changeFontsTo(element, font){
		var h1Elements = document.getElementsByTagName(element);
		for(var i = 0; i < h1Elements.length; i++) {
			h1Elements[i].style.fontFamily = font;
		}
	}
}

