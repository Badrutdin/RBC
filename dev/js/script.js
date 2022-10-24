$(document).ready(function () {
    // variables and constants

    const $menuHandler = $('[data-menu-handler]')
    const $menu = $('[data-open]')
    const $slider = $('.slider')
    const breakPoints = {
        xs: 320,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1366,
        xxl: 1600,
        xxxl: 1920,
        endPoint: 9999
    }
    const slideSecondaryClasses = 'c-card-news_md c-card-news_color-dark c-card-news_style-secondary';
    const slidePrimaryClasses = 'c-card-news_lg c-card-news_color-light c-card-news_style-primary';
    const nextArrowPrimary = `<div class="c-slider-nav__item"><button class="c-btn-ico c-btn-ico_md c-btn-ico_color-primary" type="button"><svg class="c-btn-ico__icon" fill="none" height="12" width="17" xmlns="http://www.w3.org/2000/svg">
                                        <use xlink:href="images/svg.svg#arrow" xmlns="http://www.w3.org/1999/xlink"></use>
                                    </svg></button></div>`;
    const prevArrowPrimary = `<div class="c-slider-nav__item"><button class="c-btn-ico c-btn-ico_md c-btn-ico_color-primary c-btn-ico_prev" type="button"><svg class="c-btn-ico__icon" fill="none" height="12" width="17" xmlns="http://www.w3.org/2000/svg">
                                        <use xlink:href="images/svg.svg#arrow" xmlns="http://www.w3.org/1999/xlink"></use>
                                    </svg></button></div>`;


    // bind actions
    $menuHandler.on('click', function () {
        if ($menu.attr('data-open') === 'opened') {
            $menu.attr('data-open', 'closed')
        } else if ($menu.attr('data-open') === 'closed') {
            $menu.attr('data-open', 'opened')
        }
    })

    $slider.on('init', function (event, slick) {
        const viewWidth = window.innerWidth
        const $parent = $(event.currentTarget.closest('.slider-container'))
        if (viewWidth >= breakPoints.md) {
            $parent.addClass('container')
        }
        if (viewWidth >= breakPoints.xl) {
            changeSlidesView(slick.$slides, slidePrimaryClasses, slideSecondaryClasses)
        }
    })

    $slider.slick({
        variableWidth: true,
        nextArrow: nextArrowPrimary,
        prevArrow: prevArrowPrimary,
        appendArrows: $('.c-slider-nav'),
        responsive: [{
            breakpoint: breakPoints.endPoint,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        }, {
            breakpoint: breakPoints.xxxl,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        }, {
            breakpoint: breakPoints.xl,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                centerMode: true

            }
        }, {
            breakpoint: breakPoints.md,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                centerMode: true
            }
        }, {
            breakpoint: breakPoints.sm,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true
            }
        }]
    });

    $slider.on('breakpoint', function (event, slick, breakpoint) {
        const $parent = $(event.currentTarget.closest('.slider-container'))
        console.log(breakpoint)
        if (breakpoint > breakPoints.md + 1) {
            $parent.addClass('container')
        } else {
            $parent.removeClass('container')
        }
        if (breakpoint > breakPoints.xl + 1) {
            changeSlidesView(slick.$slides, slidePrimaryClasses, slideSecondaryClasses)
        } else {
            resetSlidesView(slick.$slides, slidePrimaryClasses, slideSecondaryClasses)
        }
    });
});


// functions

function changeSlidesView(slides, slidePrimaryClasses, slideSecondaryClasses) {
    for (let i = 0; i < slides.length; i = i + 3) {
        $(slides[i + 1]).find('.c-card-news')
            .addClass(slideSecondaryClasses)
            .removeClass(slidePrimaryClasses)
        $(slides[i + 2]).find('.c-card-news')
            .addClass(slideSecondaryClasses)
            .removeClass(slidePrimaryClasses)
    }
}

function resetSlidesView(slides, slidePrimaryClasses, slideSecondaryClasses) {
    for (let i = 0; i < slides.length; i = i + 1) {
        $(slides[i]).find('.c-card-news')
            .removeClass(slideSecondaryClasses)
            .addClass(slidePrimaryClasses)
    }
}
