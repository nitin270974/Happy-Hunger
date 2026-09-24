document.addEventListener("DOMContentLoaded",()=>{
 const year=document.querySelectorAll("#year"); year.forEach(e=>e.textContent=new Date().getFullYear());
 const menu=document.getElementById("menuBtn"),nav=document.getElementById("nav");
 if(menu) menu.onclick=()=>nav.classList.toggle("open");

 const daily=document.getElementById("dailyShlok");
 if(daily){
   const s=DHARMA_DATA.shloks[new Date().getDate()%DHARMA_DATA.shloks.length];
   daily.innerHTML=shlokHTML(s,true);
   document.getElementById("allShloks").innerHTML=DHARMA_DATA.shloks.map(s=>shlokHTML(s,false)).join("");
 }
 const ml=document.getElementById("mantraList");
 if(ml) ml.innerHTML=DHARMA_DATA.mantras.map(m=>`<article class="item"><span class="tag">${m.tag}</span><h2>${m.title}</h2><div class="sanskrit">${m.text}</div><p>${m.description}</p></article>`).join("");
 const pl=document.getElementById("poojaList");
 if(pl) pl.innerHTML=DHARMA_DATA.poojas.map(p=>`<article class="item"><span class="tag">${p.tag}</span><h2>${p.title}</h2><p>${p.intro}</p><ol class="steps">${p.steps.map(x=>`<li>${x}</li>`).join("")}</ol></article>`).join("");
 const fl=document.getElementById("festivalList");
 if(fl) fl.innerHTML=DHARMA_DATA.festivals.map(f=>`<article class="item"><span class="tag">${f.month}</span><h2>${f.title}</h2><p>${f.description}</p></article>`).join("");
 setupSearch(); setupCalendar();
});
function shlokHTML(s,featured){return `<article class="item ${featured?"featured":""}"><span class="tag">${featured?"Today's Shlok":"Shlok"}</span><h2>${s.title}</h2><div class="sanskrit">${s.sanskrit}</div><p><strong>Transliteration:</strong> ${s.trans}</p><p class="meaning"><strong>Meaning:</strong> ${s.meaning}</p></article>`}
function setupSearch(){
 const input=document.getElementById("searchInput"),btn=document.getElementById("searchBtn"),out=document.getElementById("searchResults"); if(!input)return;
 const all=[
  ...DHARMA_DATA.shloks.map(x=>({type:"Shlok",title:x.title,text:x.meaning,url:"shlok.html"})),
  ...DHARMA_DATA.mantras.map(x=>({type:"Mantra",title:x.title,text:x.description,url:"mantra.html"})),
  ...DHARMA_DATA.poojas.map(x=>({type:"Pooja",title:x.title,text:x.intro,url:"pooja.html"})),
  ...DHARMA_DATA.festivals.map(x=>({type:"Festival",title:x.title,text:x.description,url:"festivals.html"}))
 ];
 function search(){const q=input.value.trim().toLowerCase(); if(!q){out.innerHTML="";return} const r=all.filter(x=>(x.title+" "+x.text+" "+x.type).toLowerCase().includes(q)); out.innerHTML=r.length?r.map(x=>`<a class="result" href="${x.url}"><small>${x.type}</small><br><strong>${x.title}</strong><br><span>${x.text}</span></a>`).join(""):`<p>No results found. Try another word.</p>`}
 btn.onclick=search; input.addEventListener("keydown",e=>{if(e.key==="Enter")search()});
}
let calDate=new Date();
function setupCalendar(){
 const grid=document.getElementById("calendarGrid"); if(!grid)return;
 const title=document.getElementById("monthTitle");
 function render(){
  const y=calDate.getFullYear(),m=calDate.getMonth(),name=new Intl.DateTimeFormat("en-IN",{month:"long",year:"numeric"}).format(calDate);
  title.textContent=name; grid.innerHTML=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=>`<div class="cal-head">${d}</div>`).join("");
  const first=new Date(y,m,1).getDay(),days=new Date(y,m+1,0).getDate();
  for(let i=0;i<first;i++)grid.innerHTML+=`<div class="cal-day empty"></div>`;
  for(let d=1;d<=days;d++){const iso=`${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`,ev=DHARMA_DATA.events.filter(e=>e.date===iso);grid.innerHTML+=`<div class="cal-day"><div class="date">${d}</div>${ev.map(e=>`<div class="cal-event">${e.name}</div>`).join("")}</div>`}
 }
 document.getElementById("prevMonth").onclick=()=>{calDate.setMonth(calDate.getMonth()-1);render()};
 document.getElementById("nextMonth").onclick=()=>{calDate.setMonth(calDate.getMonth()+1);render()}; render();
}