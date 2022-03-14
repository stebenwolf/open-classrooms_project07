class ListOfItems extends Array {
    constructor(list) {
        super();
        this.list = list;
    }
    // Cette méthode prend en entrée une liste et la renvoie débarrassée des doublons
    deleteDuplicates() {
        // je prends le premier mot de la liste, et je le supprime partout ensuite
        for (let item of this) {
            let word = item;
            let index = this.indexOf(item);
            for (let i = index + 1; i < this.length; i++) {
                if (this[i].toLowerCase() == word.toLowerCase()) {
                    this.splice(i, 1);
                }
            }
        }
        return this;
    }
    // Cette méthode prend en entrée une listeOfItems et en paramètre une liste de mots. Elle renvoie l'objet listOfItems débarrassé des mots de la liste
    deleteHashtags(list) {
        for (let hashtag of list) {
            for (let i = 0; i < this.length; i++) {
                if (this[i].toLowerCase() == hashtag["name"].toLowerCase()) {
                    this.splice(i, 1);
                }
            }
        }
        return this;
    }
    // cette fonction prend en entrée une liste et renvoie la liste triée par ordre alphabétique croissant
    sortByName() {
        const byName = this.slice(0);
        byName.sort(function (a, b) {
            const x = a.toLowerCase();
            const y = b.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        });
        return byName;
    }
    // cette méthode prend en paramètre un input utilisateur et renvoie la liste des termes contenant cet input
    matchingItems(input) {
        console.log("matchingItems in listOfItems: ", this);
    }
}
export { ListOfItems };
//# sourceMappingURL=listOfItems.js.map