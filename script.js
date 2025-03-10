document.addEventListener("DOMContentLoaded", () => {
    fetch("words.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("word-container");

            Object.keys(data).forEach(category => {
                // カテゴリータイトル
                const categoryDiv = document.createElement("div");
                categoryDiv.className = "category";
                categoryDiv.textContent = category;
                container.appendChild(categoryDiv);

                // 単語リスト
                const ul = document.createElement("ul");
                ul.className = "word-list";
                
                data[category].forEach(word => {
                    const li = document.createElement("li");
                    li.className = "word-item";

                    li.innerHTML = `
                        <div class="word-text">
                            <span class="english">${word.english} ${word.emoji || ""}</span>
                            <span class="japanese">${word.japanese}</span>
                        </div>
                        <i class="fas fa-volume-up speaker-icon" onclick="speakWord('${word.english}', this)"></i>
                    `;

                    ul.appendChild(li);
                });

                container.appendChild(ul);
            });
        })
        .catch(error => console.error("Error loading words:", error));
});

function speakWord(word, element) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US"; 
    speechSynthesis.speak(utterance);

    element.style.transform = "scale(0.9)";
    setTimeout(() => { element.style.transform = "scale(1)"; }, 100);
}
