function counterHandler($input, $plus, $minus, min = 1, max = 99, step = 1) {
    $plus.on('click', function () {
        const curentValue = parseInt($input.val())
        const nextValue = parseInt(curentValue + step)
        if (nextValue <= max) {
            $input.val(nextValue)
            $input.trigger('change')
        }
    })
    $minus.on('click', function () {
        const curentValue = parseInt($input.val())
        const nextValue = parseInt(curentValue - step)
        if (nextValue >= min) {
            $input.val(nextValue)
            $input.trigger('change')
        }
    })
}

function replaceInputValue(value, $targetInput) {
    $targetInput.val(value)
}

$(document).ready(function () {
    const $menuHandler = $('[data-menu-handler]')
    const $menu = $('[data-open]')
    $menuHandler.on('click', function () {
        if ($menu.attr('data-open') == 'opened') {
            $menu.attr('data-open', 'closed')
        } else if ($menu.attr('data-open') == 'closed') {
            $menu.attr('data-open', 'opened')
        }
    })
    const $slider = $('.slider')
    const slideSecondaryClasses = 'c-card-news_md c-card-news_color-dark c-card-news_style-secondary'
    const slidePrimaryClasses = 'c-card-news_lg c-card-news_color-light c-card-news_style-primary'
    $slider.on('init', function (event, slick) {
        const viewWidth = window.innerWidth
        const $parent = $(event.currentTarget.closest('.slider-container'))
        if (viewWidth >= 768) {
            $parent.addClass('container')
        }
        if (viewWidth >= 1366) {
            changeSlidesView(slick.$slides, slidePrimaryClasses, slideSecondaryClasses)
        }
    })
    $slider.slick({
        variableWidth: true,
        nextArrow: `<div class="c-slider-nav__item"><button class="c-btn-ico c-btn-ico_md c-btn-ico_color-primary" type="button"><svg class="c-btn-ico__icon" fill="none" height="12" width="17" xmlns="http://www.w3.org/2000/svg">
                                        <use xlink:href="images/svg.svg#arrow" xmlns="http://www.w3.org/1999/xlink"></use>
                                    </svg></button></div>`,
        prevArrow: `<div class="c-slider-nav__item"><button class="c-btn-ico c-btn-ico_md c-btn-ico_color-primary c-btn-ico_prev" type="button"><svg class="c-btn-ico__icon" fill="none" height="12" width="17" xmlns="http://www.w3.org/2000/svg">
                                        <use xlink:href="images/svg.svg#arrow" xmlns="http://www.w3.org/1999/xlink"></use>
                                    </svg></button></div>`,
        appendArrows: $('.c-slider-nav'),
        responsive: [{
            breakpoint: 10000,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        }, {
            breakpoint: 1920,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        }, {
            breakpoint: 1366,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }

        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        }, {
            breakpoint: 640,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }]
    });

    $slider.on('breakpoint', function (event, slick, breakpoint) {
        const $parent = $(event.currentTarget.closest('.slider-container'))
        console.log(breakpoint)
        if (breakpoint > 769) {
            $parent.addClass('container')
        } else {
            $parent.removeClass('container')
        }

        if (breakpoint > 1367) {
            changeSlidesView(slick.$slides, slidePrimaryClasses, slideSecondaryClasses)
        } else {
            resetSlidesView(slick.$slides, slidePrimaryClasses, slideSecondaryClasses)
        }
    });
});

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

