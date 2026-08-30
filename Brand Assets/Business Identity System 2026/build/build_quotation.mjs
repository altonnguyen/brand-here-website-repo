import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { Workbook, SpreadsheetFile } from '@oai/artifact-tool';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, '02 Commercial Templates', 'Brand-Here-Quotation-Concept-3.xlsx');
const QA = path.join(ROOT, 'QA', 'quotation');
const logoDarkBytes = await fs.readFile(path.join(ROOT, 'build', 'logo-raster', 'logo-dark-transparent.png'));
const logoDarkDataUrl = `data:image/png;base64,${Buffer.from(logoDarkBytes).toString('base64')}`;
const C = { carbon:'#2D2926', ivory:'#F3F0E8', red:'#E03C31', line:'#D6D2C4', grey:'#716D68', white:'#FFFFFF', blue:'#DDEBFF' };

const wb = Workbook.create();
const q = wb.worksheets.add('Quotation');
const p = wb.worksheets.add('Price Builder');
const t = wb.worksheets.add('Terms & Instructions');
for (const s of [q,p,t]) s.showGridLines = false;
q.getRange('A1:H34').format.font={name:'Manrope',size:9,color:C.carbon};
p.getRange('A1:G10').format.font={name:'Manrope',size:9,color:C.carbon};
t.getRange('A1:F10').format.font={name:'Manrope',size:9,color:C.carbon};

q.getRange('A1:H1').format={fill:C.carbon,rowHeight:40,verticalAlignment:'center'};
q.getRange('A1:B1').merge(); q.getRange('C1:H1').merge(); q.getRange('C1').values=[['HUMAN JUDGEMENT / BUSINESS IMPACT']];
q.getRange('C1:H1').format={fill:C.carbon,font:{name:'Manrope',size:10,bold:true,color:C.ivory},verticalAlignment:'center'};
q.images.add({dataUrl:logoDarkDataUrl,anchor:{from:{row:0,col:0},extent:{widthPx:190,heightPx:38}}});
q.getRange('A2:H2').merge(); q.getRange('A2').values=[['BÁO GIÁ DỊCH VỤ  ·  COMMERCIAL QUOTATION']];
// Bilingual headline: use the Vietnamese-safe Concept 3 display face.
q.getRange('A2:H2').format={fill:C.ivory,font:{name:'Cormorant Garamond',size:22,color:C.carbon},rowHeight:34};
q.getRange('A3:H3').merge(); q.getRange('A3').values=[['Tư vấn được tách riêng khỏi chi phí chuyên gia và bên thứ ba để bảo đảm minh bạch.']];
q.getRange('A3:H3').format={font:{name:'Manrope',size:9,color:C.grey},rowHeight:22};

const info=[
 ['KHÁCH HÀNG / CLIENT','','[Tên khách hàng]','','NGÀY LẬP / DATE','','2026-08-29',''],
 ['DỰ ÁN / PROJECT','','[Tên dự án]','','HIỆU LỰC / VALIDITY','','30 ngày / days',''],
 ['THỜI GIAN / PERIOD','','[Bắt đầu – kết thúc]','','PHIÊN BẢN / VERSION','','V1',''],
 ['NGƯỜI CHUẨN BỊ / PREPARED BY','','Alton Nguyen · Brand Here','','THAM CHIẾU / REF.','','[BH-2026-000]','']
];
q.getRange('A5:H8').values=info;
['A5:B8','E5:F8'].forEach(a=>q.getRange(a).format={fill:C.ivory,font:{name:'Manrope',size:8,bold:true,color:C.red}});
['C5:D8','G5:H8'].forEach(a=>q.getRange(a).format={fill:C.blue,font:{name:'Manrope',size:9,color:C.carbon}});
q.getRange('A5:H8').format.borders={preset:'inside',style:'thin',color:C.line};

q.getRange('A10:H10').values=[['NO.','HẠNG MỤC / ACTIVITY','PHẠM VI / SCOPE','ĐƠN VỊ / UNIT','ĐƠN GIÁ / UNIT FEE','SL / QTY','THÀNH TIỀN / TOTAL','GHI CHÚ / NOTES']];
q.getRange('A10:H10').format={fill:C.carbon,font:{name:'Manrope',size:8,bold:true,color:C.ivory},wrapText:true,rowHeight:34,verticalAlignment:'center'};

