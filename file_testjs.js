document.addEventListener('DOMContentLoaded', () => {
    // Sample recipe data
    const recipes = [
        {
            id: 1,
            title: "Creamy Pasta Carbonara",
            image: "carbonara.jpg",
            time: "30 mins",
            difficulty: "Medium",
            calories: "650 kcal",
            rating: 4.8
        },
        {
            id: 2,
            title: "Grilled Chicken Salad",
            image: "chicken-salad.jpg",
            time: "20 mins",
            difficulty: "Easy",
            calories: "350 kcal",
            rating: 4.5
        },
        // Add more recipes...
    ];

    const recipeGrid = document.querySelector('.recipe-grid');
    const searchInput = document.getElementById('searchInput');

    // Render recipe cards
    function renderRecipes(recipesToRender) {
        recipeGrid.innerHTML = '';
        recipesToRender.forEach(recipe => {
            const recipeCard = createRecipeCard(recipe);
            recipeGrid.appendChild(recipeCard);
        });
    }

    // Create recipe card element
    function createRecipeCard(recipe) {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
            <div class="recipe-content">
                <h3>${recipe.title}</h3>
                <div class="recipe-stats">
                    <span><i class="far fa-clock"></i> ${recipe.time}</span>
                    <span><i class="fas fa-signal"></i> ${recipe.difficulty}</span>
                    <span><i class="fas fa-fire"></i> ${recipe.calories}</span>
                </div>
                <div class="recipe-rating">
                    <span><i class="fas fa-star"></i> ${recipe.rating}</span>
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            showRecipeDetails(recipe);
        });

        return card;
    }

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredRecipes = recipes.filter(recipe => 
            recipe.title.toLowerCase().includes(searchTerm)
        );
        renderRecipes(filteredRecipes);
    });

    // Show recipe details
    function showRecipeDetails(recipe) {
        // Implement recipe detail view
        console.log('Showing details for:', recipe.title);
    }

    // Initialize with all recipes
    renderRecipes(recipes);

    // Add smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });

    document.querySelectorAll('.category-card, .recipe-card').forEach((el) => {
        observer.observe(el);
    });
});