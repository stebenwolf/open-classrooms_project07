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
        this.map(item => item.displayRecipe());
        return this;
    }
    // cette méthode va extraire l'ensemble des ingrédients d'une liste de recettes
    extractIngredients() {
        const listOfIngredients = new ListOfItems([]);
        this.forEach(recette => {
            recette["ingredients"].forEach(item => {
                listOfIngredients.push(item.ingredient);
            });
        });
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
        });
        return listOfUstensils;
    }
    // cette méthode prend en entrée un input et renvoie l'ensemble des recettes contenant cet input : soit dans les ingrédients, soit dans les appareils, soit dans les ustensiles, soit dans la description, soit dans le titre
    matchingRecipes(input) {
        const results = new ListOfRecipes([]);
        this.forEach(item => {
            if (item.hasFittingIngredient(input)
                || item.hasFittingAppliance(input)
                || item.hasFittingUstensil(input)
                || item.hasFittingDescription(input)
                || item.hasFittingTitle(input)) {
                results.push(item);
            }
            ;
        });
        return results;
    }
    matchesIngredients(input) {
        console.log(this);
        const results = new ListOfRecipes([]);
        this.forEach(item => {
            if (item.hasFittingIngredient(input)) {
                results.push(item);
            }
        });
        return results;
    }
}
export { ListOfRecipes };
//# sourceMappingURL=listOfRecipes.js.map