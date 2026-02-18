// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Обработка модального окна
    const floatingFormButtons = document.querySelectorAll('#floatingFormButton');
    const modalOverlay = document.getElementById('formModalOverlay');
    const modalClose = document.getElementById('modalClose');
    const contactForm = document.getElementById('contactForm');

    if (floatingFormButtons.length > 0 && modalOverlay && modalClose && contactForm) {
        floatingFormButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Показываем оверлей
                modalOverlay.style.display = 'flex';
                // Добавляем класс для анимации через небольшую задержку
                // Это позволяет браузеру сначала применить display: flex
                setTimeout(() => {
                    modalOverlay.classList.add('visible');
                    const modalContent = modalOverlay.querySelector('.modal-content');
                    if (modalContent) {
                        modalContent.classList.add('visible');
                    }
                }, 10);
            });
        });

        // Функция для закрытия модального окна с анимацией
        function closeModalWithAnimation() {
            const modalContent = modalOverlay.querySelector('.modal-content');
            if (modalContent) {
                modalContent.classList.remove('visible');
            }
            modalOverlay.classList.remove('visible');

            // После завершения анимации скрываем оверлей полностью
            setTimeout(() => {
                modalOverlay.style.display = 'none';
            }, 300); // Время должно совпадать с длительностью transition в CSS
        }

        modalClose.addEventListener('click', function() {
            closeModalWithAnimation();
        });

        modalOverlay.addEventListener('click', function(event) {
            if (event.target === modalOverlay) {
                closeModalWithAnimation();
            }
        });

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Форма отправлена!');
            closeModalWithAnimation();
        });
    }
// Логика для аккордеона
    const accordionButtons = document.querySelectorAll('.custom-accordion-button');
    accordionButtons.forEach(button => {
        const arrowContainer = button.querySelector('.arrow-container');
        const arrow = button.querySelector('.custom-arrow');
        const subservicesList = button.closest('.custom-accordion-item').querySelector('.subservices-list');

        // Добавляем клон стрелки в список подуслуг для плавного появления
        const arrowClone = arrow.cloneNode(true);
        arrowClone.classList.add('arrow-clone');
        arrowClone.style.opacity = '0';
        arrowClone.style.position = 'relative';
        arrowClone.style.float = 'right';
        arrowClone.style.margin = '10px 0 0 auto';
        arrowClone.style.transform = 'rotate(270deg)';
        subservicesList.appendChild(arrowClone);

        button.addEventListener('click', function() {
            const accordionItem = this.closest('.custom-accordion-item');
            const isCollapsed = this.classList.contains('collapsed');
            const subservicesList = accordionItem.querySelector('.subservices-list');
            const subserviceItems = subservicesList.querySelectorAll('.subservice-item');

            // Закрываем все остальные аккордеоны перед открытием текущего
            accordionButtons.forEach(otherButton => {
                if (otherButton !== this) {
                    const otherAccordionItem = otherButton.closest('.custom-accordion-item');
                    const otherSubservicesList = otherAccordionItem.querySelector('.subservices-list');
                    const otherArrow = otherButton.querySelector('.custom-arrow');
                    const otherArrowClone = otherSubservicesList.querySelector('.arrow-clone');

                    // Если другой аккордеон открыт, закрываем его
                    if (!otherButton.classList.contains('collapsed')) {
                        otherButton.classList.add('collapsed');
                        otherArrow.style.transform = 'rotate(0deg)';
                        otherArrow.style.opacity = '1';
                        otherArrowClone.style.opacity = '0';

                        // Скрываем элементы подуслуг
                        const otherSubserviceItems = otherSubservicesList.querySelectorAll('.subservice-item');
                        otherSubserviceItems.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add('fade-out');
                                item.classList.remove('fade-in');
                            }, index * 50);
                        });
                    }
                }
            });

            if (isCollapsed) {
                // При закрытии аккордеона
                arrow.style.transform = 'rotate(0deg)';
                arrow.style.opacity = '1';
                arrowClone.style.opacity = '0';

                // Добавляем класс fade-out для анимации исчезновения
                subserviceItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('fade-out');
                        item.classList.remove('fade-in');
                    }, index * 50);
                });
            } else {
                // При открытии аккордеона
                this.classList.remove('collapsed');
                arrow.style.opacity = '0';
                arrowClone.style.opacity = '1';

                // Убираем класс fade-out и добавляем класс fade-in с задержкой для эффекта появления по одной
                subserviceItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.remove('fade-out');
                        item.classList.add('fade-in');
                    }, index * 200); // Задержка 200 мс между появлением каждого элемента
                });
            }

            // Обновляем состояние стрелок для всех аккордеонов
            accordionButtons.forEach(otherButton => {
                const otherAccordionItem = otherButton.closest('.custom-accordion-item');
                const otherSubservicesList = otherAccordionItem.querySelector('.subservices-list');
                const otherArrow = otherButton.querySelector('.custom-arrow');
                const otherArrowClone = otherSubservicesList.querySelector('.arrow-clone');

                if (otherButton.classList.contains('collapsed')) {
                    otherArrow.style.transform = 'rotate(0deg)';
                    otherArrow.style.opacity = '1';
                    otherArrowClone.style.opacity = '0';
                } else {
                    otherArrow.style.opacity = '0';
                    otherArrowClone.style.opacity = '1';
                }
            });
        });
    });

    // Инициализация Swiper
    let swiper;

    function initSwiper() {
        if (window.innerWidth <= 767.98) {
            if (swiper) swiper.destroy(true, true);

            swiper = new Swiper('.about-carousel', {
                loop: true,
                slidesPerView: 1.2,
                spaceBetween: 20,
                centeredSlides: true,
                grabCursor: true,
                effect: 'coverflow',
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                    slideShadows: true,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });
        } else {
            if (swiper) swiper.destroy(true, true);

            swiper = new Swiper('.about-carousel', {
                loop: false,
                slidesPerView: 3.5,
                spaceBetween: 20,
                freeMode: true,
                grabCursor: true,
                speed: 500,
            });

            const carouselContainer = document.querySelector('.about-carousel-container');
            carouselContainer.addEventListener('wheel', function(e) {
                if (swiper.isBeginning && e.deltaY < 0) {
                    return;
                }
                if (swiper.isEnd && e.deltaY > 0) {
                    return;
                }
                e.preventDefault();
                swiper.slideTo(swiper.activeIndex + (e.deltaY > 0 ? 1 : -1));
            });
        }
    }

    initSwiper();

    window.addEventListener('resize', function() {
        initSwiper();
    });

    // Функция для проверки видимости элемента
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }

    // Функция для обработки анимации блоков
    function handleStageBlockAnimation() {
        const stageBlocks = document.querySelectorAll('.stage-block, .stage-block-2');
        
        stageBlocks.forEach((block, index) => {
            if (isElementInViewport(block) && !block.classList.contains('animate-left') && !block.classList.contains('animate-right')) {
                // Применяем анимацию в зависимости от порядкового номера
                if (index % 2 === 0) {
                    block.classList.add('animate-right');
                } else {
                    block.classList.add('animate-left');
                }
            }
        });
    }

    // Обработчик скролла
    window.addEventListener('scroll', handleStageBlockAnimation);

    // Проверяем видимость блоков при загрузке страницы
    document.addEventListener('DOMContentLoaded', function() {
        handleStageBlockAnimation();
    });
});

