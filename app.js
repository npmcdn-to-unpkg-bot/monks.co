// app.js    



// lazy loader

// $(document).ready(function() {
//     setImageHeight();
//     $('.bttrlazyloading').bttrlazyloading({
//         backgroundcolor: '#ffffff',
//         threshold: 600,
//         animation: "fadeIn"
//     });
// })


// image height setter

$( window ).resize(function() {
    setImageHeight();
});

function setImageHeight() {
    $('#silhouette').css( 'min-height', Math.max( ($('#name').height() + $('#bio').height()) , $("#logo").height() ) );
}

$(document).ready(function() {
	setImageHeight();
})



// css switcher

$(document).ready(function() {
    // red
    $("#css-resume").click(function() {
        $('<link>').attr({
            'rel': 'stylesheet',
            'href': 'stylesheets/print.css'
        }).appendTo('head')
    });
});



// navigation maker

$(document).ready(function() {
	$('h3.summary').each(function(i) {
		$('#navlist').append(  "<li class='navlink'><a href='#" + $(this).parent().parent().attr('id') + "'> " + $(this).text() );
	})


	var $menu = $('#menu'),
		$html = $('html, body');


	$menu.mmenu({

	});
	$menu.find( 'li > a' ).on(
		'click',
		function()
		{
			var href = $(this).attr( 'href' );

			//	if the clicked link is linked to an anchor, scroll the page to that anchor 
			if ( href.slice( 0, 1 ) == '#' )
			{
				$menu.one(
					'closed.mm',
					function()
					{
						setTimeout(
							function()
							{
								$html.animate({
									scrollTop: $( href ).offset().top
								});	
							}, 10
						);	
					}
				);						
			}
		}
	);
});



// navigation scroll watcher

$("navlink").each(function() {
	var t = $("#anchor-point").offset().top;

	$(document).scroll(function(){
	    if($(this).scrollTop() > t)
	    {   
	        $(this).addClass('mm-selected');
	    }
	});
})



// google analyzer

var _gaq = _gaq || [];
var pluginUrl =
    '//www.google-analytics.com/plugins/ga/inpage_linkid.js';
_gaq.push(['_require', 'inpage_linkid', pluginUrl]);
_gaq.push(['_setAccount', 'UA-37834146-1']);
_gaq.push(['_trackPageview']);
(function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();