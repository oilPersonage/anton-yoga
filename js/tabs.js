import {calculateSizes, calculateSizesHeight} from "./header";

const isMobile = window.matchMedia('(max-width: 768px)').matches

const absoluteTab = document.querySelector('.practices__absolute')
const tabs = [...document.querySelectorAll('.practices__tab')]
const contents = [...document.querySelectorAll('.practices__content')]
const contentWrapper = document.querySelector('.practices__contentWrapper');

let activeIndex = 0;
let activeTab = tabs[0];
let activeContent = contents[0];
absoluteTab.style.width = isMobile ? '100%' : activeTab.offsetWidth + 'px';

const withContentItem = 640 + 72; // Ширина одного элемента и отступ справа
// for mobile data
const mobileContentWidth = document.body.offsetWidth + 24; // Ширина одного элемента

function onClick(e) {
	const tabsSizes = isMobile ? calculateSizesHeight(tabs) : calculateSizes(tabs)
	activeTab.classList.remove('active')
	e.target.classList.add('active')


	const dataTab = e.target.getAttribute('data-tab')
	const findContent = document.querySelector(`[data-tabContent="${dataTab}"]`);
	activeContent.classList.remove("active")
	findContent.classList.add("active")
	activeIndex = parseInt(dataTab) -1;

	if (isMobile) {
		// Устанавливаю ширину таба
		absoluteTab.style.height = e.target.offsetHeight + 'px';
		absoluteTab.style.transform = `translateY(${tabsSizes[activeIndex]}px)`;
		contentWrapper.style.transform = `translateX(-${activeIndex * mobileContentWidth}px)`
	} else {
		// Устанавливаю ширину таба
		absoluteTab.style.width = e.target.offsetWidth + 'px';
		absoluteTab.style.transform = `translateX(${tabsSizes[activeIndex]}px)`;
		contentWrapper.style.transform = `translateX(-${activeIndex * withContentItem}px)`
	}


	activeContent = findContent;
	activeTab = e.target;
}

tabs.forEach(el => el.onclick = onClick)