// La class "ListOfRecipes" créé un objet qui est une liste de recettes, ce qui nous permettre de gérer des méthodes spécifiques aux listes. Par exemple : 
// afficher une liste de recettes
// comparer deux listes de recettes
import { ListOfItems } from "./listOfItems.js";
class ListOfRecipes extends Array {
    constructor(list) {
        super();
        this.list = list;
    }
    // Cette méthode affiche toutes les recettes de la liste
    displayRecipes() {
        for (let item of this) {
            item.displayRecipe();
        }
        return this;
    }
    // cette méthode va extraire l'ensemble des ingrédients d'une liste de recettes
    extractIngredients() {
        const listOfIngredients = new ListOfItems([]);
        for (let recette of this) {
            for (let i = 0; i < recette["ingredients"].length; i++) {
                listOfIngredients.push(recette["ingredients"][i].ingredient);
            }
        }
        return listOfIngredients;
    }
    // cette méthode va extraire l'ensemble des appliances d'une liste de recettes
    extractAppliances() {
        const listOfAppliances = new ListOfItems([]);
        for (let recette of this) {
            listOfAppliances.push(recette["appliance"]);
        }
        return listOfAppliances;
    }
    // cette méthode va extraire l'ensemble des ustensiles d'une liste de recettes
    extractUstensils() {
        const listOfUstensils = new ListOfItems([]);
        for (let recette of this) {
            for (let i = 0; i < recette["ustensils"].length; i++) {
                listOfUstensils.push(recette["ustensils"][i]);
            }
        }
        return listOfUstensils;
    }
    // cette méthode prend en entrée un input et renvoie l'ensemble des recettes contenant cet input : soit dans les ingrédients, soit dans les appareils, soit dans les ustensiles, soit dans la description, soit dans le titre
    matchingRecipes(input) {
        const results = new ListOfRecipes([]);
        for (let item of this) {
            if (item.hasFittingIngredient(input)
                || item.hasFittingAppliance(input)
                || item.hasFittingUstensil(input)
                || item.hasFittingDescription(input)
                || item.hasFittingTitle(input)) {
                results.push(item);
            }
            ;
        }
        return results;
    }
    matchesIngredients(input) {
        console.log(this);
        const results = new ListOfRecipes([]);
        for (let item of this) {
            if (item.hasFittingIngredient(input)) {
                results.push(item);
            }
        }
        return results;
    }
}
export { ListOfRecipes };
//# sourceMappingURL=listOfRecipes.js.map