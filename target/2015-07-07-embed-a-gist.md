---
category: howto
layout: default
title:  "Embed a Gist"
year: "2015"
---
Embedding gists is easy! But poorly documented.

All you have to do is add `.js` to the end of the gist url:

```html
<script src="https://gist.github.com/amonks/9363267.js" type="text/javascript"></script>
```

Normally it'll embed all the files in the Gist sequentially. You can specify a filename as a query string parameter to only embed one file:

```html
<script src="https://gist.github.com/b68fe6fc0c447719f2a9.js?file=0-pftv-skip-interstitial-ads.user.js" type="text/javascript"></script>
```
