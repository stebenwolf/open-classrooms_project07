interface Recipe {
    id: number,
    name: string,
    ingredients: Array<object>,
    time: number,
    description: string,
    appliance: string,
    ustensils: Array<string>
}

/*
"id": 6,
        "name": "Tarte aux pommes",
        "servings": 6,
        "ingredients":[
            {
                "ingredient": "Pâte brisée",
                "quantity": 1
            },
            {
                "ingredient": "Pomme",
                "quantity": 3
            },
            {
                "ingredient": "Oeuf",
                "quantity": "2"
            },
            {
                "ingredient":"Crème fraiche",
                "quantity":25,
                "unit": "cl"
            },
            {
                "ingredient": "Sucre en Poudre",
                "quantity": 100,
                "unit":"grammes"
            },
            {
                "ingredient": "Sucre vanillé",
                "quantity": 1,
                "unit": "sachets"

            }
        ],
        "time": 50,
        "description": "Commencez par mélanger les oeufs le sucre et le sucre vanillé dans un saladier, découper les pommes en tranches, ajouter la crème fraiche aux oeufs. Une fois que tout est pret, étalez la tarte dans le moule. N'oubliez pas de piquer le fond avec une fourchette avant depositionner les pommes sur la tarte. Finallement verser la préparation à base d'oeufs et de crême fraiche. Laisser cuire au four pendant 30 minutes",
        "appliance": "Four",
        "ustensils": ["moule à tarte", "saladier", "fourchette"]
*/

class Recipe {

    constructor (
        id: number,
        name: string,
        ingredients: Array<any>,
        time: number,
        description: string,
        appliance: string,
        ustensils: Array<string>) {
            this.id = id;
            this.name = name;
            this.ingredients = ingredients;
            this.time = time;
            this.description = description;
            this.appliance = appliance;
            this.ustensils = ustensils;
        }

    displayRecipe() {
        const resultSection = document.getElementById("results");

        const divCol = document.createElement("div");
        divCol.className = "col-md-6";

        const divCard = document.createElement("div");
        divCard.className = "card";
        divCard.setAttribute("style","");

        const divCardImg = document.createElement("img");
        divCardImg.src = "../assets/img/"+this.id+".jpg";
        divCardImg.className = "card-img-top";
        divCardImg.alt = this.name;

        const divCardBody = document.createElement("div");
        divCardBody.className = "card-body";

        const cardTitle = document.createElement("div");
        cardTitle.className = "cardTitle";

        const cardTitle_recipe = document.createElement("h5");
        cardTitle_recipe.className = "card-title recipe";
        cardTitle_recipe.textContent = this.name;

        const cardTitle_duration = document.createElement("h5");
        cardTitle_duration.className = "card-title duration";
        cardTitle_duration.innerHTML = "<i class=\"far fa-clock\"></i> "+this.time+" min";

        const cardText = document.createElement("div");
        cardText.className = "cardText";

        const cardText_ingredients = document.createElement("p");
        cardText_ingredients.className = "card-text ingredients";
        const ulIngredients = document.createElement("ul");
        for (let i=0; i<this.ingredients.length; i++) {
            const liIngredients = document.createElement("li");
            const ingredientSpan = document.createElement("span");
            ingredientSpan.className = "ingredientItem";
            const quantitySpan = document.createElement("span");
            const ingredient = this.ingredients[i]["ingredient"];
            let quantity = "";
            if (this.ingredients[i]["quantity"]) {
                quantity = " : "+this.ingredients[i]["quantity"];
            }
            let unit = "";
            if (this.ingredients[i]["unit"]) { 
                unit = this.ingredients[i]["unit"];
                switch (unit) {
                    case "grammes":
                        unit = "g";
                        break;
                    case "cuillères à soupe":
                    case "cuillère à soupe":
                        unit = "càs";
                        break;
                    case "tranches":
                        unit = "tr.";
                        break;
                    case "litres":
                    case "litre":
                    case "Litres":
                        unit = "L";
                        break;
                    case "cuillères à café":
                        unit = "càc";
                        break;
                    default:
                        "unité inconnue";
                }
                if (unit.length > 2) {
                    unit = " "+unit;
                }
            }
            ingredientSpan.textContent = ingredient;
            quantitySpan.textContent = quantity+unit;
            liIngredients.append(ingredientSpan,quantitySpan);
            ulIngredients.append(liIngredients);
        }
        cardText_ingredients.append(ulIngredients);

        const cardText_steps = document.createElement("p");
        cardText_steps.className = "card-text steps";
        cardText_steps.textContent = this.description;

        cardTitle.append(cardTitle_recipe, cardTitle_duration);
        cardText.append(cardText_ingredients, cardText_steps);

        divCardBody.append(cardTitle, cardText);
        divCard.append(divCardImg,divCardBody);
        divCol.append(divCard);

        resultSection.append(divCol);
        
        return resultSection;
    }

    // cette méthode prend en entrée un input et renvoie vrai si l'un des ingrédients de la recette contient l'input, faux sinon
    hasFittingIngredient(regex: RegExp) {
        return this["ingredients"].forEach(item => item["ingredient"].match(regex));
    }

    hasFittingAppliance(regex: RegExp) {
        return this["appliance"].match(regex);
    }

    hasFittingUstensil(regex: RegExp) {
        const even = (element) => element.match(regex);

        return this["ustensils"].flat().some(even);
    }

    hasFittingDescription(regex: RegExp) {
        return this["description"].match(regex);
    }

    hasFittingTitle(regex: RegExp) {
        return this["name"].match(regex);
    }

}

export { Recipe };