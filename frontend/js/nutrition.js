document.getElementById("calculate").addEventListener("click", function() {
    let weight = parseFloat(document.getElementById("weight").value);
    let height = parseFloat(document.getElementById("height").value);
    let age = parseFloat(document.getElementById("age").value);
    let activity = parseFloat(document.getElementById("activity").value);
    let goal = document.getElementById("goal").value;

    if (!weight || !height || !age) {
        alert("Please fill in all fields");
        return;
    }

    // BMR Calculation (Mifflin-St Jeor Equation)
    let bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    let calories = bmr * activity;

    // Adjust calories based on goal
    if (goal === "lose") calories -= 500;
    if (goal === "gain") calories += 500;

    let protein = (calories * 0.3 / 4).toFixed(1);
    let carbs = (calories * 0.4 / 4).toFixed(1);
    let fats = (calories * 0.3 / 9).toFixed(1);

    document.getElementById("results").innerHTML = `
        Daily Calories: ${calories.toFixed(0)} kcal<br>
        Protein: ${protein} g | Carbs: ${carbs} g | Fats: ${fats} g
    `;

    // Suggested Meals
    let meals = [];
    if (goal === "lose") {
        meals = ["Oatmeal + Berries", "Grilled Chicken Salad", "Brown Rice + Veggies", "Greek Yogurt"];
    } else if (goal === "maintain") {
        meals = ["Eggs + Whole Grain Toast", "Chicken Wrap", "Quinoa + Veggies", "Smoothie"];
    } else {
        meals = ["Omelette + Toast", "Beef Stir Fry", "Pasta + Chicken", "Protein Shake"];
    }

    let mealList = document.getElementById("meals");
    mealList.innerHTML = "";
    meals.forEach(meal => {
        let li = document.createElement("li");
        li.textContent = meal;
        mealList.appendChild(li);
    });
});
