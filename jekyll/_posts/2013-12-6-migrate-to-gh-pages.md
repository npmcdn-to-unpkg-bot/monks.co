---
categories:
  - howto
  - linux
published: true
slug: gh-pages
title: Migrate to gh-pages
category: howto
year: 2013
---
I have a bunch of flat-file static websites, which I've forever served from my ec2 instance. I already sync them with the server via git, so it's super easy to move them over to gh-pages hosting.

## setup gh-pages branch

assumes preexisting git repo using master branch

	git checkout -b gh-pages
	echo "example.com" > CNAME
	git add --all .
	git commit -am gh-pages
	git push origin gh-pages

on github, switch default branch to gh-pages

	git push origin :master
	git branch -d master

set dns

	* 10800 IN A 204.232.175.78
	@ 10800 IN A 204.232.175.78

## credits

from [oli.jp](http://oli.jp/2011/github-pages-workflow/)
