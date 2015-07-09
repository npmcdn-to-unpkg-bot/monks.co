---

layout: default
title: Jekyll Website
tags: 
- web
- guide
group: web

---


# jekyll website

## initial setup

in the website directory, create a git repo, create a gh-pages branch, and push only that branch (no master):

	git init
	git checkout -b gh-pages
	git add .
	git commit -am init
	git remote add origin git@github.com:andrewjmonks/rpi-setup.git
	git push origin gh-pages

## set up jekyll for github pages

	gem install github-pages
	echo "gem 'github-pages'" > Gemfile
	bundle install

## serve
	
	bundle exec jekyll serve --watch

## how jekyll works

Jekyll will render any markdown file in its directory, provided that markdown file starts with a yaml header (which is any text (a blank line works) between two lines of "---"). Here's this page's header as an example:

	---

	layout: default
	title: jekyll website

	---

`layout:` specifies which layout to use (mandatory), and `title:` sets the variable 'title'. You can make up and use arbitrary variables for metadata.

You can then call these variables using curly braces. For example, including `{{ "{{ page.title " }}}}` in the markdown of this page renders as "{{ page.title }}" (quotation marks added).