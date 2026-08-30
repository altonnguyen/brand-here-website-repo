import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Presentation, PresentationFile } from '@oai/artifact-tool';

const HERE=path.dirname(fileURLToPath(import.meta.url));
const ROOT=path.resolve(HERE,'../../../');
const SYS=path.resolve(HERE,'..');
const OUT=path.join(SYS,'03 Credentials','Brand-Here-Credentials-Concept-3-2026.pptx');
const QA=path.join(SYS,'QA','credentials-artifact');
const LOGO_LIGHT=path.join(SYS,'build','logo-raster','logo-light.png');
const LOGO_DARK=path.join(SYS,'build','logo-raster','logo-dark-transparent.png');
const C={carbon:'#2D2926',ivory:'#F3F0E8',red:'#E03C31',stone:'#D6D2C4',grey:'#8D8882',white:'#FFFFFF'};
const W=1280,H=720;
const pres=Presentation.create({slideSize:{width:W,height:H}});

function rect(slide,x,y,w,h,fill,line='none'){return slide.shapes.add({geometry:'rect',position:{left:x,top:y,width:w,height:h},fill,line:{style:'solid',fill:line,width:line==='none'?0:1}})}
function text(slide,txt,x,y,w,h,size=24,color=C.carbon,font='Manrope',opts={}){
 const s=slide.shapes.add({geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{style:'solid',fill:'none',width:0}}); s.text=txt; s.text.style={fontSize:size,color,typeface:font,bold:opts.bold??false,italic:opts.italic??false,alignment:opts.align??'left',verticalAlignment:opts.valign??'middle'}; return s;
}
function image(slide,p,x,y,w,h,alt,fit='cover'){
 const ext=path.extname(p).toLowerCase(); const contentType=ext==='.png'?'image/png':ext==='.webp'?'image/webp':'image/jpeg';
 return slide.images.add({blob:new Uint8Array(fsSync.readFileSync(p)),contentType,alt,fit,position:{left:x,top:y,width:w,height:h}})
}
function logo(slide,x=58,y=28,onDark=false){image(slide,onDark?LOGO_DARK:LOGO_LIGHT,x,y,168,48,'Brand Here approved wordmark','contain');}
function eyebrow(slide,txt,x,y,onDark=false){text(slide,txt.toUpperCase(),x,y,520,25,11,onDark?C.red:C.red,'Manrope',{bold:true});}
function footer(slide,n,onDark=false){text(slide,String(n).padStart(2,'0'),1190,675,40,18,9,onDark?C.grey:C.grey,'Manrope');}
function notes(slide,urls){slide.speakerNotes.textFrame.setText(`[Sources]\n${urls.map(u=>'- '+u).join('\n')}`);}
function newSlide(bg=C.ivory){const s=pres.slides.add();s.background.fill=bg;return s;}

