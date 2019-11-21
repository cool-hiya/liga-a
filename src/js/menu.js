const menuToggle = document.getElementById('navToggleJs');
const menuElements = Array.from(document.querySelectorAll('[data-menu-active]'));
const body = document.body;
const breakPointMdMin = 768;
let isMenuActive = false;

menuToggle.addEventListener('click', () => {
    isMenuActive = !isMenuActive;
    body.style.overflow = isMenuActive ? 'hidden' : '';

    menuElements.forEach(el => {
        el.dataset.menuActive = isMenuActive;
    })
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= breakPointMdMin) {
        body.style.overflow = '';
    } else {
        body.style.overflow = isMenuActive ? 'hidden' : '';
    }
});
