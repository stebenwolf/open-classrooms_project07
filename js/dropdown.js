/* A quoi sert la classe Dropdown ?

Elle gère l'affichage des trois menus dropdown de la page de recherche.
Les dropdowns peuvent être de trois classes Bootstrap différents :
- primary (bleu)
- success (vert)
- danger (rouge)

Ils contiennent :
- un titre visible par défaut
- au clic, ils s'ouvrent, et affichent alors
- un champ recherche, dont le placeholder dépend du type de dropdown (ingredients, appliances, ustensils)
- la liste actualisable des items correspondants

Il y a également des event listeners :
- pour gérer les hashtags
- pour gérer l'actualisation en fonction de ce qui est entré dans le champ input

Un Dropdown doit donc prendre en entrée :
- un type (ingredients, appliances, ustensils)
- une liste d'items correspondants

et renvoyer :
- un dropdown fonctionnel intégrable dans la page

*/
import { Hashtag } from "./hashtag.js";
class Dropdown {
    constructor(type, list) {
        this.type = type;
        this.list = list;
    }
    // Cette méthode va créer les éléments initiaux, à savoir des menus déroulants
    // on l'appelle trois fois, une fois pour chaque type (ingrédients, appareils, ustensiles)
    /* cccreateDropdown(type: string) {
        const dropDownsDiv = document.querySelector(".dropDowns");
        const dropDownStuff = document.createElement("div");
        dropDownStuff.className = "dropdown-stuff";

        const dropDownButton = document.createElement("button");
        dropDownButton.className = "dropbtn-stuff";

        const dropBtnTitle = document.createElement("span");
        dropBtnTitle.className = "btn-title";
        
        const dropBtnArrow = document.createElement("span");
        dropBtnArrow.className = "arrow";
        dropBtnArrow.innerHTML = "<i class=\"fas fa-angle-down\"></i>";

        const dropContent = document.createElement("div");
        dropContent.className = "dropdown-content-stuff";
        const dropHeader = document.createElement("div");
        dropHeader.className = "header";
        const dropInput = document.createElement("input");
        dropInput.type = "text";
        dropInput.className = "form-control search-stuff";
    
        const dropRow = document.createElement("div");
        dropRow.className ="row";

        const dropColumn1 = document.createElement("div");
        dropColumn1.className = "column";
        const dropColumn2 = document.createElement("div");
        dropColumn2.className = "column";
        const dropColumn3 = document.createElement("div");
        dropColumn3.className = "column";

        dropDownButton.append(dropBtnTitle, dropBtnArrow);
        dropHeader.append(dropInput);
        dropRow.append(dropColumn1, dropColumn2, dropColumn3);
        dropContent.append(dropHeader, dropRow);
        dropDownStuff.append(dropDownButton, dropContent)
        dropDownsDiv.append(dropDownStuff);

        switch(type) {
            case "ingredients":
                dropDownStuff.classList.add("bg-primary");
                dropDownStuff.id = "ingredientsList";
                dropBtnTitle.textContent = "Ingrédients";
                dropInput.placeholder = "Rechercher un ingrédient";
                dropInput.id = "dropInput-ingredients";
                dropRow.id = "dropdown-ingredients";
                dropColumn1.id = "column1_ingredients";
                dropColumn2.id = "column2_ingredients";
                dropColumn3.id = "column3_ingredients";
                break;
            case "appliances":
                dropDownStuff.classList.add("bg-success");
                dropDownStuff.id = "appliancesList";
                dropBtnTitle.textContent = "Appareil";
                dropInput.placeholder = "Rechercher un appareil";
                dropInput.id = "dropInput-appliances";
                dropRow.id = "dropdown-appliances";
                dropColumn1.id = "column1_appliances";
                dropColumn2.id = "column2_appliances";
                dropColumn3.id = "column3_appliances";
                break;
            case "ustensils":
                dropDownStuff.classList.add("bg-danger");
                dropDownStuff.id = "ustensilsList";
                dropBtnTitle.textContent = "Ustensiles";
                dropInput.placeholder = "Rechercher un ustensile";
                dropInput.id = "dropInput-ustensils";
                dropRow.id = "dropdown-ustensils";
                dropColumn1.id = "column1_ustensils";
                dropColumn2.id = "column2_ustensils";
                dropColumn3.id = "column3_ustensils";
                break;
            default:
                console.error("Type inconnu");
        }

        return this;
    } */
    // cette méthode va, à partir de dropdowns existants, effacer le contenu des colonnes avant de mettre à jour le contenu de la liste en fonction du type choisi
    // cette méthode est appelée à chaque nouveau caractère tapé dans la barre de recherche centrale pour l'instant, et sera ensuite appelée lorsqu'on filtre un type plus précis
    updateDropdown(type, list) {
        let listOfStuff;
        let column1, column2, column3;
        if (type == "ingredients" || type == "appliances" || type == "ustensils") {
            listOfStuff = document.getElementById("dropdown-" + type);
        }
        else {
            console.error("Type inconnu au bataillon");
        }
        listOfStuff.innerHTML = "";
        // on doit à présent recréer les colonnes
        column1 = document.createElement("div");
        column1.className = "column";
        column2 = document.createElement("div");
        column2.className = "column";
        column3 = document.createElement("div");
        column3.className = "column";
        column1.id = "column1_" + type;
        column2.id = "column2_" + type;
        column3.id = "column3_" + type;
        listOfStuff.append(column1, column2, column3);
        this.giveMeSomeOptions(type, list);
        return this;
    }
    // cette méthode va remplir de contenu les dropdowns
    giveMeSomeOptions(type, list) {
        const length = list.length;
        let column1, column2, column3;
        if (type == "ingredients" || type == "appliances" || type == "ustensils") {
            column1 = document.getElementById("column1_" + type);
            column2 = document.getElementById("column2_" + type);
            column3 = document.getElementById("column3_" + type);
        }
        else {
            console.error("Type inconnu");
        }
        if (length == 0) {
            const div = document.createElement("div");
            div.innerHTML = "<span style=\"width: 100%; color:white;\">Aucun résultat.</span>";
            column1.append(div);
            column2.remove();
            column3.remove();
        }
        else {
            for (let i = 0; i < length; i++) {
                const span = document.createElement("span");
                span.className = "dropDown-item dropDown-" + type;
                span.textContent = list[i][0].toUpperCase() + list[i].substring(1);
                span.addEventListener("click", () => {
                    const hashtag = new Hashtag(span.textContent, "dropDown-" + type);
                    hashtag.display();
                });
                if (length > 21) {
                    let third = Math.ceil(length / 3);
                    if (i < third) {
                        column1.append(span);
                    }
                    else if (i >= third && i < 2 * third) {
                        column2.append(span);
                    }
                    else {
                        column3.append(span);
                    }
                }
                else if (length >= 9) {
                    let half = Math.ceil(length / 2);
                    if (i < half) {
                        column1.append(span);
                    }
                    else {
                        column2.append(span);
                    }
                    column3.remove();
                }
                else {
                    column1.append(span);
                    column2.remove();
                    column3.remove();
                }
            }
        }
        document.querySelectorAll(".dropDown-item")
            .forEach(element => {
            element.addEventListener("click", function (clickedElement) {
                //console.log("element: ", element);
                //console.log("clickedelement: ",clickedElement);
                //addHashtag(clickedElement, listOfKeywords)
                //.displayAllHashtags();
            });
        });
    }
    // cette méthode s'applique au champ de recherche d'un dropdown. Elle prend en paramètre l'input utilisateur et renvoie la liste des items correspondants
    search(input) {
        input = input.toLowerCase();
        const list = [];
        const regex = new RegExp(input, "gi");
        for (let item of this.list) {
            if (item.match(regex)) {
                list.push(item);
            }
        }
        return list;
    }
}
export { Dropdown };
//# sourceMappingURL=dropdown.js.map