const page = document.querySelector('.page');
const themeSwitchBtn = document.querySelector('.footer__switch-wrapper');
//находим ссылки
const menuNavLinks = document.querySelectorAll('.bikes__menu-nav-link');

const highwayTexts = document.querySelector('#highway-texts');//текст для слайдера
const gravlTexts = document.querySelector('#gravl-texts');
const ttTexts = document.querySelector('#tt-texts');
//находим сссылки для разделов карточек с великами
const highwayLink = document.querySelector('#highway-link');
const gravlLink = document.querySelector('#gravl-link');
const ttLink = document.querySelector('#tt-link');
//находим нужные трио карточек с великами
const bikeCardsHighway = document.querySelector('#bikes-cards-highway');
const bikeCardsGravl = document.querySelector('#bikes-cards-gravl');
const bikeCardsTt = document.querySelector('#bikes-cards-tt');

//bikes-menu-select for mobilka
const bikesMenu = document.querySelector('#bikes-menu');
const bikesMenuShosse = bikesMenu.querySelector('#bikes-menu-shosse');
const bikesMenuGravl = bikesMenu.querySelector('#bikes-menu-gravl');
const bikesMenuTt = bikesMenu.querySelector('#bikes-menu-tt');

const footerBox = document.querySelector('.footer__box-mail'); //форма в футере
const footerOk = document.querySelector('.footer__box-ok'); //кнопка ок для формы
const footerAfter = document.querySelector('.footer__box-ok-after'); //надписсь круто после отправки

const burgerMenu = document.querySelector('.burger-menu');
const burgerMenuButton = document.querySelector('.burger-menu__button');
const burgerMenuLinks = burgerMenu.querySelectorAll('.burger-menu__link');


//найдем ве еобходимое для первого слайдера
const nextButton = document.querySelector('#nextButton');
const prevButton = document.querySelector('#prevButton');
const images = document.querySelectorAll('.type__wrapper-box-image');
const sliderLine = document.querySelector('.type__wrapper-box');
const sliderTexts = document.querySelectorAll('.type__wrapper-texts'); //тексты слайдера
let count = 0;
let width;

function rollSlider() {
    if (page.offsetWidth < 1030) {
        sliderLine.style.transform = 'translate(-' + count * (width + 18) + 'px)';
    }
    if (page.offsetWidth >= 1030) {
        sliderLine.style.transform = 'translate(-' + count * (width / 2 + 40) + 'px)';
    }
}

function init() { //инициализируем слайдер 1
    width = document.querySelector('.type__wrapper-slider').offsetWidth;
    sliderLine.style.width = width * images.length + 'px';
    images.forEach(function (item) {
        item.style.width = width + 'px';
        item.style.height = 'auto';
    })
    rollSlider();
}

init();

function getRandomText(arr) {
    let randomId = Math.floor(Math.random() * arr.length);
    arr.forEach(function (el) {
        el.classList.remove('type__wrapper-texts_opened');
    })
    arr[randomId].classList.add('type__wrapper-texts_opened');
    return arr[randomId];
}

function openBurgerMenu() {
    burgerMenu.classList.toggle('burger-menu_opened');
}

function openBikeCards(card) {
    card.classList.add('bikes__cards_opened');
}

function closeBikeCards(card) {
    card.classList.remove('bikes__cards_opened')
}

function switchClassMenuNavLink(link) { //перелючение менюшки
    link.classList.toggle('bikes__menu-nav-link_selected');

    if (link === highwayLink) {
        gravlLink.classList.remove('bikes__menu-nav-link_selected');
        ttLink.classList.remove('bikes__menu-nav-link_selected');
        closeBikeCards(bikeCardsGravl);
        closeBikeCards(bikeCardsTt);
        openBikeCards(bikeCardsHighway);
    }
    if (link === gravlLink) {
        highwayLink.classList.remove('bikes__menu-nav-link_selected');
        ttLink.classList.remove('bikes__menu-nav-link_selected');
        closeBikeCards(bikeCardsTt);
        closeBikeCards(bikeCardsHighway);
        openBikeCards(bikeCardsGravl);
    }
    if (link === ttLink) {
        gravlLink.classList.remove('bikes__menu-nav-link_selected');
        highwayLink.classList.remove('bikes__menu-nav-link_selected');
        closeBikeCards(bikeCardsHighway);
        closeBikeCards(bikeCardsGravl);
        openBikeCards(bikeCardsTt);
    }
};

function parallax() { //функция создаия эффекта параллакса
    let s = document.querySelector("#floater");
    let yPosition = 0 - window.pageYOffset / 16;
    if (window.width >= 1031) {
        s.style.top = 50 + yPosition + "%";
    }
    else {
        s.style.top = 35 + yPosition + "%";
    }
}

window.addEventListener("scroll", function () { //слушатель для старницы для эффекта параллакс
    parallax();
});

menuNavLinks.forEach(function (el) {
    el.addEventListener('click', function () {
        switchClassMenuNavLink(el);
    })
})

prevButton.addEventListener('click', function () {
    count--;
    if (count < 0) {
        count = images.length - 1;
    }
    rollSlider();
    getRandomText(sliderTexts);
})

nextButton.addEventListener('click', function () {
    count++;
    if (count >= images.length) {
        count = 0;
    }
    rollSlider();
    getRandomText(sliderTexts);
})

window.addEventListener('resize', init()); //слушатель на страницу для адаптивности слайдера 1

footerBox.addEventListener('input', function () {
    footerOk.classList.add('footer__box-ok_shown');
})

//валидация инпута (доработать)
footerOk.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (footerBox.value.includes('@')) {
        footerBox.value = '';
        footerBox.placeholder = '';
        footerAfter.classList.add('footer__box-ok-after_shown');
    };

    if (!footerBox.value.includes('@')) {
        alert('неверный формат введенных данных');
    };
})

burgerMenuButton.addEventListener('click', function () {
    openBurgerMenu();
})

burgerMenuLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        openBurgerMenu();
    })
})

function onOffDark(themeName) {
    let themeUrl = `./styles/theme-${themeName}.css`;
    const themeTitle = document.querySelector('[title="theme"]');
    themeTitle.setAttribute("href", themeUrl);
}

const moon = document.querySelector('.footer__switch-icon-moon');

//swith theme func
const switchTheme = () => {
    const rootElem = document.documentElement;
    let dataTheme = rootElem.getAttribute('data-theme');
        newTheme;

    newTheme =  (dataTheme === 'light') ? 'dark' : 'light';    
}
// слушатель кнпоке переключения темы
themeSwitchBtn.addEventListener('click', switchTheme);