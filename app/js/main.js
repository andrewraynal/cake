(function($) {
  "use strict";

  	/*-----------------------------------------------------------------------------------*/
	/*	HIDE CONTENT BEFOR LOADED 
	/*-----------------------------------------------------------------------------------*/
	$(window).load(function() {
	  // When the page has loaded
	  $("#preload").fadeOut(1000);
	});

	$(document).ready(function(){

		/*-----------------------------------------------------------------------------------*/
		/*  FUNCTION: SET HEIGHT FULLSCREEN
		/*-----------------------------------------------------------------------------------*/
		function setHeight_fullscreen(element){
			var windowHeight = $(window).height();
			element.css('height',windowHeight);
		}

		/*-----------------------------------------------------------------------------------*/
		/*  FUNCTION: CONTENT MIDDLE 
		/*-----------------------------------------------------------------------------------*/

		function content_middle(wrap,content){
			var wrapHeight = wrap.height();
			var contentHeight = content.height();

			var middle_top = (wrapHeight - contentHeight)/2;

			content.css('margin-top',middle_top);
		}

		/*-----------------------------------------------------------------------------------*/
		/*  SLOGO ANIMATION
		/*-----------------------------------------------------------------------------------*/
		$('.slogo').hover(function(){
			$(this).animate({
				top: "+=8"
			});
		},function(){
			$(this).animate({
				top: "-=8"
			});
		});

		/*-----------------------------------------------------------------------------------*/
		/*  SLIDES FULL SCREEN
		/*-----------------------------------------------------------------------------------*/
		setHeight_fullscreen($('.slider-wrapper.fullscreen'));
		
		/*-----------------------------------------------------------------------------------*/
		/*  INNER SLIDE
		/*-----------------------------------------------------------------------------------*/
		// Features with Owl Carousel
		var innerslide = $("#inner-slide");

		innerslide.owlCarousel({		
			navigation : false, // Show next and prev buttons
			pagination: false,
			slideSpeed : 300,
			singleItem:true,
			autoPlay:3000,
			mouseDrag: true,
			stopOnHover: false,
			transitionStyle : 'fadeUp'
		});

		$('.slider-wrapper .inner-slide .group-text').each(function(){
			content_middle($('.slider-wrapper'),$(this));
		});

		/*-----------------------------------------------------------------------------------*/
		/*  CAROUSEL SLIDE
		/*-----------------------------------------------------------------------------------*/
		
		var carouselslide = $("#carousel-slide");

		carouselslide.owlCarousel({		
			navigation : false, // Show next and prev buttons
			pagination: true,
			slideSpeed : 300,
			singleItem:true,
			autoPlay:5000,
			mouseDrag: false,
			stopOnHover: false,
			transitionStyle : 'fade'
		});

		$('.slider-wrapper .carousel-slide .group-text').each(function(){
			content_middle($('.slider-wrapper'),$(this));
		})



		/*-----------------------------------------------------------------------------------*/
		/*  SMOOTH SCROLL MENU
		/*-----------------------------------------------------------------------------------*/
		$('.scroll-down').smoothScroll({
			offset: 0
		});
		$('.btn-scroll').smoothScroll({
			offset: 0
		});

		/*-----------------------------------------------------------------------------------*/
		/*  SCROLLREVEAL
		/*-----------------------------------------------------------------------------------*/
		window.scrollReveal = new scrollReveal();

		/*-----------------------------------------------------------------------------------*/
		/*  PARALLAX EFFECT (All Body)
		/*-----------------------------------------------------------------------------------*/
		$(function(){		
			$.stellar({
				horizontalScrolling: false
			});
		});

		/*-----------------------------------------------------------------------------------*/
		/*  HEADER FIXED 
		/*-----------------------------------------------------------------------------------*/
		$(window).bind('scroll', function() {
			var fixe = $('.slider-wrapper').height();
	        if ($(window).scrollTop() >= fixe) {
	        	$('.header-wrapper').addClass('fixed');
	        	$('body').css('padding-top','70px');

	        }
	        else {
	        	$('body').css('padding-top','0');
	        	$('.header-wrapper').removeClass('fixed');
	        }
    	});

    	/*-----------------------------------------------------------------------------------*/
		/*  MT SIDEBAR
		/*-----------------------------------------------------------------------------------*/
		function openmSidebar(){
			$('.mt-sidebar').animate({
				right: '0'
			},200);

			$('.all').animate({
				marginLeft: - $('.mt-sidebar').width()
			},200).addClass('mt-opened');

		};

		function closemSidebar(){
			$('.mt-sidebar').animate({
				right: - $('.mt-sidebar').width()
			},200);

			$('.all').animate({
				marginLeft: '0'
			},200,function(){
				$(this).css('margin-left','auto');
			}).removeClass('mt-opened');
		};

		$('.mt-sidebar-toggle-icon').click(function(){		
			
			if($('.mt-sidebar').css('right') == '0px'){
				$(this).removeClass('opened');
				closemSidebar();
			}else{
				$(this).addClass('opened');
				openmSidebar();		
			}
		});

		$('.mt-sidebar .close-mt-sidebar').click(function(){
			closemSidebar();
		})

		/*-----------------------------------------------------------------------------------*/
		/* If Window width / Resize
		/*-----------------------------------------------------------------------------------*/
		function ifWindow(){
			// Hide MT Sidebar when window resize form Small screen to larger srceen
			if($(window).width() >= 992){
				$('.mt-sidebar-toggle-icon').removeClass('opened');
				closemSidebar();
			}			
		}

		ifWindow();


		//Clone Main menu to Mobile/Tablet Sidebar
		$( ".main-nav .main-menu" ).clone().appendTo( ".mt-sidebar .main-nav" ).removeClass('visible-md-block visible-lg-block');

    	/*-----------------------------------------------------------------------------------*/
		/*  SMOOTH SCROLL MENU
		/*-----------------------------------------------------------------------------------*/
		$('.main-menu a').smoothScroll({
			offset: -69
		});


		/*-----------------------------------------------------------------------------------*/
		/*  MAIN MENU
		/*-----------------------------------------------------------------------------------*/
		$('.all .main-nav .main-menu li').hoverIntent(function(){
			$(this).find(' > ul').fadeIn(200);
		},function(){
			$(this).find('ul').fadeOut(100);
		});
		
		/*-----------------------------------------------------------------------------------*/
		/*	TIMER EFFECTS (Facts)
		/*-----------------------------------------------------------------------------------*/
		$('.feature-facts').appear(function() {
			$(".fact .number").each(function() {
				var counter = $(this).html();
				$(this).countTo({
					from: 0,
					to: counter,
					speed: 1000,
					refreshInterval: 20,
				});
			});
		});

		// Facts Hover
		$('.feature-facts .fact').hover(function(){
			$('.feature-facts .fact').not(this).stop().animate({opacity: 0.5},300);
			$(this).find('.icon').addClass('animated tada');		
		},function(){
			$('.feature-facts .fact').not(this).stop().animate({opacity: 1},300);
			$(this).find('.icon').removeClass('animated tada');
		});

		/*-----------------------------------------------------------------------------------*/
		/*  FEATURES 
		/*-----------------------------------------------------------------------------------*/
		// Show/Hide Feature Action
		$('.feature-item .feature-image').hoverIntent(function(){
			$(this).find('.feature-action').fadeIn(100);
			$(this).find('.feature-action .icon').addClass('animated bounceIn');
		},function(){
			$(this).find('.feature-action').fadeOut(400);
			$(this).find('.feature-action .icon').removeClass('animated bounceIn');
		});

		// Features with Owl Carousel
		var features = $("#features");

		features.owlCarousel({		
			navigation : false, // Show next and prev buttons
			pagination: true,
			slideSpeed : 300,
			singleItem:true,
			autoPlay:5000,
			mouseDrag: false,
			stopOnHover: true,
			transitionStyle : 'fade',
			afterInit: afterFeaturesInit,
			afterUpdate: afterFeatureRespond
		});

		function afterFeatureRespond(){

			if($(window).width() >= 992){
				$('.features .feature-item').each(function(){
					var currentFeatureItem = $(this);
					var currentFeatureContent = $(this).find('.middle-text');

					content_middle(currentFeatureItem,currentFeatureContent);
				});
			} else if($(window).width() < 992){
				$('.features .feature-item .middle-text').css('margin-top','0')
			}
			
		};

		function afterFeaturesInit(){

			$(window).load(function() {
			 	// Middle Feature Content
				if($(window).width() >= 992){
					$('.features .feature-item').each(function(){
						var currentFeatureItem = $(this);
						var currentFeatureContent = $(this).find('.middle-text');

						content_middle(currentFeatureItem,currentFeatureContent);
					});
				};	
			});		

			// add Custom PREV NEXT controls
	        $('.features').prepend('<span class="prev"><i class="fa fa-angle-left"></i></span>');
	        $('.features').append('<span href="#next" class="next"><i class="fa fa-angle-right"></i></span>');


	        // set Custom event for NEXT custom control
	        $(".features .next").click(function () {
	            features.trigger('owl.next');
	        });

	        // set Custom event for PREV custom control
	        $(".features .prev").click(function () {
	            features.trigger('owl.prev');
	        });
		}

		/*-----------------------------------------------------------------------------------*/
		/*	MEMBERS
		/*-----------------------------------------------------------------------------------*/
		$('.members > .xclose').click(function(){
			$(this).parent().slideUp(500).find('.member-profile').hide();
		});

		// Close
		$(document).mouseup(function (e){
		    var container = $(".members");
		    if (!container.is(e.target) // if the target of the click isn't the container...
		        && container.has(e.target).length === 0) // ... nor a descendant of the container
		    {
		        container.slideUp(500).find('.member-profile').hide();;
		    }
		});

		// Install Easy Pie Chart
		$(function() {
			$('.profile-facts .chart').easyPieChart({
				size: 128,
				scaleColor: false,
				lineWidth: 6
			});
		});
		

		// Open Profiles Item
		$('.profile-item .in-link').click(function(event){
			event.preventDefault();		
			$('.members .member-profile').hide();			
			$('.members').find($(this).attr('href')).show();
			$('.members').slideDown(300);
			
		});

		/*-----------------------------------------------------------------------------------*/
		/*	PROFILE ITEM
		/*-----------------------------------------------------------------------------------*/
		$('.profile-item .profile-image').BlackAndWhite({
	        hoverEffect:true,
			webworkerPath: false
	    });

		$('.profile-item').hover(function(){
			$(this).find('.profile-image .BWfade').fadeOut(300);
		},function(){			
			$(this).find('.profile-image .BWfade').fadeIn(200);
		});

		/*-----------------------------------------------------------------------------------*/
		/*	FANCY BOX
		/*-----------------------------------------------------------------------------------*/
		$(".fancybox").fancybox({
			openEffect	: 'none',
			closeEffect	: 'none'
		});
		
		//Fancy Media
		$('.fancybox-media').fancybox({
			openEffect  : 'none',
			closeEffect : 'none',
			helpers : {
				media : {}
			}
		});

		/*-----------------------------------------------------------------------------------*/
		/*	PORTFOLIO
		/*-----------------------------------------------------------------------------------*/
		$(function(){
		    $('.portfilio-grid').mixItUp();
		});

		$('.portfilio-grid .item').hoverIntent(function(){
			$(this).find('.overlay').fadeIn(300).find('.action .fa').addClass('animated bounceIn');
			$(this).find('.info').slideDown(100).find('.icon').addClass('animated bounceInUp');
		},function(){
			$(this).find('.overlay').fadeOut(100).find('.action .fa').removeClass('animated bounceIn');;
			$(this).find('.info').fadeOut(300).find('.icon').removeClass('animated bounceInUp');;
		});

		/*-----------------------------------------------------------------------------------*/
		/*  TESTIMONIALS
		/*-----------------------------------------------------------------------------------*/
		var testimonials = $("#testimonials");

		testimonials.owlCarousel({		
			navigation : false, // Show next and prev buttons
			pagination: false,
			slideSpeed : 300,
			singleItem:true,
			autoPlay:5000,
			addClassActive:true,
			transitionStyle: 'backSlide',
			afterInit: afterTesimonialsInit,
			afterAction : afterTesimonialsAction,

		});


		function afterTesimonialsInit(){

			for (var i = 1; i <= $('.testimonials .quote').length; i++) {
				 $('.carousel-pana').append('<span class="item"></span>')
			};

			var pafinatorsItem = $('.carousel-pana .item');

	        $.each(this.owl.userItems, function (i) {

	            $(pafinatorsItem[i]).append('<img class="avatar" src="' + $(this).find('.img').attr('src') + '"/>').click(function () {
	                testimonials.trigger('owl.goTo', i);
	            });
    
	        });


	        $('.carousel-pana').prepend('<span class="prev"><i class="fa fa-angle-left"></i></span>');
	        $('.carousel-pana').append('<span class="next"><i class="fa fa-angle-right"></i></span>');

			$(".carousel-pana .next").click(function(){
				testimonials.trigger('owl.next');
			})

			$(".carousel-pana .prev").click(function(){
				testimonials.trigger('owl.prev');
			})

			var x = this.owl.currentItem;
			
			pafinatorsItem.removeClass('active');
			$(pafinatorsItem[x]).addClass('active');

		}

		function afterTesimonialsAction(){
			var x = this.owl.currentItem;
			var pafinatorsItem = $('.carousel-pana .item');
			pafinatorsItem.removeClass('active');
			$(pafinatorsItem[x]).addClass('active');
			
		}


		/*-----------------------------------------------------------------------------------*/
		/*  BLOG SECTION
		/*-----------------------------------------------------------------------------------*/
		$('.post-article .post-feature').hover(function(){
			$(this).children('.post-feature-action').fadeIn(100);
			$(this).find('.post-feature-action .fa').addClass('animated bounceInDown');
		},function(){
			$(this).find('.post-feature-action .fa').removeClass('animated bounceInDown');
			$(this).children('.post-feature-action').fadeOut(100);
		});

		/*-----------------------------------------------------------------------------------*/
		/*  LOADMORE 
		/*-----------------------------------------------------------------------------------*/

		$('.btn-loadmore').hover(function(){
			$(this).find('.fa').addClass('fa-spin');
		},function(){
			$(this).find('.fa').removeClass('fa-spin');
		})

		/*-----------------------------------------------------------------------------------*/
		/*  NEWSLETTER
		/*-----------------------------------------------------------------------------------*/
		Ladda.bind( '.newsletter-x .btn-subscribe', {timeout: 2000 } );

		/*-----------------------------------------------------------------------------------*/
		/*  AJAX CONTACT FORM
		/*-----------------------------------------------------------------------------------*/
		$('#contact_form').submit(function() {
			var contact_name = $('#contact_name').val();
			var contact_email = $('#contact_email').val();
			var contact_message = $('#contact_message').val();

			var l = Ladda.create(document.querySelector('#contact_send'));
			// Start loading
			l.start();

			$('#contact_send').attr('disabled', 'disabled');
			$('#contact_form .status-text').remove();
			$.post("sendmail.php", {
				name : contact_name,
				email : contact_email,
				message : contact_message
			}).done(function(data) {
				//alert(data);
				// Stop loading
				l.stop();
				$('#contact_send').parent().append('<span class="status-text">Your message has sent !</span>');
			});
			return false;
		});

		/*-----------------------------------------------------------------------------------*/
		/*  BACK TO TOP
		/*-----------------------------------------------------------------------------------*/
		$(function () {
			// scroll body to 0px on click
			$('.back-to-top').click(function () {
				$('body,html').animate({
					scrollTop: 0
				}, 800);
				return false;
			});
		});


		/*-----------------------------------------------------------------------------------*/
		/*  FOOTER FIXED
		/*-----------------------------------------------------------------------------------*/
		
		if($('.footer-wrapper').hasClass('fixed')){
			var footerHeight = $('.footer-wrapper').height();
			$('.footer-wrapper.fixed').prev().css('margin-bottom',footerHeight);	
		}

		/*-----------------------------------------------------------------------------------*/
		/*  POST
		/*-----------------------------------------------------------------------------------*/
		$('.post .post-feature').hover(function(){
			$(this).children('.feature-action').fadeIn(100);
			$(this).find('.feature-action .fa').addClass('animated bounceInDown');
		},function(){
			$(this).find('.feature-action .fa').removeClass('animated bounceInDown');
			$(this).children('.feature-action').fadeOut(100);
		});

		/*-----------------------------------------------------------------------------------*/
		/*  CONTENT SIZE
		/*-----------------------------------------------------------------------------------*/		
		$('.post .size-minus').click(function(event){
			event.preventDefault();			
    		$('.post .post-content').animate({"font-size":"13px"},100);
		});

		$('.post .size-default').click(function(event){
			event.preventDefault();			
    		$('.post .post-content').animate({"font-size":"15px"},100);
		});

		$('.post .size-plus').click(function(event){
			event.preventDefault();			
    		$('.post .post-content').animate({"font-size":"17px"},100);
		})

		/*-----------------------------------------------------------------------------------*/
		/*  WINDOW RESIZE 
		/*-----------------------------------------------------------------------------------*/
		$(window).resize(function() {
	  		setHeight_fullscreen($('.slider-wrapper.fullscreen'));
	  		
	  		$('.slider-wrapper .inner-slide .group-text').each(function(){
				content_middle($('.slider-wrapper'),$(this));
			});

	  		ifWindow();	  

		});

	});

})(jQuery);