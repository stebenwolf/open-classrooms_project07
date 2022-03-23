// La class "ListOfRecipes" créé un objet qui est une liste de recettes, ce qui nous permettre de gérer des méthodes spécifiques aux listes. Par exemple : 
// afficher une liste de recettes
// comparer deux listes de recettes

import { Recipe } from "./recipe.js";
import { ListOfItems } from "./listOfItems.js";

interface ListOfRecipes {
    list: Array<Recipe>;
}

class ListOfRecipes extends Array {

    constructor (list: Array<Recipe>) {
        super();
        this.list = list;
    }

    // Cette méthode affiche toutes les recettes de la liste
    displayRecipes() {
        this.map(item => item.displayRecipe());

        return this;
    }
    
    // cette méthode va extraire l'ensemble des ingrédients d'une liste de recettes
    extractIngredients() {
        const listOfIngredients = new ListOfItems([]);
        this.forEach(recette => {
            recette["ingredients"].forEach(item => {
                listOfIngredients.push(item.ingredient);
            })
        })
        return listOfIngredients;
    }

    // cette méthode va extraire l'ensemble des appliances d'une liste de recettes
    extractAppliances() {
        const listOfAppliances = new ListOfItems([]);
        this.forEach(recette => listOfAppliances.push(recette["appliance"]));
        return listOfAppliances;
    }

    // cette méthode va extraire l'ensemble des ustensiles d'une liste de recettes
    extractUstensils() {
        const listOfUstensils = new ListOfItems([]);
        this.forEach(recette => {
            recette["ustensils"].forEach(item => listOfUstensils.push(item));
        })
        return listOfUstensils;
    }

    // cette méthode prend en entrée un input et renvoie l'ensemble des recettes contenant cet input : soit dans les ingrédients, soit dans les appareils, soit dans les ustensiles, soit dans la description, soit dans le titre
    matchingRecipes(input: string) {
        const results = new ListOfRecipes([]);
        const regex = new RegExp(input, "gi");
        
        this.filter(item => item.hasFittingIngredient(regex) 
        || item.hasFittingAppliance(regex)
        || item.hasFittingUstensil(regex)
        || item.hasFittingDescription(regex)
        || item.hasFittingTitle(regex)).map(item => results.push(item));
       
        return results;
    }
}

export { ListOfRecipes }