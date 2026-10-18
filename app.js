const games = [
 {id:"gta-v",title:"Grand Theft Auto V",category:"Open World",platform:"PC · PlayStation · Xbox",tag:"OPEN WORLD",year:"2013",desc:"Explore Los Santos and Blaine County in a sprawling open-world action adventure.",image:"https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=85",official:"https://www.rockstargames.com/gta-v"},
 {id:"red-dead-2",title:"Red Dead Redemption 2",category:"Open World",platform:"PC · PlayStation · Xbox",tag:"ADVENTURE",year:"2018",desc:"A richly detailed western adventure set in a vast and living world.",image:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=85",official:"https://www.rockstargames.com/reddeadredemption2"},
 {id:"watch-dogs-2",title:"Watch Dogs 2",category:"Action",platform:"PC · PlayStation · Xbox",tag:"HACKING",year:"2016",desc:"Use hacking skills, gadgets and teamwork to take on a connected city.",image:"https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=85",official:"https://www.ubisoft.com/"},
 {id:"minecraft",title:"Minecraft",category:"Action",platform:"PC · Console · Android",tag:"SANDBOX",year:"2011",desc:"Build, craft and explore your own world, alone or with friends.",image:"https://images.unsplash.com/photo-1607513746994-51f730a44832?auto=format&fit=crop&w=900&q=85",official:"https://www.minecraft.net/"},
 {id:"efootball",title:"eFootball",category:"Android",platform:"Android · PC · Console",tag:"SPORTS",year:"2024",desc:"Build your squad and take the pitch in Konami's free-to-play football game.",image:"https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=85",official:"https://www.konami.com/efootball/"},
 {id:"brawlhalla",title:"Brawlhalla",category:"Indie",platform:"PC · Console · Android",tag:"FREE TO PLAY",year:"2017",desc:"A free platform fighter with online matches and a colourful cast of legends.",image:"https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=85",official:"https://www.brawlhalla.com/"},
 {id:"super-tux-kart",title:"SuperTuxKart",category:"Indie",platform:"PC · Linux · Android",tag:"OPEN SOURCE",year:"2007",desc:"A fun open-source kart racing game with tracks, characters and power-ups.",image:"https://images.unsplash.com/photo-155074e8d4a8a?auto=format&fit=crop&w=900&q=85",official:"https://supertuxkart.net/"},
 {id:"asphalt-legends",title:"Asphalt Legends",category:"Android",platform:"Android · PC · Console",tag:"RACING",year:"2018",desc:"Arcade racing with high-speed cars, stunts and competitive events.",image:"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=85",official:"https://asphaltlegends.com/"}
];
const grid=document.getElementById("gamesGrid"), search=document.getElementById("searchInput"), sort=document.getElementById("sortSelect");
const empty=document.getElementById("emptyState"), dialog=document.getElementById("gameDialog"), dialogContent=document.getElementById("dialogContent");
let activeFilter="All", saved=JSON.parse(localStorage.getItem("agv-saved")||"[]"), savedOnly=false;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function render(){
 let list=games.filter(g=>(activeFilter==="All"||g.category===activeFilter)&&(!savedOnly||saved.includes(g.id))&&(`${g.title} ${g.category} ${g.platform} ${g.desc}`.toLowerCase().includes(search.value.toLowerCase())));
 if(sort.value==="az")list.sort((a,b)=>a.title.localeCompare(b.title)); if(sort.value==="za")list.sort((a,b)=>b.title.localeCompare(a.title));
 grid.innerHTML=list.map(g=>`<article class="game-card">
  <div class="game-art"><img src="${g.image}" alt="${esc(g.title)} artwork" loading="lazy" onerror="this.style.display='none';this.parentElement.style.background='linear-gradient(135deg,#252d45,#111521)'"><span class="game-tag">${esc(g.tag)}</span><button class="save-button ${saved.includes(g.id)?"saved":""}" data-save="${g.id}" aria-label="${saved.includes(g.id)?"Remove from":"Add to"} saved games">${saved.includes(g.id)?"♥":"♡"}</button></div>
  <div class="game-info"><div class="game-platform">${esc(g.platform)}</div><h3>${esc(g.title)}</h3><p>${esc(g.desc)}</p><div class="game-meta"><span>${esc(g.category)} · ${esc(g.year)}</span><button class="details-button" data-details="${g.id}">View details ↗</button></div></div>
 </article>`).join("");
 empty.hidden=list.length!==0; document.getElementById("savedCount").textContent=saved.length; document.getElementById("allCount").textContent=games.length;
 document.querySelectorAll("[data-filter]").forEach(b=>b.classList.toggle("selected",b.dataset.filter===activeFilter));
}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function toggleSave(id){saved=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];localStorage.setItem("agv-saved",JSON.stringify(saved));render();toast(saved.includes(id)?"Added to saved games":"Removed from saved games")}
function openDetails(id){const g=games.find(x=>x.id===id);if(!g)return;dialogContent.innerHTML=`<img class="dialog-cover" src="${g.image}" alt="${esc(g.title)} artwork"><div class="dialog-body"><span class="dialog-label">${esc(g.tag)} · ${esc(g.year)}</span><h2>${esc(g.title)}</h2><p>${esc(g.desc)}</p><p><b>Platforms:</b> ${esc(g.platform)}<br><b>Category:</b> ${esc(g.category)}</p><div class="dialog-actions"><a class="button button-primary" href="${g.official}" target="_blank" rel="noopener noreferrer">Official game website ↗</a><button class="button button-ghost" data-save="${g.id}">${saved.includes(g.id)?"♥ Saved":"♡ Save game"}</button></div></div>`;dialog.showModal()}
grid.addEventListener("click",e=>{const save=e.target.closest("[data-save]"),details=e.target.closest("[data-details]");if(save)toggleSave(save.dataset.save);if(details)openDetails(details.dataset.details)});
dialogContent.addEventListener("click",e=>{const b=e.target.closest("[data-save]");if(b){toggleSave(b.dataset.save);if(dialog.open)openDetails(b.dataset.save)}});
document.getElementById("filterRow").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(b){activeFilter=b.dataset.filter;savedOnly=false;document.getElementById("favoritesNav").classList.remove("is-active");render()}});
document.querySelectorAll(".category-card").forEach(b=>b.addEventListener("click",()=>{activeFilter=b.dataset.category;savedOnly=false;document.getElementById("library").scrollIntoView({behavior:"smooth"});render()}));
search.addEventListener("input",render);sort.addEventListener("change",render);
document.getElementById("favoritesNav").addEventListener("click",()=>{savedOnly=!savedOnly;activeFilter="All";document.getElementById("favoritesNav").classList.toggle("is-active",savedOnly);render();document.getElementById("library").scrollIntoView({behavior:"smooth"});if(savedOnly&&!saved.length)toast("Save a game first to build your list")});
document.getElementById("resetFilters").addEventListener("click",()=>{search.value="";activeFilter="All";savedOnly=false;render()});
document.getElementById("dialogClose").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});
document.getElementById("themeToggle").addEventListener("click",()=>{document.body.classList.toggle("light-mode");localStorage.setItem("agv-light",document.body.classList.contains("light-mode"))});
if(localStorage.getItem("agv-light")==="true")document.body.classList.add("light-mode");
document.getElementById("menuButton").addEventListener("click",()=>document.querySelector(".desktop-nav").classList.toggle("open"));
document.querySelectorAll(".nav-link").forEach(a=>a.addEventListener("click",()=>document.querySelector(".desktop-nav").classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();
render();