const rows=[
 ['A','BRAND HERE CONSULTING FEE','','','','','',''],
 [1,'Discovery & decision framing','Interviews, context review and decision brief','Package',25000000,1,null,''],
 [2,'Strategic direction','Recommended choices, roadmap and leadership alignment','Package',45000000,1,null,''],
 ['', 'SUBTOTAL — CONSULTING','','','','',null,''],
 ['B','EXPERT ADVISORY FEE','','','','','',''],
 [3,'Specialist advisory','Governance, finance, technology or commerce expert','Day',12000000,2,null,'Subject to approved scope'],
 ['', 'SUBTOTAL — EXPERTS','','','','',null,''],
 ['C','THIRD-PARTY COST','','','','','',''],
 [4,'Production / technology partner','Approved external production, media or technology','Package',30000000,1,null,'Quoted transparently'],
 ['', 'SUBTOTAL — THIRD PARTY','','','','',null,'']
];
q.getRange('A11:H20').values=rows;
for (const r of [11,15,18]) q.getRange(`A${r}:H${r}`).format={fill:C.ivory,font:{name:'Manrope',size:8,bold:true,color:C.red},rowHeight:24};
q.getRange('G12').formulas=[['=E12*F12']]; q.getRange('G13').formulas=[['=E13*F13']]; q.getRange('G16').formulas=[['=E16*F16']]; q.getRange('G19').formulas=[['=E19*F19']];
q.getRange('G14').formulas=[['=SUM(G12:G13)']]; q.getRange('G17').formulas=[['=SUM(G16:G16)']]; q.getRange('G20').formulas=[['=SUM(G19:G19)']];
for (const r of [14,17,20]) q.getRange(`A${r}:H${r}`).format={fill:'#E8E4DA',font:{name:'Manrope',size:9,bold:true,color:C.carbon},borders:{bottom:{style:'thin',color:C.line}}};

q.getRange('A22:F22').merge(); q.getRange('A22').values=[['TỔNG PHÍ TRƯỚC THUẾ / FEE BEFORE VAT']]; q.getRange('G22').formulas=[['=G14+G17+G20']];
q.getRange('A23:F23').merge(); q.getRange('A23').values=[['THUẾ GTGT / VAT']]; q.getRange('F23').values=[[0.1]]; q.getRange('G23').formulas=[['=G22*F23']];
q.getRange('A24:F24').merge(); q.getRange('A24').values=[['TỔNG THANH TOÁN / TOTAL PAYABLE']]; q.getRange('G24').formulas=[['=G22+G23']];
q.getRange('A22:G23').format={fill:C.ivory,font:{name:'Manrope',size:9,color:C.carbon}};
q.getRange('A24:G24').format={fill:C.red,font:{name:'Manrope',size:11,bold:true,color:C.white},rowHeight:28};
q.getRange('F23').format.numberFormat='0%'; q.getRange('E12:E24').format.numberFormat='#,##0 "VND"'; q.getRange('G12:G24').format.numberFormat='#,##0 "VND"'; q.getRange('F12:F20').format.numberFormat='0';

q.getRange('A26:H26').merge(); q.getRange('A26').values=[['LỊCH THANH TOÁN / PAYMENT SCHEDULE']]; q.getRange('A26:H26').format={fill:C.carbon,font:{name:'Manrope',size:8,bold:true,color:C.ivory},rowHeight:24};
q.getRange('A27:H30').values=[
 ['ĐỢT','ĐIỀU KIỆN / CONDITION','','','','TỶ LỆ','SỐ TIỀN',''],
 [1,'Khi ký hợp đồng / Upon signing','','','','50%',null,''],
 [2,'Khi duyệt hướng đi / Direction approval','','','','30%',null,''],
 [3,'Sau nghiệm thu / Upon acceptance','','','','20%',null,'']
];
q.getRange('G28').formulas=[['=$G$24*0.5']]; q.getRange('G29').formulas=[['=$G$24*0.3']]; q.getRange('G30').formulas=[['=$G$24*0.2']]; q.getRange('G28:G30').format.numberFormat='#,##0 "VND"';
q.getRange('A27:H30').format={font:{name:'Manrope',size:9,color:C.carbon},borders:{preset:'inside',style:'thin',color:C.line}};
q.getRange('A27:H27').format={fill:C.ivory,font:{name:'Manrope',size:8,bold:true,color:C.red}};
q.getRange('A32:H34').merge(); q.getRange('A32').values=[['Ghi chú / Notes\n• Báo giá có hiệu lực 30 ngày.\n• Phí tư vấn Brand Here, phí chuyên gia và chi phí bên thứ ba được trình bày riêng.\n• Mọi phát sinh ngoài phạm vi phải được phê duyệt trước bằng văn bản.\n• Quyền sử dụng, dữ liệu cá nhân và việc dùng AI tạo sinh được thống nhất trước khi triển khai.']];
q.getRange('A32:H34').format={fill:C.ivory,font:{name:'Manrope',size:8,color:C.grey},wrapText:true,verticalAlignment:'top',rowHeight:24};

