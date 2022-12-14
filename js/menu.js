import anime from './libs/anime.min.js';

const navigation = document.querySelector('#navigation')
const links = [...document.querySelectorAll("a[data-id]")]
const menu = document.querySelector('#menu')
const nav = document.querySelector('#menu nav')
const body = document.querySelector('body')
// prices
const cards = [...document.querySelectorAll('.prices__card')]
const cardsContent = [...document.querySelectorAll('.prices__content')]

let isOpen = false;
let isAllowClick = true;

nav.onclick = function (e) {e.preventDefault()}

function toggleMenu() {
	if (!isAllowClick) return null;
	navigation.classList.toggle('open')

	isAllowClick = false;
	if (isOpen) {
		body.classList.toggle('menuOpen')
		anime({
			targets: nav,
			translateX: 450,
			complete() {
				menu.classList.remove('open');
				isAllowClick = true;
				isOpen = false;
			}
		})
	} else {
		menu.classList.add('open')
		body.classList.toggle('menuOpen')
		anime({
			targets: nav,
			translateX: [400, 50],
			easing: 'easeOutElastic(1, .95)',
			complete() {
				isAllowClick = true;
				isOpen = true;
			}
		})
	}
}

function onClickNav(e) {
	e.preventDefault();
	const id = e.target.getAttribute('data-id');
	const isNavClick = !e.target.getAttribute('data-scroll')
	const scrollTarget = document.querySelector(`#${id}`)

	scrollTarget.scrollIntoView({ block: isNavClick ? "start" : "center", behavior: "smooth" })


	if (isNavClick) {
		toggleMenu();
	} else {

		// Цены
		cards.forEach(card => card.classList.remove('open')); // убираю белый фон
		cardsContent.forEach(content => content.style.height = '0px'); // скрываю все элементы

		// после всего клик по элементу с id
		scrollTarget.click();
	}
}

menu.onclick = function (e) {
	e.preventDefault();
	if (e.target.id === 'menu') {
		toggleMenu();
	}
}

links.forEach(link => link.onclick = onClickNav)

navigation.onclick = toggleMenu;