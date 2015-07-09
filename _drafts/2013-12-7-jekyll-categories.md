---

layout: default
title: posts-by-category in Jekyll on Github Pages
tags:
- guide
- web
group: web

---

# categories or tags in Jekyll on github pages

Jekyll doesn't support getting all of the posts that belong to a category. This is annoying because it makes it difficult to make things like category archives or the menu on the left side of this page. 

I believe it's possible to get around this using Jekyll plugins, but Github Pages doesn't support those.

Fortunately, it's possible to get around this on the client side by creating a jekyll list of all posts, where the class of the post includes the category or tag, and then sorting that list using javascript/jquery.

## generate post list in jekyll

	<ul class="nav">
		{{ "{% for post in site.posts " }}%}
		<li class="{{ "{{ post.url " }}}}">
		    <a href="{{ "{{ post.url " }}}}">{{ "{{ post.title " }}}}</a>
		</li>
		{{ "{% endfor " }}%}
	</ul>

## reorder post list using jquery

### first step

	// sort nav by class

	// start by declaring an order for the options
	var array = ['rpi', 'web'];

	// then put the elements into that order
	$.each(array,function(index,value){
	   $('.nav').append($('.'+value));
	});

or, import [tinysort](http://tinysort.sjeiti.com/dist/jquery.tinysort.min.js) and just do 
	
	// sort nav by class

	$('.nav').children().tsort({attr:'class'});

### second step

	// group nav classes and add headers

	// first remove original ul
	$(".nav").children().unwrap()

	// then make new ones
	var collection = [];

	$('.topic').each(function() {
	    var thisClass = $(this).attr('class').split(" ")[0];
	    var nextBox = $(this).next().hasClass(thisClass);
	    
	    collection.push($(this));
	    
	    if(!nextBox)
	    {
	        var container = $('<h4>'+ thisClass + ':</h4> <ul class="nav nav-pills nav-stacked ' + thisClass + '"></div>');
	        container.insertBefore(collection[0]);
	        for(i=0;i<collection.length;i++)
	        {
	            collection[i].appendTo($('.nav').filter('.' + thisClass));
	        }
	        collection = [];
	    }
	})
