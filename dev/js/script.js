$(document).ready(function () {
    // variables and constants
    let preloader = document.querySelector(".preloader");
    for (let i = 1; i < 10; i++) {
        preloader.innerHTML += "<div class='cube cube" + i + "'></div>";
    }
    const $menuHandler = $('[data-menu-handler]')
    const $menu = $('[data-open]')
    const $slider = $('[data-slider="news-main-page"]');
    const $slider2 = $('[data-slider="arendators"]');

    const breakPoints = {
        xs: 320,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1366,
        xxl: 1600,
    }
    const slideSecondaryClasses = 'c-card-news_md c-card-news_color-dark c-card-news_style-secondary';
    const slidePrimaryClasses = 'c-card-news_lg c-card-news_color-light c-card-news_style-primary';
    const nextArrowPrimary = `<button class="c-btn-ico c-btn-ico_md c-btn-ico_color-primary" type="button"><svg class="c-btn-ico__icon" fill="none" height="12" width="17" xmlns="http://www.w3.org/2000/svg">
                                        <use xlink:href="images/svg.svg#arrow" xmlns="http://www.w3.org/1999/xlink"></use>
                                    </svg></button>`;
    const prevArrowPrimary = `<button class="c-btn-ico c-btn-ico_md c-btn-ico_color-primary c-btn-ico_prev" type="button"><svg class="c-btn-ico__icon" fill="none" height="12" width="17" xmlns="http://www.w3.org/2000/svg">
                                        <use xlink:href="images/svg.svg#arrow" xmlns="http://www.w3.org/1999/xlink"></use>
                                    </svg></button>`;
    const $headerMenu = $('.c-header__menu')
    const $menuHandlerWrap = $('.c-header__menu-handler')
    const menuHandlerForThrottle = throttle(menuHandlerDetach, 500);

    function menuHandlerDetach() {
        if (window.innerWidth > breakPoints.xl - 1) {
            $headerMenu.prepend($menuHandlerWrap.detach())
        } else {
            $('.c-header__logo-wrap').append($menuHandlerWrap.detach())
        }
    }

    window.addEventListener('resize', menuHandlerForThrottle);
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
        appendArrows: $slider.closest('.c-section').find('.c-slider-nav'),
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        mobileFirst: true,
        responsive: [{
            breakpoint: breakPoints.md,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        }, {
            breakpoint: breakPoints.xl,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                centerMode: false
            }
        }, {
            breakpoint: breakPoints.xxl,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                centerMode: false

            }
        }
        ]
    });

    $slider.on('breakpoint', function (event, slick, breakpoint) {
        const $parent = $(event.currentTarget.closest('.slider-container'))
        console.log(breakpoint)
        if (breakpoint >= breakPoints.md + 1) {
            $parent.addClass('container')
        } else {
            $parent.removeClass('container')
        }
        if (breakpoint >= breakPoints.xl) {
            changeSlidesView(slick.$slides, slidePrimaryClasses, slideSecondaryClasses)
        } else {
            resetSlidesView(slick.$slides, slidePrimaryClasses, slideSecondaryClasses)
        }
    });

    $slider2.slick({
        variableWidth: true,
        nextArrow: nextArrowPrimary,
        prevArrow: prevArrowPrimary,
        appendArrows: $slider2.closest('.c-section').find('.c-slider-nav'),
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        mobileFirst: true,
        infinite:false
    });


    menuHandlerDetach()
    setTimeout(() => {
        $('.preloader-container').hide()
    }, 2000)
})
;


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

function throttle(f, wait) {
    var isThrottling = false;
    var hasTrailingCall = false;
    var lastContext;
    var lastArgs;
    var lastResult;

    var invokeFunc = function invokeFunc(context, args) {
        lastResult = f.apply(context, args);
        isThrottling = true;
        setTimeout(function () {
            isThrottling = false;

            if (hasTrailingCall) {
                invokeFunc(lastContext, lastArgs);
                lastContext = undefined;
                lastArgs = undefined;
                hasTrailingCall = false;
            }
        }, wait);
    };

    return function () {
        for (var len = arguments.length, args = new Array(len), key = 0; key < len; key++) {
            args[key] = arguments[key];
        }

        if (!isThrottling) {
            invokeFunc(this, args);
        } else {
            hasTrailingCall = true;
            lastContext = true;
            lastArgs = args;
        }

        return lastResult;
    };
}

