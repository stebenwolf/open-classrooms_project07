async function fetchDataAsync() {
    try {
        const response = await fetch("../assets/recipes.json");
        const data = await response.json();
        console.log("voilà :  ",data);
        return data["recipes"];
    }
    catch (error) {
        console.error("Erreur dans la fonction fetchDataAsync : ", error);
    }
}

fetchDataAsync();
