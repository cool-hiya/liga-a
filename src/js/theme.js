var themeSwitch = document.getElementById('themeSwitchJs');
var themeSwitchButtons = themeSwitch.querySelectorAll('input');
var trexImg = document.querySelector('#trexImgId use');

var storageId = 'theme';
var savedTheme = localStorage.getItem(storageId);

var theme = savedTheme ? savedTheme : 'light';
var activeButton = themeSwitch.querySelector(('input[value=\'' + theme + '\']'));

themeSwitchButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
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
    var path = 'img/sprite.svg#trex-rider-' + theme;
    trexImg.setAttribute('xlink:href', path);
}

function setProperIcons() {
    themeSwitchButtons.forEach(function (button, index) {
        var label = button.nextElementSibling;
        var icon = label.querySelector('use');
        if (index === 0) {
            icon.setAttribute('xlink:href', 'img/sprite.svg#sun-' + theme);
        } else {
            icon.setAttribute('xlink:href', 'img/sprite.svg#moon-' + theme);
        }
    });
}