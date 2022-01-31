class Init {
    createBody() {
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
        return section;
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
/* <body class="container-md">

    <main class="container">
        <section class ="search container row">
            

            <div class="row">
                <div id="hashtags" class="hashtags">
                </div>
            </div>

        <div class="dropDowns">
        </div>

        <section id="results" class="results container row row-cols-md-2 row-cols-lg-3 g-4">
        </section>
    </main>


    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
 
</body> */ 
//# sourceMappingURL=init.js.map