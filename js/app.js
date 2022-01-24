// OC Projet 07 - Cette version du code s'intéresse au développement d'un algorithme "natif", c'est-à-dire qu'on utilisera uniquement des fonctions JS natives (<ES6?). Dans une seconde branche, on déploiera les mêmes fonctionnalités mais avec des propriétés spécifiques aux listes (forEach, map, reduce, ...).
//import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { Recipe } from "./recipe.js";
import { Dropdown } from "./dropdown.js";
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
    // on commence par ajouter à chaque "input" la liste de toutes les options
    const liste = matchingIngredients("", recipes);
    // on créé ensuite une variable qui va stocker les mots-clés retenus
    const keywords = [];
    // toutes les options d'ingrédients ici
    const uniqueIngredientsOnly = uniqueIngredients(liste);
    const uniqueAppliancesOnly = uniqueAppliances(liste);
    const uniqueUstensilsOnly = uniqueUstensils(liste);
    /* const selectIngredient = document.getElementById("selectIngredient");
    for (let i=0; i<uniqueIngredientsOnly.length; i++) {
        const option = document.createElement("option");
        option.value = uniqueIngredientsOnly[i][0].toUpperCase() + uniqueIngredientsOnly[i].substring(1);
        option.textContent = option.value;
        selectIngredient.append(option);
    } */
    // et on ajoute un event listener : dès qu'on clique sur une option, on créé un hashtag avec l'option choisie
    /* selectIngredient.addEventListener("change", (event) => {
        const hashtags = document.getElementById("hashtags");
        const hashtag = document.createElement("span");
        hashtag.className = "hashtag badge bg-primary";
        hashtag.textContent = (<HTMLInputElement>event.target).value;
        if (hashtag.textContent != "") {
            hashtags.append(hashtag);
            keywords.push(hashtag.textContent);
        }
        console.log(keywords);
    }); */
    const dropDowns = new Dropdown;
    dropDowns.createDropdown("ingredients", uniqueIngredientsOnly);
    dropDowns.createDropdown("appliances", uniqueAppliancesOnly);
    dropDowns.createDropdown("ustensils", uniqueUstensilsOnly);
    const myDropDowns = document.querySelector(".dropDowns");
    myDropDowns.addEventListener("click", function (event) {
        catchSomeHashtags(event, keywords);
    }, false);
    /* const dropDownIngredients = document.getElementById("dropdown-ingredients");
    const onethird_ingredients = Math.ceil(uniqueIngredientsOnly.length/3);
    const column1_ingredients = document.getElementById("column1_ingredients");
    column1_ingredients.innerHTML = "";
    const column2_ingredients = document.getElementById("column2_ingredients");
    column2_ingredients.innerHTML = "";
    const column3_ingredients = document.getElementById("column3_ingredients");
    column3_ingredients.innerHTML = "";
    for (let i=0; i<uniqueIngredientsOnly.length; i++) {
        const span = document.createElement("span");
        span.className = "ingredient";
        span.textContent = uniqueIngredientsOnly[i][0].toUpperCase() + uniqueIngredientsOnly[i].substring(1);
        if (i<onethird_ingredients) {
            column1_ingredients.append(span);
        }
        else if (i>=onethird_ingredients && i<(2*onethird_ingredients)) {
            column2_ingredients.append(span);
        }
        else { // (i>(2*onethird)) {
            column3_ingredients.append(span);
        }
    }
    dropDownIngredients.append(column1_ingredients, column2_ingredients, column3_ingredients);
    dropDownIngredients.addEventListener("click", (event) => {
        const hashtags = document.getElementById("hashtags");
        const hashtag = document.createElement("span");
        hashtag.className = "hashtag badge bg-primary";
        hashtag.textContent = (<HTMLInputElement>event.target).innerText;
        if (hashtag.textContent != "") {
            hashtags.append(hashtag);
            keywords.push(hashtag.textContent);
        }
        console.log(keywords);
    });  */
    // toutes les options d'appareil ici
    //const uniqueAppliancesOnly = uniqueAppliances(liste);
    /* const selectAppliance = document.getElementById("selectAppliance");
    for (let i=0; i<uniqueAppliancesOnly.length; i++) {
        const option = document.createElement("option");
        option.value = uniqueAppliancesOnly[i][0].toUpperCase() + uniqueAppliancesOnly[i].substring(1);
        option.textContent = option.value;
        selectAppliance.append(option);
    } */
    // et on ajoute un event listener : dès qu'on clique sur une option, on créé un hashtag avec l'option choisie
    /* selectAppliance.addEventListener("change", (event) => {
        const hashtags = document.getElementById("hashtags");
        const hashtag = document.createElement("span");
        hashtag.className = "hashtag badge bg-success";
        hashtag.textContent = (<HTMLInputElement>event.target).value;
        if (hashtag.textContent != "") {
            hashtags.append(hashtag);
            keywords.push(hashtag.textContent);
        }
        console.log(keywords);
    }); */
    /* const dropDownAppliances= document.getElementById("dropdown-appliances");
    const onethird_appliances = Math.ceil(uniqueAppliancesOnly.length/3);
    const column1_appliances= document.getElementById("column1_appliances");
    column1_appliances.innerHTML = "";
    const column2_appliances = document.getElementById("column2_appliances");
    column2_appliances.innerHTML = "";
    const column3_appliances = document.getElementById("column3_appliances");
    column3_appliances.innerHTML = "";
    for (let i=0; i<uniqueAppliancesOnly.length; i++) {
        const span = document.createElement("span");
        span.className = "appliance";
        span.textContent = span.textContent = uniqueAppliancesOnly[i][0].toUpperCase() + uniqueAppliancesOnly[i].substring(1);
        if (i<onethird_appliances) {
            column1_appliances.append(span);
        }
        else if (i>=onethird_appliances && i<(2*onethird_appliances)) {
            column2_appliances.append(span);
        }
        else { // (i>(2*onethird)) {
            column3_appliances.append(span);
        }
    }
    dropDownAppliances.append(column1_appliances, column2_appliances, column3_appliances);
    dropDownAppliances.addEventListener("click", (event) => {
        const hashtags = document.getElementById("hashtags");
        const hashtag = document.createElement("span");
        hashtag.className = "hashtag badge bg-success";
        hashtag.textContent = (<HTMLInputElement>event.target).innerText;
        if (hashtag.textContent != "") {
            hashtags.append(hashtag);
            keywords.push(hashtag.textContent);
        }
        console.log(keywords);
    });  */
    // toutes les options d'ustensiles enfin ici
    //const uniqueUstensilsOnly = uniqueUstensils(liste);
    /* const selectUstensil = document.getElementById("selectUstensil");
    for (let i=0; i<uniqueUstensilsOnly.length; i++) {
        const option = document.createElement("option");
        option.value = uniqueUstensilsOnly[i][0].toUpperCase() +uniqueUstensilsOnly[i].substring(1);
        option.textContent = option.value;
        selectUstensil.append(option);
    } */
    // et on ajoute un event listener : dès qu'on clique sur une option, on créé un hashtag avec l'option choisie
    /* selectUstensil.addEventListener("change", (event) => {
        const hashtags = document.getElementById("hashtags");
        const hashtag = document.createElement("span");
        hashtag.className = "hashtag badge bg-danger";
        hashtag.textContent = (<HTMLInputElement>event.target).value;
        if (hashtag.textContent != "") {
            hashtags.append(hashtag);
            keywords.push(hashtag.textContent);
        }
        console.log(keywords);
    }); */
    /* const dropDownUstensils= document.getElementById("dropdown-ustensils");
    const onethird_ustensils = Math.ceil(uniqueUstensilsOnly.length/3);
    const column1_ustensils= document.getElementById("column1_ustensils");
    column1_ustensils.innerHTML = "";
    const column2_ustensils = document.getElementById("column2_ustensils");
    column2_ustensils.innerHTML = "";
    const column3_ustensils = document.getElementById("column3_ustensils");
    column3_ustensils.innerHTML = "";
    for (let i=0; i<uniqueUstensilsOnly.length; i++) {
        const span = document.createElement("span");
        span.className = "ustensil";
        span.textContent = span.textContent = uniqueUstensilsOnly[i][0].toUpperCase() + uniqueUstensilsOnly[i].substring(1);
        if (i<onethird_ustensils) {
            column1_ustensils.append(span);
        }
        else if (i>=onethird_ustensils && i<(2*onethird_ustensils)) {
            column2_ustensils.append(span);
        }
        else { // (i>(2*onethird)) {
            column3_ustensils.append(span);
        }
    }
    dropDownUstensils.append(column1_ustensils, column2_ustensils, column3_ustensils);
    dropDownUstensils.addEventListener("click", (event) => {
        const hashtags = document.getElementById("hashtags");
        const hashtag = document.createElement("span");
        hashtag.className = "hashtag badge bg-danger";
        hashtag.textContent = (<HTMLInputElement>event.target).innerText;
        if (hashtag.textContent != "") {
            hashtags.append(hashtag);
            keywords.push(hashtag.textContent);
        }
        console.log(keywords);
    });  */
    // on cible le champ de recherche principal
    const searchInput = document.forms["mainSearch"];
    // on affiche l'ensemble des recettes de la base de données
    for (let i = 0; i < recipes.length; i++) {
        let recipe = new Recipe(recipes[i].id, recipes[i].name, recipes[i].ingredients, recipes[i].time, recipes[i].description, recipes[i].appliance, recipes[i].ustensils);
        recipe.displayRecipe();
    }
    // on ajoute à présent un event listener de type "input" au champ de recherche principal
    searchInput.addEventListener("input", element => {
        console.clear();
        console.log();
        // on stocke la valeur recherchée par l'utilisateur dans une variable
        const input = element.target.value.toLowerCase();
        let filteredList = [];
        // on souhaite s'assurer qu'une même recette n'est pas ajoutée deux fois...
        // on commence par créer les différentes listes à afficher
        const ingredientsResults = matchingIngredients(input, recipes);
        const recipeTitleResults = matchingRecipeTitle(input, recipes);
        const descriptionResults = matchingDescription(input, recipes);
        // on va ensuite ajouter l'une après l'autre les résultats des différents filtres à la liste principale
        alreadyIn(filteredList, ingredientsResults);
        alreadyIn(filteredList, recipeTitleResults);
        alreadyIn(filteredList, descriptionResults);
        /* const listOfUniqueIngredients = uniqueIngredients(filteredList);
        const selectIngredient = document.getElementById("selectIngredient");
        selectIngredient.innerHTML = "<option value=\"\" selected disabled hidden>Ingrédients</option>\"";
        for (let i=0; i<listOfUniqueIngredients.length; i++) {
            const option = document.createElement("option");
            option.value = listOfUniqueIngredients[i][0].toUpperCase() + listOfUniqueIngredients[i].substring(1);
            option.textContent = option.value;
            selectIngredient.append(option);
        } */
        const listOfUniqueIngredients = uniqueIngredients(filteredList);
        /* const dropDownIngredients = document.getElementById("dropdown-ingredients");
        const onethird_ingredients = Math.ceil(listOfUniqueIngredients.length/3);
        const column1_ingredients = document.getElementById("column1_ingredients");
        column1_ingredients.innerHTML = "";
        const column2_ingredients = document.getElementById("column2_ingredients");
        column2_ingredients.innerHTML = "";
        const column3_ingredients = document.getElementById("column3_ingredients");
        column3_ingredients.innerHTML = "";
        for (let i=0; i<listOfUniqueIngredients.length; i++) {
            const span = document.createElement("span");
            span.className = "ingredient";
            span.textContent = span.textContent = listOfUniqueIngredients[i][0].toUpperCase() + listOfUniqueIngredients[i].substring(1);
            if (i<onethird_ingredients) {
                column1_ingredients.append(span);
            }
            else if (i>=onethird_ingredients && i<(2*onethird_ingredients)) {
                column2_ingredients.append(span);
            }
            else { // (i>(2*onethird)) {
                column3_ingredients.append(span);
            }
        }
        dropDownIngredients.append(column1_ingredients, column2_ingredients, column3_ingredients); */
        /* const listOfUniqueAppliances = uniqueAppliances(filteredList);
        const selectAppliance = document.getElementById("selectAppliance");
        selectAppliance.innerHTML = "<option value=\"\" selected disabled hidden>Appareil</option>\"";
        for (let i=0; i<listOfUniqueAppliances.length; i++) {
            const option = document.createElement("option");
            option.value = listOfUniqueAppliances[i][0].toUpperCase() + listOfUniqueAppliances[i].substring(1);
            option.textContent = option.value;
            selectAppliance.append(option);
        } */
        const listOfUniqueAppliances = uniqueAppliances(filteredList);
        /* const dropDownAppliances= document.getElementById("dropdown-appliances");
        const onethird_appliances = Math.ceil(listOfUniqueAppliances.length/3);
        const column1_appliances= document.getElementById("column1_appliances");
        column1_appliances.innerHTML = "";
        const column2_appliances = document.getElementById("column2_appliances");
        column2_appliances.innerHTML = "";
        const column3_appliances = document.getElementById("column3_appliances");
        column3_appliances.innerHTML = "";
        for (let i=0; i<listOfUniqueAppliances.length; i++) {
            const span = document.createElement("span");
            span.className = "appliance";
            span.textContent = span.textContent = listOfUniqueAppliances[i][0].toUpperCase() + listOfUniqueAppliances[i].substring(1);
            if (i<onethird_appliances) {
                column1_appliances.append(span);
            }
            else if (i>=onethird_appliances && i<(2*onethird_appliances)) {
                column2_appliances.append(span);
            }
            else { // (i>(2*onethird)) {
                column3_appliances.append(span);
            }
        }
        dropDownAppliances.append(column1_appliances, column2_appliances, column3_appliances); */
        /* const listOfUniqueUstensils = uniqueUstensils(filteredList);
        const selectUstensil = document.getElementById("selectUstensil");
        selectUstensil.innerHTML = "<option value=\"\" selected disabled hidden>Ustensiles</option>\"";
        for (let i=0; i<listOfUniqueUstensils.length; i++) {
            const option = document.createElement("option");
            option.value = listOfUniqueUstensils[i][0].toUpperCase() + listOfUniqueUstensils[i].substring(1);
            option.textContent = option.value;
            selectUstensil.append(option);
        } */
        const listOfUniqueUstensils = uniqueUstensils(filteredList);
        /* const dropDownUstensils= document.getElementById("dropdown-ustensils");
        const onethird_ustensils = Math.ceil(listOfUniqueUstensils.length/3);
        const column1_ustensils= document.getElementById("column1_ustensils");
        column1_ustensils.innerHTML = "";
        const column2_ustensils = document.getElementById("column2_ustensils");
        column2_ustensils.innerHTML = "";
        const column3_ustensils = document.getElementById("column3_ustensils");
        column3_ustensils.innerHTML = "";
        for (let i=0; i<listOfUniqueUstensils.length; i++) {
            const span = document.createElement("span");
            span.className = "ustensil";
            span.textContent = span.textContent = listOfUniqueUstensils[i][0].toUpperCase() + listOfUniqueUstensils[i].substring(1);
            if (i<onethird_ustensils) {
                column1_ustensils.append(span);
            }
            else if (i>=onethird_ustensils && i<(2*onethird_ustensils)) {
                column2_ustensils.append(span);
            }
            else { // (i>(2*onethird)) {
                column3_ustensils.append(span);
            }
        }
        dropDownUstensils.append(column1_ustensils, column2_ustensils, column3_ustensils); */
        dropDowns.updateDropdown("ingredients", listOfUniqueIngredients);
        dropDowns.updateDropdown("appliances", listOfUniqueAppliances);
        dropDowns.updateDropdown("ustensils", listOfUniqueUstensils);
        // si la taille de l'input est >=3 caractères, on va lancer une recherche, sinon, on ne fait rien
        if (input.length >= 3) {
            let results = [];
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
            // à présent qu'on a une liste "épurée", on va créer les objets associés
            for (let i = 0; i < results.length; i++) {
                let recipe = new Recipe(results[i].id, results[i].name, results[i].ingredients, results[i].time, results[i].description, results[i].appliance, results[i].ustensils);
                // et on les affiche 
                recipe.displayRecipe();
            }
            if (results.length == 0) {
                resultSection.innerHTML = "Aucune recette ne correspond à votre recherche... vous pouvez essayer avec \" tarte aux pommes \", \"poisson\", etc. !";
            }
        }
    });
    // On veut également "écouter" les champs input des filtres avancés.
    // On va commencer par les cibler
    const dropInputIngredients = document.getElementById("dropInput-ingredients");
    const dropInputAppliances = document.getElementById("dropInput-appliances");
    const dropInputUstensils = document.getElementById("dropInput-ustensils");
    // on va ensuite pour chacun d'eux récupérer ce qui est entré
    dropInputIngredients.addEventListener("input", function (event) {
        const input = event.target.value;
        // avec cette valeur qui est entrée, on veut afficher UNIQUEMENT les ingrédients qui correspondent à cet input.
        let finalResults = [];
        let results = thisIngredientPlease(input, liste);
        finalResults = itemAlreadyIn(finalResults, results);
        dropDowns.updateDropdown("ingredients", finalResults);
    });
    dropInputAppliances.addEventListener("input", function (event) {
        const input = event.target.value;
        let finalResults = [];
        let results = thisAppliancePlease(input, liste);
        finalResults = itemAlreadyIn(finalResults, results);
        dropDowns.updateDropdown("appliances", finalResults);
    });
    dropInputUstensils.addEventListener("input", function (event) {
        const input = event.target.value;
        let finalResults = [];
        let results = thisUstensilPlease(input, liste);
        finalResults = itemAlreadyIn(finalResults, results);
        dropDowns.updateDropdown("ustensils", finalResults);
    });
});
// Cette fonction prend en entrée une liste de résultats (recipes) et un input (le terme recherché), et renvoie la liste des recettes dont le titre contient l'input 
const matchingRecipeTitle = (input, recipes) => {
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
    //console.log("ingrédients de recettes ",list);
    return list;
};
// Cette fonction prend en entrée une liste de recettes (recipes) et un input (le terme recherché), et renvoit la liste des recettes dont la description contient le terme recherché
const matchingDescription = (input, recipes) => {
    // on créé une variable qui va stocker toutes les recettes correspondantes
    let list = [];
    // on parcourt toute la liste des recettes
    for (let i = 0; i < recipes.length; i++) {
        // au sein de chaque recette, on va chercher dans chaque description si celle-ci contient le terme recherché
        if (recipes[i].description.toLowerCase().includes(input)) {
            list.push(recipes[i]);
            // et comme il n'est pas nécessaire d'ajouter plusieurs fois la même recette, on peut sortir de la boucle
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
// Cette fonction va prendre en entrée une liste de recettes et va renvoyer une liste débarrasée des ingrédients doublons
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
    hashtagDiv.textContent = event.target.innerText;
    if (hashtagDiv.textContent != "" && event.target.parentElement.className == "column") {
        const closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.className = "close";
        closeButton.setAttribute("aria-label", "Close");
        closeButton.innerHTML = "<i class=\"far fa-times-circle\"></i>";
        hashtagDiv.append(closeButton);
        hashtags.append(hashtagDiv);
        list.push(hashtagDiv.textContent);
        //list.push({"item": hashtagDiv.textContent, "type": type});
        closeButton.addEventListener("click", function (event) {
            const itemToRemove = event.target.parentElement.parentElement.innerText;
            const index = list.indexOf(itemToRemove);
            console.log(index);
            if (index > -1) {
                list.splice(index, 1);
            }
            console.log(list);
            hashtagDiv.remove();
        });
    }
    console.log(list);
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
    console.log(list);
    return list;
};
//# sourceMappingURL=app.js.map