// OC Projet 07 - Cette version du code s'intéresse au développement d'un algorithme "natif", c'est-à-dire qu'on utilisera uniquement des fonctions JS natives (<ES6?). Dans une seconde branche, on déploiera les mêmes fonctionnalités mais avec des propriétés spécifiques aux listes (forEach, map, reduce, ...).

//import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { Init } from "./init.js";
import { Recipe } from "./recipe.js";
import { Dropdown } from "./dropdown.js";
import { ListOfRecipes } from "./listOfRecipes.js";
import { Hashtag } from "./hashtag.js";

// on génère le contenu de la page HTML
const doc = new Init;
doc.generateContent();

async function fetchDataAsync() {
    try {
        const response = await fetch("./assets/recipes.json");
        const data = await response.json();
        return data["recipes"];
    }
    catch (error) {
        console.error("Erreur dans la fonction fetchDataAsync : ", error);
    }
}

fetchDataAsync().then(recipes => {

    // on créé une variable qui stocke tous les mots-clés/hashtags.
    const keywords = [];

    let initialList = recipes;
    let actualList = new ListOfRecipes([]);

    // on commence par créer, pour l'ensemble des recettes, un objet dédié
    for (let i=0; i<initialList.length; i++) {
        let recipe = new Recipe(
            initialList[i].id,
            initialList[i].name,
            initialList[i].ingredients,
            initialList[i].time,
            initialList[i].description,
            initialList[i].appliance,
            initialList[i].ustensils
        );
        actualList.push(recipe);
    }

    // A chaque fois qu'on aura un changement soit au niveau de l'input principal, soit au niveau des hashtags (ajout ou suppression), on va avoir la même séquence : création d'une liste de recette, affichage des recettes, mise à jour des filtres avancés.
    updateInterface(actualList, keywords);

    // on cible le champ de recherche principal
    const searchInput = document.forms["mainSearch"];

    // à chaque modification de l'input, on actualise l'interface: liste des recettes affichées et contenu des dropdowns
    searchInput.addEventListener("input", element => {
        const input = element.target.value.toLowerCase();
        const newList = actualList.matchingRecipes(input); 
        updateResultsWithHashtags(newList);
    });

    const hashtagsZone = document.getElementById("hashtags");

    hashtagsZone.addEventListener("click", () => {
        const input = (<HTMLInputElement>document.getElementById("mainSearchInput")).value;
        let newlist = actualList;
        if (input.length > 0) {
            newlist = actualList.matchingRecipes(input);
        }
        updateResultsWithHashtags(newlist);
    });

    const dropdowns = [];
    dropdowns.push(document.getElementById("dropdown-ingredients"), document.getElementById("dropdown-appliances"), document.getElementById("dropdown-ustensils"));
    for (let i=0; i<dropdowns.length; i++) {
        dropdowns[i].addEventListener("click", () => {
            const input = (<HTMLInputElement>document.getElementById("mainSearchInput")).value;
            let newlist = actualList;
            if (input.length > 0) {
                newlist = actualList.matchingRecipes(input);
            }
            updateResultsWithHashtags(newlist);
        })
    }

});
/* ----------- FIN DE LA FONCTION PRINCIPALE ----------------- */

