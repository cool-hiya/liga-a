const themeSwitch = document.getElementById('themeSwitchJs');
const themeSwitchButtons = themeSwitch.querySelectorAll('input');
const trexImg = document.querySelector('#trexImgId use');

const storageId = 'theme';
let savedTheme = localStorage.getItem(storageId);

let theme = savedTheme ? savedTheme : 'light';
let activeButton = themeSwitch.querySelector(('input[value=\'' + theme + '\']'));

themeSwitchButtons.forEach(button => {
    button.addEventListener('click', e => {
        activeButton = e.target;
        theme = activeButton.value;
        setTheme();
        setProperTrexImg();
        setProperIcons();
        localStorage.setItem(storageId, theme);
    });
});

activeButton.click();

function setTheme() {
    document.body.dataset.theme = theme;
}

function setProperTrexImg() {
    var path = `img/sprite.svg#trex-rider-${theme}`;
    trexImg.setAttribute('xlink:href', path);
}

function setProperIcons() {
    themeSwitchButtons.forEach((button, index) => {
        var label = button.nextElementSibling;
        var icon = label.querySelector('use');
        if (index === 0) {
            icon.setAttribute('xlink:href', `img/sprite.svg#sun-${theme}`);
        } else {
            icon.setAttribute('xlink:href', `img/sprite.svg#moon-${theme}`);
        }
    });
}