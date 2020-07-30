'use strict';

const bodyElement = document.querySelectorAll('.body')[0],
    headerElement = document.querySelectorAll('.header')[0],
    galleryElement = document.querySelectorAll('.gallery')[0],
    galleryContainer = galleryElement.querySelectorAll('.container')[0],
    galleryItemElement = galleryElement.querySelectorAll('.gallery__item'),
    filterImg = document.querySelector('.header__img > img'),
    filterModal = document.getElementsByClassName('filter')[0],
    filterClose = document.getElementsByClassName('filter_close')[0],
    filterRange = document.querySelector('.filter__option_range'),
    filterSubmit = document.querySelector('.filter__submit'),
    navbarElement = document.getElementsByClassName('navbar')[0],
    navbarIcon = document.querySelectorAll('.navbar__icon > img'),
    navbarWrapper = document.querySelectorAll('.navbar__wrapper'),
    modalWindow = document.querySelectorAll('.modal'),
    modalClose = document.querySelectorAll('.close_modal'),
    modalSubmit = document.querySelector('.modal__submit'),
    checkDark = document.querySelector('#dark'),
    checkLight = document.querySelector('#light'),
    buttonELement = document.querySelectorAll('.button');

    // имитация получение адреса фоток с сервера
const addresWebImage = 'https://i.pinimg.com/736x/0d/df/27/0ddf276a527b0a9cb1e26ad90080d5e7.jpg';

