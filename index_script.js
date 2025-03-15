document.addEventListener("DOMContentLoaded", () => {
    const categoryList = document.getElementById("category-list");

    // 🔹 data/index.json を取得
    fetch("data/index.json")
        .then(response => response.json())
        .then(data => {
            data.categories.forEach(category => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                a.href = `categories.html?category=${category.key}`;
                a.textContent = category.name;
                li.appendChild(a);
                categoryList.appendChild(li);
            });
        })
        .catch(error => console.error("Error loading categories:", error));
});