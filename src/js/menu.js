var menuToggle = document.getElementById('navToggleJs');
var menuElements = document.querySelectorAll('[data-menu-active]');
var body = document.body;
var breakPointMdMin = 768;
var isMenuActive = false;

menuToggle.addEventListener('click', function () {
    isMenuActive = !isMenuActive;
    body.style.overflow = isMenuActive ? 'hidden' : '';

    menuElements.forEach(function(el) {
        el.dataset.menuActive = isMenuActive;
    })
});

window.addEventListener('resize', function () {
    if (window.innerWidth >= breakPointMdMin) {
        body.style.overflow = '';
    } else {
        body.style.overflow = isMenuActive ? 'hidden' : '';
    }
});
