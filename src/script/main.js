const CLASS_LIST = {
    POPUP: 'popup',
    POPUP_ACTIVE: 'active-p',
    TRIGGER_OPEN: 'js-popup-open',
    TRIGGER_CLOSE: 'js-popup-close',

    CARD: 'js-card',
    BLOCK_NOT_ACTIVE: 'not-active-t',
    PRICE: 'js-price',
    PRICE_ACTIVE: 'active-t',
    PRICE_CLOSE: 'js-price-close'
}

document.addEventListener('click', (event) => {

    if(event.target.closest(`.${CLASS_LIST.TRIGGER_OPEN}`)) {
        event.preventDefault();

        const target = event.target.closest(`.${CLASS_LIST.TRIGGER_OPEN}`);
        const popupId = target.getAttribute('href').replace('#', '');
        const popup = document.getElementById(popupId);

        document.body.style.overflow = 'hidden';

        popup.classList.add(CLASS_LIST.POPUP_ACTIVE);
    }
    
    if(event.target.closest(`.${CLASS_LIST.TRIGGER_CLOSE}`) || event.target.classList.contains(CLASS_LIST.POPUP_ACTIVE)) {
        event.preventDefault();

        const popup = event.target.closest(`.${CLASS_LIST.POPUP}`);

        document.body.style.overflow = 'scroll';

        popup.classList.remove(CLASS_LIST.POPUP_ACTIVE);
    }
})

document.addEventListener('click', (event) => {
    const block = document.querySelector('.products .block')

    if(event.target.closest(`.${CLASS_LIST.CARD}`)) {
        event.preventDefault();

        const target = event.target.closest(`.${CLASS_LIST.CARD}`);
        const tableId = target.getAttribute('href').replace('#', '');
        const table = document.getElementById(tableId);

        table.classList.add(CLASS_LIST.PRICE_ACTIVE);
        block.classList.add(CLASS_LIST.BLOCK_NOT_ACTIVE);
    }
    
    if(event.target.closest(`.${CLASS_LIST.PRICE_CLOSE}`)) {
        event.preventDefault();

        const table = event.target.closest(`.${CLASS_LIST.PRICE}`);

        table.classList.remove(CLASS_LIST.PRICE_ACTIVE);
        block.classList.remove(CLASS_LIST.BLOCK_NOT_ACTIVE);
    }
})

//Маска для телефона
const tel = document.querySelectorAll('.js-tel');

window.addEventListener("DOMContentLoaded", () => {
    [].forEach.call(tel, (input) => {
    let keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        const pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+7 (___) ___-__-__",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, (a) => {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        let reg = matrix.substring(0, this.value.length).replace(/_+/g,
            (a) => {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)
    });
});