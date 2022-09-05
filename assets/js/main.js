var instagramCarregado = false;
var fotosProdutosCarregados = false;
var depoimentosCarregados = false;
var nav = $('nav');
var navHeight = nav.outerHeight();

$('.navbar-toggler').on('click', function () {
	if (!$('#mainNav').hasClass('navbar-reduce')) {
		$('#mainNav').addClass('navbar-reduce');
	}
});

$(window).on('scroll', function () {
	scrollWindow();
});

function scrollWindow(){
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
	
	if($(this).scrollTop() >= 4000 && instagramCarregado == false){
		instagramCarregado = true;
		carregarInstagram();	
	}
	
	if($(this).scrollTop() >= 3000 && fotosProdutosCarregados == false){
		fotosProdutosCarregados = true;
		carregarFotosProdutos();	
	}
	
	if($(this).scrollTop() >= 2000 && depoimentosCarregados == false){
		depoimentosCarregados = true;
		carregarDepoimentos();	
	}
	
	
	
	if ($(this).scrollTop() > 100) {
		$('.back-to-top').fadeIn('slow');
	} else {
		$('.back-to-top').fadeOut('slow');
	}

	//Show the navbar after reorganize the DOM
	$("#mainNav").removeClass("no-show");
}

function carregarInstagram(){
		
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
								autoplayHoverPause:true,
								animateOut: 'fadeOut',
								animateIn: 'fadeIn',
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
										items:4
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

function carregarFotosProdutos(){
	var i = $("#fotos-produtos");
	
	i.append('<div class="screenshort-item"><img src="assets/img/semijoias/semijoia-na-modelo-2.webp" class="img-fluid" /></div>');
	i.append('<div class="screenshort-item"><img src="assets/img/semijoias/semijoia-brinco.webp" class="img-fluid" /></div>');
	i.append('<div class="screenshort-item"><img src="assets/img/semijoias/semijoia-na-modelo-3.webp" class="img-fluid" /></div>');
	i.append('<div class="screenshort-item"><img src="assets/img/semijoias/semijoia-na-modelo-4.webp" class="img-fluid" /></div>');
	i.append('<div class="screenshort-item"><img src="assets/img/semijoias/conjunto-de-semijoias.webp" class="img-fluid" /></div>');
	i.append('<div class="screenshort-item"><img src="assets/img/semijoias/semijoia-colar.webp" class="img-fluid" /></div>');
	i.append('<div class="screenshort-item"><img src="assets/img/semijoias/semijoia-pulseira.webp" class="img-fluid" /></div>');
	i.append('<div class="screenshort-item"><img src="assets/img/semijoias/semijoia-pulseira-2.webp" class="img-fluid" /></div>');
	i.append('<div class="screenshort-item"><img src="assets/img/semijoias/semijoia-pulseira-3.webp" class="img-fluid" /></div>');
	i.append('<div class="screenshort-item"><img src="assets/img/semijoias/semijoia-na-modelo-1.webp" class="img-fluid" /></div>');
	i.append('<div class="screenshort-item"><img src="assets/img/semijoias/semijoia-anel.webp" class="img-fluid" /></div>');


	// Screenshort-slide owlCarousel
	$('.screenshort-slide.owl-carousel').owlCarousel({
		loop:true,
		margin: 100,
		mouseDrag:true,
		autoplay:true,
		dots: true,
		center:true,
		smartSpeed:800,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		autoplayHoverPause:true,
		responsiveClass:true,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:1
			},
			1000:{
				items:4
			}
		}
	});

}


