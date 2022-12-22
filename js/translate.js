import i18next from 'i18next';
import en from '../locales/en.json'
import ru from '../locales/ru.json'
const switchers = [...document.querySelectorAll('.navigation__language p')]
const texts = [...document.querySelectorAll('[data-lang]')]


let activeButton = switchers[0];
let activeLang = 'ru'

const lang = i18next.init({
	lng: activeLang,
	fallbackLng: 'ru',
	resources: {
		en, ru
	}
})

switchers.forEach((el, index) => el.onclick = function(e) {
	const nextLang = e.target.getAttribute('data-langName')

	if (activeLang !== nextLang) {
		activeButton.classList.remove('active');
		switchers[index].classList.add('active');

		activeButton = switchers[index];
		activeLang = nextLang;
		i18next.changeLanguage(activeLang).then((t) => {
			texts.forEach(text => {
				text.innerText = t(text.getAttribute('data-lang'))
			})
			console.log(t('header.heading'))
		})
	}
})

