import anime from './libs/anime.min.js';

const isMobile = window.matchMedia('(max-width: 768px)').matches;


const mobileBars = [...document.querySelectorAll('.mobileBar')];
const sections = [...document.querySelectorAll('section')];
const sectionBlocks = sections.map(section => ({ dark: section.getAttribute('data-theme') === 'dark', section }))
const logotype = document.querySelector('.header .logotype');
const header = document.querySelector('header');
let activeNav = document.querySelector("[data-id=header]");
let dotContainer = document.querySelector(".header__dots");
let activeDot = document.querySelector(".header__dots .active");
let activeIndex = 0;
const DOT_SIZE = 16 + 4; // высота + отступ

// animate scroll
const animationItems = isMobile ? [...document.querySelectorAll('[data-anim]:not([data-dism])')] : [...document.querySelectorAll('[data-anim]')]


function isVisible(elem, offset = 0) {
	let coords = elem.getBoundingClientRect();
	let windowHeight = document.documentElement.clientHeight;
	// верхний край элемента виден?
	let topVisible = coords.top < windowHeight * offset;

	// нижний край элемента виден?
	let bottomVisible = coords.bottom > windowHeight * offset;

	return topVisible && bottomVisible;
}


function isVisibleForAnimation(elem, offset = 0) {
	let coords = elem.getBoundingClientRect();
	let windowHeight = document.documentElement.clientHeight;
	// верхний край элемента виден?
	let topVisible = coords.top < windowHeight * offset;

	// нижний край элемента виден?
	let bottomVisible = coords.bottom > 0;
		// console.log(coords.bottom, coords.top, windowHeight * offset)
	return topVisible && bottomVisible;
}

// устанавливаю dot
for (let sec of sections) {
	const dot = document.createElement('div')
	dot.classList.add('header__dot')

	dotContainer.appendChild(dot)
}

function changeNavigation() {

	for (let sectionItem of sectionBlocks) {
		if (isVisible(sectionItem.section, 0.2)) {
			const findNavItem = document.querySelector(`[data-id=${sectionItem.section.id}]`)

			// что бы один раз при смене секции выполнялось
			if (findNavItem && activeNav !== findNavItem) {
				activeIndex = sections.findIndex(el => el === sectionItem.section)

				activeNav.classList.remove('active');
				findNavItem.classList.add('active')
				activeNav = findNavItem;

				// установка белого цвета на черном блоке
				if (sectionItem.dark) {
					header.classList.add('dark');
					logotype.classList.add('dark');

					if (isMobile) {
						mobileBars.forEach(el => el.style.opacity = 0)
					}
				} else {
					mobileBars.forEach(el => el.style.opacity = 1)
					header.classList.remove('dark')
					logotype.classList.remove('dark')
				}

				// анимация dot
				activeDot.style.transform = `translateY(${activeIndex * DOT_SIZE}px)`
			}

			// если нашел элемент, дальше по циклу не бежать
			break;
		}
	}
}

function initAnimation() {
	return animationItems.map(el => {
		const dir = el.getAttribute('data-dir');
		const show = el.getAttribute('data-show');
		const offset = Number(el.getAttribute('data-offset')) || 0;
		const isOpacity = el.getAttribute('data-opacity');

		const horizontal = dir === 'left' || dir === 'right';
		const vertical = dir === 'top' || dir === 'down';

		return anime({
			targets: el,
			autoplay: false,
			translateX: horizontal
				? dir === 'right'
					? show
						? [ 0, offset]
						: [offset, 0]
					: show
						? [-offset, 0]
						: [0, -offset]
				: 0,
			translateY: vertical
				? dir === 'down'
					? show ? [offset, 0] : [0, offset]
					: show ? [-offset, 0] : [0, -offset]
				: 0,
			opacity: isOpacity ? [0, 1] : 1,
			duration: 4000,
			easing: 'linear'
		})
	})
}
const animeScrollData = initAnimation();

function scrollAnimation() {
	animationItems.forEach((item, index) => {
		const parent = document.getElementById(item.getAttribute('data-parent'))
		if (isVisibleForAnimation(parent, 1)) {
			const hiddeAnimation = !item.getAttribute('data-show') && parent.id !== 'header' ;

		 // Calculate the scroll percentage position
			// const scrollPercent = () => {
			// 	return hiddeAnimation ? 1 + (parent.offsetHeight - window.pageYOffset) / window.innerHeight
			// 		: (parent.offsetHeight - window.pageYOffset) / window.innerHeight;
			// }
			const scrollPercent = () => {
				return hiddeAnimation ? 1 + (parent.offsetHeight - window.pageYOffset) / window.innerHeight
					: 1 - window.pageYOffset / parent.offsetHeight;
			}
			console.log( window.pageYOffset / parent.offsetHeight)


			animeScrollData[index].seek((1 - scrollPercent()) * animeScrollData[index].duration)
		}
	})
}

function onScroll() {

	//scroll animation
	scrollAnimation()

	// navigation
	changeNavigation()
}

window.addEventListener('scroll', onScroll)