// ====== CONFIG: yahan naam change karo ======
const wifeName = "Flku";     // yahan uska naam likho, jaise "Ayushi"
const husbandName = "Amaan";  // yahan apna naam

// ====== Hearts background ======
const heartsContainer = document.getElementById("hearts");
const emojis = ["💖", "💗", "💘", "💝", "💕"];

for (let i = 0; i < 18; i++) {
    const span = document.createElement("span");
    span.className = "heart";
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    span.style.left = Math.random() * 100 + "vw";
    span.style.animationDelay = Math.random() * 8 + "s";
    span.style.fontSize = 14 + Math.random() * 10 + "px";
    heartsContainer.appendChild(span);
}

// ====== Naam auto-fill ======
document.querySelectorAll(".wife-name").forEach((el) => {
    el.textContent = wifeName;
});
document.querySelectorAll(".husband-name").forEach((el) => {
    el.textContent = husbandName;
});

// ====== Pages + progress logic ======
const pages = document.querySelectorAll(".page");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("dots");
const pageLabel = document.getElementById("pageLabel");
const loveFill = document.getElementById("loveFill");
const card = document.getElementById("card");

let currentPage = 0;
const totalPages = pages.length;

function renderDots() {
    dotsContainer.innerHTML = "";
    pages.forEach((_, idx) => {
        const dot = document.createElement("div");
        dot.className = "dot" + (idx === currentPage ? " active" : "");
        dotsContainer.appendChild(dot);
    });
}

function updateProgress() {
    pageLabel.textContent = `Page ${currentPage + 1} of ${totalPages}`;
    const minWidth = 20; // starting %
    const maxWidth = 100; // last page
    const progress =
        minWidth + ((maxWidth - minWidth) * currentPage) / (totalPages - 1);
    loveFill.style.width = progress + "%";
}

function showPage(index) {
    pages.forEach((p, i) => {
        p.classList.toggle("active", i === index);
    });
    currentPage = index;
    prevBtn.disabled = currentPage === 0;
    nextBtn.textContent =
        currentPage === pages.length - 1 ? "Restart 🔁" : "Next ➡";
    renderDots();
    updateProgress();
}

prevBtn.addEventListener("click", () => {
    if (currentPage > 0) {
        showPage(currentPage - 1);
    }
});

nextBtn.addEventListener("click", () => {
    if (currentPage === pages.length - 1) {
        showPage(0);
    } else {
        showPage(currentPage + 1);
    }
});

renderDots();
updateProgress();

// ====== Heart burst on correct answer ======
function showHeartBurst() {
    const hearts = ["💖", "💘", "💗", "💕"];
    for (let i = 0; i < 6; i++) {
        const span = document.createElement("span");
        span.className = "burst-heart";
        span.textContent = hearts[Math.floor(Math.random() * hearts.length)];

        const rect = card.getBoundingClientRect();
        const x = rect.width / 2 + (Math.random() * 80 - 40);
        const y = rect.height / 2 + (Math.random() * 40 - 20);

        span.style.left = x + "px";
        span.style.top = y + "px";

        card.appendChild(span);

        setTimeout(() => {
            span.remove();
        }, 1000);
    }
}

// ====== Game logic ======
const optionButtons = document.querySelectorAll(".option-btn");
const gameResult = document.getElementById("gameResult");

optionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        optionButtons.forEach((b) => {
            b.classList.remove("correct", "wrong");
        });
        const isCorrect = btn.dataset.correct === "true";
        if (isCorrect) {
            btn.classList.add("correct");
            gameResult.textContent =
                "Bas yehi sahi answer tha. Tumhe idea bhi nahi main tumse kitna pyaar karta hoon. 🤍";
            gameResult.className = "game-result good";
            showHeartBurst();
        } else {
            btn.classList.add("wrong");
            gameResult.textContent =
                "Nahi re, underestimate mat karo apne aap ko. Tumse pyaar hamesha limit se upar hi rahega. 🥺";
            gameResult.className = "game-result bad";
        }
    });
});
