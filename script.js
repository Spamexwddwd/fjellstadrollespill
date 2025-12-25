// === SNØ-PARTIKLER ===
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

// Sett canvas til full størrelse
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array for snøpartikler
let snow = [];
const snowCount = 150; // antall snøfnugg

// Opprett snøfnugg
for (let i = 0; i < snowCount; i++) {
    snow.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5, // radius
        sp: Math.random() * 0.6 + 0.1 // speed
    });
}

// Animer snøfnugg
function animateSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snow.forEach(f => {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.fill();
        f.y += f.sp;
        if (f.y > canvas.height) f.y = -5;
    });
    requestAnimationFrame(animateSnow);
}
animateSnow();

// Oppdater canvas ved resizing
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// === MOCK SERVERSTATUS ===
const activePlayers = 12; // eksempel
const maxPlayers = 64;    // eksempel

document.getElementById("s1").textContent = activePlayers;
document.getElementById("s2").textContent = maxPlayers;

// === FUNKSJON FOR FUTURE ANIMATIONS ===
// Hvis du vil legge til scroll-animasjoner eller andre effekter senere
// kan du bruke denne funksjonen med IntersectionObserver:

/*
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));
*/
