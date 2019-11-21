const themeSwitch = document.getElementById('themeSwitchJs');
const themeSwitchButtons = Array.from(themeSwitch.querySelectorAll('input'));
const trexImages = Array.from(document.querySelectorAll('#promoLogoJs svg'));
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
    if (!trexImages) {
        return;
    }
    if (isLightTheme()) {
        trexImages[0].removeAttribute('hidden', '');
        trexImages[1].setAttribute('hidden', '');
    } else {
        trexImages[0].setAttribute('hidden', '');
        trexImages[1].removeAttribute('hidden', '');
    }
}

function setProperIcons() {
    themeSwitchButtons.forEach((button) => {
        const label = button.nextElementSibling;
        const icons = Array.from(label.querySelectorAll('svg'));
        icons[0].style.display = isLightTheme() ? '' : 'none';
        icons[1].style.display = !isLightTheme() ? '' : 'none';
    });
}