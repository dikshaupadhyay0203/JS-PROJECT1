// get product id from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// fetch single product details
fetch(`https://dummyjson.com/products/${productId}`)
  .then(res => res.json())
  .then(product => {
    showProductDetails(product);
  })
  .catch(err => console.log(err));

function showProductDetails(product) {
  const container = document.getElementById("productDetails");

  container.innerHTML = `
    <div class="card">
      <img src="${product.thumbnail}" alt="${product.title}">
      <h2>${product.title}</h2>
      <p><strong>Price:</strong> ₹ ${product.price}</p>
      <p>${product.description}</p>
    </div>
  `;
}
