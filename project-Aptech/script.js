
/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    menuToggle.textContent =
        navLinks.classList.contains("active") ? "✕" : "☰";
});

document.querySelectorAll("#navLinks a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.textContent = "☰";
    });
});


/* =========================
   IQBAL DAY COUNTDOWN
========================= */

function updateCountdown() {

    const targetDate = new Date(2026, 10, 9, 0, 0, 0);
    const now = new Date();

    const difference = targetDate - now;

    if (difference <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        document.querySelector(".countdown > p").textContent =
            "HAPPY IQBAL DAY 2026!";

        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );
    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );
    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* =========================
   TOAST NOTIFICATION
========================= */

const toast = document.getElementById("toast");

let toastTimer;

function showToast(message) {

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}



/* CLICK-TO-EXPLORE CARD DETAILS */
const detailModal=document.getElementById("detailModal");
const modalTitle=document.getElementById("modalTitle");
const modalText=document.getElementById("modalText");
let lastFocusedCard=null;
function openDetail(title,detail,trigger){lastFocusedCard=trigger||document.activeElement;modalTitle.textContent=title;modalText.textContent=detail;detailModal.classList.add("open");detailModal.setAttribute("aria-hidden","false");document.body.classList.add("modal-open");detailModal.querySelector(".modal-close").focus();}
function closeDetail(){detailModal.classList.remove("open");detailModal.setAttribute("aria-hidden","true");document.body.classList.remove("modal-open");if(lastFocusedCard)lastFocusedCard.focus();}
document.querySelectorAll(".detail-card,.timeline-content").forEach(card=>{card.setAttribute("tabindex","0");card.setAttribute("role","button");card.addEventListener("click",()=>{const title=card.dataset.title||card.querySelector("h3")?.textContent?.trim()||"A moment in Iqbal's life";const detail=card.dataset.detail||card.querySelector("p")?.textContent?.trim()||"Explore this important moment in the life and legacy of Allama Muhammad Iqbal.";openDetail(title,detail,card);});card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();card.click();}});});
document.querySelectorAll(".poetry-card").forEach(card=>{card.setAttribute("tabindex","0");card.setAttribute("role","button");card.addEventListener("click",e=>{if(e.target.closest(".quote-btn"))return;const title=card.querySelector(".poetry-number")?.textContent||"A verse by Iqbal";const verse=card.querySelector(".urdu")?.textContent?.trim()||"";const translation=card.querySelector(".translation")?.textContent?.trim()||"";const details={"01 / KHUDI":"This famous opening couplet from Iqbal's poem speaks of raising one's selfhood through effort and character. The full thought continues by asking the individual to develop such strength that destiny itself seems to seek their counsel.","02 / AMBITION":"From the poem 'Sitaron Se Aage', this verse reminds readers that the universe of possibility does not end at the visible horizon. Iqbal urges the reader to keep seeking, learning and striving.","03 / SELF-BELIEF":"This verse expresses Iqbal's refusal to surrender hope. Even when circumstances appear barren, faith, effort and renewal can bring new life."};openDetail(title,`${verse}\n\n${translation}\n\n${details[title]||"Iqbal's poetry invites readers to reflect, grow and act with purpose."}`,card);});card.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&!e.target.closest(".quote-btn")){e.preventDefault();card.click();}});});
detailModal.querySelectorAll("[data-close-modal]").forEach(el=>el.addEventListener("click",closeDetail));
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&detailModal.classList.contains("open"))closeDetail();});

/* =========================
   COPY URDU POETRY
========================= */

document.querySelectorAll(".quote-btn").forEach(button => {

    button.addEventListener("click", async () => {

        const verse = button.dataset.quote;

        try {
            await navigator.clipboard.writeText(verse);
            showToast("✦ Poetry copied successfully!");
        } catch (error) {
            showToast("Clipboard unavailable. Please select the verse manually.");
        }

    });

});


/* =========================
   INTERACTIVE QUIZ
========================= */