// 01 Cover
{
 const s=newSlide(C.carbon); image(s,path.join(ROOT,'images/concept-3-human-editorial.jpg'),0,0,W,H,'Human silhouette in expressive red light'); rect(s,0,0,W,H,'#2D2926AA'); logo(s,58,34,true); eyebrow(s,'Credentials / 2026',58,112,true); text(s,'Human judgement\nfor an AI-shaped world.',58,160,760,260,70,C.ivory,'Cormorant Garamond'); text(s,'STRATEGY · AI · LEADERSHIP · COMMERCE',62,590,520,28,11,C.ivory,'Manrope'); text(s,'From decision to implementation.',62,627,430,34,19,C.ivory,'Manrope'); footer(s,1,true); notes(s,['https://brandhere.co/','Brand Here owned image asset']);
}
// 02 POV
{
 const s=newSlide(); logo(s); eyebrow(s,'Point of view / 01',58,112); text(s,'Intelligence\nis abundant.',58,158,610,190,68,C.carbon,'Cormorant Garamond'); text(s,'Judgement\nis human.',650,290,560,190,68,C.red,'Cormorant Garamond'); text(s,'AI helps us see more and test faster. Someone still has to choose what matters—and own the consequences.',58,570,760,64,20,C.carbon,'Manrope'); footer(s,2); notes(s,['https://brandhere.co/']);
}
// 03 track record
{
 const s=newSlide(C.carbon); logo(s,58,34,true); eyebrow(s,'Proof before promise',58,112,true); text(s,'Built in the real world.',58,154,760,80,55,C.ivory,'Cormorant Garamond'); const stats=[['80+','PROJECTS DELIVERED'],['50+','CORPORATE CLIENTS'],['30+','BRANDS MANAGED'],['4','CONSECUTIVE YEARS ABOVE PLAN']]; stats.forEach((v,i)=>{const x=58+i*300; text(s,v[0],x,330,250,100,66,C.red,'Cormorant Garamond'); text(s,v[1],x,442,220,48,10,C.ivory,'Manrope'); if(i<3)rect(s,x+250,320,1,190,'#FFFFFF33');}); footer(s,3,true); notes(s,['https://brandhere.co/','https://brandhere.co/about.html']);
}
// 04 who we are
{
 const s=newSlide(); logo(s); eyebrow(s,'The company',58,112); text(s,'Consulting-led.\nExpert-backed.\nPartner-enabled.',58,154,600,260,59,C.carbon,'Cormorant Garamond'); image(s,path.join(ROOT,'Brand Assets/Social Media/Personal Editorial Campaign 2026/01-more-than-an-agency-base.png'),790,80,420,540,'Alton Nguyen editorial portrait'); text(s,'Brand Here defines the problem, leads the strategic direction and assembles the specialist capabilities each assignment actually needs.',58,510,620,100,19,C.carbon,'Manrope'); footer(s,4); notes(s,['https://brandhere.co/about.html','Brand Here owned portrait']);
}
// 05 service overview
{
 const s=newSlide(C.carbon); logo(s,58,34,true); eyebrow(s,'Four ways to move',58,112,true); text(s,'Start with the decision.\nNot the deliverable.',58,150,650,130,53,C.ivory,'Cormorant Garamond'); const services=[['01','STRATEGY CONSULTING','Choose where to play—and what not to do.'],['02','AI TRANSFORMATION','Turn experiments into useful systems.'],['03','EXECUTIVE BRANDING','Build a leadership narrative people can trust.'],['04','COMMERCE & MARKET EXPANSION','Test the economics before scaling.']]; services.forEach((v,i)=>{const y=330+i*76; rect(s,58,y,1160,1,'#FFFFFF38'); text(s,v[0],58,y+12,45,34,11,C.red,'Manrope'); text(s,v[1],115,y+7,390,40,20,C.ivory,'Manrope',{bold:true}); text(s,v[2],560,y+7,610,40,16,C.grey,'Manrope');}); footer(s,5,true); notes(s,['https://brandhere.co/what-we-do.html']);
}
function serviceSlide(n,label,title,body,outcomes){
 const s=newSlide();logo(s);eyebrow(s,`${label} / ${String(n-5).padStart(2,'0')}`,58,112);text(s,title,58,150,650,150,58,C.carbon,'Cormorant Garamond');text(s,body,58,335,570,95,19,C.carbon,'Manrope');rect(s,735,112,2,500,C.red);text(s,'TYPICAL OUTCOMES',790,150,330,30,11,C.red,'Manrope',{bold:true});outcomes.forEach((o,i)=>{text(s,`0${i+1}`,790,215+i*90,40,30,11,C.red,'Manrope');text(s,o,850,205+i*90,330,55,21,C.carbon,'Manrope',{bold:true});});footer(s,n);notes(s,['https://brandhere.co/what-we-do.html']);
}
serviceSlide(6,'Strategy consulting','Make the choice\ncoherent.','We clarify the market, the strategic edge and the decisions that must align before execution begins.',['Positioning and strategic choice','Go-to-market direction','Decision roadmap']);
serviceSlide(7,'AI transformation','Useful systems.\nHuman owners.','We connect AI possibilities to a measurable business consequence, responsible data handling and an accountable operating owner.',['AI readiness and use-case priorities','Decision-support tools','Adoption roadmap and governance']);
serviceSlide(8,'Executive branding','Leadership made\ncredible.','We turn expertise, point of view and public presence into a coherent leadership brand—not a manufactured persona.',['Leadership positioning','Narrative and content system','Visibility and reputation plan']);
serviceSlide(9,'Commerce & expansion','Test before\nyou scale.','We connect channel choices, unit economics and operating reality before committing to growth.',['E-commerce strategy','Channel and market validation','Commercial operating roadmap']);

