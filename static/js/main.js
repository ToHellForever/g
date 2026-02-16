// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Обработка модального окна
    const floatingFormButton = document.getElementById('floatingFormButton');
    const modalOverlay = document.getElementById('formModalOverlay');
    const modalClose = document.getElementById('modalClose');
    const contactForm = document.getElementById('contactForm');

    if (floatingFormButton && modalOverlay && modalClose && contactForm) {
        floatingFormButton.addEventListener('click', function() {
            modalOverlay.style.display = 'flex';
        });

        modalClose.addEventListener('click', function() {
            modalOverlay.style.display = 'none';
        });

        modalOverlay.addEventListener('click', function(event) {
            if (event.target === modalOverlay) {
                modalOverlay.style.display = 'none';
            }
        });

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Форма отправлена!');
            modalOverlay.style.display = 'none';
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

            if (isCollapsed) {
                // При закрытии аккордеона
                arrow.style.transform = 'rotate(0deg)';
                arrow.style.opacity = '1';
                arrowClone.style.opacity = '0';

                // Добавляем класс fade-out для анимации исчезновения
                subserviceItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('fade-out');
                    }, index * 50);
                });
            } else {
                // При открытии аккордеона
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
});

