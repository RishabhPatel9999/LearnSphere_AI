const nav = document.getElementById("mainNav");
const menuToggle = document.getElementById("menuToggle");
menuToggle?.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const progressBar = document.getElementById("progressBar");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : "0%";
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const featureData = [
  ["Personalized<br>Dashboard", "Your learning space changes with your progress."],
  ["Interactive<br>Learning", "Activities and knowledge checks keep every session active."],
  ["Achievements<br>& Streaks", "Small milestones help turn progress into motivation."],
  ["Real-time<br>Updates", "Fresh learning information keeps your experience current."]
];
document.querySelectorAll(".feature-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".feature-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    const data = featureData[Number(tab.dataset.feature)];
    document.querySelector("#featurePreview h3").innerHTML = data[0];
    document.querySelector("#featurePreview p").textContent = data[1];
  });
});

const responses = {
  "photosynthesis": "Photosynthesis is how green plants use sunlight to make food. They take in carbon dioxide and water, then use light energy to produce glucose and release oxygen.",
  "machine learning": "Machine learning is a way for computers to learn patterns from data and use those patterns to make predictions or decisions without being explicitly programmed for every case.",
  "math": "Try the 25–5 method: focus on one problem type for 25 minutes, then take a 5-minute break. Afterward, explain the method in your own words to check understanding."
};
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const toast = document.getElementById("toast");

function addMessage(text, type) {
  const el = document.createElement("div");
  el.className = `message ${type}`;
  el.textContent = text;
  chatMessages.appendChild(el);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function tutorReply(q) {
  const lower = q.toLowerCase();
  if (lower.includes("photo")) return responses.photosynthesis;
  if (lower.includes("machine") || lower.includes("learning")) return responses["machine learning"];
  if (lower.includes("math") || lower.includes("study") || lower.includes("tip")) return responses.math;
  return `Great question! In this website demo, the AI tutor can provide starter explanations. Try asking about photosynthesis, machine learning, or a math study tip.`;
}
function sendQuestion(q) {
  q = q.trim();
  if (!q) return;
  addMessage(q, "user");
  setTimeout(() => addMessage(tutorReply(q), "ai"), 450);
  chatInput.value = "";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}
chatForm.addEventListener("submit", e => { e.preventDefault(); sendQuestion(chatInput.value); });
document.querySelectorAll(".suggestions button").forEach(btn => btn.addEventListener("click", () => sendQuestion(btn.dataset.q)));

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior:"smooth", block:"start"});
    }
  });
});
