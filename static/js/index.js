document.addEventListener("DOMContentLoaded", () => {
    const apiEndpoint = "./static/data/recipes-data.json";
    const recipesContainer = document.querySelector(".recipes");
    const searchInput = document.querySelector(".search-input");
    const searchButton = document.querySelector(".search-button");

    let allRecipes = [];

    function createRecipeCard(recipe) {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        recipeCard.innerHTML = `
            <a href="recipe.html?id=${recipe.id}">
                <div class="recipe-image">
                    <img src="static/images/${recipe.image}" alt="${recipe.title}">
                </div>
                <h2>${recipe.title}</h2>
            </a>
            <p>Время приготовления: ${recipe.time}</p>
        `;
        return recipeCard;
    }

    function displayRecipes(recipes) {
        recipesContainer.innerHTML = ''; 
        if (recipes.length === 0) {
            recipesContainer.innerHTML = '<p class="no-results">Рецепты не найдены</p>';
            return;
        }
        recipes.forEach(recipe => {
            const recipeCard = createRecipeCard(recipe);
            recipesContainer.appendChild(recipeCard);
        });
    }

    function searchRecipes(query) {
        const filtered = allRecipes.filter(recipe => 
            recipe.title.toLowerCase().includes(query.toLowerCase())
        );
        displayRecipes(filtered);
    }

    async function loadRecipes() {
        try {
            const response = await fetch(apiEndpoint);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allRecipes = await response.json();
            displayRecipes(allRecipes);
        } catch (error) {
            console.error("Ошибка загрузки:", error);
            recipesContainer.innerHTML = `
                <div class="error-message" style="color: #f3eedb; text-align: center; width: 100%;">
                    <p>Ошибка загрузки рецептов: ${error.message}</p>
                    <p>Пожалуйста, убедитесь, что сайт запущен через веб-сервер.</p>
                </div>`;
        }
    }


    searchButton.addEventListener("click", () => {
        searchRecipes(searchInput.value);
    });

    searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            searchRecipes(searchInput.value);
        }
    });

    loadRecipes();
});