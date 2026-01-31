let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const itemsPerPage = 8;

// Fetch products
fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data.products;
    filteredProducts = allProducts;
    displayProducts();
    setupPagination();
  })
  .catch(err => console.log(err));


// 🔹 Display products with pagination
function displayProducts() {
  const container = document.getElementById("products");
  container.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const pageProducts = filteredProducts.slice(start, end);

  if (pageProducts.length === 0) {
    container.innerHTML = "<p>No products found</p>";
    return;
  }

  pageProducts.forEach(product => {
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


// 🔹 Pagination buttons
function setupPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.className = "page-btn";

    if (i === currentPage) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
      currentPage = i;
      displayProducts();
      setupPagination();
    });

    pagination.appendChild(btn);
  }
}


// 🔹 SEARCH + RESET PAGINATION
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  filteredProducts = allProducts.filter(p =>
    p.title.toLowerCase().includes(query)
  );

  currentPage = 1; // reset to first page
  displayProducts();
  setupPagination();
});


// 🔹 SAVE SEARCH HISTORY ON ENTER
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    saveSearchHistory(searchInput.value.toLowerCase());
  }
});


// 🔹 SAVE HISTORY FUNCTION (UNCHANGED)
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
