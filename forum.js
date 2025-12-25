// MOCK DISCORD LOGIN
const loginBtn = document.getElementById("login-btn");
const userProfile = document.getElementById("user-profile");
let currentUser = null;

loginBtn.addEventListener("click", ()=>{
    // Simulert Discord login
    currentUser = {name:"SpillerX", avatar:"assets/avatars/avatar1.png"};
    userProfile.innerHTML = `<img src="${currentUser.avatar}" class="user-avatar"> ${currentUser.name}`;
    loginBtn.style.display="none";
});

// MOCK TOPICS
const topicsData = [
  {title:"Velkommen til Fjellstad RP!", cat:"general", desc:"Diskuter alt her", user:"Admin", avatar:"assets/avatars/avatar1.png", date:"2025-12-25"},
  {title:"Forslag: Nye jobber", cat:"suggestion", desc:"Politi rolle med spesialutstyr", user:"Spiller1", avatar:"assets/avatars/avatar2.png", date:"2025-12-24"},
  {title:"RP Scenario Diskusjon", cat:"rp", desc:"Hvordan lage realistisk roleplay?", user:"Spiller3", avatar:"assets/avatars/avatar3.png", date:"2025-12-23"},
  {title:"Staff info", cat:"staff", desc:"Viktige oppdateringer for staff", user:"Staff1", avatar:"assets/avatars/avatar1.png", date:"2025-12-22"}
];

const topicsContainer = document.getElementById("topics");
function renderTopics(filter="all"){
    topicsContainer.innerHTML="";
    topicsData.forEach(topic=>{
        if(filter==="all" || topic.cat===filter){
            const div = document.createElement("div");
            div.className="forum-topic reveal";
            div.innerHTML=`
                <h4>${topic.title}</h4>
                <p>${topic.desc}</p>
                <div class="user">
                    <img src="${topic.avatar}" alt="avatar">
                    <span>${topic.user}</span> • <small>${topic.date}</small>
                </div>
            `;
            topicsContainer.appendChild(div);
        }
    });
}
renderTopics();

// CATEGORY FILTER
document.querySelectorAll("#category-list li").forEach(li=>{
    li.addEventListener("click",()=>renderTopics(li.dataset.cat));
});

// SEARCH
document.getElementById("search").addEventListener("input", e=>{
    const term = e.target.value.toLowerCase();
    topicsContainer.innerHTML="";
    topicsData.forEach(topic=>{
        if(topic.title.toLowerCase().includes(term) || topic.desc.toLowerCase().includes(term)){
            const div = document.createElement("div");
            div.className="forum-topic reveal";
            div.innerHTML=`
                <h4>${topic.title}</h4>
                <p>${topic.desc}</p>
                <div class="user">
                    <img src="${topic.avatar}" alt="avatar">
                    <span>${topic.user}</span> • <small>${topic.date}</small>
                </div>
            `;
            topicsContainer.appendChild(div);
        }
    });
});

// FRONTEND CHAT MOCK
const chatInput=document.getElementById("chat-input");
const chatBox=document.getElementById("chat-box");
chatInput.addEventListener("keypress",(e)=>{
    if(e.key==='Enter' && chatInput.value.trim()!==''){
        if(!currentUser) return alert("Du må logge inn først!");
        const msg = document.createElement("div");
        msg.className="chat-msg";
        msg.innerHTML=`<strong>${currentUser.name}:</strong> ${chatInput.value}`;
        chatBox.appendChild(msg);
        chatInput.value="";
        chatBox.scrollTop=chatBox.scrollHeight;
    }
});
