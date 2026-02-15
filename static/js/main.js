// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
// Логика для аккордеона
    const accordionButtons = document.querySelectorAll('.custom-accordion-button');
    accordionButtons.forEach(button => {
        const arrowContainer = button.querySelector('.arrow-container');
        const arrow = button.querySelector('.custom-arrow');

        button.addEventListener('click', function() {
            const accordionItem = this.closest('.custom-accordion-item');
            const subservicesList = accordionItem.querySelector('.subservices-list');

            if (this.classList.contains('collapsed')) {
                // При закрытии аккордеона возвращаем стрелку в кнопку
                arrow.style.transform = 'rotate(0deg)';
                arrowContainer.appendChild(arrow);
            } else {
                // При открытии аккордеона перемещаем стрелку под список подуслуг
                arrow.style.transform = 'rotate(270deg)';
                subservicesList.appendChild(arrow);
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