function carregarDepoimentos(){
	var i = $("#depoimentos-dieni-moraes-semijoias");
	i.append("<div class='single-testimonial'>	<div class='testimonial-content-inner'><div class='testimonial-rating'>	<img src='assets/img/depoimentos/revendedora-jessica.webp'/></div><div class='testimonial-text'>	<h4>Jéssica - Santa Maria</h4>	<p>Guriaaas, gostaria de dizer para vocês com toda sinceridade do mundo, ameeeei as peças, cada mês eu fico ainda mais surpresa, uma peça mais linda que a outra, tem para todos os gostos! Minhas clientes ficam de cara porque toda vez que mostro as peças, elas tem que ficar com alguma coisa porque se apaixonam!!! E sem contar que sempre ficam chocadas com a qualidade delas e todos os benefícios de adquirir uma semijoia da nossa marca!! E obviamente, eu já adquiri muitas pecinhas para mim também né, não podia perder essa oportunidade. Estou apaixonada, nunca mais compro de outra marca!!</p></div>                                   	</div></div><div class='single-testimonial'><div class='testimonial-content-inner'>	<div class='testimonial-rating'>	   <img src='assets/img/depoimentos/revendedora-luana.webp'/>	</div>	<div class='testimonial-text'><h4>Luana - Panambi</h4><p>Me surpreendi muito tanto com as peças que são lindas e de ótima qualidade, quanto com o atendimento e o carinho de todas as meninas que ali juntas estão trabalhando para nos dar apoios e nos ajudar a superar ainda mais nossas vendas! Pensei que seria mais difícil, mas no meu segundo mês eu já me superei tanto e fiquei tão feliz que ultrapassei a meta que havia colocado para mim mesma! As minhas clientes esperam ansiosas para cada novo kit, que a cada mês vem ainda mais peças lindas e incríveis! Agradeço a Dieni pelo apoio e pela chance de estar fazendo parte dessa equipe maravilhosa!</p>	</div>                                   </div>	</div>   <div class='single-testimonial'>	<div class='testimonial-content-inner'><div class='testimonial-rating'>	<img src='assets/img/depoimentos/revendedora-ana.webp'/></div><div class='testimonial-text'>	<h4>Ana - Aceguá</h4>	<p>Me tornar uma Consultora Dieni Moraes semijoias, era o que precisava para conquistar meus objetivos, apesar de ser minha única renda, eu consigo tirar um bom lucro por mês, e o melhor, consigo trabalhar em casa cuidando da minha família. Obrigada empresa Dieni Moraes por confiar em mim.</p></div>                                   	</div></div>	 <div class='single-testimonial'>	<div class='testimonial-content-inner'><div class='testimonial-rating'>	<img src='assets/img/depoimentos/revendedora-leticia.webp'/></div><div class='testimonial-text'>	<h4>Letícia - Três Cachoeiras</h4>	<p>Desde já quero agradecer pela oportunidade de ser uma consultora e representar vocês em minha cidade. É um prazer fazer parte dessa equipe onde só recebo elogios a cada peça vendida ou mostrada, a cada dia tenho mais e mais satisfação em estar com vocês da Dieni Moraes Semijoias, além de ser uma renda extra me abre novos horizontes, novos caminhos onde eu estou amando, me sinto muito feliz em poder ajudar na autoestima de outras mulheres através de semijoias lindas e de qualidade.</p></div>                                   	</div></div>	 <div class='single-testimonial'><div class='testimonial-content-inner'>	<div class='testimonial-rating'><img src='assets/img/depoimentos/revendedora-caroline.webp'/>	</div>	<div class='testimonial-text'><h4>Caroline - Tupanciretã</h4><p>Ser uma consultora Dieni Moraes Semijóias é repassar qualidade, confiança e empoderamento para as minhas clientes. E a equipe que nos dá suporte é nota mil. Amo muito tudo isso!</p>	</div>                                   </div>	</div>		  	  <div class='single-testimonial'>	<div class='testimonial-content-inner'><div class='testimonial-rating'>	<img src='assets/img/depoimentos/revendedora-sandra.webp'/></div><div class='testimonial-text'>	<h4>Sandra - Nova Petrópolis</h4>	<p>Estou amando fazer parte da equipe e dos produtos e as clientes também. Só gratidão</p></div>                                   	</div></div>	 <div class='single-testimonial'>	<div class='testimonial-content-inner'><div class='testimonial-rating'>	<img src='assets/img/depoimentos/revendedora-simone.webp'/></div><div class='testimonial-text'>	<h4>Simone - Herval</h4>	<p>São peças maravilhosas. Eu sinto na palavra das minhas clientes e amigas como elas gostam e estão amando tudo. Eu não tenho nem como descrever como eu estou amando vender e também poder usar estas peças de qualidade e poder compartilhar com minhas amigas e clientes. Só gratidão por esta oportunidade!! </p></div>                                   	</div></div>		 <div class='single-testimonial'><div class='testimonial-content-inner'>	<div class='testimonial-rating'><img src='assets/img/depoimentos/revendedora-juliana.webp'/>	</div>	<div class='testimonial-text'><h4>Juliana - Marau</h4><p>Me tornei consultora Dieni Moraes em busca de uma renda extra. Atendimento sempre foi muito cordial e uma empresa muito correta. As semijoias no começo fiquei um pouco de receio na qualidade, mas hoje eu com certeza garanto ser peças de excelente qualidade e de um bom gosto e delicadeza.</p>	</div>                                   </div>	</div>		 <div class='single-testimonial'><div class='testimonial-content-inner'>	<div class='testimonial-rating'>	   <img src='assets/img/depoimentos/revendedora-veridiane.webp'/>	</div>	<div class='testimonial-text'><h4>Veridiane - Esteio</h4><p>Conheci a marca Dieni Moraes semijoias numa fase bem difícil da minha vida, estava em tratamento de um câncer que com a graça de Deus estou curada, a partir daí conheci as meninas que são muito atenciosas, amo cada peça, cada kit é uma espectativa. Super recomendo</p>		</div>                                   </div>	</div>");
	
	// Testimonials owlCarousel
	$('.testimonial-slide .owl-carousel').owlCarousel({
		onInitialize : function(){
			$('.testimonial-slide .owl-carousel').randomize();
		}
		, loop: true
		, margin: 100
		, mouseDrag: true
		, autoplay: true
		, dots: true
		, animateOut: 'fadeOut'
		, autoplayHoverPause:true
		, animateIn: 'fadeIn'
		, smartSpeed:800
		, responsiveClass: true
		, responsive: {
			0: {
				items: 1
			, }
			, 600: {
				items: 1
			}
			, 1000: {
				items: 2
			}
		}
	});

}


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




