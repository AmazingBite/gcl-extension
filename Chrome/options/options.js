function manu_option() {
    const value = event.target.checked
    chrome.storage.sync.set({
        manu: value
    });
}

function zob_option() {
    const value = event.target.checked
    chrome.storage.sync.set({
        zob: value
    });
}

function meluche_option() {
    const value = event.target.checked
    chrome.storage.sync.set({
        meluche: value
    });
}

function saucisse_option() {
    const value = event.target.checked
    chrome.storage.sync.set({
        saucisse: value
    });
}

function restore_options() {
    chrome.storage.sync.get({
        manu: true,
        zob: true,
        meluche: true,
        saucisse: true,
    }, function (items) {
        document.getElementById('manu').checked = items.manu;
        document.getElementById('zob').checked = items.zob;
        document.getElementById('meluche').checked = items.meluche;
        document.getElementById('saucisse').checked = items.saucisse;
    });
}
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("manu").addEventListener('click', manu_option);
    document.getElementById("zob").addEventListener('click', zob_option);
    document.getElementById("meluche").addEventListener('click', meluche_option);
    document.getElementById("saucisse").addEventListener('click', saucisse_option);
});

document.addEventListener('DOMContentLoaded', restore_options);