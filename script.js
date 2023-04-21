window.onload = function () {
    document.querySelector('.preloader').classList.add('_un_active');
    // Меню
    // const iconMenu = document.querySelector('.header__burger');
    // const menuBody = document.querySelector('.header__navbar');
    // if (iconMenu) {
    //     iconMenu.addEventListener('click', function (e) {
    //         document.body.classList.toggle('_lock');
    //         iconMenu.classList.toggle('_active');
    //         menuBody.classList.toggle('_active');
    //     });
    // }
    const menuLinks = document.querySelectorAll('.navbar-item[data-goto]');
    if (menuLinks.length > 0) {
        menuLinks.forEach(menuLink => {
            menuLink.addEventListener('click', onMenuLinkClick);
        });

        function onMenuLinkClick(e) {
            const menuLink = e.target;
            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                const gotoBlock = document.querySelector(menuLink.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;
                
                // if (iconMenu.classList.contains('_active')) {
                //     document.body.classList.remove('_lock');
                //     iconMenu.classList.remove('_active');
                //     menuBody.classList.remove('_active');
                // }

                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: 'smooth'
                });
                e.preventDefault();
            }
        }
    }

    // спойлеры

    "use strict"

    const spollersArray = document.querySelectorAll('[data-spollers]');
    if (spollersArray.length > 0) {
        // получение спойлеров
        const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
            return !item.dataset.spollers.split(",")[0];
        });
        // инициализация спойлеров
        if (spollersRegular.length > 0) {
            initSpollers(spollersRegular);
        }
        // инициализация
        function initSpollers(spollersArray, matchMedia = false) {
            spollersArray.forEach(spollersBlock => {
                spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                if (matchMedia.matches || !matchMedia) {
                    spollersBlock.classList.add('_init');
                    initSpollerBody(spollersBlock);
                    spollersBlock.addEventListener('click', setSpollerAction);
                } else {
                    spollersBlock.classList.remove('_init');
                    initSpollerBody(spollersBlock, false);
                    spollersBlock.removeEventListener('click', setSpollerAction);
                }
            });
        }
        // работа с контентом
        function initSpollerBody(spollersBlock, hideSpollerBody = true) {
            const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
            if (spollerTitles.length > 0) {
                console.log(spollerTitles);
                spollerTitles.forEach(spollerTitle => {
                    if (hideSpollerBody) {
                        spollerTitle.removeAttribute('tabindex');
                        if (!spollerTitle.classList.contains('_active')) {
                            spollerTitle.parentNode.parentNode.nextElementSibling.hidden = true;
                        }
                    } else {
                        spollerTitle.setAttribute('tabindex', '-1');
                        spollerTitle.parentNode.parentNode.nextElementSibling.hidden = false;
                    }
                });
            }
        }
        // при нажатии, активируется
        function setSpollerAction(e) {
            const el = e.target;
            if(el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
                const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
                const spollersBlock = spollerTitle.closest('[data-spollers]');
                const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
                if (!spollersBlock.querySelectorAll('._slide').length) {
                    if (oneSpoller && !spollerTitle.classList.contains('_active')) {
                        hideSpollerBody(spollersBlock);
                    }
                    spollerTitle.parentNode.parentNode.parentNode.classList.toggle('_active');
                    _slideToggle(spollerTitle.parentNode.parentNode.nextElementSibling, 500);
                }
                e.preventDefault();
            }
        }
        function hideSpollerBody(spollersBlock) {
            const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
            if (spollerActiveTitle) {
                spollerActiveTitle.classList.remove('_active');
                _slideUp(spollerActiveTitle.parentNode.parentNode.nextElementSibling, 500);
            }
        }
    }


    // SlideToggle
    let _slideUp = (target, duration = 500) => {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            target.style.transitionProperty = 'height, margin, padding';
            target.style.transitionDuration = duration + 'ms';
            target.style.height = target.offsetHeight + 'px';
            target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout(() => {
                target.hidden = true;
                target.style.removeProperty('height');
                target.style.removeProperty('padding-top');
                target.style.removeProperty('padding-bottom');
                target.style.removeProperty('margin-top');
                target.style.removeProperty('margin-bottom');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                target.classList.remove('_slide');
            }, duration);
        }
    }
    let _slideDown = (target, duration = 500) => {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            if (target.hidden) {
                target.hidden = false;
            }
            target.style.filter = 'blur(25px)';
            let height = target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = 'height, margin, padding';
            target.style.transitionDuration = duration + 'ms';
            target.style.height = height + 'px';
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            window.setTimeout(() => {
                target.style.removeProperty('height');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                            target.style.filter = 'blur(0px)';
                target.classList.remove('_slide');
            }, duration);
        }
    }
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) {
            return _slideDown(target, duration);
        } else {
            return _slideUp(target, duration);
        }
    }
}
