const sections = [...document.querySelectorAll('section')];
const sectionBlocks = sections.map(section => ({ dark: section.getAttribute('data-theme') === 'dark', section }))
const logotype = document.querySelector('.header .logotype');
const header = document.querySelector('header');
let activeNav = document.querySelector("[data-id=header]");
let dotContainer = document.querySelector(".header__dots");
let activeDot = document.querySelector(".header__dots .active");
let activeIndex = 0;
const DOT_SIZE = 16 + 4; // высота + отступ

function isVisible(elem) {
	let coords = elem.getBoundingClientRect();
	let windowHeight = document.documentElement.clientHeight;
	// верхний край элемента виден?
	let topVisible = coords.top < windowHeight * 0.2;

	// нижний край элемента виден?
	let bottomVisible = coords.bottom > windowHeight * 0.2;

	return topVisible && bottomVisible;
}

// устанавливаю dot
for (let sec of sections) {
	const dot = document.createElement('div')
	dot.classList.add('header__dot')

	dotContainer.appendChild(dot)
}

function onScroll() {
	for (let sectionItem of sectionBlocks) {
		if (isVisible(sectionItem.section)) {
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
				} else {
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

window.addEventListener('scroll', onScroll)