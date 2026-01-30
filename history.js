const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
const container = document.getElementById("historyList");

console.log("History data:", history);

if (!container) {
  console.error("historyList div not found");
}

if (history.length === 0) {
  container.innerHTML = "<p>No search history found</p>";
}

history
  .sort((a, b) => b.time - a.time)
  .forEach(item => {
    const div = document.createElement("div");
    div.className = "history-item";

    const time = new Date(item.time).toLocaleString();

    div.innerHTML = `
      <strong>${item.query}</strong>
      <span class="time">${time}</span>
    `;

    container.appendChild(div);
  });