const quizData = [

    {
        question: "Where was Allama Iqbal born?",
        answers: [
            "Lahore",
            "Sialkot",
            "Karachi",
            "Delhi"
        ],
        correct: 1
    },

    {
        question: "When was Allama Iqbal born?",
        answers: [
            "9 November 1877",
            "14 August 1877",
            "23 March 1880",
            "21 April 1878"
        ],
        correct: 0
    },

    {
        question: "What is the concept of Khudi?",
        answers: [
            "Selfhood and self-realization",
            "Political power",
            "Economic growth",
            "Military strategy"
        ],
        correct: 0
    },

    {
        question: "Which famous address did Iqbal deliver in 1930?",
        answers: [
            "Lahore Address",
            "Allahabad Address",
            "Delhi Address",
            "Karachi Address"
        ],
        correct: 1
    },

    {
        question: "When did Allama Iqbal pass away?",
        answers: [
            "9 November 1938",
            "14 August 1937",
            "21 April 1938",
            "23 March 1940"
        ],
        correct: 2
    }

];

let currentQuestion = 0;
let totalScore = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const questionCount = document.getElementById("questionCount");
const scoreElement = document.getElementById("score");
const feedback = document.getElementById("feedback");
const progress = document.getElementById("progress");
const nextButton = document.getElementById("nextQuestion");


function loadQuestion() {

    answered = false;

    const current = quizData[currentQuestion];

    questionElement.textContent = current.question;

    questionCount.textContent =
        `QUESTION ${String(currentQuestion + 1).padStart(2, "0")} / 05`;

    scoreElement.textContent = `SCORE: ${totalScore}`;

    progress.style.width =
        `${((currentQuestion + 1) / quizData.length) * 100}%`;

    feedback.textContent = "";
    answersElement.innerHTML = "";

    nextButton.disabled = true;
    nextButton.textContent =
        currentQuestion === quizData.length - 1
            ? "See Results →"
            : "Next Question →";

    current.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer-btn";
        button.textContent = answer;

        button.addEventListener("click", () => {
            checkAnswer(index, button);
        });

        answersElement.appendChild(button);

    });

}


function checkAnswer(selectedIndex, selectedButton) {

    if (answered) return;

    answered = true;

    const correctIndex = quizData[currentQuestion].correct;

    const allButtons =
        document.querySelectorAll(".answer-btn");

    allButtons.forEach((button, index) => {

        button.disabled = true;

        if (index === correctIndex) {
            button.classList.add("correct");
        }

    });

    if (selectedIndex === correctIndex) {

        totalScore++;

        feedback.textContent = "✓ Excellent! Your answer is correct.";

    } else {

        selectedButton.classList.add("wrong");

        feedback.textContent =
            "✗ Not quite! The correct answer is highlighted.";

    }

    scoreElement.textContent = `SCORE: ${totalScore}`;

    nextButton.disabled = false;

}


nextButton.addEventListener("click", () => {

    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < quizData.length) {

        loadQuestion();

    } else {

        showResults();

    }

});


function showResults() {

    progress.style.width = "100%";

    const percentage =
        Math.round((totalScore / quizData.length) * 100);

    let message;

    if (percentage === 100) {
        message = "Outstanding! You are an Iqbal expert!";
    } else if (percentage >= 60) {
        message = "Great work! You know Iqbal's legacy well.";
    } else {
        message = "Keep learning! Explore the website and try again.";
    }

    questionCount.textContent = "QUIZ COMPLETED";

    scoreElement.textContent =
        `FINAL SCORE: ${totalScore}/5`;

    questionElement.textContent =
        `${percentage}% — ${message}`;

    answersElement.innerHTML = "";

    feedback.textContent =
        "Thank you for celebrating the legacy of Allama Iqbal.";

    nextButton.disabled = false;
    nextButton.textContent = "Try Again ↻";

    nextButton.onclick = () => {

        currentQuestion = 0;
        totalScore = 0;

        nextButton.onclick = null;

        loadQuestion();

    };

}

loadQuestion();


/* =========================
   FUTURISTIC PARTICLE EFFECT
========================= */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    particles = [];

    const particleCount =
        Math.min(90, Math.floor(window.innerWidth / 15));

    for (let i = 0; i < particleCount; i++) {

        particles.push({

            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,

            radius: Math.random() * 1.8 + 0.5,

            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,

            opacity: Math.random() * 0.6 + 0.2

        });

    }

}

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    particles.forEach(particle => {

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 ||
            particle.x > window.innerWidth) {
            particle.speedX *= -1;
        }

        if (particle.y < 0 ||
            particle.y > window.innerHeight) {
            particle.speedY *= -1;
        }

        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(215, 183, 123, ${particle.opacity})`;

        ctx.fill();

    });

    requestAnimationFrame(animateParticles);

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

animateParticles();

