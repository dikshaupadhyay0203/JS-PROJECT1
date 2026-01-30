const clearBtn = document.getElementById("clearBtn");

clearBtn.addEventListener("click", () => {

  localStorage.removeItem("searchHistory");

  alert("Search history cleared successfully");


  window.location.href = "history.html";
});
