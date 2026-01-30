let allProducts = [];

// Fetch products
fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data.products;
    displayProducts(allProducts);
  })
  .catch(err => console.log(err));


// Display products
function displayProducts(products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<p>No products found</p>";
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${product.thumbnail}">
      <h3>${product.title}</h3>
      <p>₹ ${product.price}</p>
    `;

    card.addEventListener("click", () => {
      window.location.href = `productdetails.html?id=${product.id}`;
    });

    container.appendChild(card);
  });
}


// 🔹 SEARCH + SAVE HISTORY
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  const filtered = allProducts.filter(p =>
    p.title.toLowerCase().includes(query)
  );

  displayProducts(filtered);
});


// 🔹 SAVE SEARCH HISTORY ON ENTER
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    saveSearchHistory(searchInput.value.toLowerCase());
  }
});


// 🔹 SAVE HISTORY FUNCTION
function saveSearchHistory(query) {
  if (!query) return;

  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  if (!history.some(item => item.query === query)) {
    history.push({
      query: query,
      time: Date.now()
    });

    localStorage.setItem("searchHistory", JSON.stringify(history));
  }
}
