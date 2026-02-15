// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
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
            
            if (isCollapsed) {
                // При закрытии аккордеона
                arrow.style.transform = 'rotate(0deg)';
                arrow.style.opacity = '1';
                arrowClone.style.opacity = '0';
            } else {
                // При открытии аккордеона
                arrow.style.opacity = '0';
                arrowClone.style.opacity = '1';
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
