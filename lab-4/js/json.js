const header = document.querySelector('header');
const section = document.querySelector('section');

async function populate() {
    const requestURL = './js/i-scream.json';
    const request = new Request(requestURL);

    const response = await fetch(request);
    const jsonObj = await response.json();

    populateHeader(jsonObj);
    showTopFlavors(jsonObj);
}

populate();

function populateHeader(obj) {
    const h1 = document.createElement('h1');
    h1.textContent = obj.companyName;
    header.appendChild(h1);
}

function showTopFlavors(obj) {
    const topFlavors = obj.topFlavors;

    for (let i = 0; i < topFlavors.length; i++) {
        const article = document.createElement('article');
        const h2 = document.createElement('h2');
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');
        const ul = document.createElement('ul');
        const img = document.createElement('img');

        h2.textContent = topFlavors[i].name;

        let calories = topFlavors[i].calories;
        let calorieLabel = "";

        if (calories < 300) {
            calorieLabel = "Low Calorie";
        } else if (calories < 450) {
            calorieLabel = "Medium Calorie";
        } else {
            calorieLabel = "High Calorie";
        }

        p1.textContent = `Calories: ${calories} (${calorieLabel})`;

        let type = topFlavors[i].type;
        p2.textContent = `Type: ${type}`;

        if (type === "ice cream") {
            article.style.backgroundColor = "#fce4ec";
        } else if (type === "sorbet") {
            article.style.backgroundColor = "#e0f7fa";
        }

        img.src = `images/${topFlavors[i].image}`;
        img.alt = topFlavors[i].name;

        const ingredients = topFlavors[i].ingredients;
        for (let j = 0; j < ingredients.length; j++) {
            const li = document.createElement('li');
            li.textContent = ingredients[j];
            ul.appendChild(li);
        }

        article.appendChild(h2);
        article.appendChild(img);
        article.appendChild(p1);
        article.appendChild(p2);
        article.appendChild(ul);

        section.appendChild(article);
    }
}
