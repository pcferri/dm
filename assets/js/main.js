(function ($) {
	"use strict";

	var instagramCarregado = false;
	var nav = $('nav');
	var navHeight = nav.outerHeight();

	$('.navbar-toggler').on('click', function () {
		if (!$('#mainNav').hasClass('navbar-reduce')) {
			$('#mainNav').addClass('navbar-reduce');
		}
	});
	
	// Navbar Menu Reduce 
	
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
		
		if($(this).scrollTop() > 4000 && instagramCarregado == false){
			instagramCarregado = true;
			var $instagram = {
				user: "dienimoraessemijoias",
				title: "SIGA NOSSO INSTAGRAM",
				limit: 6,
				userid: 17841437909613030
			};

			$.ajax({
				url: "https://app.dienimoraes.com.br/api/1.1/wf/get_instagram_access_token",
				type: "GET",
				success: function(tt) {
					var i = $("#instagram-grupo")
						, o = tt.response.access_token
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
		
		}		
		
		
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
	

	// Closes responsive menu when a scroll trigger link is clicked
	$('.menu-principal').on("click", function () {
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
        margin: 100,
        mouseDrag:true,
        autoplay:true,
        dots: true,
		center:true,
		width:200,
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
	
	
	// about owlCarousel
    $('.about-slide.owl-carousel').owlCarousel({
        loop: true
        , margin: 5
        , mouseDrag: true
        , autoplay: true
		, smartSpeed:800
        , dots: false
        , responsiveClass: true
        , responsive: {
            0: {
                items: 1
            , }
            , 600: {
                items: 1
            }
            , 1000: {
                items: 1
            }
        }
    });
    
    // Testimonials owlCarousel
    $('.testimonial-slide .owl-carousel').owlCarousel({
        loop: true
        , margin: 5
        , mouseDrag: true
        , autoplay: true
        , dots: false
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



$.extend(true, $.magnificPopup.defaults, {  
    iframe: {
        patterns: {
           youtube: {
              index: 'youtube.com/', 
              id: 'v=', 
              src: 'https://www.youtube.com/embed/%id%?autoplay=1' 
          }
        }
    }
});

(function($) {
  $.fn.inputFilter = function(inputFilter) {
	return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
	  if (inputFilter(this.value)) {
		this.oldValue = this.value;
		this.oldSelectionStart = this.selectionStart;
		this.oldSelectionEnd = this.selectionEnd;
	  } else if (this.hasOwnProperty("oldValue")) {
		this.value = this.oldValue;
		this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
	  } else {
		this.value = "";
	  }
	});
  };
}(jQuery));

$(document).ready(function() {
	const urlParams = new URLSearchParams(window.location.search);	
	var utm_campaign = urlParams.get('utm_campaign');
	if(utm_campaign == null){
		utm_campaign = 'utm_campaign=site';
	}
	
	var ref = '&ref=' + encodeURIComponent(document.referrer);
	$(".pagina-cadastro").attr("href", "https://app.dienimoraes.com.br/seja-uma-revendedora-semijoias-consignadas-dieni-moraes-semijoias?"+ utm_campaign + ref);
	
	$("input[name='celular']").inputFilter(function(value) {
		return /^\d*$/.test(value);
	  });
	
	var form = $('#contact-form');

	// Get the messages div.
	var formMessages = $('.form-message');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();
		
		$("#cmdEnviar").text("Enviando mensagem...");
		$("#cmdEnviar").prop("disabled", true);


		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text(JSON.parse(response).message);

			// Clear the form.
			$('#contact-form input,#contact-form textarea').val('');
			$("#cmdEnviar").prop("disabled",false);			
			$("#cmdEnviar").text("Enviar mensagem");
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');
			$("#cmdEnviar").prop("disabled",false);			
			$("#cmdEnviar").text("Enviar mensagem");
			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Desculpe, ocorreu algum problema e sua mensagem não foi enviada, tente novamente.');
			}
		});
	});


});