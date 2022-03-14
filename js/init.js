class Init {
    generateContent() {
        const body = document.querySelector("body");
        body.className = "container-md";
        this.createHeader();
        this.createMain();
        return body;
    }
    createHeader() {
        const body = document.querySelector("body");
        body.className = "container-md";
        const header = document.createElement("header");
        header.className = "title container";
        const headerDiv = document.createElement("div");
        headerDiv.className = "row justify-content-center";
        const figure = document.createElement("figure");
        figure.className = "col-md-6 logo-container";
        const a = document.createElement("a");
        a.href = "index.html";
        const img = document.createElement("img");
        img.src = "assets/logo.png";
        img.alt = "Logo Les Petits Plats";
        img.className = "logo";
        a.append(img);
        figure.append(a);
        headerDiv.append(figure);
        header.append(headerDiv);
        body.append(header);
        return body;
    }
    createMain() {
        const body = document.querySelector("body");
        const main = document.createElement("main");
        main.className = "container";
        const section = document.createElement("section");
        section.className = "search container row";
        section.id = "searchSection";
        main.append(section);
        body.append(main);
        this.createMainSearch();
        this.createHashtagsZone();
        this.createDropdownsZone();
        this.createResults();
        return body;
    }
    createMainSearch() {
        const section = document.getElementById("searchSection");
        const divRow = document.createElement("div");
        divRow.className = "row";
        const divCol = document.createElement("div");
        divCol.className = "col-xs-12 form-group has-search container-fluid";
        const form = document.createElement("form");
        form.id = "mainSearch";
        const input = document.createElement("input");
        input.type = "text";
        input.className = "form-control form-control-lg bg-light";
        input.placeholder = "Rechercher un ingrédient, appareil, ustensile ou une recette";
        input.id = "mainSearchInput";
        const span = document.createElement("span");
        span.className = "fa fa-search form-control-feedback";
        section.append(divRow);
        divRow.append(divCol);
        divCol.append(form);
        form.append(input, span);
        return section;
    }
    createHashtagsZone() {
        const section = document.getElementById("searchSection");
        const divRow = document.createElement("div");
        divRow.className = "row";
        const divHashtags = document.createElement("div");
        divHashtags.id = "hashtags";
        divHashtags.className = "hashtags";
        divRow.append(divHashtags);
        section.append(divRow);
        return section;
    }
    createDropdownsZone() {
        const section = document.getElementById("searchSection");
        const div = document.createElement("div");
        div.className = "dropDowns";
        section.append(div);
        this.createDropdown("ingredients");
        this.createDropdown("appliances");
        this.createDropdown("ustensils");
        return section;
    }
    createDropdown(type) {
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
        dropRow.className = "row";
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
        dropDownStuff.append(dropDownButton, dropContent);
        dropDownsDiv.append(dropDownStuff);
        switch (type) {
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
    }
    createResults() {
        const main = document.querySelector("main");
        const section = document.createElement("section");
        section.id = "results";
        section.className = "results container row row-cols-md-2 row-cols-lg-3 g-4";
        main.append(section);
        return main;
    }
}
export { Init };
//# sourceMappingURL=init.js.map