// 10 model
{
 const s=newSlide(C.carbon);logo(s,58,34,true);eyebrow(s,'How we work',58,112,true);text(s,'One direction.\nThe right team.',58,150,600,140,57,C.ivory,'Cormorant Garamond');const cols=[['01','BRAND HERE','Strategic lead','Problem definition · direction · quality'],['02','EXPERTS','Decision depth','Governance · finance · technology · commerce'],['03','PARTNERS','Delivery capability','AI · production · CGI/VFX · market execution']];cols.forEach((v,i)=>{const x=58+i*395;rect(s,x,355,360,240,i===0?C.red:'#3A3532');text(s,v[0],x+24,375,40,25,11,C.ivory,'Manrope');text(s,v[1],x+24,420,300,35,24,C.ivory,'Manrope',{bold:true});text(s,v[2],x+24,464,300,30,18,C.ivory,'Cormorant Garamond');text(s,v[3],x+24,515,305,48,13,i===0?C.ivory:C.grey,'Manrope');});footer(s,10,true);notes(s,['https://brandhere.co/partners.html','https://brandhere.co/experts.html']);
}
// 11 experts
{
 const s=newSlide();logo(s);eyebrow(s,'Expert network',58,112);text(s,'Experience has a face.',58,145,700,70,52,C.carbon,'Cormorant Garamond');const experts=[['la-pham-portrait.jpg','La Pham','TECHNOLOGY / SYSTEMS'],['kim-khanh-cao-portrait.jpg','Khanh Cao','COMMERCE / GROWTH'],['vu-nguyen-portrait.jpg','Vu Dinh','GOVERNANCE / COMPLIANCE'],['nam-tran-portrait.jpg','Nam Tran','FINANCE / VALUE'],['dung-nguyen-portrait.png','Dung Dinh','TECHNOLOGY / PLATFORMS']];experts.forEach((e,i)=>{const x=58+i*232;image(s,path.join(ROOT,'images',e[0]),x,255,205,285,e[1]);text(s,e[1],x,553,205,27,18,C.carbon,'Manrope',{bold:true});text(s,e[2],x,586,210,26,8,C.red,'Manrope');});footer(s,11);notes(s,['https://brandhere.co/experts.html','Brand Here expert portraits']);
}
// 12 case AIA
{
 const s=newSlide(C.carbon);image(s,path.join(ROOT,'images/case-aia.jpg'),650,0,630,H,'AIA corporate communications case study');rect(s,620,0,220,H,'#2D2926AA');logo(s,58,34,true);eyebrow(s,'Selected work / AIA',58,112,true);text(s,'Six days.\nFull press\nattendance.',58,160,540,240,63,C.ivory,'Cormorant Garamond');text(s,'100%',58,475,220,78,58,C.red,'Cormorant Garamond');text(s,'INVITED MEDIA ATTENDANCE',58,560,330,25,10,C.ivory,'Manrope');footer(s,12,true);notes(s,['https://brandhere.co/work.html','Brand Here owned case-study image']);
}
// 13 cases
{
 const s=newSlide();logo(s);eyebrow(s,'Selected work',58,112);text(s,'Real conditions.\nVisible outcomes.',58,150,650,120,52,C.carbon,'Cormorant Garamond');image(s,path.join(ROOT,'images/case-roche.jpg'),58,330,500,260,'Roche employer brand film');image(s,path.join(ROOT,'images/case-dragoncapital.jpg'),620,330,590,260,'Dragon Capital milestone experience');text(s,'ROCHE  /  REAL EMPLOYEE VOICES',58,606,460,25,10,C.red,'Manrope');text(s,'DRAGON CAPITAL  /  A DECADE MADE TANGIBLE',620,606,560,25,10,C.red,'Manrope');footer(s,13);notes(s,['https://brandhere.co/work.html','Brand Here owned case-study images']);
}
// 14 partners
{
 const s=newSlide(C.carbon);logo(s,58,34,true);eyebrow(s,'Partner ecosystem',58,112,true);text(s,'Specialist delivery,\nwithout losing direction.',58,150,760,130,53,C.ivory,'Cormorant Garamond');const names=[['NYMPHEA AI AGENCY','AI agents · automation · integration'],['POPCORN MEDIA','Full-service production'],['HYPER CRICKET','CGI · VFX · post-production'],['WANDERSTAR FILM.ART','Film · visual art']];names.forEach((v,i)=>{const x=58+(i%2)*580,y=350+Math.floor(i/2)*115;rect(s,x,y,520,1,'#FFFFFF38');text(s,v[0],x,y+18,460,30,19,C.ivory,'Manrope',{bold:true});text(s,v[1],x,y+57,470,24,10,C.red,'Manrope');});footer(s,14,true);notes(s,['https://brandhere.co/partners.html','https://www.nympheaaiagency.com/','https://popcornmedia.vn/','https://hypercricket.vn/']);
}
// 15 close
{
 const s=newSlide(C.red);logo(s,58,34,true);eyebrow(s,'The next decision',58,112,true);text(s,'Bring us one\nreal question.',58,150,760,160,72,C.ivory,'Cormorant Garamond');text(s,'Senior judgement. A direction you can act on.',58,395,620,48,22,C.carbon,'Manrope',{bold:true});text(s,'brandhere.co',58,575,300,30,20,C.ivory,'Manrope');text(s,'tuan.nguyen@brandhere.vn\n+84 907 255 734',58,615,350,52,13,C.carbon,'Manrope');text(s,'INSIGHT TO IMPACT',930,610,260,26,11,C.ivory,'Manrope',{bold:true});footer(s,15,true);notes(s,['https://brandhere.co/contact.html']);
}

await fs.mkdir(QA,{recursive:true});
for (const [i,s] of pres.slides.items.entries()){
 const blob=await pres.export({slide:s,format:'png',scale:1});await fs.writeFile(path.join(QA,`slide-${String(i+1).padStart(2,'0')}.png`),new Uint8Array(await blob.arrayBuffer()));
 const layout=await s.export({format:'layout'});await fs.writeFile(path.join(QA,`slide-${String(i+1).padStart(2,'0')}.layout.json`),await layout.text());
}
const montage=await pres.export({format:'webp',montage:true,scale:1});await fs.writeFile(path.join(QA,'montage.webp'),new Uint8Array(await montage.arrayBuffer()));
const snap=await pres.inspect({kind:'slide,textbox,image,shape',maxChars:12000});await fs.writeFile(path.join(QA,'inspect.ndjson'),snap.ndjson);
const pptx=await PresentationFile.exportPptx(pres);await pptx.save(OUT);
