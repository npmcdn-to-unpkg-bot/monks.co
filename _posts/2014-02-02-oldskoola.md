---
layout: default
title:  "Oldskoola Bookmarklet"
slug:     "oldskoola"
year: "2014"
date: 2014-02-22
github: "https://github.com/amonks/oldskoola.js"
tagline:    "Exploring the oldernet"
image: 
  url:"/images/oldskoola.png"
---
With physical documents, we have an ingrained cultural language of visual artifacts that show &lsquo;oldness&rsquo;: weathering, print techniques, type of paper, style. But in the internet era of constantly-updating content, what does &lsquo;old&rsquo; look like? &lt;blink&gt; tags?

<a href='javascript:var bodyTag = document.getElementsByTagName("body")[0];var script = document.createElement("script");script.src = "//raw.github.com/amonks/oldskoola.js/master/oldskoola.min.js";bodyTag.appendChild(script);script.onload = script.onreadystatechange = function() {oldskoola();};'>Oldskoola!</a>

Drag that link ^^ to your bookmarks bar, then click on it on any website.

Oldskoola.js is a bookmarklet // javascript library that seeks to explore that question by applying the visual language of old documents to the internet. It turns the background into old parchment, switches up the fonts, and converts images to sepiatone.
