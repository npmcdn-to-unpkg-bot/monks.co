---
categories:
  - website
layout: default
title:  "Divvy Data Visualization"
year: "2014"
github: "https://github.com/amonks/divvy-json"
website:    "http://divvy.needsyourhelp.org"
tagline:    "Good Lookin' Bike Theft"
image:
  url: "/images/divvy.png"
---
I made these visualizations in 2014 from data released for the <a href="https://divvybikes.com/datachallenge">Divvy Data Challenge</a>. By exploring and annotating the data, I was able to uncover information about the theft and damage of bicycles in the Divvy bikeshare system.

I started out by throwing the data into <abbr title="A Popular Open-Source Database">Postgres</abbr>. Then, I fired up Ruby and started exploratorially looping through my tables, adding annotations as I went. I made the final graphs using a combination of heatmap.js and d3.
