/*******************************************************
    Template Name    : Shama - App Landing HTML Template
    Author           : cute_theme
    Version          : 1.0
    Created          : 2020
    File Description : Main Reaposive file of the template
*******************************************************/
(function ($) {
	"use strict";

	var nav = $('nav');
	var navHeight = nav.outerHeight();

	$('.navbar-toggler').on('click', function () {
		if (!$('#mainNav').hasClass('navbar-reduce')) {
			$('#mainNav').addClass('navbar-reduce');
		}
	});
	
	// START PRELOADED
    $(window).on('load', function() {
        $('.loader-wrapper').fadeOut();
        $('.loader-wrapper').delay(350).fadeOut('slow');
    });
	
	// Navbar Menu Reduce 
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50;
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-md').addClass('navbar-reduce');
			$('.navbar-expand-md').removeClass('navbar-trans');
		} else {
			$('.navbar-expand-md').addClass('navbar-trans');
			$('.navbar-expand-md').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});

	// Back to top button 
	$(window).on("scroll", function () {
		if ($(this).scrollTop() > 100) {
			$('.back-to-top').fadeIn('slow');
		} else {
			$('.back-to-top').fadeOut('slow');
		}
	});
	$('.back-to-top').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1500, 'easeInOutExpo');
		return false;
	});

	//  Star ScrollTop
	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	//  Star Scrolling nav
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 30)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});
	
    // Choose owlCarousel
    $('.choose-area .owl-carousel').owlCarousel({
        loop:true,
        mouseDrag:true,
        autoplay:true,
        dots: false,
        responsiveClass:true,
        responsive:{
            0:{
                margin: 10,
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
    });

    // Screenshort-slide owlCarousel
    $('.screenshort-slide.owl-carousel').owlCarousel({
        loop:true,
        margin: 30,
        mouseDrag:true,
        autoplay:true,
        dots: false,
		center:true,
		smartSpeed:800,
        responsiveClass:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    });
    
    // Testimonials owlCarousel
    $('.testimonial-slide .owl-carousel').owlCarousel({
        loop: true
        , margin: 5
        , mouseDrag: true
        , autoplay: true
        , dots: true
        , responsiveClass: true
        , responsive: {
            0: {
                items: 1
            , }
            , 600: {
                items: 2
            }
            , 1000: {
                items: 2
            }
        }
    });
	
    //  POPUP VIDEO
    $('.popup-video').magnificPopup({
		type: 'iframe',
	});
	
	//  Accordion
	$(".accordion").on("click",".title", function () {

        $(this).next().slideDown();

        $(".accordion-info").not($(this).next()).slideUp();

    });

    $(".accordion").on("click",".item", function () {

        $(this).addClass("active").siblings().removeClass("active");

    });
	
})(jQuery);




if (typeof MauticSDKLoaded == 'undefined') {
	var MauticSDKLoaded = true;
	var head            = document.getElementsByTagName('head')[0];
	var script          = document.createElement('script');
	script.type         = 'text/javascript';
	script.src          = 'https://mautic.dienimoraes.com.br/media/js/mautic-form.js';
	script.onload       = function() {
		MauticSDK.onLoad();
	};
	head.appendChild(script);
	var MauticDomain = 'https://mautic.dienimoraes.com.br';
	var MauticLang   = {
		'submittingMessage': "Por favor, aguarde..."
	}
}else if (typeof MauticSDK != 'undefined') {
	MauticSDK.onLoad();
}














var $instagram = {
    user: "dienimoraessemijoias",
    title: "SIGA NOSSO INSTAGRAM",
    limit: 6,
    token: 'IGQVJYWldkTDZAjWWZANUVd3dXY3ZAVNER2t2VVl2WjZATRk90bDRVenMtZAHhKWXptMzl4UXI2eXRmUU1GQTF0VFRKcGxNODZALaE42bFRIRW5xSGdTQTJYMXhKLVlxcUc0YzhtUVNtZAVZAB',
    userid: 17841437909613030
};

$.ajax({
	url: "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token="+$instagram.token,
	dataType: "jsonp",
	type: "GET",
	success: function(tt) {
		var i = $("#instagram-grupo")
			, o = (tt.access_token ? tt.access_token : $instagram.token)
			, a = $instagram.userid;
		$.ajax({
			url: "https://graph.instagram.com/me/media?fields=permalink,media_url,media_type,thumbnail_url&access_token="+o,
			dataType: "jsonp",
			type: "GET",
			success: function(t) {
				if(t.error){
					$("#instagram-grupo").hide();
				}else{
					var limit = (t.data.length > $instagram.limit ? $instagram.limit : t.data.length);
					for (var e = 0; e < limit; e++){
						i.append('<div class="screenshort-item"><a href="' + t.data[e].permalink +  '" '+ (t.data[e].media_type == "VIDEO" ? ' class="video" ' : '') +'  target="_blank"><img src="' + (t.data[e].media_type == "VIDEO" ? t.data[e].thumbnail_url : t.data[e].media_url) + '" class="img-fluid" /></a></div>');
					}
										
					 // instagram-slide owlCarousel
					$('.instagram.owl-carousel').owlCarousel({
						loop:true,
						margin: 30,
						mouseDrag:true,
						autoplay:true,
						dots: false,
						center:true,
						smartSpeed:800,
						responsiveClass:true,
						responsive:{
							0:{
								items:1
							},
							600:{
								items:3
							},
							1000:{
								items:5
							}
						}
					});
					
					
				}
			},
			error: function(t) {
				$("#instagram-grupo").hide()
			}
		})

	},
	error: function(t) {
		$("#instagram-grupo").hide()
	}
})



function emdesenvolvimento(){
	alert('O APP Consultoras Dieni Moraes está em fase final de desenvolvimento e nas próximas semanas estará disponível.')
}


function checkForm() {
  return $('input[type=text]').filter(function () {
	  if($(this).val().trim().length === 0){
		$(this).addClass("aviso");
		$(this).removeClass("sucesso");
	  }else{
		$(this).removeClass("aviso");
		$(this).addClass("sucesso");
	  }
    return $(this).val().trim().length === 0;
  }).length;
}

function enviarForm(){	
	if(checkForm() == 0){	
		var frm = $('#contact-form');	
		$('#cmdEnviar').hide();

		$.ajax({
			type: frm.attr('method'),
			url: frm.attr('action'),
			data: frm.serialize(),
			success: function (data) {
				window.location.href="https://lp.dienimoraes.com.br/obrigado-revendedora";
			},
			error: function (data) {
				window.location.href="https://lp.dienimoraes.com.br/obrigado-revendedora";
			},
		});
	}
}

