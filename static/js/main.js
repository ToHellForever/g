function toggleService(headerElement) {
    // Находим родительский элемент service-item
    const serviceItem = headerElement.closest('.service-item');
    // Находим контент внутри service-item
    const content = serviceItem.querySelector('.service-content');
    // Находим стрелку внутри headerElement
    const arrow = headerElement.querySelector('.arrow');
    const isExpanded = content.style.maxHeight && content.style.maxHeight !== '0px';

    if (isExpanded) {
        content.style.maxHeight = '0';
        content.style.opacity = 0;
        content.style.paddingTop = 0;
        arrow.style.transform = 'rotate(0deg)';
        arrow.classList.remove('expanded');
        serviceItem.style.minHeight = '120px';
    } else {
        content.style.maxHeight = content.scrollHeight + 20 + 'px';
        content.style.opacity = 1;
        content.style.paddingTop = '25px';
        arrow.style.transform = 'rotate(270deg)';
        arrow.classList.add('expanded');
        serviceItem.style.minHeight = (120 + content.scrollHeight + 60) + 'px';
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация блоков услуг
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        const content = item.querySelector('.service-content');
        const header = item.querySelector('.service-header');
        const arrow = header.querySelector('.arrow');

        // Устанавливаем начальное состояние
        content.style.maxHeight = '0';
        content.style.opacity = 0;
        content.style.paddingTop = 0;
        arrow.style.transform = 'rotate(0deg)';
        item.style.minHeight = '120px';

        // Добавляем обработчик клика на стрелку
        arrow.addEventListener('click', function(e) {
            e.stopPropagation(); // Предотвращаем всплытие события
            toggleService(header);
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
