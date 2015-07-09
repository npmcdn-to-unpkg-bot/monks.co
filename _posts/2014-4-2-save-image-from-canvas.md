---
layout: default
title: How to save an image to disk from a canvas
category: howto
year: 2014
---
The Canvas object includes a `toDataURL` method that returns a dataURI (a really *really* long URI that contains a base64-encoded version of the image)

```js
canvas = $('<canvas>');
...

superLongURI = canvas.toDataURL("image/png");
```

This is super handy if you want to to generate images from javascript.

I've never had trouble using these images-encoded-within-urls within javascript, for example within an `img` tag's `src` attribute.

The problem comes if you want to link to the image, or if the user tries to save it: Google Chrome's address bar can't handle URLs longer than 2 megabytes.

The solution is to convert the super-long URI to a blob, and link to that blob's URI rather than the really-long dataURI.

## usage

```js
canvas = $('<canvas>');
...

superLongURI = canvas.toDataURL("image/png");

// to save the image to the user's computer with a specified filename:
ImageSaver.download_data_uri(superLongURI, fileName);

// to only generate a shortened URI, not saving it.
shortURI = ImageSaver.make_url_from_data(dataURI);
```


## javascript

The following javascirpt object provides three functions:

*   `ImageSaver.download_data_uri(dataURI, fileName)` main wrapper function to download an image, requires both functions below
*   `ImageSaver.make_url_from_data(dataURI)` makes a blob from a dataURI and returns that blob's URI, requires make_blob
*   `ImageSaver.make_blob(dataURI)` makes a blob from a dataURI and returns that blob.

### the script

```js
ImageSaver = {
  // function to force-download from a data uri as a filename
  // nb the download="filename" attribute isn't yet supported by safari
  download_data_uri: function(dataURI, fileName) {
    var tempUrl = ImageSaver.make_url_from_data(dataURI);
    var link = $('<a href="' + tempUrl + '" id="download" download="' + fileName + '" target="_blank"> </a>');
    $("body").append(link);
    $("#download").get(0).click();
  },

  // function to generate a temporary browser index url for a datauri
  // if a data-uri is larger than 2mb, chrome's address bar can't handle it.
  // fortunately, you can blob it and then use a temporary blob url
  make_url_from_data: function(dataURI) {
    var blob = ImageSaver.make_blob(dataURI);
    var tempUrl = URL.createObjectURL(blob);
    return tempUrl;
  },

  // function to convert a datauri to a blob
  // Blobs are temporary data structures that can hold binary data, and make that data accessible through a short url. They can probably do other things too; I have no idea.
  make_blob: function(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    };

    // write the ArrayBuffer to a blob, and you're done
    return new Blob([ab], {
      type: mimeString
    });
  }
}
```
