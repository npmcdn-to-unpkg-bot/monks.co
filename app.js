// app.js    


// smooth scroller

$(document).ready(function() {

  $(document).on('click', 'a[href*="#"]', function() {
    var slashedHash = '#/' + this.hash.slice(1);
    if ( this.hash ) {

      if ( slashedHash === location.hash ) {
        $.smoothScroll({scrollTarget: this.hash});
      } else {
        $.bbq.pushState(slashedHash);
      }

      return false;
    }
  });

  $(window).bind('hashchange', function(event) {
    var tgt = location.hash.replace(/^#\/?/,'');
    if ( document.getElementById(tgt) ) {
      $.smoothScroll({scrollTarget: '#' + tgt});
    }
  });

  $(window).trigger('hashchange');
});



// lazy loader

$(document).ready(function() {
    setImageHeight();
    $('.bttrlazyloading').bttrlazyloading({
        backgroundcolor: '#ffffff',
        threshold: 600,
        animation: "fadeIn"
    });
})

$( window ).resize(function() {
    setImageHeight();
});

function setImageHeight() {
    $('#silhouette').css( 'min-height', Math.max( ($('#name').height() + $('#bio').height()) , $("#logo").height() ) );
}



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



// typekit loader

try {
    Typekit.load();
} catch (e) {}



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