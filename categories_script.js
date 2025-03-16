document.addEventListener("DOMContentLoaded", () => {
    console.log("hoge");

    const params = new URLSearchParams(window.location.search);
    const category = params.get("category"); // ← ここで category を取得

    if (!category) {
        console.error("Category not specified in URL.");
        return;
    }

    console.log(`選択されたカテゴリー: ${category}`); // デバッグ用ログ

    // categoryKey をタイトル用に整形（例: "time-and-date" → "Time And Date"）
    const categoryName = category
    .replace(/-/g, " ")  // ハイフンをスペースに置換
    .replace(/\b\w/g, char => char.toUpperCase()); // 各単語の先頭を大文字に

    // ページのタイトルを更新
    document.title = `${categoryName} - Word List`;
    document.getElementById("category-title").textContent = categoryName;

    fetch(`data/${category}.json`)
        .then(response => response.json())
        .then(data => {
            console.log("JSONデータを取得しました", data); // デバッグ用ログ
            const container = document.getElementById("word-container");

            const ul = document.createElement("ul");
            ul.className = "word-list";

            data.forEach(word => {
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
                console.log(`単語追加: ${word.english} - ${word.japanese}`); // デバッグ用ログ
            });

            container.appendChild(ul);
        })
        .catch(error => console.error("Error loading words:", error));
});

function speakWord(word, element) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US"; // 英語を指定

    // 音声を英語に指定（利用可能な音声リストから選ぶ）
    const voices = speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => voice.lang === "en-US");

    if (englishVoice) {
        utterance.voice = englishVoice;
    }

    speechSynthesis.speak(utterance);

    element.style.transform = "scale(0.9)";
    setTimeout(() => { element.style.transform = "scale(1)"; }, 100);
}

