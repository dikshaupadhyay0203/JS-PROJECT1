let allProducts = [];

fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data.products;
    displayProducts(allProducts);
  })
  .catch(err => console.log(err));

function displayProducts(products) {
  let container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(product => {
    let card = document.createElement("div");
    card.className = "card";

    let img = document.createElement("img");
    img.src = product.thumbnail;

    let title = document.createElement("h3");
    title.innerText = product.title;

    let price = document.createElement("p");
    price.innerText = "₹ " + product.price;

    // ✅ click to open product details
    card.addEventListener("click", () => {
      console.log("Card clicked", product.id);
      window.location.href = `productdetails.html?id=${product.id}`;
    });

    card.append(img, title, price);
    container.appendChild(card);
  });
}

let searchInput = document.getElementById("searchInput");

/* 🔹 PRODUCT SEARCH (NO HISTORY SAVE HERE) */
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  const filteredProducts = allProducts.filter(p =>
    p.title.toLowerCase().includes(query)
  );

  displayProducts(filteredProducts);
});

/* 🔹 SAVE SEARCH HISTORY ONLY ON ENTER */
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    saveSearchHistory(searchInput.value.toLowerCase());
  }
});

/* 🔹 SUGGESTION CODE (SIR STYLE) */
const suggestionBox = document.getElementById("suggestions");
searchInput.addEventListener("input", () => {
  console.log("Suggestion working");

  const text = searchInput.value.toLowerCase();
  const history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  //filter based on query field
  const matches = history.filter(item =>
    item.query.toLowerCase().includes(text)
  );

  //clear previous suggestions
  suggestionBox.innerHTML = "";

  //show suggestions
  matches.forEach(item => {
    const div = document.createElement("div");
    div.className = "suggestion-item";
    div.innerText = item.query;

    div.addEventListener("mousedown", () => {
      searchInput.value = item.query;
      suggestionBox.innerHTML = "";
    });

    suggestionBox.appendChild(div);
  });
});

/* 🔹 SAVE HISTORY FUNCTION */
function saveSearchHistory(query) {
  if (query === "") return;

  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  if (!history.some(item => item.query === query)) {
    history.push({
      query: query,
      time: Date.now()
    });

    localStorage.setItem("searchHistory", JSON.stringify(history));
  }
}
