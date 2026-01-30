let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

let container = document.getElementById("historyList");

// Sort latest first
history.sort((a, b) => b.time - a.time);

history.forEach(item => {
  let div = document.createElement("div");
  div.className = "history-item";

  // Convert timestamp to readable date
  let date = new Date(item.time);
  let formattedTime = date.toLocaleString(); // e.g. 29/1/2026, 10:30 AM

  div.innerHTML = `
    <strong>${item.query}</strong>
    <span class="time">${formattedTime}</span>
  `;

  
  container.appendChild(div);
});
