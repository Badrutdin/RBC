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
        if($menu.attr('data-open') == 'opened'){
            $menu.attr('data-open','closed')
        } else if ($menu.attr('data-open') == 'closed'){
            $menu.attr('data-open','opened')
        }
    })


});

