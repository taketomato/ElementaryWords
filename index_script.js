document.addEventListener("DOMContentLoaded", () => {
    const categoryContainer = document.getElementById("category-container");

    fetch("data/index.json")
        .then(response => response.json())
        .then(data => {
            data.categories.forEach(category => {
                const div = document.createElement("div");
                div.className = "category-card";

                const a = document.createElement("a");
                a.href = `categories.html?category=${category.key}`;

                // カテゴリ名（英語）
                const title = document.createElement("div");
                title.className = "category-title";
                title.textContent = category.name;

                // カテゴリ名（日本語）
                const subtitle = document.createElement("div");
                subtitle.className = "category-subtitle";
                subtitle.textContent = category.japanese;

                a.appendChild(title);
                a.appendChild(subtitle);
                div.appendChild(a);
                categoryContainer.appendChild(div);
            });
        })
        .catch(error => console.error("Error loading categories:", error));
});
