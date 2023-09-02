let manu = true;
let zob = true;
let meluche = true;
let saucisse = true;

let active = false;
let charge = false;

const rExpManu = new RegExp(
    'Emmanuel Macron|' +
    'EmmanuelMacron|' +
    'Macron Emmanuel|' +
    'MacronEmmanuel|' +
    'Macron|' +
    'M[\.r] le Président de la République|' + // Couvre les cas "Mr" et "M."
    'Monsieur Macron|' +
    'le Président de la République|' +
    'Monsieur le Président de la République|' +
    'Monsieur le Président|' +
    'Président de la République française|' +
    'Président de la République|' +
    'Le Président Macron|' +
    'Emmanuel Jean-Michel Frédéric Macron|' +
    'M[\.r] Macron', 'gi'); // Recherche 'g'lobal et 'i'nsensible à la casse

const rExpZob = new RegExp(
    'Éric Zemmour|' +
    'ÉricZemmour|' +
    'Eric Zemmour|' +
    'EricZemmour|' +
    'Zemmour Eric|' +
    'ZemmourEric|' +
    'ZemmourÉric|' +
    'Zemmour Éric|' +
    'Éric Justin Léon Zemmour|' +
    'Eric Justin Léon Zemmour|' +
    'Zemmour|' +
    'Monsieur Zemmour|' +
    'M[\.r] Zemmour', 'gi'
);

const rExpMeluche = new RegExp(
    'Jean-Luc Mélenchon|' +
    'Jean-LucMélenchon|' +
    'Jean-Luc Melenchon|' +
    'Jean-LucMelenchon|' +
    'Mélenchon Jean-Luc|' +
    'MélenchonJean-Luc|' +
    'Melenchon Jean-Luc|' +
    'MelenchonJean-Luc|' +
    'Mélenchon|' +
    'Melenchon|' +
    'Monsieur Mélenchon|' +
    'Monsieur Melenchon|' +
    'M[\.r] Mélenchon|' +
    'M[\.r] Melenchon', 'gi'
);

const rExpRoussel = new RegExp(
    'Fabien Roussel|' +
    'FabienRoussel|' +
    'Roussel Fabien|' +
    'RousselFabien|' +
    'Monsieur Roussel|' +
    'M[\.r] Roussel', 'gi' // Recherche 'g'lobal et 'i'nsensible à la casse
);

// Récupération des paramètres et lancement de la première itération
chrome.storage.sync.get({
    manu: true,
    zob: true,
    meluche: true,
    saucisse: true,
}, function (items) {
    manu = items.manu;
    zob = items.zob;
    meluche = items.meluche;
    saucisse = items.saucisse;
    active = manu || zob || meluche || saucisse;
    charge = true;
    first_iteration();
});

// La première itération, récupère toute la page et non que les modifs
// Gère également le nom de la page
function first_iteration() {
    if (active && charge) {
        if (manu)
            document.title = document.title.replace(rExpManu, 'Manu');
        if (zob)
            document.title = document.title.replace(rExpZob, 'Zob');
        if (meluche)
            document.title = document.title.replace(rExpMeluche, 'Méluche');
        if (saucisse)
            document.title = document.title.replace(rExpRoussel, 'Saucisse Roussel');
        core_script(document.body)
    }
}

// Parcours les modifications pour les envoyer au script
function loop_script(mutationRecord) {
    mutationRecord.forEach(mutation => {
        mutation.addedNodes.forEach(element => {
            if (!element.isContentEditable)
                core_script(element)
        })
    });
}

// Reçoit un element et modifie les noms si besoin
function core_script(element) {
    if (active && charge) {
        const walk = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
        while (textNode = walk.nextNode()) {
            if (manu)
                textNode.nodeValue = textNode.nodeValue.replace(rExpManu, 'Manu');
            if (zob)
                textNode.nodeValue = textNode.nodeValue.replace(rExpZob, 'Zob');
            if (meluche)
                textNode.nodeValue = textNode.nodeValue.replace(rExpMeluche, 'Méluche');
            if (saucisse)
                textNode.nodeValue = textNode.nodeValue.replace(rExpRoussel, 'Saucisse Roussel');
        }
    }
}

// Observateur qui vérifie les mises à jour de la page
const observer = new MutationObserver(loop_script);
// début de l'observateur avec paramètres
observer.observe(document.body, {
    attributes: false,
    childList: true,
    subtree: true,
});