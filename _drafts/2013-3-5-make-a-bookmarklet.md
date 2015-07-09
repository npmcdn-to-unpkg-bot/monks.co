---

layout: default
title: make a bookmarklet
tags: 
- web 
- guide
group: web

---

# How to make a bookmarklet

bookmarklets work because when you click link that starts with `javascript:`, instead of following the link, the browser executes the javascript. Here's an example:

## example bookmarklet

    javascript:
     
    // get the <body> element, store it in a variable for later
    var bodyTag = document.getElementsByTagName("body")[0];
     
    // I want to use jQuery in my bookmarklet, so first I'll make a <script> element for it
    var script = document.createElement("script");
    // then I'll set the <script src=""> to jquery's url
    script.src = "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js";
    // and append that <script> element to the <body>, which we grabbed earlier
    bodyTag.appendChild(script);
     
     
    // we have to wait for jquery to load before we use it: 
    script.onload = script.onreadystatechange = function() {
        // anything here will wait our script tag is loaded before it executes
        // this is some jquery right here. `$('img')` finds all the <img> elements
        // attr() then sets the "src" attribute on those images to a picture of my face.
        $('img').attr("src","http://monks.co/images/andrew-monks.png"); 
    };
     
## no comments though!

Because bookmarklets are shortened to one line, commments break them!

here's a version of the above with the comments removed.
     
    javascript:
    var bodyTag = document.getElementsByTagName("body")[0];
    var script = document.createElement("script");
    script.src = "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js";
    bodyTag.appendChild(script);
    script.onload = script.onreadystatechange = function() {
        $('img').attr("src","http://monks.co/images/andrew-monks.png"); 
    };