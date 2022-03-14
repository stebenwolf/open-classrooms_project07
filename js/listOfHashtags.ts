import { Hashtag } from './hashtag.js'
import { ListOfRecipes } from './listOfRecipes';

interface ListOfHashtags {
    list: Array<Hashtag>;
}

class ListOfHashtags extends Array {
    constructor(list: Array<Hashtag>) {
        super();
        this.list = list;
    }

    // cette méthode prend en entrée une liste de recettes et renvoie les recettes contenant les hashtags associés uniquement
    matchingRecipes(recipesList: ListOfRecipes) {
        console.log("liste de hashtags : ",this.list);
        console.log("liste de recettes : ",recipesList);
    }

    // cette méthode va afficher l'ensemble des hashtags
    displayAllHashtags() {
        for(let item of this) {
            //item.display();
            item.remove();
            /* document.querySelectorAll(".close")
                .forEach(element => {
                    element.addEventListener("click", () => {
                        console.log("item cliqué: ",element);
                        //this.removeHashtag(item);
                    })
            }) */
        }

        return this;
    }

    removeHashtag(itemToRemove: Hashtag) {
        console.log("function removeHashtag, this = ",this);
        for (let item of this) {
            console.log("on commence la boucle. Item vaut: ",item," et itemToRemove vaut: ",itemToRemove);
            console.log("est-ce que les deux sont équivalents?");
            if (item == itemToRemove) {
                console.log("là oui !");
                console.log("item to remove: ",itemToRemove, ", index: ",this.indexOf(itemToRemove));
            } else { 
                console.log("là non. pas trouvé");
            }
        }
        
        
    }
}

export { ListOfHashtags }