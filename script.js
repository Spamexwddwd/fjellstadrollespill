// Snø-partikler
const c=document.getElementById("particles"),ctx=c.getContext("2d");
if(c){
let w=c.width=innerWidth,h=c.height=innerHeight,snow=[];
for(let i=0;i<200;i++)snow.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*3+1,sp:Math.random()*1+0.2});
function animate(){ctx.clearRect(0,0,w,h);snow.forEach(s=>{ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle="rgba(255,255,255,.8)";ctx.fill();s.y+=s.sp;if(s.y>h)s.y=-5;});requestAnimationFrame(animate);}
animate();window.onresize=()=>{w=c.width=innerWidth;h=c.height=innerHeight;}}
  
// Mock serverstatus
document.getElementById("s1").textContent = "12"; // aktive spillere
document.getElementById("s2").textContent = "64"; // maks slots
