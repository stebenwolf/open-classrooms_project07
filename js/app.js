import { Recipe } from "./recipe.js";
async function fetchDataAsync() {
    try {
        const response = await fetch("../assets/recipes.json");
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
    const selectIngredient = document.getElementById("selectIngredient");
    for (let i = 0; i < liste.length; i++) {
        const option = document.createElement("option");
        for (let j = 0; j < liste[i]["ingredients"].length; j++) {
            option.value = liste[i]['ingredients'][j]["ingredient"];
            option.textContent = option.value;
        }
        selectIngredient.append(option);
    }
    selectIngredient.addEventListener("change", (event) => {
        const hashtags = document.getElementById("hashtags");
        const hashtag = document.createElement("span");
        hashtag.className = "hashtag badge bg-primary";
        hashtag.textContent = event.target.value;
        if (hashtag.textContent != "") {
            hashtags.append(hashtag);
            keywords.push(hashtag.textContent);
        }
        console.log(keywords);
    });
    /* const dataListIngredients = document.getElementById("datalistOptions");
    for( let i=0; i<liste.length; i++) {
        const option = document.createElement("option");
        option.className = "datalistOptions--ingredients";
        for (let j=0; j<liste[i]["ingredients"].length; j++) {
            option.value = liste[i]["ingredients"][j]["ingredient"];
            option.textContent = liste[i]["ingredients"][j]["ingredient"];
        }
        dataListIngredients.append(option);
    } */
    // toutes les options d'appareil ici
    const selectAppliance = document.getElementById("selectAppliance");
    for (let i = 0; i < liste.length; i++) {
        const option = document.createElement("option");
        option.value = liste[i]["appliance"];
        option.textContent = option.value;
        selectAppliance.append(option);
    }
    selectAppliance.addEventListener("change", (event) => {
        const hashtags = document.getElementById("hashtags");
        const hashtag = document.createElement("span");
        hashtag.className = "hashtag badge bg-success";
        hashtag.textContent = event.target.value;
        if (hashtag.textContent != "") {
            hashtags.append(hashtag);
            keywords.push(hashtag.textContent);
        }
        console.log(keywords);
    });
    /* const dataListAppliances = document.getElementById("datalistApplianceOptions");
    const appliancesList = appliancesOptions(liste);
    for (let i=0; i<appliancesList.length; i++) {
        const option = document.createElement("option");
        option.value = appliancesList[i];
        dataListAppliances.append(option);
    } */
    // toutes les options d'ustensiles enfin ici
    const selectUstensil = document.getElementById("selectUstensil");
    for (let i = 0; i < liste.length; i++) {
        const option = document.createElement("option");
        for (let j = 0; j < liste[i]["ustensils"].length; j++) {
            option.value = liste[i]['ustensils'][j];
            option.textContent = option.value;
        }
        selectUstensil.append(option);
    }
    selectUstensil.addEventListener("change", (event) => {
        const hashtags = document.getElementById("hashtags");
        const hashtag = document.createElement("span");
        hashtag.className = "hashtag badge bg-danger";
        hashtag.textContent = event.target.value;
        if (hashtag.textContent != "") {
            hashtags.append(hashtag);
            keywords.push(hashtag.textContent);
        }
        console.log(keywords);
    });
    /* const dataListUstensils = document.getElementById("datalistUstensilsOptions");
    const ustensilsList = ustensilsOptions(liste);
    for( let i=0; i<ustensilsList.length; i++) {
        const option = document.createElement("option");
        option.value = ustensilsList[i];
        dataListUstensils.append(option);
    } */
    // on cible le champ de recherche principal
    const searchInput = document.forms["mainSearch"];
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
        // si la taille de l'input est >3 caractères, on va lancer une recherche, sinon, on ne fait rien
        if (input.length >= 3) {
            let results = [];
            // on commence par sélectionner la zone où l'on affichera les résultats
            const resultSection = document.getElementById("results");
            // on la vide, au cas où elle contiendrait déjà des informations
            resultSection.innerHTML = "";
            // on souhaite s'assurer qu'une même recette n'est pas ajoutée deux fois...
            const ingredientsResults = matchingIngredients(input, recipes);
            const recipeTitleResults = matchingRecipeTitle(input, recipes);
            const descriptionResults = matchingDescription(input, recipes);
            alreadyIn(results, ingredientsResults);
            alreadyIn(results, recipeTitleResults);
            alreadyIn(results, descriptionResults);
            for (let i = 0; i < results.length; i++) {
                let recipe = new Recipe(results[i].id, results[i].name, results[i].ingredients, results[i].time, results[i].description, results[i].appliance, results[i].ustensils);
                recipe.displayRecipe();
            }
            const filteredList = matchingIngredients(input, recipes);
            /* const dataListIngredients = document.getElementById("datalistOptions");
            dataListIngredients.innerHTML = "";
            const ingredientsList = ingredientsOptions(filteredList);
            
            for( let i=0; i<ingredientsList.length; i++) {
                const option = document.createElement("option");
                option.value = ingredientsList[i]["ingredient"];
                
                dataListIngredients.append(option);
            }

            const dataListAppliances = document.getElementById("datalistApplianceOptions");
            dataListAppliances.innerHTML = "";
            const appliancesList = appliancesOptions(filteredList);

            for (let i=0; i<appliancesList.length; i++) {
                const option = document.createElement("option");
                option.value = appliancesList[i];

                dataListAppliances.append(option);
            }

            const dataListUstensils = document.getElementById("datalistUstensilsOptions");
            dataListUstensils.innerHTML = "";
            const ustensilsList = ustensilsOptions(filteredList);
                        
            for( let i=0; i<ustensilsList.length; i++) {
                const option = document.createElement("option");
                option.value = ustensilsList[i];
                
                dataListUstensils.append(option);
            } */
            if (results.length == 0) {
                resultSection.innerHTML = "Aucune recette ne correspond à votre recherche... vous pouvez essayer avec \" tarte aux pommes \", \"poisson\", etc. !";
            }
        }
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
            break;
        }
    }
    console.log(list);
    return list;
};
// Cette fonction va comparer deux listes et intégrer uniquement les items de la seconde liste absents de la première. Elle prend en entrée la liste à compléter, et la liste à y ajouter, et renvoie la liste complète.
const alreadyIn = (fullList, addThisList) => {
    for (let item of addThisList) {
        console.log("item: ", item);
        let alreadyIn = 0;
        for (let i = 0; i < fullList.length; i++) {
            if (fullList[i].id == item.id) {
                console.log("already in!");
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