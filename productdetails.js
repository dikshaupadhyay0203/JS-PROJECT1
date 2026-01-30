const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log("Product ID:", id);

fetch(`https://dummyjson.com/products/${id}`)
  .then(res => res.json())
  .then(product => {
    console.log("Product fetched:", product);

    document.getElementById("title").innerText = product.title;
    document.getElementById("thumbnail").src = product.thumbnail;
    document.getElementById("price").innerText = product.price;

    document.getElementById("availability").innerText =
      product.stock > 0 ? "In Stock" : "Out of Stock";

    document.getElementById("details").innerHTML = `
      <li><b>Brand:</b> ${product.brand}</li>
      <li><b>Category:</b> ${product.category}</li>
      <li><b>Rating:</b> ${product.rating}</li>
      <li><b>Stock:</b> ${product.stock}</li>
      <li><b>Discount:</b> ${product.discountPercentage}%</li>
      <li><b>SKU:</b> ${product.sku}</li>
      <li><b>Weight:</b> ${product.weight} g</li>
      <li><b>Warranty:</b> ${product.warrantyInformation}</li>
      <li><b>Return Policy:</b> ${product.returnPolicy}</li>
      <li><b>Shipping:</b> ${product.shippingInformation}</li>
      <li><b>Minimum Order:</b> ${product.minimumOrderQuantity}</li>
    `;

    saveViewHistory(product);
  });

function saveViewHistory(product) {
  console.log("Saving view history for:", product.id);

  let viewHistory = JSON.parse(localStorage.getItem("viewHistory")) || [];

  if (!viewHistory.some(item => item.id === product.id)) {
    viewHistory.push({
      id: product.id,
      title: product.title,
      thumbnail: product.thumbnail,
      time: Date.now()
    });

    localStorage.setItem("viewHistory", JSON.stringify(viewHistory));
  }
}
