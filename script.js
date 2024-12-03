const recipes = {
    "bliny": {
        title: "Домашние Блинчики",
        image: "блины.jpg",
        time: "35 минут",
        ingredients: [
            "Молоко - 500 мл",
            "Яйца - 2 шт",
            "Мука - 200 г",
            "Сахар - 2 ст.л.",
            "Соль - щепотка",
            "Масло - сливочное масло по вкусу"
        ],
        steps: [
            "Взбить 3 яйца и 2 столовых ложки сахара до появления пены.",
            "Добавить 100 грамм муки и 250 мл молока, перемешать.",
            "Добавить оставшиеся 100 грамм муки и 250 мл молока, размешать до однородной массы, разбив максимальное количество комочков.",
            "Дать тесту настояться 20 минут. Еще раз перемешать.",
            "Разогреть сковороду и выпекать блины на сильном огне. Каждый блин при выкладывании промазывать куском сливочного масла.",
            "Подавать блины с вареньем, сметаной, сгущенкой по вкусу."
        ]
    },
};

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get("id");

    if (!recipes[recipeId]) {
        document.getElementById("recipe-title").textContent = "Рецепт не найден!";
        return;
    }

    const recipe = recipes[recipeId];

    document.getElementById("recipe-title").textContent = recipe.title;
    document.getElementById("recipe-image").src = "static/images/блины.jpg";
    document.getElementById("recipe-image").alt = recipe.title;

    const ingredientsList = document.getElementById("recipe-ingredients");
    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement("li");
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });

    const stepsList = document.getElementById("recipe-steps");
    recipe.steps.forEach(step => {
        const li = document.createElement("li");
        li.textContent = step;
        stepsList.appendChild(li);
    });
});