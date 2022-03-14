// OC Projet 07 - Cette version du code s'intéresse au développement d'un algorithme "natif", c'est-à-dire qu'on utilisera uniquement des fonctions JS natives (<ES6?). Dans une seconde branche, on déploiera les mêmes fonctionnalités mais avec des propriétés spécifiques aux listes (forEach, map, reduce, ...).
//import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { Init } from "./init.js";
import { Recipe } from "./recipe.js";
import { Dropdown } from "./dropdown.js";
import { ListOfRecipes } from "./listOfRecipes.js";
import { Hashtag } from "./hashtag.js";
import { ListOfHashtags } from "./listOfHashtags.js";
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
    const keywords = new ListOfHashtags([]);
    let initialList = recipes;
    let actualList = new ListOfRecipes([]);
    // on commence par créer, pour l'ensemble des recettes, un objet dédié
    for (let i = 0; i < initialList.length; i++) {
        let recipe = new Recipe(initialList[i].id, initialList[i].name, initialList[i].ingredients, initialList[i].time, initialList[i].description, initialList[i].appliance, initialList[i].ustensils);
        actualList.push(recipe);
    }
    // A chaque fois qu'on aura un changement soit au niveau de l'input principal, soit au niveau des hashtags (ajout ou suppression), on va avoir la même séquence : création d'une liste de recette, affichage des recettes, mise à jour des filtres avancés.
    updateInterface(actualList, keywords);
    /* listenToHashtags(keywords); */
    // on cible le champ de recherche principal
    const searchInput = document.forms["mainSearch"];
    // à chaque modification de l'input, on actualise l'interface: liste des recettes affichées et contenu des dropdowns
    searchInput.addEventListener("input", element => {
        const input = element.target.value.toLowerCase();
        const newList = actualList.matchingRecipes(input);
        updateResultsWithHashtags(newList);
        // on va également "écouter" les items des dropdowns: à chaque clic, la liste des keywords est actualisée
        /* listenToHashtags(keywords); */
    });
    const hashtagsZone = document.getElementById("hashtags");
    hashtagsZone.addEventListener("click", () => {
        const input = document.getElementById("mainSearchInput").value;
        let newlist = actualList;
        if (input.length > 0) {
            newlist = actualList.matchingRecipes(input);
        }
        updateResultsWithHashtags(newlist);
    });
    const dropdowns = [];
    dropdowns.push(document.getElementById("dropdown-ingredients"), document.getElementById("dropdown-appliances"), document.getElementById("dropdown-ustensils"));
    for (let i = 0; i < dropdowns.length; i++) {
        dropdowns[i].addEventListener("click", () => {
            const input = document.getElementById("mainSearchInput").value;
            let newlist = actualList;
            if (input.length > 0) {
                newlist = actualList.matchingRecipes(input);
            }
            updateResultsWithHashtags(newlist);
        });
    }
    /* searchInput.addEventListener("awesomeTestEvent", (e) => console.log("aha!", e.detail.text));

    const mainInput = document.getElementById("mainSearchInput");

    mainInput.addEventListener("input", function() {
        // create custom Event
        const awesomeTest = new CustomEvent("awesomeTestEvent", {
            detail: {
                text: (<HTMLInputElement>mainInput).value
            }
        });
        dispatchEvent(awesomeTest);
        console.log(awesomeTest.detail.text);
    });
    const myDropDowns = document.querySelector(".dropDowns");
    //on ajoute un event listener sur la zone des filtres avancés. A chaque fois qu'on clique sur un des items de la liste, on créé un hashtag
    // ce hashtag est lui-même écouté.
    
    myDropDowns.addEventListener("click", function(event) {
        dealWithHashtags(event, recipes, keywords, types);
    }, false);

    const hashtags = document.getElementById("hashtags");
    hashtags.addEventListener("click", function (event) {
        //dealWithHashtags(event, recipes, keywords, type);
        let type = (<HTMLElement>event.target).parentElement.className;
        
        if (type =="close") {
            type = (<HTMLElement>event.target).parentElement.parentElement.className;
        }
        
        switch (type){
                case "hashtag badge bg-primary":
                    console.log("bg-primary");
                    break;
                case "hashtag badge bg-success":
                    console.log("bg-success");
                    break;
                case "hashtag badge bg-danger":
                    console.log("bg-danger");
                    break;
                default:
        };

        console.log("keywords, quand je ferme: ", keywords);
        // on cible la section des résultats
        const resultSection = document.getElementById("results");
        // on la vide, au cas où elle contiendrait déjà des informations
        resultSection.innerHTML = "";
        for (let i=0; i<recipes.length; i++) {
            let recipe = new Recipe(
                recipes[i].id,
                recipes[i].name,
                recipes[i].ingredients,
                recipes[i].time,
                recipes[i].description,
                recipes[i].appliance,
                recipes[i].ustensils
            );
            // on affiche chaque recette selon le format dédié
            recipe.displayRecipe();
        }
        
        let uniqueIngredientsOnly = uniqueIngredients(recipes);
    let uniqueAppliancesOnly = uniqueAppliances(recipes); // idem pour les appareils
    let uniqueUstensilsOnly = uniqueUstensils(recipes); // idem pour les ustensiles
    dropDownIngredients.updateDropdown("ingredients", uniqueIngredientsOnly);
    dropDownAppliances.updateDropdown("appliances", uniqueAppliancesOnly);
    dropDownUstensils.updateDropdown("ustensils", uniqueUstensilsOnly);

        dealWithHashtags(event, recipes, keywords, types);
    }); */
    // on ajoute à présent un event listener de type "input" au champ de recherche principal
    /* searchInput.addEventListener("input", element => {

        console.clear();
        console.log();

        // on cible la section des résultats
        const resultSection = document.getElementById("results");
        // on la vide, au cas où elle contiendrait déjà des informations
        resultSection.innerHTML = "";
        
        
        // on stocke la valeur recherchée par l'utilisateur dans une variable
        const input = element.target.value.toLowerCase();

        // on créé la liste des (futurs) résultats
        let filteredList = [];

        // on souhaite s'assurer qu'une même recette n'est pas ajoutée deux fois...
        // on commence par créer les différentes listes à afficher. Chacune de ces listes correspond à la recherche de l'input utilisateur parmi les ingrédients, puis les titres de recettes, puis les descriptions.
        const ingredientsResults = matchingIngredients(input, recipes);
        const recipeTitleResults = matchingRecipeTitle(input, recipes);
        const descriptionResults = matchingDescription(input, recipes);

        // on va ensuite ajouter l'une après l'autre les résultats des différents filtres à la liste principale
        alreadyIn(filteredList, ingredientsResults);
        alreadyIn(filteredList, recipeTitleResults);
        alreadyIn(filteredList, descriptionResults);

        // on va maintenant supprimer les items doublons de chacune des catégories (ingrédients, appareils, ustensiles)
        let uniqueIngredientsOnly = uniqueIngredients(filteredList);
        let uniqueAppliancesOnly = uniqueAppliances(filteredList);
        let uniqueUstensilsOnly = uniqueUstensils(filteredList);

        // enfin, on créé les filtres avancés, qui contiennent un menu déroulant affichant pour chaque catégorie les éléments des recettes correspondantes.
        dropDownIngredients.updateDropdown("ingredients", uniqueIngredientsOnly);
        dropDownAppliances.updateDropdown("appliances", uniqueAppliancesOnly);
        dropDownUstensils.updateDropdown("ustensils", uniqueUstensilsOnly);

        // on commence par créer, pour l'ensemble des recettes de la base de données, un objet dédié
    for (let i=0; i<recipes.length; i++) {
        let recipe = new Recipe(
            recipes[i].id,
            recipes[i].name,
            recipes[i].ingredients,
            recipes[i].time,
            recipes[i].description,
            recipes[i].appliance,
            recipes[i].ustensils
        );
        // on affiche chaque recette selon le format dédié
        recipe.displayRecipe();
    }
        
        // si la taille de l'input est >=3 caractères, on va lancer une recherche, sinon, on ne fait rien
        if (input.length >= 3) {

            let results = [];
            let firstList = new ListOfRecipes([]);

            // on commence par sélectionner la zone où l'on affichera les résultats
            const resultSection = document.getElementById("results");
            // on la vide, au cas où elle contiendrait déjà des informations
            resultSection.innerHTML = "";

            // on souhaite s'assurer qu'une même recette n'est pas ajoutée deux fois...
            // on commence par créer les différentes listes à afficher
            const ingredientsResults = matchingIngredients(input, recipes);
            const recipeTitleResults = matchingRecipeTitle(input, recipes);
            const descriptionResults = matchingDescription(input, recipes);

            // on va ensuite ajouter l'une après l'autre les résultats des différents filtres à la liste principale
            alreadyIn(results, ingredientsResults);
            alreadyIn(results, recipeTitleResults);
            alreadyIn(results, descriptionResults);
            results = sortById(results);
            
            
            const secondList_ing = new ListOfRecipes(ingredientsResults);
            const secondList_rec = new ListOfRecipes([]);
            const secondList_des = new ListOfRecipes([]);

            firstList.integrateThisList(secondList_ing);
            firstList.integrateThisList(secondList_rec);
            firstList.integrateThisList(secondList_des);

            // à présent qu'on a une liste "épurée", on va créer les objets associés
            for (let i=0; i<results.length; i++) {
                let recipe = new Recipe(
                    results[i].id,
                    results[i].name,
                    results[i].ingredients,
                    results[i].time,
                    results[i].description,
                    results[i].appliance,
                    results[i].ustensils
                );
                // et on les affiche
                recipe.displayRecipe();
            }

            if (results.length == 0) {
                resultSection.innerHTML = "Aucune recette ne correspond à votre recherche... vous pouvez essayer avec \" tarte aux pommes \", \"poisson\", etc. !";
            }

        }
    }); */
    // On veut également "écouter" les champs input des filtres avancés.
    // On va commencer par les cibler
    /* const dropInputIngredients = document.getElementById("dropInput-ingredients");
    const dropInputAppliances = document.getElementById("dropInput-appliances");
    const dropInputUstensils = document.getElementById("dropInput-ustensils");

    // on va ensuite pour chacun d'eux récupérer ce qui est entré
    dropInputIngredients.addEventListener("input",function(event) {
        const input = (<HTMLInputElement>event.target).value;
        
        // avec cette valeur qui est entrée, on veut afficher UNIQUEMENT les ingrédients qui correspondent à cet input.
        let finalResults = [];
        let results = thisIngredientPlease(input, recipes);
        finalResults = itemAlreadyIn(finalResults, results);
        
        dropDownIngredients.updateDropdown("ingredients",finalResults);
    });

    dropInputAppliances.addEventListener("input",function(event) {
        const input = (<HTMLInputElement>event.target).value;
    
        let finalResults = [];
        let results = thisAppliancePlease(input, recipes);
        finalResults = itemAlreadyIn(finalResults, results);

        dropDownAppliances.updateDropdown("appliances",finalResults);
        
    });

    dropInputUstensils.addEventListener("input",function(event) {
        const input = (<HTMLInputElement>event.target).value;
    
        let finalResults = [];
        let results = thisUstensilPlease(input, recipes);
        finalResults = itemAlreadyIn(finalResults, results);

        dropDownUstensils.updateDropdown("ustensils",finalResults);
    }); */
});
/* ----------- FIN DE LA FONCTION PRINCIPALE ----------------- */
// Fonction updateInterface() : gère la mise à jour de l'interface principale (liste des recettes, contenu des filtres) à chaque changement au niveau de l'input principal ou des hashtags (ajout/suppression)
const updateInterface = (inputList, keywords) => {
    // on cible la section des résultats
    const resultSection = document.getElementById("results");
    // on la vide, au cas où elle contiendrait déjà des informations
    resultSection.innerHTML = "";
    if (inputList.length == 0) {
        resultSection.innerHTML = "Aucune recette ne correspond à votre recherche... vous pouvez essayer avec \" tarte aux pommes \", \"poisson\", etc. !";
    }
    else {
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
    const dropDownIngredients = new Dropdown("ingredients", listOfIngredients);
    const dropDownAppliances = new Dropdown("appliances", listOfAppliances);
    const dropDownUstensils = new Dropdown("ustensils", listOfUstensils);
    // et on remplit chaque filtre avec les options souhaitées
    dropDownIngredients.updateDropdown("ingredients", listOfIngredients);
    dropDownAppliances.updateDropdown("appliances", listOfAppliances);
    dropDownUstensils.updateDropdown("ustensils", listOfUstensils);
    // on cible ensuite chaque champ recherche des menus dropDown
    const inputIngredients = document.getElementById("dropInput-ingredients");
    inputIngredients.addEventListener("input", element => {
        const input = element.target.value.toLowerCase();
        const newList = dropDownIngredients.search(input);
        dropDownIngredients.updateDropdown("ingredients", newList);
        //emptySearch("dropInput-ingredients");
    });
    const inputAppliances = document.getElementById("dropInput-appliances");
    inputAppliances.addEventListener("input", element => {
        const input = element.target.value.toLowerCase();
        const newList = dropDownAppliances.search(input);
        dropDownAppliances.updateDropdown("appliances", newList);
        //emptySearch("dropInput-appliances");
    });
    const inputUstensils = document.getElementById("dropInput-ustensils");
    inputUstensils.addEventListener("input", element => {
        const input = element.target.value.toLowerCase();
        const newList = dropDownUstensils.search(input);
        dropDownUstensils.updateDropdown("ustensils", newList);
    });
    return { inputList, listOfIngredients, listOfAppliances, listOfUstensils };
};
// cette fonction est utilisée par les event listeners des hashtags. Lorsqu'on ajoute, supprime ou clique dans la zone des hashtags, cette fonction va faire la liste des hashtags existants et met à jour l'interface en fonction.
const updateResultsWithHashtags = (initialList) => {
    const allHashtags = document.querySelectorAll(".hashtag");
    const newKeywords = new ListOfHashtags([]);
    allHashtags.forEach(element => {
        const newHashtag = new Hashtag(element.textContent, element["dataset"]["hashtagtype"]);
        newKeywords.push(newHashtag);
    });
    let i = 0;
    let newList = initialList;
    if (newKeywords.length > 0) {
        newList = initialList.matchingRecipes(newKeywords[0]["name"]);
        while (i < newKeywords.length) {
            newList = newList.matchingRecipes(newKeywords[i]["name"]);
            i++;
        }
        ;
    }
    updateInterface(newList, newKeywords);
};
// cette fonction va écouter les items des dropdowns : au click sur un mot-clé, on vide le champ de recherche
const emptySearch = (inputField) => {
    const input = document.getElementById(inputField);
    const dropdownItems = document.querySelectorAll(".dropDown-item");
    dropdownItems.forEach(element => element.addEventListener("click", () => input.value = ""));
    // fonction en standby car le dropdown ne se met pas à jour quand il est vidé...
};
// cette fonction va ajouter un hashtag à la liste keywords
const addHashtag = (input, listOfKeywords) => {
    const hashtags = document.getElementById("hashtags");
    hashtags.innerHTML = "";
    const itemClicked = input.target.innerText;
    const itemType = input.target.classList[1];
    const newHashtag = new Hashtag(itemClicked, itemType);
    console.log("fonction addHashtag, list of keywords : ", listOfKeywords);
    listOfKeywords.push(newHashtag);
    document.querySelectorAll(".close").forEach(element => {
        console.log("ploup");
        console.log("écoute les boutons close: ", element);
    });
    return listOfKeywords;
};
// Cette fonction prend en entrée une liste de résultats (recipes) et un input (le terme recherché), et renvoie la liste des recettes dont le titre contient l'input 
const matchingRecipeTitle = (input, recipes) => {
    input = input.toLowerCase();
    // on créé une variable qui va stocker toutes les recettes correspondantes
    let list = [];
    // on parcourt toutes les recettes
    for (let i = 0; i < recipes.length; i++) {
        // si le titre de la recette contient le terme recherché, on l'ajoute à la liste, sinon, on ne fait rien
        if (recipes[i].name.toLowerCase().includes(input)) {
            list.push(recipes[i]);
        }
    }
    //console.log("recettes: ",list);
    return list;
};
// Cette fonction prend en entrée une liste de resultats (recipes) et un input (le terme recherché), et renvoit la liste des recettes contenant un ingrédient correspondant
const matchingIngredients = (input, recipes) => {
    input = input.toLowerCase();
    // on créé une variable qui va stocker toutes les recettes correspondantes
    let list = [];
    // on parcourt toute la liste des recettes
    for (let i = 0; i < recipes.length; i++) {
        // au sein de chaque recette, on parcourt chaque liste d'ingrédients
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            // si un des ingrédients contient le terme recherché, on ajoute le nom de la recette à la liste. Sinon, on ne fait rien.
            if (recipes[i].ingredients[j].ingredient.toLowerCase().includes(input)) {
                list.push(recipes[i]);
                // comme on n'a pas besoin d'ajouter x fois la même recette même si plusieurs ingrédients correspondent, on peut sortir de la boucle
                break;
            }
        }
    }
    return list;
};
// Cette fonction prend en entrée une liste de recettes (recipes) et un input (le terme recherché), et renvoit la liste des recettes dont la description contient le terme recherché
const matchingDescription = (input, recipes) => {
    input = input.toLowerCase();
    // on créé une variable qui va stocker toutes les recettes correspondantes
    let list = [];
    // on parcourt toute la liste des recettes
    for (let i = 0; i < recipes.length; i++) {
        // au sein de chaque recette, on va chercher dans chaque description si celle-ci contient le terme recherché
        if (recipes[i].description.toLowerCase().includes(input)) {
            list.push(recipes[i]);
        }
    }
    return list;
};
// Cette fonction prend en entrée une liste de resultats (recipes) et un input (le terme recherché), et renvoit la liste des recettes contenant l'appareil correspondant
const matchingAppliances = (input, recipes) => {
    input = input.toLowerCase();
    // on créé une variable qui va stocker toutes les recettes correspondantes
    let list = [];
    // on parcourt toute la liste des recettes
    for (let i = 0; i < recipes.length; i++) {
        // au sein de chaque recette, on regarde si la clé "appliance" contient le terme recherché
        // si un des appareils correspond au terme recherché, on ajoute le nom de la recette à la liste. Sinon, on ne fait rien.
        if (recipes[i].appliance.toLowerCase() == input.toLowerCase()) {
            list.push(recipes[i]);
        }
    }
    return list;
};
// Cette fonction prend en entrée une liste de resultats (recipes) et un input (le terme recherché), et renvoit la liste des recettes contenant l'ustensile correspondant
const matchingUstensils = (input, recipes) => {
    input = input.toLowerCase();
    // on créé une variable qui va stocker toutes les recettes correspondantes
    let list = [];
    // on parcourt toute la liste des recettes
    for (let i = 0; i < recipes.length; i++) {
        // au sein de chaque recette, on parcourt chaque liste d'ingrédients
        for (let j = 0; j < recipes[i].ustensils.length; j++) {
            // si un des ingrédients contient le terme recherché, on ajoute le nom de la recette à la liste. Sinon, on ne fait rien.
            if (recipes[i].ustensils[j].toLowerCase().includes(input)) {
                list.push(recipes[i]);
                // comme on n'a pas besoin d'ajouter x fois la même recette même si plusieurs ingrédients correspondent, on peut sortir de la boucle
                break;
            }
        }
    }
    return list;
};
// Cette fonction va comparer deux listes et intégrer uniquement les items de la seconde liste absents de la première. Elle prend en entrée la liste à compléter, et la liste à y ajouter, et renvoie la liste complète.
// attention, cette liste fonctionne uniquement pour des objets recettes, utilisant leur ID
const alreadyIn = (fullList, addThisList) => {
    for (let item of addThisList) {
        let alreadyIn = 0;
        for (let i = 0; i < fullList.length; i++) {
            if (fullList[i].id == item.id) {
                alreadyIn = 1;
                break;
            }
        }
        if (alreadyIn == 0) {
            fullList.push(item);
        }
    }
    return fullList;
};
// variante de already in
const itemAlreadyIn = (fullList, addThisList) => {
    for (let item of addThisList) {
        let alreadyIn = 0;
        for (let i = 0; i < fullList.length; i++) {
            if (fullList[i] == item) {
                alreadyIn = 1;
                break;
            }
        }
        if (alreadyIn == 0) {
            fullList.push(item);
        }
    }
    return fullList;
};
// Cette fonction va prendre en entrée une liste de recettes et va renvoyer une liste débarrassée des ingrédients doublons
const uniqueIngredients = (recipesList) => {
    let uniqueIngredientsOnly = [];
    for (let item of recipesList) {
        for (let i = 0; i < item["ingredients"].length; i++) {
            if (!uniqueIngredientsOnly.includes(item["ingredients"][i].ingredient.toLowerCase())) {
                uniqueIngredientsOnly.push(item["ingredients"][i].ingredient.toLowerCase());
            }
        }
    }
    uniqueIngredientsOnly = sortByName(uniqueIngredientsOnly);
    return uniqueIngredientsOnly;
};
// idem, avec la liste des appareils
const uniqueAppliances = (recipesList) => {
    let uniqueAppliancesOnly = [];
    for (let item of recipesList) {
        for (let i = 0; i < item["appliance"].length; i++) {
            if (!uniqueAppliancesOnly.includes(item["appliance"].toLowerCase())) {
                uniqueAppliancesOnly.push(item["appliance"].toLowerCase());
            }
        }
    }
    uniqueAppliancesOnly = sortByName(uniqueAppliancesOnly);
    return uniqueAppliancesOnly;
};
// et encore idem, avec la liste des ustensiles
const uniqueUstensils = (recipesList) => {
    let uniqueUstensilsOnly = [];
    for (let item of recipesList) {
        for (let i = 0; i < item["ustensils"].length; i++) {
            if (!uniqueUstensilsOnly.includes(item["ustensils"][i].toLowerCase())) {
                uniqueUstensilsOnly.push(item["ustensils"][i].toLowerCase());
            }
        }
    }
    uniqueUstensilsOnly = sortByName(uniqueUstensilsOnly);
    return uniqueUstensilsOnly;
};
// On souhaite à présent pouvoir trier nos différentes listes : recettes par id; ingrédients, appareil, ustensiles par ordre alphabétique
// Cette fonction prend en entrée une liste et renvoie la liste triée par id par ordre croissant
const sortById = (list) => {
    const byLikes = list.slice(0); // on copie la liste initiale
    byLikes.sort(function (a, b) {
        return a.id - b.id; // on trie la nouvelle liste par ordre décroissant
    });
    return byLikes;
};
// cette fonction prend en entrée une liste et renvoie la liste triée par ordre alphabétique croissant
const sortByName = (list) => {
    const byName = list.slice(0);
    byName.sort(function (a, b) {
        const x = a.toLowerCase();
        const y = b.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });
    return byName;
};
// cette fonction va récupérer les mots-clés sur lesquels on clique, et va d'une part les afficher sous forme de badge de couleur, et les stocker dans une liste
const catchSomeHashtags = (event, list) => {
    const hashtags = document.getElementById("hashtags");
    const hashtagDiv = document.createElement("div");
    hashtagDiv.className = "hashtag badge";
    hashtagDiv.textContent = event.target.innerText;
    const type = event.target.className;
    switch (type) {
        case "ingredients":
            hashtagDiv.classList.add("bg-primary");
            break;
        case "appliances":
            hashtagDiv.classList.add("bg-success");
            break;
        case "ustensils":
            hashtagDiv.classList.add("bg-danger");
            break;
        default:
    }
    if (hashtagDiv.textContent != "" && event.target.parentElement.className == "column") {
        const closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.className = "close";
        closeButton.setAttribute("aria-label", "Close");
        closeButton.innerHTML = "<i class=\"far fa-times-circle\"></i>";
        hashtagDiv.append(closeButton);
        hashtags.append(hashtagDiv);
        list.push(hashtagDiv.textContent);
        closeButton.addEventListener("click", function (event) {
            const itemToRemove = event.target.parentElement.parentElement.innerText;
            const index = list.indexOf(itemToRemove);
            list.splice(index, 1);
            hashtagDiv.remove();
        });
    }
    return list;
};
// filtre avancé
// cette fonction va renvoyer uniquement les ingrédients correspondant à l'input recherché
const thisIngredientPlease = (input, list) => {
    input = input.toLowerCase();
    let resultats = [];
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list[i]["ingredients"].length; j++) {
            const thisIngredient = list[i]["ingredients"][j]["ingredient"].toLowerCase();
            if (thisIngredient.includes(input)) {
                resultats.push(thisIngredient);
            }
        }
    }
    return resultats;
};
// idem avec les appareils
const thisAppliancePlease = (input, list) => {
    input = input.toLowerCase();
    let resultats = [];
    for (let i = 0; i < list.length; i++) {
        const thisAppliance = list[i]["appliance"].toLowerCase();
        if (thisAppliance.includes(input)) {
            resultats.push(thisAppliance);
        }
    }
    return resultats;
};
//idem avec les ustensiles
const thisUstensilPlease = (input, list) => {
    input = input.toLowerCase();
    let resultats = [];
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list[i]["ustensils"].length; j++) {
            const thisUstensil = list[i]["ustensils"][j].toLowerCase();
            if (thisUstensil.includes(input)) {
                resultats.push(thisUstensil);
            }
        }
    }
    return resultats;
};
// on veut à présent une fonction qui prend en entrée une liste de mots-clés, et ne renvoie que les recettes qui contiennent l'ensemble des mots-clés présents.
// si on a le mot-clé "coco" (ingrédient), seules les recettes ayant comme ingrédient "coco" seront affichées. La liste des appareils et la liste des ustensiles s'adapte
const advancedFiltering = (hashtag, type, listOfRecipes) => {
    //console.log("fonction advancedfiltering: hashtag : ", hashtag,"; type: ", type, "; liste: ", listOfRecipes);
    hashtag = hashtag.toLowerCase();
    let resultats = [];
    switch (type) {
        case "ingredients":
            resultats = matchingIngredients(hashtag, listOfRecipes);
            //console.log("resultats ingredients: ",resultats);
            break;
        case "appliances":
            resultats = matchingAppliances(hashtag, listOfRecipes);
            //console.log("resultats appliances: ",resultats);
            break;
        case "ustensils":
            resultats = matchingUstensils(hashtag, listOfRecipes);
            //console.log("resultats ustensils: ",resultats);
            break;
        default:
        //console.error("type de hashtag non reconnu");
    }
    return resultats;
};
// Cette fonction prend en entrée une liste de recettes (idéalement, liste déjà filtrée, mais fonctionne avec n'importe quelle liste de résultats) et renvoie l'ensemble des ingrédients utilisés
const ingredientsOptions = (recipes) => {
    // on créé une variable pour stocker les ingrédients correspondants
    let list = [];
    // on parcourt la liste des recettes préselectionnées
    for (let i = 0; i < recipes.length; i++) {
        // au sein de chaque recette, on parcourt la liste des ingrédients
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            // on ajoute le mot-clé à la liste
            list.push(recipes[i].ingredients[j]);
        }
    }
    return list;
};
// Cette fonction prend en entrée une liste de recettes (idéalement déjà filtrée) et renvoie l'ensemble des appareils utilisés
const appliancesOptions = (recipes) => {
    // on créé une variable pour stocker les appareils utilisés
    let list = [];
    // on parcourt la liste des recettes préselectionnées
    for (let i = 0; i < recipes.length; i++) {
        // au sein de chaque recette, on récupère l'appareil utilisé et on l'ajoute à la liste
        list.push(recipes[i].appliance);
    }
    return list;
};
// Cette fonction prend en entrée une liste de recettes (idéalement déjà filtrée) et renvoie l'ensemble des ustensiles nécessaires
const ustensilsOptions = (recipes) => {
    // on créé une variable pour stocker les ustensiles correspondants
    let list = [];
    // on parcourt la liste des recettes préselectionnées
    for (let i = 0; i < recipes.length; i++) {
        // au sein de chaque recette, on parcourt la liste des ustensiles
        for (let j = 0; j < recipes[i].ustensils.length; j++) {
            // on ajoute le mot-clé à la liste
            list.push(recipes[i].ustensils[j]);
        }
    }
    return list;
};
// je veux une fonction qui prend en entrée une liste et retourne la liste débarrassée des doublons. Cette fonction ne doit pas utiliser includes (prérequis projet)
const deleteDuplicates = (list) => {
    let filteredList = [];
    for (let item of list) {
        let alreadyIn = 0;
        for (let i = 0; i < filteredList.length; i++) {
            if (filteredList[i] == item) {
                alreadyIn = 1;
                break;
            }
        }
        if (alreadyIn == 0) {
            filteredList.push(item);
        }
    }
    return filteredList;
};
// je veux à présent une fonction qui supprime un mot-clé
const deleteItem = (list, word) => {
    word = word.toLowerCase();
    for (let i = list.length; i >= 0; i--) {
        if (list[i] == word) {
            list.splice(i, 1);
        }
    }
    return list;
};
const dealWithHashtags = (event, recipes, keywords, type) => {
    const dropInputIngredients = document.getElementById("dropInput-ingredients");
    dropInputIngredients.value = '';
    const dropInputAppliances = document.getElementById("dropInput-appliances");
    dropInputAppliances.value = '';
    const dropInputUstensils = document.getElementById("dropInput-ustensils");
    dropInputUstensils.value = '';
    let uniqueIngredientsOnly = uniqueIngredients(recipes);
    let uniqueAppliancesOnly = uniqueAppliances(recipes); // idem pour les appareils
    let uniqueUstensilsOnly = uniqueUstensils(recipes);
    // on créé à présent les menus déroulants pour chaque type de filtre avancé
    const dropDowns = new Dropdown("ingredients", uniqueIngredientsOnly);
    // la liste initiale, c'est celle de toutes les recettes (ici en tout cas)
    let initialList = recipes;
    // cette nouvelle liste contient uniquement les recettes associées
    let newlist = [];
    // on récupère les hashtags, on les affiche sous forme de badge, et la fonction renvoie une liste (la liste keywords mise à jour)
    catchSomeHashtags(event, keywords);
    let className = event.target.className;
    switch (className) {
        case "ingredients":
        case "appliances":
        case "ustensils":
            type.push(className);
            break;
        default:
    }
    // à présent on veut avoir une liste de résultats/recettes associée
    // s'il n'y a qu'un seul hashtag, c'est tout simple, il suffit de sélectionner les recettes contenant le hashtag.
    // s'il y en a plusieurs, il faut travailler de façon itérative, donc au sein de la liste trouvée, on va rechercher les termes suivants.
    for (let i = 0; i < keywords.length; i++) {
        let thisList = [];
        let add;
        // = advancedFiltering(keywords[i], type[i], thisList);
        if (i == 0) {
            thisList = initialList;
            add = advancedFiltering(keywords[i], type[i], thisList);
        }
        else {
            thisList = newlist;
            add = advancedFiltering(keywords[i], type[i], thisList);
        }
        for (let j = 0; j < add.length; j++) {
            newlist = add;
        }
        const ingredientsResults = matchingIngredients(keywords[i], newlist);
        const AppliancesResults = matchingAppliances(keywords[i], newlist);
        const UstensilsResults = matchingUstensils(keywords[i], newlist);
        // on va ensuite ajouter l'une après l'autre les résultats des différents filtres à la liste principale
        alreadyIn(newlist, ingredientsResults);
        alreadyIn(newlist, AppliancesResults);
        alreadyIn(newlist, UstensilsResults);
        // on va maintenant supprimer les items doublons de chacune des catégories (ingrédients, appareils, ustensiles)
        uniqueIngredientsOnly = uniqueIngredients(newlist); //,keywords[i];
        uniqueAppliancesOnly = uniqueAppliances(newlist);
        uniqueUstensilsOnly = uniqueUstensils(newlist);
        // ainsi que les mots-clés déjà sélectionnés
        for (let k = 0; k < keywords.length; k++) {
            uniqueIngredientsOnly = deleteItem(uniqueIngredientsOnly, keywords[k]);
            uniqueAppliancesOnly = deleteItem(uniqueAppliancesOnly, keywords[k]);
            uniqueUstensilsOnly = deleteItem(uniqueUstensilsOnly, keywords[k]);
        }
        // enfin, on créé les filtres avancés, qui contiennent un menu déroulant affichant pour chaque catégorie les éléments des recettes correspondantes.
        dropDowns.updateDropdown("ingredients", uniqueIngredientsOnly);
        dropDowns.updateDropdown("appliances", uniqueAppliancesOnly);
        dropDowns.updateDropdown("ustensils", uniqueUstensilsOnly);
        const resultSection = document.getElementById("results");
        // on la vide, au cas où elle contiendrait déjà des informations
        resultSection.innerHTML = "";
        // à présent qu'on a une liste "épurée", on va créer les objets associés
        for (let i = 0; i < newlist.length; i++) {
            let recipe = new Recipe(newlist[i].id, newlist[i].name, newlist[i].ingredients, newlist[i].time, newlist[i].description, newlist[i].appliance, newlist[i].ustensils);
            // et on les affiche 
            recipe.displayRecipe();
        }
        if (newlist.length == 0) {
            resultSection.innerHTML = "Aucune recette ne correspond à votre recherche... vous pouvez essayer avec \" tarte aux pommes \", \"poisson\", etc. !";
        }
    }
};
//# sourceMappingURL=app.js.map