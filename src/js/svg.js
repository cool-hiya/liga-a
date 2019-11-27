const pathToSvg = `/img/sprite.svg`;
const xhr = new XMLHttpRequest();
const documentBody = document.body;

xhr.open('GET', pathToSvg);
xhr.onreadystatechange = () => {
    if (xhr.status == 200) {
        if (!xhr.responseText) {
            return;
        }
        const svgStore = document.querySelector(`#svgStoreJs`);
        if (svgStore) {
            documentBody.removeChild(svgStore);
        }
        documentBody.insertAdjacentHTML('afterbegin', `<div id="svgStoreJs" style="display:none">${xhr.responseText}</div>`);
    }
};
xhr.send();