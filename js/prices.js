import anime from './libs/anime.min.js';

const isMobile = window.matchMedia('(max-width: 480px)').matches

if (!isMobile) {
	const cards = [...document.querySelectorAll('.prices__header')]
	const cardsContent = [...document.querySelectorAll('.prices__content')]
	const sizes = []
	let activeAnimeElement = null;

	cardsContent.forEach(content => {
		sizes.push(content.offsetHeight);
		content.style.height = '0px'
	})

	function onClick({target}, index) {
		if (target.closest('.prices__card').classList.contains('open')) {
			activeAnimeElement.pause();
			anime({
				targets: cardsContent[index],
				height: 0,
				easing: 'easeOutElastic(1, .8)'
			})
		} else {
			activeAnimeElement =  anime({
				targets: cardsContent[index],
				height: sizes[index],
				easing: 'easeOutElastic(1, .8)'
			})
		}

		target.closest('.prices__card').classList.toggle('open')
	}


	cards.forEach((card, index) => card.onclick = (e) => onClick(e, index))
	cards[0].click() // открываем первый элемент

}