// about owlCarousel
$('.about-slide.owl-carousel').owlCarousel({
	loop: true
	, margin: 5
	, mouseDrag: true
	, autoplay: true
	, smartSpeed:800
	, width:200
	, dots: false
	, autoplayHoverPause:true
	, animateOut: 'fadeOut'
	, animateIn: 'fadeIn'
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

$.fn.randomize = function(selector){
  var $elems = selector ? $(this).find(selector) : $(this).children(),
  $parents = $elems.parent();

  $parents.each(function(){
	$(this).children(selector).sort(function(){
		return Math.round(Math.random()) - 0.5;
	}).detach().appendTo(this);
  });

  return this;
};




	

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

function limpaMsg(){
	var formMessages = $('.form-message');
	$(formMessages).removeClass('success');
	$(formMessages).removeClass('error');
	$(formMessages).removeClass('info');
	$(formMessages).text("");	
	
	var formMessagesCadastro = $('.form-message-cadastro');
	$(formMessagesCadastro).removeClass('success');
	$(formMessagesCadastro).removeClass('error');
	$(formMessagesCadastro).removeClass('info');
	$(formMessagesCadastro).text("");
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
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

$(document).ready(function() {	
	scrollWindow();
	
	$("#txtCelular,#txtCpf,input[name='cpf'],input[name='celular'],input[name='validacao']").inputFilter(function(value) {
		return /^\d*$/.test(value);
	});
	
	var formContato = $('#contact-form');

	// Get the messages div.
	var formMessages = $('.form-message');

	// Set up an event listener for the contact formContato.
	$(formContato).submit(function(e) {
		// Stop the browser from submitting the formContato.
		e.preventDefault();
		
		if($("#contact-form :input[name='validacao']").val() != "5"){	
			$(formMessages).removeClass('success');
			$(formMessages).removeClass('error');
			$(formMessages).addClass('info');					
			$(formMessages).text("Responda corretamente quanto é 2 + 3 para ser enviado o seu formulário de contato.");
			
			$([document.documentElement, document.body]).animate({
				scrollTop: $(".form-message").offset().top -120
			}, 200);
			return;
		}		
		
		$("#cmdEnviar").text("Enviando mensagem...");
		$("#cmdEnviar").prop("disabled", true);


		// Serialize the formContato data.
		var formData = $(formContato).serialize();

		// Submit the formContato using AJAX.
		$.ajax({
			type: 'POST',
			url: "https://app.dienimoraes.com.br/api/1.1/wf/site_novo_contato",
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).removeClass('info');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text(JSON.parse(response).message);

			// Clear the formContato.
			$('#contact-form input,#contact-form textarea').val('');
			$("#cmdEnviar").prop("disabled",false);			
			$("#cmdEnviar").text("Enviar mensagem");
			
			$([document.documentElement, document.body]).animate({
				scrollTop: $(".form-message").offset().top -120
			}, 200);
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');
			$(formMessages).removeClass('info');
			$("#cmdEnviar").prop("disabled",false);			
			$("#cmdEnviar").text("Enviar mensagem");
			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Desculpe, ocorreu algum problema e sua mensagem não foi enviada, tente novamente.');
			}
			$([document.documentElement, document.body]).animate({
				scrollTop: $(".form-message").offset().top -120
			}, 200);
		});
	});
	
	
	
	var formCadastro = $('#frmCadastro');

	// Get the messages div.
	var formMessagesCadastro = $('.form-message-cadastro');

	// Set up an event listener for the contact formCadastro.
	$(formCadastro).submit(function(e) {
		// Stop the browser from submitting the formCadastro.
		e.preventDefault();

		if(testaCPF($("#txtCpf").val()) == false){
			$(formMessagesCadastro).removeClass('success');
			$(formMessagesCadastro).removeClass('error');
			$(formMessagesCadastro).addClass('info');					
			$(formMessagesCadastro).text("O CPF informado é inválido.");
			
			$([document.documentElement, document.body]).animate({
				scrollTop: $(formMessagesCadastro).offset().top -120
			}, 200);
			return;
		}	

		if(validateEmail($("#txtEmail").val()) == false){
			$(formMessagesCadastro).removeClass('success');
			$(formMessagesCadastro).removeClass('error');
			$(formMessagesCadastro).addClass('info');					
			$(formMessagesCadastro).text("O e-mail informado é inválido.");
			
			$([document.documentElement, document.body]).animate({
				scrollTop: $(formMessagesCadastro).offset().top -120
			}, 200);
			return;			
		}					
		
		$("#cmdEnviarCadastro").text("Processando...");
		$("#cmdEnviarCadastro").prop("disabled", true);


		const urlParamsCadastro = new URLSearchParams(window.location.search);
		var referenciaCadastro = encodeURIComponent(document.referrer);
		var utm_campaignCadastro = urlParamsCadastro.get('utm_campaign');

		// Submit the formCadastro using AJAX.
		$.ajax({
			type: 'POST',
			url: "https://app.dienimoraes.com.br/api/1.1/wf/cadastrar_candidata_formulario_p1",
			data: {"nome_completo":$("#txtNome").val(), "celular":$("#txtCelular").val(), "email":$("#txtEmail").val(), "cpf":$("#txtCpf").val(), "utm_campaign": utm_campaignCadastro, "referencia" : referenciaCadastro},
		})
		.done(function(response) {
			var result = JSON.parse(response);
			if(result.status == "success"){
				window.location.href = result.url;
			}else{
				$(formMessagesCadastro).removeClass('success');
				$(formMessagesCadastro).removeClass('error');
				$(formMessagesCadastro).addClass('info');
				$("#cmdEnviarCadastro").prop("disabled",false);
				$("#cmdEnviarCadastro").text("Quero me candidatar agora");
				(formMessagesCadastro).text(result.mensagem);
				
				$([document.documentElement, document.body]).animate({
					scrollTop: $(formMessagesCadastro).offset().top -120
				}, 200);
			}
		})
		.fail(function(data) {
			// Make sure that the formMessagesCadastro div has the 'error' class.
			$(formMessagesCadastro).removeClass('success');
			$(formMessagesCadastro).addClass('error');
			$(formMessagesCadastro).removeClass('info');
			$("#cmdEnviarCadastro").prop("disabled",false);			
			$("#cmdEnviarCadastro").text("Quero me candidatar agora");
			// Set the message text.
			if (data.responseText !== '') {
				$(formMessagesCadastro).text(data.responseText);
			} else {
				$(formMessagesCadastro).text('Desculpe, ocorreu algum problema e sua mensagem não foi enviada, tente novamente.');
			}
			$([document.documentElement, document.body]).animate({
				scrollTop: $(formMessagesCadastro).offset().top -120
			}, 200);
		});
	});


});

(function(history) {
	var pushState = history.pushState;
	history.pushState = function(state) {
		if (typeof history.onpushstate == "function")
		{
			history.onpushstate({
				state: state
			});
		}
		return pushState.apply(history, arguments);
	}
})(window.history);
window.onpopstate = history.onpushstate = function(e)
{
	if(window.location.hash != ""){
		$('link[rel="canonical"]').attr('href', 'https://www.dienimoraes.com.br/'+ window.location.hash);
	}
};
if(window.location.hash != ""){
	$('link[rel="canonical"]').attr('href', 'https://www.dienimoraes.com.br/'+ window.location.hash);
}