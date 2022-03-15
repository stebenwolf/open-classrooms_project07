interface ListOfItems {
    list: Array<string>;
}

class ListOfItems extends Array {

    constructor (list: Array<string>) {
        super();
        this.list = list;
    }

    // Cette méthode prend en entrée une liste et la renvoie débarrassée des doublons
    deleteDuplicates() {
        // je prends le premier mot de la liste, et je le supprime partout ensuite
        this.forEach(element => {
            let word = element;
            let index = this.indexOf(element);

            for (let i=index+1; i<this.length; i++) {
                if (this[i].toLowerCase() == word.toLowerCase()) {
                    this.splice(i,1);
                }
            }
        });
        return this;
    }

    // Cette méthode prend en entrée une listeOfItems et en paramètre une liste de mots. Elle renvoie l'objet listOfItems débarrassé des mots de la liste
    deleteHashtags(list: Array<Object>) {

        list.forEach(hashtag => {
            for (let i=0;i<this.length;i++) {
                if (this[i].toLowerCase() == hashtag["name"].toLowerCase()) {
                    this.splice(i,1);
                }
            }
        })
        return this;
    } 

    // cette fonction prend en entrée une liste et renvoie la liste triée par ordre alphabétique croissant
    sortByName() {
        const byName = this.slice(0);
        byName.sort(function(a: string, b:string) {
            const x = a.toLowerCase();
            const y = b.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        });
        return byName;
    }
}

export { ListOfItems }