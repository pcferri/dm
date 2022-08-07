(function ($) {
	"use strict";

	var nav = $('nav');
	var navHeight = nav.outerHeight();

	$('.navbar-toggler').on('click', function () {
		if (!$('#mainNav').hasClass('navbar-reduce')) {
			$('#mainNav').addClass('navbar-reduce');
		}
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










var $instagram = {
    user: "dienimoraessemijoias",
    title: "SIGA NOSSO INSTAGRAM",
    limit: 6,
    userid: 17841437909613030
};

$.ajax({
	url: "https://app.dienimoraes.com.br/api/1.1/wf/get_instagram_access_token",
	dataType: "jsonp",
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



function emdesenvolvimento(){
	alert('O APP Dieni Moraes Semijoias está em fase final de desenvolvimento e nos próximos dias estará disponível.')
}


function testaCPF(strCPF) {
	var Soma;
	var Resto;
	Soma = 0;
	if (strCPF == "00000000000") return false;

	for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
	Resto = (Soma * 10) % 11;

	if ((Resto == 10) || (Resto == 11))  Resto = 0;
	if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

	Soma = 0;
	for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
	Resto = (Soma * 10) % 11;

	if ((Resto == 10) || (Resto == 11))  Resto = 0;
	if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
	return true;
}


function checkForm() {
  return $('input[type=text],select,.not-full,.full').filter(function () {
	  var isSelect = $(this).hasClass("full") || $(this).hasClass("not-full");
	  if(isSelect){
		  if($(this).hasClass("full")){
			$(this).removeClass("aviso");
			$(this).addClass("sucesso");
		  }else{
			$(this).addClass("aviso");
			$(this).removeClass("sucesso");
		  }
	  }else{		 
		  if($(this).val().trim().length === 0){
			$(this).addClass("aviso");
			$(this).removeClass("sucesso");
		  }else{
			$(this).removeClass("aviso");
			$(this).addClass("sucesso");
		  }
	  }	  
	  if(isSelect){
		return $(this).hasClass("not-full");  
	  }else{
		return $(this).val().trim().length === 0;
	  }    
  }).length;
}

// Restricts input for the set of matched elements to the given inputFilter function.
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
  $("input[name='cpf'],input[name='celular']").inputFilter(function(value) {
    return /^\d*$/.test(value);  
  });
});

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function enviarForm(){	
	var qtdValidacoes = checkForm();	
	if(qtdValidacoes == 0){	
		
		if(testaCPF($("input[name='cpf']").val()) == false){
			$("input[name='cpf']").removeClass("sucesso");
			$("input[name='cpf']").addClass("aviso");
			alert("O CPF informado é inválido.");
			$("input[name='cpf']").focus();
			return;
		}	

		if(validateEmail($("input[name='email']").val()) == false){
			$("input[name='email']").removeClass("sucesso");
			$("input[name='email']").addClass("aviso");
			alert("O e-mail informado é inválido.");
			$("input[name='email']").focus();
			return;
		}			
	
		var frm = $('#frmCadastro');	
		$('#cmdEnviar').hide();		
		$('.loader-wrapper').show();
		
		const urlParams = new URLSearchParams(window.location.search);
		var utm_campaign = urlParams.get('utm_campaign');
		var parameters = frm.serialize();
		if(utm_campaign != null){
			parameters += "&campanha="+utm_campaign
		}		
		$.ajax({
			type: frm.attr('method'),
			url: frm.attr('action'),
			data: parameters,
			success: function (data) {
				var result = JSON.parse(data);
				if(result.status == "success"){
					window.location.href = result.url;
				}else{
					$('#cmdEnviar').show();		
					$('.loader-wrapper').hide();
					alert(result.mensagem);
				}				
			},
			error: function (data) {
				$('#cmdEnviar').show();		
				$('.loader-wrapper').hide();
				alert("Ocorreu alguma falha no cadastramento, tente novamente mais tarde.");
			},
		});
	}
}
	
	
	
	
var xhr;
var select_state, $select_state;
var select_city, $select_city;
var estados = [{"id":11,"sigla":"RO","nome":"Rondônia","regiao":{"id":1,"sigla":"N","nome":"Norte"}},{"id":12,"sigla":"AC","nome":"Acre","regiao":{"id":1,"sigla":"N","nome":"Norte"}},{"id":13,"sigla":"AM","nome":"Amazonas","regiao":{"id":1,"sigla":"N","nome":"Norte"}},{"id":14,"sigla":"RR","nome":"Roraima","regiao":{"id":1,"sigla":"N","nome":"Norte"}},{"id":15,"sigla":"PA","nome":"Pará","regiao":{"id":1,"sigla":"N","nome":"Norte"}},{"id":16,"sigla":"AP","nome":"Amapá","regiao":{"id":1,"sigla":"N","nome":"Norte"}},{"id":17,"sigla":"TO","nome":"Tocantins","regiao":{"id":1,"sigla":"N","nome":"Norte"}},{"id":21,"sigla":"MA","nome":"Maranhão","regiao":{"id":2,"sigla":"NE","nome":"Nordeste"}},{"id":22,"sigla":"PI","nome":"Piauí","regiao":{"id":2,"sigla":"NE","nome":"Nordeste"}},{"id":23,"sigla":"CE","nome":"Ceará","regiao":{"id":2,"sigla":"NE","nome":"Nordeste"}},{"id":24,"sigla":"RN","nome":"Rio Grande do Norte","regiao":{"id":2,"sigla":"NE","nome":"Nordeste"}},{"id":25,"sigla":"PB","nome":"Paraíba","regiao":{"id":2,"sigla":"NE","nome":"Nordeste"}},{"id":26,"sigla":"PE","nome":"Pernambuco","regiao":{"id":2,"sigla":"NE","nome":"Nordeste"}},{"id":27,"sigla":"AL","nome":"Alagoas","regiao":{"id":2,"sigla":"NE","nome":"Nordeste"}},{"id":28,"sigla":"SE","nome":"Sergipe","regiao":{"id":2,"sigla":"NE","nome":"Nordeste"}},{"id":29,"sigla":"BA","nome":"Bahia","regiao":{"id":2,"sigla":"NE","nome":"Nordeste"}},{"id":31,"sigla":"MG","nome":"Minas Gerais","regiao":{"id":3,"sigla":"SE","nome":"Sudeste"}},{"id":32,"sigla":"ES","nome":"Espírito Santo","regiao":{"id":3,"sigla":"SE","nome":"Sudeste"}},{"id":33,"sigla":"RJ","nome":"Rio de Janeiro","regiao":{"id":3,"sigla":"SE","nome":"Sudeste"}},{"id":35,"sigla":"SP","nome":"São Paulo","regiao":{"id":3,"sigla":"SE","nome":"Sudeste"}},{"id":41,"sigla":"PR","nome":"Paraná","regiao":{"id":4,"sigla":"S","nome":"Sul"}},{"id":42,"sigla":"SC","nome":"Santa Catarina","regiao":{"id":4,"sigla":"S","nome":"Sul"}},{"id":43,"sigla":"RS","nome":"Rio Grande do Sul","regiao":{"id":4,"sigla":"S","nome":"Sul"}},{"id":50,"sigla":"MS","nome":"Mato Grosso do Sul","regiao":{"id":5,"sigla":"CO","nome":"Centro-Oeste"}},{"id":51,"sigla":"MT","nome":"Mato Grosso","regiao":{"id":5,"sigla":"CO","nome":"Centro-Oeste"}},{"id":52,"sigla":"GO","nome":"Goiás","regiao":{"id":5,"sigla":"CO","nome":"Centro-Oeste"}},{"id":53,"sigla":"DF","nome":"Distrito Federal","regiao":{"id":5,"sigla":"CO","nome":"Centro-Oeste"}}];

$select_state = $("select[name='estado']").selectize({
  onChange: function(value) {
	if (!value.length) return;
	var id_estado = 0;
	$.each(estados, function() {
		 if(this.sigla === value){ 
			id_estado = this.id;
		 } 
	});
	
	select_city.disable();
	select_city.clear();
	select_city.clearOptions();
	select_city.load(function(callback) {
	  xhr && xhr.abort();
	  xhr = $.ajax({
		url: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+ id_estado +'/municipios',
		success: function(results) {
		  select_city.enable();
		  callback(results);
		},
		error: function() {
		  callback();
		}
	  })
	});
  }
});

$select_city = $("select[name='cidade']").selectize({
  valueField: 'nome',
  labelField: 'nome',
  searchField: ['nome']
});

select_city  = $select_city[0].selectize;
select_state = $select_state[0].selectize;
select_state.setValue("RS");
select_city.disable();