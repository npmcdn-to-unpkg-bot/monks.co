---
published: true
slug: markdown-nano
title: Add markdown syntax highlighting to nano
categories:
  - guide
  - linux
year: 2013
---

# add markdown syntax highlighting to nano

I almost always write in [markdown](http://daringfireball.net/projects/markdown/syntax), it's a *super easy* way to add basic markup to text files in a human readable way (unlike `<ugly>html tags</ugly>`).

For example, here's the markdown for the previous paragraph:

	I almost always write in [markdown](http://daringfireball.net/projects/markdown/syntax),
	it's a *super easy* way to add basic markup to text files in a human readable way
	(unlike `<ugly>html tags</ugly>`).

You'll notice that the markdown block above is highlighted weird: part of the link is a strange color, and the apostrophe in "it's" starts a highlighted quote. Proper syntax highlighting can be helpful, even when writing prose.

Here's how to set up markdown syntax highlighting in nano, the simplest command-line text editor.

## how-to

symlink syntax into proper folder, then enable it

	sudo cp ~/rpi-setup/src/markdown.nanorc /usr/share/nano/markdown.nanorc
	cat /usr/share/nano/markdown.nanorc > ~/.nanorc

### credit

from [serialhex's github](https://github.com/serialhex/nano-highlight)
