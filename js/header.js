const headerTextSlider = document.querySelector('#headerTextSlider');
const sliderItems = [...document.querySelectorAll('.header__textItem')];
let activeSlide = 0;

const isMobile = window.matchMedia('(max-width: 768px)').matches


// arrows

const nextArrow = document.querySelector('.arrows .arrows__next')
const prevArrow = document.querySelector('.arrows .arrows__prev')

export function calculateSizes(array) {
	const size = [];
	array.reduce((acc, value) => {
		const nextAcc = acc+value.getBoundingClientRect().width;
		size.push(nextAcc)
		return nextAcc
	}, 0)
	size.splice(0, 0, 0)
	size.length = array.length;

	return size;
}

export function calculateSizesHeight(array) {
	const size = [];
	array.reduce((acc, value) => {
		const nextAcc = acc+value.getBoundingClientRect().height;
		size.push(nextAcc)
		return nextAcc
	}, 0)
	size.splice(0, 0, 0)
	size.length = array.length;

	return size;
}


function onChangeSlide(step) {
	const sizes = calculateSizes(sliderItems);
	const nextActiveSlide =  activeSlide + step;
	const nextTransform = sizes[nextActiveSlide]
	if (nextTransform !== undefined) {

		// disabled prev arrow
		if (nextActiveSlide === 0) {
			prevArrow.classList.add('disabled')
		} else {
			prevArrow.classList.remove('disabled')
		}

		// disabled next arrow
		if (nextActiveSlide === sliderItems.length - 1) {
			nextArrow.classList.add('disabled')
		} else {
			nextArrow.classList.remove('disabled')
		}

		sliderItems[activeSlide].classList.remove('active')
		sliderItems[nextActiveSlide].classList.add('active')
		activeSlide = nextActiveSlide;
		headerTextSlider.style.transform = `translateX(-${nextTransform}px)`
	}
}

// для корректной отрисовки первого элемента
setTimeout(() => {onChangeSlide(isMobile ? 0 : +1)}, 10)


nextArrow.onclick = function() {onChangeSlide(+1)}
prevArrow.onclick = function() {onChangeSlide(-1)}



