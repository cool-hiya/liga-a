const themeSwitch = document.getElementById('themeSwitchJs');
const themeSwitchButtons = Array.from(themeSwitch.querySelectorAll('input'));
const trexImage = document.querySelector('#promoLogoJs use');
const documentHead = document.head;

const storageId = 'theme';
let savedTheme = localStorage.getItem(storageId);

let theme = savedTheme ? savedTheme : 'light';
let activeButton = themeSwitch.querySelector(('input[value=\'' + theme + '\']'));
const themeSwitchIcons = Array.from(themeSwitch.querySelectorAll('svg'));

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
themeSwitch.hidden = false;

function setTheme() {
    const stylesheet = document.getElementById('darkThemeStylesheetJs');
    if (stylesheet && isLightTheme()) {
        documentHead.removeChild(stylesheet);
    } else if (!stylesheet && !isLightTheme()) {
        documentHead.insertAdjacentHTML('beforeEnd', '<link id="darkThemeStylesheetJs" rel="stylesheet" href="css/dark.min.css"/>');
    }
}

function isLightTheme() {
    return theme === 'light';
}

function setProperTrexImg() {
    if (!trexImage) {
        return;
    }
    trexImage.setAttribute('xlink:href', `#trex-rider-${theme}`);
}

function setProperIcons() {
    themeSwitchButtons.forEach((button, index) => {
        const label = button.nextElementSibling;
        const icon = label.querySelector('use'); 
        if (index === 0) {
            icon.setAttribute('xlink:href', `#sun-${theme}`);
        } else {
            icon.setAttribute('xlink:href', `#moon-${theme}`);
        }
    });
}