// Fonction updateInterface() : gère la mise à jour de l'interface principale (liste des recettes, contenu des filtres) à chaque changement au niveau de l'input principal ou des hashtags (ajout/suppression)
const updateInterface = (inputList: ListOfRecipes, keywords: Array<Hashtag>) => {

    // on cible la section des résultats
    const resultSection = document.getElementById("results");
    // on la vide, au cas où elle contiendrait déjà des informations
    resultSection.innerHTML = "";

    if (inputList.length == 0) {
        resultSection.innerHTML = "Aucune recette ne correspond à votre recherche... vous pouvez essayer avec \" tarte aux pommes \", \"poisson\", etc. !";
    } else {
        // on affiche la liste des recettes
        inputList.displayRecipes();
    }
    
    // on a besoin pour chaque type de filtre :
    // - de la liste des termes correspondants,
    // - sans doublons,
    // - triés par ordre alphabétique,
    // - sans oublier de supprimer les hashtags
    const listOfIngredients = inputList
        .extractIngredients()
        .deleteDuplicates()
        .deleteHashtags(keywords)
        .sortByName();
    
    const listOfAppliances = inputList
        .extractAppliances()
        .deleteDuplicates()
        .deleteHashtags(keywords)
        .sortByName();
    
    const listOfUstensils = inputList
        .extractUstensils()
        .deleteDuplicates()
        .deleteHashtags(keywords)
        .sortByName();
    
    // passons maintenant aux filtres avancés. On commence par créer pour chaque filtre l'objet associé
    const dropDownIngredients = new Dropdown("ingredients",listOfIngredients);
    const dropDownAppliances = new Dropdown("appliances",listOfAppliances);
    const dropDownUstensils = new Dropdown("ustensils",listOfUstensils);
    
    // et on remplit chaque filtre avec les options souhaitées
    dropDownIngredients.updateDropdown("ingredients", listOfIngredients);
    dropDownAppliances.updateDropdown("appliances", listOfAppliances);
    dropDownUstensils.updateDropdown("ustensils", listOfUstensils);

    // on cible ensuite chaque champ recherche des menus dropDown
    const inputIngredients = document.getElementById("dropInput-ingredients");
    inputIngredients.addEventListener("input", element => {
        const input = (<HTMLInputElement>element.target).value.toLowerCase();
        const newList = dropDownIngredients.search(input); 
        dropDownIngredients.updateDropdown("ingredients",newList);
        //emptySearch("dropInput-ingredients");
    });
    const inputAppliances = document.getElementById("dropInput-appliances");
    inputAppliances.addEventListener("input", element => {
        const input = (<HTMLInputElement>element.target).value.toLowerCase();
        const newList = dropDownAppliances.search(input); 
        dropDownAppliances.updateDropdown("appliances",newList);
        //emptySearch("dropInput-appliances");
    });
    const inputUstensils = document.getElementById("dropInput-ustensils");
    inputUstensils.addEventListener("input", element => {
        const input = (<HTMLInputElement>element.target).value.toLowerCase();
        const newList = dropDownUstensils.search(input); 
        dropDownUstensils.updateDropdown("ustensils",newList);
    });    
        
    return {inputList, listOfIngredients, listOfAppliances, listOfUstensils};
}

// cette fonction est utilisée par les event listeners des hashtags. Lorsqu'on ajoute, supprime ou clique dans la zone des hashtags, cette fonction va faire la liste des hashtags existants et met à jour l'interface en fonction.
const updateResultsWithHashtags = (initialList: ListOfRecipes) => {
    const allHashtags = document.querySelectorAll(".hashtag");
    const newKeywords = [];

    /* allHashtags.forEach(element => {
        const newHashtag = new Hashtag(element.textContent, element["dataset"]["hashtagtype"]);
        newKeywords.push(newHashtag);
    }); */

    for (let item of allHashtags) {
        const newHashtag = new Hashtag(item.textContent, item["dataset"]["hashtagtype"]);
        newKeywords.push(newHashtag);
    }
        
    let i = 0;
    let newList = initialList;
    if (newKeywords.length>0) {
        newList = initialList.matchingRecipes(newKeywords[0]["name"]);
        while (i<newKeywords.length) {
            newList = newList.matchingRecipes(newKeywords[i]["name"]);
            i++;
        };
    }

    updateInterface(newList, newKeywords);
}

// cette fonction va écouter les items des dropdowns : au click sur un mot-clé, on vide le champ de recherche
const emptySearch = (inputField: string) => {    
    const input = document.getElementById(inputField);
    const dropdownItems = document.querySelectorAll(".dropDown-item");
    //dropdownItems.forEach(element => element.addEventListener("click", () => (<HTMLInputElement>input).value = ""));
    for(let item of dropdownItems) {
        item.addEventListener("click", () => (<HTMLInputElement>input).value = "");
    }
    
    // fonction en standby car le dropdown ne se met pas à jour quand il est vidé...
}