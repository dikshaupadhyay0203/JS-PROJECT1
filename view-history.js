const container = document.getElementById("viewHistoryList");

const viewHistory = JSON.parse(localStorage.getItem("viewHistory")) || [];

console.log("View history data:", viewHistory);

if (viewHistory.length === 0) {
  container.innerText = "No products viewed yet.";
}

viewHistory.forEach(item => {
  const div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <img src="${item.thumbnail}">
    <h3>${item.title}</h3>
    <p>Viewed on: ${new Date(item.time).toLocaleString()}</p>
  `;

  div.addEventListener("click", () => {
    window.location.href = `productdetails.html?id=${item.id}`;
  });

  container.appendChild(div);
});
