/*
  Energy Bowl Builder
  
  This script demonstrates object-oriented JavaScript by creating an
  EnergyBowl class. When the form is submitted, a new EnergyBowl object
  is instantiated and its description, price, and nutrition summary are
  displayed on the page.*/

class EnergyBowl {

  // This is the constructor and methods that was used 

  constructor(base, fruits, toppings, protein, sweetener, size, boost, instructions) {
    this.base = base;
    this.fruits = fruits;
    this.toppings = toppings;
    this.protein = protein;
    this.sweetener = sweetener;
    this.size = size;
    this.boost = boost;
    this.instructions = instructions;
    this.createdAt = new Date().toLocaleString();
  }

  calculatePrice() {
    const basePrices = {
      Small: 7.99,
      Medium: 9.49,
      Large: 10.99
    };

    const proteinPrices = {
      None: 0,
      "Vanilla Protein": 1.75,
      "Chocolate Protein": 1.75,
      "Peanut Butter": 1.25,
      "Almond Butter": 1.5
    };

    const boostPrices = {
      None: 0,
      Matcha: 1.25,
      Collagen: 1.75,
      Flax: 0.85,
      "Cacao Nibs": 1.1
    };

    const fruitCost = Math.max(0, this.fruits.length - 2) * 0.75;
    const toppingCost = Math.max(0, this.toppings.length - 2) * 0.6;
    const sweetenerCost = this.sweetener === "None" ? 0 : 0.5;

    const total =
      basePrices[this.size] +
      proteinPrices[this.protein] +
      boostPrices[this.boost] +
      fruitCost +
      toppingCost +
      sweetenerCost;

    return total.toFixed(2);
  }

  getDescription() {
    const fruitText = this.fruits.length ? this.fruits.join(", ") : "no fruit selected";
    const toppingText = this.toppings.length ? this.toppings.join(", ") : "no toppings selected";
    const instructionText = this.instructions.trim() ? this.instructions : "No special instructions.";

    return `${this.size} ${this.base} bowl with ${fruitText}, topped with ${toppingText}, protein add-on: ${this.protein}, sweetener: ${this.sweetener}, wellness boost: ${this.boost}. Special instructions: ${instructionText}`;
  }

  getNutritionSummary() {
    const fruitPoints = this.fruits.length * 18;
    const toppingPoints = this.toppings.length * 12;
    const proteinPoints = this.protein === "None" ? 0 : 20;
    const boostPoints = this.boost === "None" ? 0 : 8;

    return {
      estimatedCalories: 180 + fruitPoints + toppingPoints + proteinPoints + boostPoints,
      proteinLevel: this.protein === "None" ? "Moderate" : "High",
      fiberLevel: this.fruits.length + this.toppings.length >= 4 ? "High" : "Medium",
      sweetnessLevel: this.sweetener === "None" ? "Naturally sweet" : `Sweetened with ${this.sweetener}`
    };
  }

  getVisual() {
    const visuals = {
      Acai: "🫐🥣",
      "Greek Yogurt": "🍓🥣",
      Oatmeal: "🥣🍌",
      "Chia Pudding": "🥝🥣"
    };

    return visuals[this.base] || "🥣";
  }

  toJSON() {
    return {
      base: this.base,
      fruits: this.fruits,
      toppings: this.toppings,
      protein: this.protein,
      sweetener: this.sweetener,
      size: this.size,
      boost: this.boost,
      instructions: this.instructions,
      createdAt: this.createdAt,
      total: this.calculatePrice(),
      description: this.getDescription(),
      nutrition: this.getNutritionSummary(),
      visual: this.getVisual()
    };
  }
}

const bowlForm = document.getElementById("bowlForm");
const orderOutput = document.getElementById("orderOutput");
const pastOrders = document.getElementById("pastOrders");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const resetBtn = document.getElementById("resetBtn");

function getCheckedValues(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map((item) => item.value);
}

