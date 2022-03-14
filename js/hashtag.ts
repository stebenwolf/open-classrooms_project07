interface Hashtag {
    name: string,
    type: string
}

class Hashtag {
    constructor(name: string, type: string) {
        this.name = name;
        this.type = type;
    }

    // cette méthode va créer les éléments HTML dont a besoin pour un hashtag donné, et renvoie l'élément HTML
    display() {

        const currentItem = this;
        
        const hashtags = document.getElementById("hashtags");
        const hashtagDiv = document.createElement("div");
        hashtagDiv.className = "hashtag badge";
        (<HTMLElement>hashtagDiv).textContent = currentItem["name"];
        let input;
        hashtagDiv.setAttribute("data-hashtagType",currentItem["type"]);
        switch(currentItem["type"]) {
            case "dropDown-ingredients":
                hashtagDiv.classList.add("bg-primary");
                input = document.getElementById("dropInput-ingredients");
                break;
            case "dropDown-appliances":
                hashtagDiv.classList.add("bg-success");
                input = document.getElementById("dropInput-appliances");
                break;
            case "dropDown-ustensils":
                hashtagDiv.classList.add("bg-danger");
                input = document.getElementById("dropInput-ustensils");
                break;
            default:    
        }

        const closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.className = "close";
        closeButton.setAttribute("aria-label","Close");
        closeButton.innerHTML = "<i class=\"far fa-times-circle\"></i>";
        hashtagDiv.append(closeButton);
        hashtags.append(hashtagDiv);

        closeButton.addEventListener("click",() => {
            hashtagDiv.remove();
            /* const hashtagToRemove = new Hashtag(currentItem["name"], currentItem["type"]);
            return hashtagToRemove; */
        })

        return hashtags;
    }
}

export { Hashtag }