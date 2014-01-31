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

function oldskoolaImages() {

	// iterate through images
	var images = document.getElementsByTagName("img");
	while(images.length > 0){
		Pixastic.process(images[0], 'sepia');
	}

}

oldskoolaImages();