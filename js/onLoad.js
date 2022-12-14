import anime from './libs/anime.min.js';

document.addEventListener('DOMContentLoaded', function() {

	// greeting
	anime({
		targets: '.header__heading',
		translateY: [-30, 0],
		opacity: 1,
		delay: 300,
		easing: 'easeOutQuart'
	})
	// description
	anime({
		targets: '.header__description',
		translateY: [-30, 0],
		opacity: 1,
		delay: 300,
		easing: 'easeOutQuart'
	})
	// textCarousel
	anime({
		targets: '.header__textWrapper .anime',
		translateY: [60, 0],
		opacity: 1,
		delay: anime.stagger(200, {start: 500}),
		easing: 'easeOutQuart'
	})

	//social
	anime({
		targets: '.social .anime',
		opacity: 1,
		translateY: [30, 0],
		delay: anime.stagger(100, {start: 1500, direction: 'reverse'}),
		easing: 'easeOutQuart'
	})

	//navigation
	anime({
		targets: '.navigation .anime',
		opacity: 1,
		translateY: [-30, 0],
		delay: anime.stagger(100, {start: 1500, direction: 'reverse'}),
		easing: 'easeOutQuart'
	})

	// button
	anime({
		targets: '.header__greetings .button.anime',
		opacity: 1,
		translateY: [30, 0],
		delay: 1000,
		easing: 'easeOutQuart'
	})
	// logotype
	anime({
		targets: '.logotype.anime',
		opacity: 1,
		translateY: [-30, 0],
		delay: 1500,
		easing: 'easeOutQuart'
	})

})