const widths=[6,25,42,12,18,8,21,25]; widths.forEach((w,i)=>q.getRangeByIndexes(0,i,34,1).format.columnWidth=w);
q.getRange('A10:H34').format.wrapText=true; q.freezePanes.freezeRows(10);

p.getRange('A1:G1').merge(); p.getRange('A1').values=[['PRICE BUILDER / INTERNAL WORKING SHEET']]; p.getRange('A1:G1').format={fill:C.carbon,font:{name:'Cormorant Garamond',size:20,color:C.ivory},rowHeight:34};
p.getRange('A3:G3').values=[['SERVICE LAYER','ROLE / RESOURCE','DAYS / UNITS','COST BASIS','MARK-UP','CLIENT FEE','NOTES']];
p.getRange('A3:G3').format={fill:C.red,font:{name:'Manrope',size:8,bold:true,color:C.white},rowHeight:30};
p.getRange('A4:G8').values=[
 ['Consulting','Strategic lead',5,8000000,0.35,null,'Brand Here accountable lead'],
 ['Consulting','Research / synthesis',4,4500000,0.35,null,''],
 ['Expert','Specialist advisor',2,9000000,0.2,null,'Approved separately'],
 ['Third party','Production partner',1,30000000,0.15,null,'Pass-through with agreed management'],
 ['Third party','Technology partner',1,25000000,0.15,null,'']
];
p.getRange('F4').formulas=[['=C4*D4*(1+E4)']]; p.getRange('F4:F8').fillDown();
p.getRange('D4:F8').format.numberFormat='#,##0 "VND"'; p.getRange('E4:E8').format.numberFormat='0%'; p.getRange('C4:E8').format.fill=C.blue;
p.getRange('A10:E10').merge(); p.getRange('A10').values=[['TOTAL BUILT FEE']]; p.getRange('F10').formulas=[['=SUM(F4:F8)']]; p.getRange('A10:F10').format={fill:C.carbon,font:{name:'Manrope',size:10,bold:true,color:C.ivory}}; p.getRange('F10').format.numberFormat='#,##0 "VND"';
[18,26,14,18,12,20,28].forEach((w,i)=>p.getRangeByIndexes(0,i,12,1).format.columnWidth=w); p.freezePanes.freezeRows(3);

t.getRange('A1:F1').merge(); t.getRange('A1').values=[['HOW TO USE THIS QUOTATION']]; t.getRange('A1:F1').format={fill:C.carbon,font:{name:'Cormorant Garamond',size:20,color:C.ivory},rowHeight:34};
t.getRange('A3:F10').values=[
 ['01','Blue cells','Editable client, project, rate and quantity inputs','','',''],
 ['02','Formula cells','Do not overwrite line totals, subtotals, VAT or payment schedule formulas','','',''],
 ['03','Consulting fee','Brand Here strategy, direction and accountable lead','','',''],
 ['04','Expert fee','Specialist advisory used only where it materially strengthens the decision','','',''],
 ['05','Third-party cost','Production, technology, media and other approved external suppliers','','',''],
 ['06','Scope control','Quote changes before work begins; never hide them inside delivery','','',''],
 ['07','Responsible AI','Confirm data handling, permissions, usage rights and generative-AI workflow','','',''],
 ['08','Commercial clarity','Attach the matching Proposal / Statement of Work','','','']
];
t.getRange('A3:A10').format={fill:C.red,font:{name:'Manrope',size:9,bold:true,color:C.white}}; t.getRange('B3:B10').format={fill:C.ivory,font:{name:'Manrope',size:10,bold:true,color:C.carbon}}; t.getRange('C3:F10').format={font:{name:'Manrope',size:9,color:C.grey},wrapText:true};
[7,18,42,10,10,10].forEach((w,i)=>t.getRangeByIndexes(0,i,12,1).format.columnWidth=w);

await fs.mkdir(QA,{recursive:true});
for (const name of ['Quotation','Price Builder','Terms & Instructions']) {
  const blob=await wb.render({sheetName:name,autoCrop:'all',scale:1,format:'png'});
  await fs.writeFile(`${QA}/${name.replaceAll(' ','-')}.png`,new Uint8Array(await blob.arrayBuffer()));
}
console.log((await wb.inspect({kind:'region',sheetId:'Quotation',range:'A1:H34',maxChars:5000})).ndjson);
console.log((await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A',options:{useRegex:true,maxResults:100},summary:'formula scan'})).ndjson);
const out=await SpreadsheetFile.exportXlsx(wb); await out.save(OUT);
