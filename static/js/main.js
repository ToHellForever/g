function toggleService(element) {
    const content = element.nextElementSibling;
    const arrow = element.querySelector('.arrow');
    const isExpanded = content.style.maxHeight && content.style.maxHeight !== '0px';

    if (isExpanded) {
        content.style.maxHeight = '0';
        content.style.opacity = 0;
        content.style.paddingTop = 0;
        arrow.style.transform = 'rotate(0deg)';
    } else {
        content.style.maxHeight = content.scrollHeight + 20 + 'px';
        content.style.opacity = 1;
        content.style.paddingTop = '15px';
        arrow.style.transform = 'rotate(270deg)';
    }
}

document.addEventListener('DOMContentLoaded', function() {
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