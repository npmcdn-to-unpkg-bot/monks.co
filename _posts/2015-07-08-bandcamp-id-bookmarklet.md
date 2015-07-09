---
categories:
  - howto
  - fluff
layout: default
title:  "Bandcamp ID Bookmarklet"
year: "2015"
---
I often find myself looking for the ID of an album on Bandcamp, usually to make an embed.

Here's a little bookmarklet to make it easier. Drag the following link to your bookmarks bar, then click it when you're on a Bandcamp album page.

<a title="bandcamp id" href="javascript: alert('the bandcamp id for this album is: ' + EmbedData.tralbum_param.value)">Bandcamp ID</a>
