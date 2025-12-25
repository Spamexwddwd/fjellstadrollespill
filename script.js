// === SNØ-PARTIKLER ===
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let snow = [];
for (let i = 0; i < 150; i++) {
    snow.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        sp: Math.random() * 0.6 + 0.1
    });
}
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
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// === MOCK SERVERSTATUS ===
const activePlayers = 12;
const maxPlayers = 64;
document.getElementById("s1").textContent = activePlayers;
document.getElementById("s2").textContent = maxPlayers;
document.getElementById("s1-status").textContent = activePlayers;
document.getElementById("s2-status").textContent = maxPlayers;
