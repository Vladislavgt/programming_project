document.addEventListener("DOMContentLoaded", () => {
    const apiEndpoint = "./static/data/recipes-data.json";
    const recipeTitle = document.getElementById("recipe-title");
    const recipeImage = document.getElementById("recipe-image");
    const ingredientsList = document.getElementById("recipe-ingredients");
    const stepsList = document.getElementById("recipe-steps");

    function loadRecipe(id) {
        fetch(apiEndpoint)
            .then((response) => {
                if (response.ok) return response.json();
                throw new Error("Не удалось загрузить рецепты");
            })
            .then((recipes) => {
                const recipe = recipes.find((r) => r.id === id);

                if (!recipe) throw new Error("Рецепт не найден");

                
                recipeTitle.textContent = recipe.title;
                recipeImage.src = `static/images/${recipe.image}`;
                recipeImage.alt = recipe.title;

                recipe.ingredients.forEach((ingredient) => {
                    const li = document.createElement("li");
                    li.textContent = ingredient;
                    ingredientsList.appendChild(li);
                });

                recipe.steps.forEach((step) => {
                    const li = document.createElement("li");
                    li.textContent = step;
                    stepsList.appendChild(li);
                });
            })
            .catch((error) => {
                console.error("Ошибка:", error);
                recipeTitle.textContent = "Рецепт не найден";
            });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get("id");

    if (recipeId) {
        loadRecipe(recipeId);
    } else {
        recipeTitle.textContent = "Рецепт не найден";
    }
});