function getSelectedRadioValue(name) {
  return document.querySelector(`input[name="${name}"]:checked`).value;
}

function renderOrderReceipt(bowl) {
  const nutrition = bowl.getNutritionSummary();
  const instructions = bowl.instructions.trim() ? bowl.instructions : "No special instructions.";

  orderOutput.className = "receipt";
  orderOutput.innerHTML = `
    <div class="receipt__visual" aria-hidden="true">${bowl.getVisual()}</div>

    <div class="receipt__title">
      <div>
        <h3>Your ${bowl.size} ${bowl.base} Bowl</h3>
        <p class="muted">Created on ${bowl.createdAt}</p>
      </div>
      <div class="price-badge">$${bowl.calculatePrice()}</div>
    </div>

    <div class="receipt__section">
      <h3>Full Description</h3>
      <p>${bowl.getDescription()}</p>
    </div>

    <div class="receipt__section">
      <h3>Order Breakdown</h3>
      <ul>
        <li><strong>Base:</strong> ${bowl.base}</li>
        <li><strong>Fruits:</strong> ${bowl.fruits.length ? bowl.fruits.join(", ") : "None"}</li>
        <li><strong>Toppings:</strong> ${bowl.toppings.length ? bowl.toppings.join(", ") : "None"}</li>
        <li><strong>Protein:</strong> ${bowl.protein}</li>
        <li><strong>Sweetener:</strong> ${bowl.sweetener}</li>
        <li><strong>Wellness Boost:</strong> ${bowl.boost}</li>
        <li><strong>Special Instructions:</strong> ${instructions}</li>
      </ul>
    </div>

    <div class="receipt__section">
      <h3>Nutrition Snapshot</h3>
      <ul>
        <li><strong>Estimated Calories:</strong> ${nutrition.estimatedCalories} kcal</li>
        <li><strong>Protein Level:</strong> ${nutrition.proteinLevel}</li>
        <li><strong>Fiber Level:</strong> ${nutrition.fiberLevel}</li>
        <li><strong>Sweetness:</strong> ${nutrition.sweetnessLevel}</li>
      </ul>
    </div>
  `;
}

function saveOrder(bowl) {
  const existingOrders = JSON.parse(localStorage.getItem("energyBowlOrders")) || [];
  existingOrders.unshift(bowl.toJSON());
  localStorage.setItem("energyBowlOrders", JSON.stringify(existingOrders));
}

function renderPastOrders() {
  const orders = JSON.parse(localStorage.getItem("energyBowlOrders")) || [];

  if (!orders.length) {
    pastOrders.className = "history-list empty-state";
    pastOrders.innerHTML = "<p>No saved orders yet.</p>";
    return;
  }

  pastOrders.className = "history-list";
  pastOrders.innerHTML = orders
    .map(
      (order) => `
        <article class="history-card">
          <div class="history-card__top">
            <div>
              <h3>${order.visual} ${order.size} ${order.base} Bowl</h3>
              <p><strong>Total:</strong> $${order.total}</p>
            </div>
            <p class="muted">${order.createdAt}</p>
          </div>
          <p>${order.description}</p>
        </article>
      `
    )
    .join("");
}

bowlForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const bowl = new EnergyBowl(
    getSelectedRadioValue("base"),
    getCheckedValues("fruits"),
    getCheckedValues("toppings"),
    document.getElementById("protein").value,
    document.getElementById("sweetener").value,
    document.getElementById("size").value,
    document.getElementById("boost").value,
    document.getElementById("instructions").value
  );

  renderOrderReceipt(bowl);
  saveOrder(bowl);
  renderPastOrders();
});

resetBtn.addEventListener("click", () => {
  orderOutput.className = "empty-state";
  orderOutput.innerHTML = "<p>Form reset. Build a new bowl and click <strong>Place Order</strong>.</p>";
});

clearHistoryBtn.addEventListener("click", () => {
  localStorage.removeItem("energyBowlOrders");
  renderPastOrders();
});

renderPastOrders();