window.addEventListener('DOMContentLoaded', ()=> {

    // заполнение галереии на загрузке DOM
    const heightScreen = document.documentElement.clientHeight,
    headerHeignt = headerElement.offsetHeight,
    galleryItemSize = galleryItemElement[0].offsetHeight;

    let galleryWidth = galleryElement.offsetWidth;
    if(galleryWidth > 1080) {
        galleryWidth = 1080;
    }

    const freePlase = heightScreen - headerHeignt,
        column = Math.floor(galleryWidth / (galleryItemSize + 10)),
        row = Math.floor(freePlase / (galleryItemSize + 10));

    const addStarterContent = () => {
        galleryContainer.innerHTML = '';

        for (let i = 0; i < column * (row + 1); i++) {
            galleryContainer.insertAdjacentHTML('beforeend',`<div class=\"gallery__item\">
                <img src=\"${addresWebImage}\" alt=\"\">
            </div>`);
        }
        return column;
    };
    addStarterContent();

    // заполнение галереи при прокрутке
    window.addEventListener('scroll', () => {
        const galleryHeignt = galleryElement.offsetHeight,
            yOffset  = window.pageYOffset,
            window_height = window.innerHeight,
            yDown = yOffset + window_height;

        if (yDown >= galleryHeignt) {
            for (let i = 0; i < column; i++) {
                galleryContainer.insertAdjacentHTML('beforeend',`<div class=\"gallery__item\">
                    <img src=\"${addresWebImage}\" alt=\"\">
                </div>`);
            }
        }
    });


    const toggleClassElement = function(elem, togleCalss) {
        elem.classList.toggle(togleCalss);
    };
    // window filter
    filterImg.addEventListener('click', () => {
        toggleClassElement(filterModal,'filter_active');
        buttonELement.forEach(item => {
            item.classList.remove('button_active');
            item.classList.remove('button_light_active');
        })
    });
    filterClose.addEventListener('click', () => toggleClassElement(filterModal,'filter_active'));

    filterSubmit.addEventListener('click', (event) => {
        event.preventDefault();
        toggleClassElement(filterModal,'filter_active');
        buttonELement.forEach(item => {
            item.classList.remove('button_active');
            item.classList.remove('button_light_active');
        })
    })

    // modal window
    navbarWrapper.forEach(item => {
        item.addEventListener('click', () => {
            const attr = +item.getAttribute('data-attrNavbarIcon');
            modalWindow.forEach(item => {
                item.classList.add('hidden');
            })
            modalWindow[attr - 1].classList.remove('hidden');
        });
    })
    modalClose.forEach(item => {
        item.addEventListener('click', () => {
            modalWindow.forEach(item => {
                item.classList.add('hidden');
            })
        });
    })

    // dark_theme or light_theme
    const arrayElem = [
        bodyElement,
        galleryElement,
        headerElement,
        filterModal,
        navbarElement,
    ];
    const arrayElemBasicClass = [
        'body',
        'gallery',
        'header',
        'filter',
        'navbar',
    ];

    // changed addres icon navbar
    const changedSubString = (elem) => {
        const addres = elem.getAttribute('src');
        const indexSubstr = addres.indexOf('_light');
        if(indexSubstr !== -1) {
            const addresDark = addres.slice(0, indexSubstr);
            elem.setAttribute('src', `${addresDark}.svg`);
        } else {
            const addresLight = addres.slice(0, -4);
            elem.setAttribute('src', `${addresLight}_light.svg`);
       }
    };

    checkDark.addEventListener('change', () => {
        localStorage.setItem('theme', 'dark');
        arrayElem.forEach((item,index) => toggleClassElement(item, `${arrayElemBasicClass[index]}_light`));
        modalWindow.forEach(item => toggleClassElement(item, 'modal_light'));
        buttonELement.forEach(item => toggleClassElement(item, 'button_light'));
        toggleClassElement(filterRange, 'hidden');
        navbarIcon.forEach(item => changedSubString(item));
        changedSubString(filterImg);


    });
    checkLight.addEventListener('change',() => {
        localStorage.setItem('theme', 'light');
        arrayElem.forEach((item,index) => toggleClassElement(item, `${arrayElemBasicClass[index]}_light`));
        modalWindow.forEach(item => toggleClassElement(item, 'modal_light'));
        buttonELement.forEach(item => toggleClassElement(item, 'button_light'));
        toggleClassElement(filterRange, 'hidden');
        navbarIcon.forEach(item => changedSubString(item));
        changedSubString(filterImg);
    });

    if(localStorage.getItem('theme') === 'dark') {
        checkDark.setAttribute('checked', true);
        arrayElem.forEach(item => item.classList.remove(`${item.getAttribute('class')} ${item.getAttribute('class')}_light`));
        modalWindow.forEach(item => toggleClassElement(item, 'modal_light'));
        buttonELement.forEach(item => toggleClassElement(item, 'button_light'));
        toggleClassElement(filterRange, 'hidden');
        navbarIcon.forEach(item => changedSubString(item));
        changedSubString(filterImg);

    }
    if(localStorage.getItem('theme') === 'light') {
        checkLight.setAttribute('checked', true);
        arrayElem.forEach(item => item.classList.add(`${item.getAttribute('class')}_light`));
        modalWindow.forEach(item => toggleClassElement(item, 'modal_light'));
        buttonELement.forEach(item => toggleClassElement(item, 'button_light'));
        toggleClassElement(filterRange, 'hidden');
        navbarIcon.forEach(item => changedSubString(item));
        changedSubString(filterImg);

    }

    // active button
    buttonELement.forEach(item => {
        item.addEventListener('click', () =>{
            if(localStorage.getItem('theme') === 'light') {
                item.classList.toggle('button_light_active');
            }
            if(localStorage.getItem('theme') === 'dark') {
                item.classList.toggle('button_active');
            }
            localStorage.setItem(item.getAttribute('data-button'), item.getAttribute('data-button'));
        })
    })

    // double range
    $(".js-range-slider").ionRangeSlider({
        skin: "round",
        type: "double",
        min: 0,
        max: 1000000,
        from: 200,
        to: 500,
        grid: false
    });
    const irsMin = document.getElementsByClassName('irs-min')[0],
        irsMax = document.getElementsByClassName('irs-max')[0],
        irsFrom = document.getElementsByClassName('irs-from')[0],
        irsTo = document.getElementsByClassName('irs-to')[0],
        irsBar = document.getElementsByClassName('irs-bar')[0],
        irsHandleFrom = document.getElementsByClassName('irs-handle from')[0],
        irsSingle = document.getElementsByClassName('irs-single')[0],
        irsHandleTo = document.getElementsByClassName('irs-handle to type_last')[0];

    irsMin.style.display = 'none';
    irsMax.style.display = 'none';
    irsFrom.style.display = 'none';
    irsTo.style.display = 'none';
    irsSingle.style.display = 'none';
    irsBar.style.backgroundColor = '#717171';
    irsHandleFrom.style.backgroundColor = '#E8E8E8';
    irsHandleTo.style.backgroundColor = '#E8E8E8';
    irsHandleFrom.style.border = 'none';
    irsHandleTo.style.border = 'none';


});
