/* Bộ tính học phí, miễn giảm dùng chung – Trường Cao đẳng Kỹ thuật - Công nghệ Vĩnh Phúc. Tạo tự động từ Excel (tinh_tien.py), không sửa tay. */
var TT=(function(){"use strict";
const M=[["Công nghệ ô tô","co","kt",{"cd":100,"clc":1,"y":3},{"lt":120},{"tc":195}],["Công nghệ kỹ thuật cơ khí","co","kt",{"cd":25,"clc":1,"y":3},{"lt":70},null],["Cắt gọt kim loại","co","kt",{"cd":95,"clc":1,"y":3},{"lt":70},{"tc":90}],["Cơ khí chế tạo","co","kt",null,null,{"tc":100}],["Hàn","co","kt",null,null,{"tc":30}],["Cơ điện tử","dien","kt",{"cd":35,"y":2},null,{"tc":70},{"thn":1}],["Công nghệ kỹ thuật điện, điện tử","dien","kt",{"cd":35,"clc":1,"y":3},{"lt":50},{"tc":100}],["Công nghệ kỹ thuật điều khiển và tự động hóa","dien","kt",{"cd":35,"clc":1,"y":3},null,null],["Điện công nghiệp","dien","kt",{"cd":85,"clc":1,"y":3},{"lt":70},{"tc":125},{"thn":1}],["Điện công nghiệp và dân dụng","dien","kt",null,null,{"tc":150}],["Điện tử công nghiệp","dien","kt",{"cd":40,"clc":1,"y":3},{"lt":110},{"tc":170}],["Công nghệ vi mạch bán dẫn","dien","kt",{"cd":30,"y":3},null,null],["Kỹ thuật máy lạnh và điều hòa không khí","dien","kt",{"cd":70,"clc":1,"y":3},{"lt":90},{"tc":170}],["Công nghệ cơ khí, sưởi ấm và điều hòa không khí","dien","kt",{"cd":30,"y":2},null,{"tc":70}],["Truyền thông và mạng máy tính","it","kt",{"cd":50,"clc":1,"y":3},{"lt":55},null,{"thn":1}],["Công nghệ thông tin (Ứng dụng phần mềm)","it","kt",{"cd":30,"clc":1,"y":3},{"lt":30},null],["Kỹ thuật sửa chữa, lắp ráp máy tính","it","kt",{"cd":25,"y":3},{"lt":90},{"tc":150}],["Tin học văn phòng","it","kt",null,null,{"tc":190}],["Thương mại điện tử","kd","kd",{"cd":15,"y":2},{"lt":35},{"tc":70}],["Marketing thương mại","kd","kd",{"cd":15,"y":2},{"lt":25},{"tc":70}],["Logistics","kd","kd",{"cd":15,"y":2},null,{"tc":15}],["Kế toán","kd","kd",{"cd":70,"y":3},{"lt":50},null],["Kế toán doanh nghiệp","kd","kd",{"cd":70,"y":3},{"lt":50},{"tc":70}],["Quản trị kinh doanh","kd","kd",{"cd":80,"y":2},null,null],["Quản trị khách sạn","dv","dv",{"cd":15,"y":2},null,null,{"thn":1}],["Kỹ thuật chế biến món ăn","dv","dv",{"cd":30,"y":3},{"lt":25},{"tc":65}],["Chăm sóc sắc đẹp","dv","dv",null,null,{"tc":100}],["May thời trang","dv","sx",{"cd":15,"y":2},{"lt":25},{"tc":70}],["Dịch vụ thú y","ny","ny",{"cd":15,"clc":1,"y":3},{"lt":15},null],["Thú y","ny","ny",{"cd":20,"y":2},null,null],["Chăn nuôi – thú y","ny","ny",null,null,{"tc":36}],["Tiếng Trung Quốc","nn","kd",{"cd":70,"y":3},null,{"tc":78}]],FEE={"cd":{"kd":1500000,"ny":1500000,"dv":1550000,"kt":1600000,"sx":1600000,"clc":1800000},"tc":{"kd":1400000,"ny":1400000,"dv":1450000,"kt":1500000,"sx":1500000}},G70={"cd":["Công nghệ ô tô","Công nghệ kỹ thuật cơ khí","Cắt gọt kim loại","Công nghệ kỹ thuật điện, điện tử","Điện công nghiệp","Kỹ thuật máy lạnh và điều hòa không khí","Kỹ thuật chế biến món ăn","May thời trang","Dịch vụ thú y"],"tc":["Công nghệ ô tô","Cắt gọt kim loại","Hàn","Công nghệ kỹ thuật điện, điện tử","Điện công nghiệp","Điện công nghiệp và dân dụng","Kỹ thuật máy lạnh và điều hòa không khí","Kỹ thuật chế biến món ăn","May thời trang","Chăn nuôi – thú y"]},N36={"cd":["Công nghệ ô tô","Công nghệ kỹ thuật cơ khí","Cắt gọt kim loại","Công nghệ kỹ thuật điện, điện tử","Công nghệ kỹ thuật điều khiển và tự động hóa","Điện công nghiệp","Điện tử công nghiệp","Công nghệ vi mạch bán dẫn","Công nghệ thông tin (Ứng dụng phần mềm)","Thương mại điện tử","Logistics","Quản trị khách sạn"],"tc":["Công nghệ ô tô","Cắt gọt kim loại","Hàn","Công nghệ kỹ thuật điện, điện tử","Điện công nghiệp","Điện công nghiệp và dân dụng","Điện tử công nghiệp","Thương mại điện tử","Logistics","Chăn nuôi – thú y"]},G={"co":"Cơ khí – Ô tô","dien":"Điện – Điện tử – Tự động hóa","it":"Công nghệ thông tin","kd":"Kinh tế – Thương mại","dv":"Dịch vụ – Đời sống","ny":"Nông nghiệp – Thú y","nn":"Ngoại ngữ"},PAGES={"Công nghệ ô tô":"cong-nghe-o-to","Công nghệ kỹ thuật cơ khí":"cong-nghe-ky-thuat-co-khi","Cắt gọt kim loại":"cat-got-kim-loai","Cơ khí chế tạo":"co-khi-che-tao","Hàn":"han","Cơ điện tử":"co-dien-tu","Công nghệ kỹ thuật điện, điện tử":"cong-nghe-ky-thuat-dien-dien-tu","Công nghệ kỹ thuật điều khiển và tự động hóa":"cong-nghe-ky-thuat-dieu-khien-va-tu-dong-hoa","Điện công nghiệp":"dien-cong-nghiep","Điện công nghiệp và dân dụng":"dien-cong-nghiep-va-dan-dung","Điện tử công nghiệp":"dien-tu-cong-nghiep","Công nghệ vi mạch bán dẫn":"cong-nghe-vi-mach-ban-dan","Kỹ thuật máy lạnh và điều hòa không khí":"ky-thuat-may-lanh-va-dieu-hoa-khong-khi","Công nghệ cơ khí, sưởi ấm và điều hòa không khí":"cong-nghe-co-khi-suoi-am-va-dieu-hoa-khong-khi","Truyền thông và mạng máy tính":"truyen-thong-va-mang-may-tinh","Công nghệ thông tin (Ứng dụng phần mềm)":"cong-nghe-thong-tin-ung-dung-phan-mem","Kỹ thuật sửa chữa, lắp ráp máy tính":"ky-thuat-sua-chua-lap-rap-may-tinh","Tin học văn phòng":"tin-hoc-van-phong","Thương mại điện tử":"thuong-mai-dien-tu","Marketing thương mại":"marketing-thuong-mai","Logistics":"logistics","Kế toán":"ke-toan","Kế toán doanh nghiệp":"ke-toan-doanh-nghiep","Quản trị kinh doanh":"quan-tri-kinh-doanh","Quản trị khách sạn":"quan-tri-khach-san","Kỹ thuật chế biến món ăn":"ky-thuat-che-bien-mon-an","Chăm sóc sắc đẹp":"cham-soc-sac-dep","May thời trang":"may-thoi-trang","Dịch vụ thú y":"dich-vu-thu-y","Thú y":"thu-y","Chăn nuôi – thú y":"chan-nuoi-thu-y","Tiếng Trung Quốc":"tieng-trung-quoc"},JOBS={"Công nghệ ô tô":["Sửa chữa động cơ ô tô","Sửa chữa gầm ô tô"],"Công nghệ kỹ thuật cơ khí":["Gia công trên máy tiện, phay vạn năng","Lập trình và gia công trên máy tiện, phay CNC"],"Cắt gọt kim loại":["Trực tiếp gia công trên máy công cụ và máy tiện, phay CNC","Cán bộ kỹ thuật trong phân xưởng, nhà máy cơ khí"],"Cơ khí chế tạo":["Trực tiếp gia công trên máy công cụ và máy tiện, phay CNC","Cán bộ kỹ thuật trong phân xưởng, nhà máy cơ khí"],"Hàn":["Thợ hàn hồ quang tay, MIG/MAG, TIG tại xưởng cơ khí","Hàn kết cấu thép tại công trường, nhà xưởng"],"Cơ điện tử":["Vận hành hệ thống phần cứng, phần mềm điều khiển máy tự động","Kỹ thuật viên dây chuyền sản xuất tự động trong nhà máy"],"Công nghệ kỹ thuật điện, điện tử":["Lắp đặt, sửa chữa thiết bị điện","Lắp ráp, sửa chữa thiết bị điện tử"],"Công nghệ kỹ thuật điều khiển và tự động hóa":["Lắp đặt thiết bị, hệ thống điều khiển và tự động hóa","Vận hành, bảo dưỡng hệ thống tự động hóa"],"Điện công nghiệp":["Kỹ thuật viên điện tại nhà máy chế tạo thiết bị điện","Thi công, lắp đặt hệ thống điện"],"Điện công nghiệp và dân dụng":["Bảo dưỡng, sửa chữa máy biến áp, động cơ điện, máy phát điện","Lắp đặt, vận hành, sửa chữa thiết bị điện dân dụng và gia dụng"],"Điện tử công nghiệp":["Vận hành thiết bị điện, điện tử trong dây chuyền công nghiệp","Lắp đặt, kết nối thiết bị điện tử trong dây chuyền"],"Công nghệ vi mạch bán dẫn":["Kỹ thuật viên sửa chữa, bảo dưỡng tại công ty vi mạch bán dẫn, thiết bị điện tử","Chuyên viên kỹ thuật tại công ty sản xuất, thiết kế vi mạch"],"Kỹ thuật máy lạnh và điều hòa không khí":["Lắp đặt, bảo trì, sửa chữa điều hòa, máy lạnh tại công ty dịch vụ","Vận hành hệ thống lạnh ở siêu thị, nhà máy bia, chế biến sữa, thủy sản"],"Công nghệ cơ khí, sưởi ấm và điều hòa không khí":["Lắp đặt hệ thống điều hòa, thông gió cho nhà xưởng, tòa nhà","Vận hành, bảo trì hệ thống HVAC"],"Truyền thông và mạng máy tính":["Triển khai, cài đặt, bảo trì, khắc phục sự cố hệ thống mạng","Lắp ráp, bảo trì, nâng cấp, sửa chữa phần cứng máy tính"],"Công nghệ thông tin (Ứng dụng phần mềm)":["Tư vấn và chuyển giao phần mềm ứng dụng","Thiết kế phần mềm ứng dụng"],"Kỹ thuật sửa chữa, lắp ráp máy tính":["Cài đặt, cấu hình phần mềm","Lắp ráp, bảo trì máy tính"],"Tin học văn phòng":["Thư ký, nhân viên văn phòng","Quản lý, xử lý, lưu trữ dữ liệu"],"Thương mại điện tử":["Giao dịch thương mại điện tử","Dịch vụ chăm sóc khách hàng"],"Marketing thương mại":["Nhân viên marketing","Digital marketing"],"Logistics":["Hành chính logistics","Giao nhận hàng hóa"],"Kế toán":["Kế toán tại doanh nghiệp sản xuất, thương mại, dịch vụ, xuất nhập khẩu","Kế toán tại đơn vị hành chính sự nghiệp"],"Kế toán doanh nghiệp":["Kế toán tại doanh nghiệp sản xuất","Kế toán tại doanh nghiệp thương mại, dịch vụ"],"Quản trị kinh doanh":["Nhân viên kinh doanh, bán hàng","Nhân viên nhân sự"],"Quản trị khách sạn":["Nhân viên lễ tân, buồng, nhà hàng tại khách sạn","Nhân viên đơn vị kinh doanh du lịch, phục vụ hội nghị"],"Kỹ thuật chế biến món ăn":["Phụ bếp tại khách sạn 1 – 5 sao","Đầu bếp sơ chế, nước dùng, xốt"],"Chăm sóc sắc đẹp":["Kỹ thuật viên tại trung tâm chăm sóc sắc đẹp, spa, salon","Nhân viên công ty mỹ phẩm, dịch vụ thẩm mỹ"],"May thời trang":["May dây chuyền tại công ty may","May đo thời trang"],"Dịch vụ thú y":["Phòng, chống dịch bệnh","Chẩn đoán và điều trị bệnh vật nuôi"],"Thú y":["Phòng, chống dịch bệnh","Chẩn đoán, điều trị bệnh vật nuôi"],"Chăn nuôi – thú y":["Kỹ thuật viên tại cơ quan chuyên môn chăn nuôi, thú y","Nhân viên doanh nghiệp sản xuất con giống"],"Tiếng Trung Quốc":["Phiên dịch, biên dịch tiếng Trung tại doanh nghiệp","Trợ lý, thư ký tiếng Trung"]},P={"LCS":2530000,"HT":800000,"TCD":30,"TTC":20,"THP":10,"TQD":12,"DD":1000000};
const L9="Tốt nghiệp THCS (lớp 9)",L12="Tốt nghiệp THPT (lớp 12)",TCW="Đã có bằng trung cấp",DLW="Người đi làm";
const N36W=["Tốt nghiệp THPT (lớp 12)","Đã có bằng trung cấp","Người đi làm","Bộ đội xuất ngũ","Chưa rõ, cần tư vấn"];
const LV={tc:"Trung cấp",thn:"Trung học nghề",cd:"Cao đẳng",lt:"Liên thông cao đẳng"},LV_IDX={cd:3,lt:4,tc:5,thn:6};
const vnd=n=>Math.round(n).toLocaleString("vi-VN")+"đ";
const qtr=n=>n>=1e6?(Math.round(n/1e5)/10).toString().replace('.',',')+' triệu đồng':vnd(n);
const effWho=A=>A.who==="Phụ huynh"?(A.con||"Phụ huynh"):A.who;
function n36ok(A){return N36W.includes(effWho(A))&&!["thcs","cddh"].includes(A.bang)&&A.pt==="pt"&&A.tuoi!=="tren25"}
function qflags(A){const f=[],d=A.dtoc;if(d==="dtts"||d==="dttsit")f.push("dtts");if(d==="dttsit")f.push("dttsit");if(d==="kinh")f.push("kinh");
  const h=A.hc;(Array.isArray(h)?h:(h?String(h).split(","):[])).forEach(x=>String(x).split(",").forEach(y=>{if(y)f.push(y)}));return [...new Set(f)]}
function qthcs(lv,A){const w=effWho(A);return lv==="tc"&&(w==="Tốt nghiệp THCS (lớp 9)"||w==="Học hết lớp 10, 11 rồi nghỉ"||A.bang==="thcs")}
// NĐ 238 (mức cao nhất), NQ 36 (không cộng khi đã miễn/giảm), QĐ 53 (chi riêng). A.clc: cao đẳng chất lượng cao (mức thu 1.800.000đ)
function qcs(m,lv,A){const f=qflags(A),fk=lv==="lt"?"cd":lv;
  if(lv==="thn")return{thn:1,rate:0,pct:100,why:"miễn học phí – chương trình Trung học nghề",n36:0,qd:0};
  const rate=(A.clc&&fk==="cd")?FEE.cd.clc:FEE[fk][m[2]];
  const vb2=A.bang==="cddh",L=[];
  if(qthcs(lv,A))L.push([100,"miễn học phí – tốt nghiệp THCS học trung cấp (NĐ 238, Điều 15)"]);
  if(f.includes("ncc"))L.push([100,"miễn học phí theo chế độ người có công (NĐ 238, Điều 15)"]);
  if(f.includes("kt"))L.push([100,"miễn học phí – người khuyết tật (NĐ 238, Điều 15)"]);
  if(f.includes("mocoi"))L.push([100,"miễn học phí – mồ côi cả cha lẫn mẹ (NĐ 238, Điều 15)"]);
  if(f.includes("dtts")&&f.includes("ngheo"))L.push([100,"miễn học phí – dân tộc thiểu số hộ nghèo, cận nghèo (NĐ 238, Điều 15)"]);
  if(f.includes("dttsit"))L.push([100,"miễn học phí – dân tộc thiểu số rất ít người ở vùng khó khăn (NĐ 238, Điều 15)"]);
  if(G70[fk].includes(m[0]))L.push([70,"giảm 70% – ngành nặng nhọc, độc hại (NĐ 238, Điều 16)"]);
  if(f.includes("dtts")&&!f.includes("dttsit")&&f.includes("dbkk"))L.push([70,"giảm 70% – dân tộc thiểu số ở thôn, xã đặc biệt khó khăn (NĐ 238, Điều 16)"]);
  if(f.includes("tnld"))L.push([50,"giảm 50% – cha hoặc mẹ bị tai nạn lao động, bệnh nghề nghiệp (NĐ 238, Điều 16)"]);
  L.sort((a,b)=>b[0]-a[0]);const [pct,why]=vb2?[0,"văn bằng 2 không được miễn, giảm học phí"]:(L[0]||[0,""]);
  let qd=0,qdwhy="";
  if(f.includes("dtts")&&(f.includes("ngheo")||f.includes("kt"))){qd=1;qdwhy=f.includes("ngheo")?"dân tộc thiểu số hộ nghèo, cận nghèo":"dân tộc thiểu số khuyết tật"}
  else if(f.includes("ptdtnt")){qd=.8;qdwhy="tốt nghiệp trường phổ thông dân tộc nội trú"}
  else if(!f.includes("dtts")&&f.includes("kt")&&f.includes("dbkk")){qd=.8;qdwhy="người khuyết tật ở vùng đặc biệt khó khăn"}
  else if(!f.includes("dtts")&&f.includes("ngheo")&&f.includes("dbkk")){qd=.6;qdwhy="hộ nghèo, cận nghèo ở vùng đặc biệt khó khăn"}
  const n36ng=!vb2&&!pct&&N36[fk].includes(m[0])&&n36ok(A);
  return{rate,pct,why,vb2,n36:n36ng?1:0,qd,qdwhy}}
// Tổng tiền: học phí được miễn/giảm hoặc hỗ trợ NQ 36 (10 tháng/năm), học bổng nội trú (12 tháng/năm)
function qloi(m,k,A){const c=qcs(m,k,A);if(c.thn)return null;
  const fk=k==="lt"?"cd":k,y=k==="cd"?((m[3]&&m[3].y)||3):k==="lt"?1:(qthcs(k,A)?3:2);
  let hp=0,hpK=0,txt="";
  if(c.pct){hp=c.rate*c.pct/100*P.THP;hpK=hp*y;txt=c.pct===100?"Miễn học phí":"Giảm "+c.pct+"% học phí"}
  else if(c.n36){hp=P.HT*P.THP;hpK=P.HT*Math.min(y*P.THP,fk==="tc"?P.TTC:P.TCD);txt="Hỗ trợ 800.000đ/tháng (NQ 36)"}
  const qn=c.qd&&P.LCS?P.LCS*c.qd*P.TQD:0,qk=qn?qn*y+P.DD:0;
  if(!hpK&&!qk)return null;
  return{c,y,hp,hpK,txt,qn,qk,dong:c.rate*(100-c.pct)/100,lai:c.n36?P.HT:0,nam:hp+qn,khoa:hpK+qk}}

// ===== Lưu tạm câu trả lời (chỉ trong tab trình duyệt của em, tự xóa khi đóng; không gửi đi đâu) =====
const SK="vcet-qa";
function load(){try{return JSON.parse(sessionStorage.getItem(SK)||"{}")||{}}catch(e){return {}}}
function save(A){try{const o=load();Object.keys(A).forEach(k=>{if(A[k]===undefined)delete o[k];else o[k]=A[k]});sessionStorage.setItem(SK,JSON.stringify(o))}catch(e){}}
const find=n=>M.find(m=>m[0]===n);
const ROOT=(function(){try{return document.currentScript.src.replace(/tinh-tien\.js.*$/,"")}catch(e){return "/"}})();
function ev(p,t){try{if(window.goatcounter&&goatcounter.count)goatcounter.count({path:p,title:t,event:true})}catch(e){}}
const BIEN="Tày, Mường, Dao, Nùng, Thái, Mông, Sán Dìu, Sán Chay…";
function lvOpts(A){const w=A.who;if(w===L9)return["tc","thn"];if(w===L12)return["cd","tc"];if(w===TCW)return["lt","cd"];
  if(w===DLW)return({thcs:["tc"],thpt:["cd","tc"],tc:["lt","cd"],cddh:["cd","tc"]})[A.bang]||["cd","tc"];return["cd","tc"]}
const curLv=A=>A.lv||(lvOpts(A).length===1?lvOpts(A)[0]:"");
const coNganh=(m,k)=>!!m[LV_IDX[k]];
function lvTen(k,A){if(k==="lt")return["Liên thông cao đẳng","ngành đã học hoặc ngành gần, 1 năm"];if(k==="cd"&&(A.who===TCW||A.bang==="tc"))return["Cao đẳng ngành khác","2–3 năm"];
  if(k==="cd")return["Cao đẳng","2–3 năm"];if(k==="thn")return["Trung học nghề","3 năm"];return["Trung cấp",A.who===L9||A.bang==="thcs"?"3 năm, có thể học thêm văn hóa THPT":"2 năm"]}
function canPt(A){const k=curLv(A),m=find(A.ng);if(!m||!k||k==="thn")return false;const fk=k==="lt"?"cd":k;
  return N36[fk].includes(m[0])&&N36W.includes(effWho(A))&&!["thcs","cddh"].includes(A.bang)&&A.who!==L9}
const HC1=[["Dân tộc thiểu số, gia đình thuộc hộ nghèo hoặc hộ cận nghèo","ngheo"],["Dân tộc thiểu số, em và cha mẹ thường trú ở thôn đặc biệt khó khăn, xã khu vực III","dbkk"],["Dân tộc thiểu số, là người khuyết tật","kt"]];
const HC2=[["Gia đình thuộc hộ nghèo hoặc hộ cận nghèo","ngheo"],["Gia đình thường trú ở vùng đặc biệt khó khăn, vùng dân tộc thiểu số và miền núi, biên giới, hải đảo","dbkk"],["Người khuyết tật","kt"]];
const HCC=[["Tốt nghiệp trường phổ thông dân tộc nội trú","ptdtnt"],["Mồ côi cả cha lẫn mẹ, không nơi nương tựa","mocoi"],["Người có công hoặc con của người có công với cách mạng","ncc"],["Cha hoặc mẹ bị tai nạn lao động, bệnh nghề nghiệp, đang hưởng trợ cấp","tnld"]];
const isDt=A=>A.dtoc==="dtts"||A.dtoc==="dttsit";
const STEPS=[
 {k:"who",q:"Em là ai?",big:1,a:()=>[["Học sinh lớp 9",L9,"đang học hoặc đã tốt nghiệp THCS"],["Học sinh lớp 12",L12,"đang học hoặc đã tốt nghiệp THPT"],["Đã có bằng trung cấp",TCW,"học lên cao đẳng"],["Người đi làm",DLW,"chọn bằng đã có"]]},
 {k:"bang",q:"Bằng cao nhất anh/chị đã có?",when:A=>A.who===DLW,a:()=>[["Tốt nghiệp THCS","thcs"],["Tốt nghiệp THPT","thpt"],["Trung cấp","tc"],["Cao đẳng, đại học (học văn bằng 2)","cddh"]]},
 {k:"lv",q:"Em muốn học trình độ nào?",when:A=>lvOpts(A).length>1,a:A=>lvOpts(A).map(k=>{const t=lvTen(k,A);return[t[0],k,t[1]]})},
 {k:"ng",q:"Em định học ngành nào?",sel:1},
 {k:"pt",q:"Em thường trú và học THPT ở tỉnh nào?",sub:"Để biết em có được hỗ trợ 800.000đ/tháng theo Nghị quyết 36/2025 của HĐND tỉnh Phú Thọ không.",when:A=>canPt(A)&&A.who===L12,a:()=>[["Phú Thọ (kể cả Vĩnh Phúc, Hòa Bình cũ)","pt"],["Tỉnh, thành phố khác","khac"]]},
 {k:"pt",q:"Em (anh/chị) có bằng tốt nghiệp THPT không? Do tỉnh nào cấp, thường trú ở đâu?",sub:"Để biết có được hỗ trợ 800.000đ/tháng theo Nghị quyết 36/2025 của HĐND tỉnh Phú Thọ không.",when:A=>canPt(A)&&A.who!==L12,a:()=>[["Có, bằng do Phú Thọ cấp (kể cả Vĩnh Phúc, Hòa Bình cũ) và đang thường trú tại Phú Thọ","pt"],["Có, nhưng bằng do tỉnh khác cấp hoặc không thường trú tại Phú Thọ","khac"],["Chưa có bằng tốt nghiệp THPT","chua"]]},
 {k:"tuoi",q:"Năm nay em (anh/chị) bao nhiêu tuổi?",when:A=>canPt(A)&&A.pt==="pt"&&A.who!==L12,a:()=>[["Dưới 25 tuổi","duoi25"],["Từ 25 tuổi trở lên","tren25"]]},
 {k:"dtoc",q:"Em (anh/chị) là người dân tộc nào?",sub:"Để tính đúng miễn, giảm học phí và học bổng nội trú.",a:()=>[["Dân tộc Kinh","kinh"],["Dân tộc thiểu số","dtts",BIEN],["Dân tộc thiểu số rất ít người","dttsit","Ơ Đu, Si La, Pu Péo, Cống, Bố Y, Lô Lô, La Ha, Pà Thẻn…"],["Không muốn trả lời","no"]]},
 {k:"hc",multi:1,q:"Em (anh/chị) thuộc trường hợp nào?",sub:"Không thuộc trường hợp nào thì bấm ô đầu tiên. Có nhiều trường hợp thì chọn hết rồi bấm Tiếp tục.",a:A=>[["Không thuộc trường hợp nào","bt"]].concat(isDt(A)?HC1:HC2,HCC,[["Không muốn trả lời","no"]])}
];
const CSS=`.tt{--tn:#121a33;--tb:#274081;--tg:#ffb000;color:var(--tn);text-align:left}
.tt-card,.tt-card p,.tt-card li,.tt-card span,.tt-card summary,.tt-card div{color:#121a33}
.tt-card{background:#fff;color:var(--tn);border:1px solid #dfe5f1;border-radius:20px;padding:18px 16px;box-shadow:0 12px 30px rgba(18,26,51,.08)}
.tt-prog{height:6px;background:#e7ecf6;border-radius:9px;overflow:hidden}.tt-prog i{display:block;height:100%;background:linear-gradient(90deg,#274081,#26A8D4);transition:width .3s}
.tt-num{font-size:.85rem;color:#5b6682;margin:10px 0 4px;display:flex;gap:10px;align-items:center}
.tt-back,.tt-link{background:none;border:0;color:#274081;font-weight:700;cursor:pointer;padding:0;font:inherit;text-decoration:underline}
.tt-q{font-weight:800;font-size:1.15rem;line-height:1.35;margin:4px 0}.tt-sub{color:#5b6682;font-size:.9rem;margin:0 0 8px}
.tt-opts{display:grid;gap:10px;margin-top:10px}.tt-opts.big{grid-template-columns:1fr 1fr}
.tt-opts button{background:#fff;color:var(--tn);border:1.5px solid #d6deee;border-radius:14px;padding:13px 14px;font:inherit;font-weight:700;text-align:left;cursor:pointer;line-height:1.35}
.tt-opts.big button{text-align:center;min-height:78px}
.tt-opts button small{display:block;font-weight:500;font-size:.8rem;color:#5b6682;margin-top:3px}
.tt-opts button[aria-pressed="true"]{border-color:#274081;background:#eaf0fb;box-shadow:inset 0 0 0 1px #274081}
.tt-opts button[aria-pressed="true"]::after{content:" ✓";color:#274081}
.tt-sel{width:100%;font:inherit;font-size:1rem;padding:13px 12px;border:1.5px solid #274081;border-radius:14px;background:#fff;color:var(--tn);margin-top:10px}
.tt-hint{font-size:.88rem;color:#5b6682;margin-top:10px}.tt-hint a{color:#274081;font-weight:700}
.tt-next{display:block;width:100%;margin-top:14px;background:#274081;color:#fff;border:0;border-radius:999px;padding:14px 18px;font:inherit;font-weight:800;cursor:pointer;position:sticky;bottom:calc(84px + env(safe-area-inset-bottom,0px));z-index:5;box-shadow:0 8px 20px rgba(18,26,51,.25)}
@media(max-width:760px){.tt-next{width:calc(100% - 64px)}}
.tt-who{font-size:.9rem;color:#5b6682;margin:0 0 10px}
.tt-big{background:#f2f6fd;border-radius:16px;padding:14px}.tt-big span{display:block;font-weight:700;color:#5b6682;font-size:.9rem}
.tt-big strong{display:block;font-size:2rem;line-height:1.15;color:#274081;margin:2px 0}.tt-big small{display:block;color:#3b4560;font-size:.86rem}
.tt-plus{margin-top:8px;background:#e9f7ef;color:#0a5a2e;border-radius:12px;padding:10px 12px;font-weight:700;font-size:.92rem}
.tt-sum{margin-top:12px;border:2px solid #ffb000;background:#fff8e6;border-radius:16px;padding:12px 14px}.tt-sum span{display:block;font-weight:700;font-size:.9rem}
.tt-sum strong{display:block;font-size:1.5rem;color:#121a33}.tt-sum small{color:#3b4560}
.tt-ct{margin-top:10px}.tt-ct summary{cursor:pointer;font-weight:700;color:#274081;padding:6px 0}.tt-ct ul{margin:6px 0;padding-left:18px}.tt-ct li{margin:4px 0}.tt-ct p{font-size:.86rem;color:#3b4560;margin:6px 0}
.tt-no{margin-top:10px;font-size:.92rem}.tt-no a,.tt-src a{color:#274081;font-weight:700}
.tt-src{font-size:.78rem;color:#5b6682;margin-top:10px}
.tt-btns{display:grid;gap:10px;margin-top:14px}.tt-btns a{display:block;text-align:center;border-radius:999px;padding:13px 16px;font-weight:800;text-decoration:none}
.tt-b1{background:#ffb000;color:#121a33}.tt-b2{background:#274081;color:#fff}.tt-b3{border:1.5px solid #274081;color:#274081;background:#fff}
@media(min-width:620px){.tt-btns{grid-template-columns:repeat(3,1fr)}}
.tt-re{margin-top:12px}`;
function css(){if(document.getElementById("tt-css"))return;const s=document.createElement("style");s.id="tt-css";s.textContent=CSS;document.head.appendChild(s)}
const LIVE=new Set(["who","bang","lv","ng","pt","tuoi","dtoc","hc","clc","huong"]);
function mount(el,o){css();o=o||{};let A={},hist=[],done=0;
  const q=new URLSearchParams(location.search);
  const S0=load();["who","bang","pt","tuoi","dtoc","hc"].forEach(k=>{if(S0[k]!==undefined&&S0[k]!=="")A[k]=S0[k]});
  if(S0.who===TCW&&S0.huong)A.lv=S0.huong==="lt"?"lt":"cd";
  if(A.who&&!["Tốt nghiệp THCS (lớp 9)",L12,TCW,DLW].includes(A.who))A={};
  const slug=o.nganh||q.get("nganh");if(slug){const n=Object.keys(PAGES).find(x=>PAGES[x]===slug);if(n){A.ng=n;if(q.get("td"))A.lv=q.get("td")}}
  if(A.hc&&!Array.isArray(A.hc))A.hc=String(A.hc).split(",");
  const vis=()=>STEPS.filter(s=>!s.when||s.when(A));
  function fix(){const k=curLv(A);if(A.lv&&!lvOpts(A).includes(A.lv))delete A.lv;const m=find(A.ng);if(A.ng&&(!m||(curLv(A)&&!coNganh(m,curLv(A)))))delete A.ng;if(A.ng&&A.clc&&curLv(A)!=="cd")delete A.clc;if(!canPt(A)){}}
  function top(){const h=(document.querySelector("header")||{offsetHeight:0}).offsetHeight,t=el.getBoundingClientRect().top;if(t<h||t>innerHeight*.5)window.scrollTo({top:Math.max(0,t+scrollY-h-10),behavior:"smooth"})}
  function answer(k,v){A[k]=v;hist.push(k);fix();save(A);draw();top()}
  function draw(){fix();const L=vis(),cur=L.find(s=>A[s.k]===undefined);
    if(!cur)return res();
    const i=L.indexOf(cur),n=L.length,opts=cur.sel?null:cur.a(A);
    let h=`<div class="tt-card"><div class="tt-prog"><i style="width:${Math.round(i/n*100)}%"></i></div><div class="tt-num">Bước ${i+1}/${n}${hist.length?' · <button type="button" class="tt-back">← Quay lại</button>':''}</div><div class="tt-q">${cur.q}</div>${cur.sub?`<p class="tt-sub">${cur.sub}</p>`:""}`;
    if(cur.sel){const k=curLv(A);let g="";["co","dien","it","kd","dv","ny","nn"].forEach(gr=>{const L2=M.filter(m=>m[1]===gr&&coNganh(m,k));if(!L2.length)return;g+=`<optgroup label="${G[gr]}">`+L2.map(m=>`<option value="${m[0]}">${m[0]}</option>`+(k==="cd"&&m[3]&&m[3].clc?`<option value="${m[0]}|clc">${m[0]} (chất lượng cao)</option>`:"")).join("")+`</optgroup>`});
      h+=`<select class="tt-sel" aria-label="Chọn ngành"><option value="">Chọn ngành (${LV[k]})…</option>${g}</select><p class="tt-hint">Chưa biết chọn ngành nào? <a href="${ROOT}#trac-nghiem">Làm trắc nghiệm chọn nghề 2 phút</a></p>`}
    else{const sel=A[cur.k]||[];h+=`<div class="tt-opts${cur.big?" big":""}">`+opts.map(x=>`<button type="button" data-v="${x[1]}"${cur.multi?` aria-pressed="${sel.includes(x[1])}"`:""}>${x[0]}${x[2]?`<small>${x[2]}</small>`:""}</button>`).join("")+`</div>`+(cur.multi?`<button type="button" class="tt-next">Tiếp tục →</button>`:"")}
    el.innerHTML=h+`</div>`;
    const bk=el.querySelector(".tt-back");if(bk)bk.onclick=()=>{const k=hist.pop();delete A[k];if(k==="ng")delete A.clc;save(A);draw();top()};
    const se=el.querySelector(".tt-sel");if(se)se.onchange=()=>{if(!se.value)return;const [nm,c]=se.value.split("|");if(c)A.clc=1;else delete A.clc;answer("ng",nm)};
    let tmp=(A[cur.k]||[]).slice();
    el.querySelectorAll(".tt-opts button").forEach(b=>b.onclick=()=>{const v=b.dataset.v;
      if(!cur.multi)return answer(cur.k,v);
      if(v==="bt"||v==="no")return answer(cur.k,[v]);
      tmp=tmp.filter(x=>x!=="bt"&&x!=="no");tmp=tmp.includes(v)?tmp.filter(x=>x!==v):tmp.concat(v);
      el.querySelectorAll(".tt-opts button").forEach(x=>x.setAttribute("aria-pressed",tmp.includes(x.dataset.v)));
      const nx=el.querySelector(".tt-next");nx.textContent=tmp.length?`Tiếp tục (đã chọn ${tmp.length}) →`:"Tiếp tục →"});
    const nx=el.querySelector(".tt-next");if(nx)nx.onclick=()=>answer(cur.k,tmp.length?tmp:["bt"])}
  function res(){const m=find(A.ng),k=curLv(A);if(!m||!k){A={};return draw()}
    const c=qcs(m,k,A),b=qloi(m,k,A),dong=c.thn||c.pct===100?0:c.rate*(100-c.pct)/100,ten=m[0]+(A.clc?" (chất lượng cao)":"");
    const wl={"Tốt nghiệp THCS (lớp 9)":"Học sinh lớp 9",[L12]:"Học sinh lớp 12",[TCW]:"Đã có bằng trung cấp",[DLW]:"Người đi làm"}[A.who]||"";
    const sub=c.thn?"Miễn học phí – chương trình Trung học nghề":c.vb2?`Mức thu ${vnd(c.rate)}/tháng · văn bằng 2 không được miễn, giảm học phí`:c.pct?`Mức thu ${vnd(c.rate)}/tháng · ${c.why}`:`Mức thu ${vnd(c.rate)}/tháng`;
    let h=`<div class="tt-card tt-res"><p class="tt-who">${wl} · ${LV[k]} <b>${ten}</b> · <button type="button" class="tt-link tt-edit">Sửa câu trả lời</button></p>
    <div class="tt-big"><span>Mỗi tháng em đóng</span><strong>${vnd(dong)}</strong><small>${sub}</small></div>`;
    if(c.n36)h+=`<div class="tt-plus">+ ${A.who===L12?"Được hỗ trợ lại":"Có thể được hỗ trợ"} 800.000đ/tháng theo Nghị quyết 36/2025 của HĐND tỉnh Phú Thọ</div>`;
    if(c.qd&&P.LCS)h+=`<div class="tt-plus">+ Học bổng nội trú khoảng ${vnd(P.LCS*c.qd)}/tháng (QĐ 53, ${Math.round(c.qd*100)}% lương cơ sở – ${c.qdwhy})</div>`;
    if(b){h+=`<div class="tt-sum"><span>Cả khóa em được hưởng khoảng</span><strong>${qtr(b.khoa)}</strong><small>Học ${b.y} năm · mỗi năm khoảng ${qtr(b.nam)}</small></div>
      <details class="tt-ct"><summary>Xem chi tiết từng khoản</summary><ul>${b.hpK?`<li>${b.txt}: <b>${qtr(b.hpK)}</b> cả khóa</li>`:""}${b.qk?`<li>Học bổng nội trú ${Math.round(b.c.qd*100)}% lương cơ sở (QĐ 53), cấp 12 tháng mỗi năm, cả đồ dùng 1.000.000đ: <b>${qtr(b.qk)}</b></li>`:""}</ul>
      ${b.c.qd?`<p>Học bổng nội trú và hỗ trợ học phí là hai khoản khác nhau, được nhận cùng lúc. Kèm theo: tiền đi lại 200.000–300.000đ/năm, tiền Tết 150.000đ nếu ở lại trường.</p>`:""}
      <p>Bảo hiểm y tế học sinh, sinh viên: Nhà nước hỗ trợ 50%, em đóng khoảng 683.100đ/năm; nếu đã có thẻ BHYT do Nhà nước đóng (hộ nghèo, dân tộc thiểu số ở vùng khó khăn…) thì không phải mua thêm.</p></details>`}
    else if(!c.thn)h+=`<p class="tt-no">${c.vb2?"Văn bằng 2 không được miễn, giảm học phí và không thuộc diện hỗ trợ 800.000đ/tháng.":"Với câu trả lời của em, ngành này chưa có khoản miễn, giảm hay hỗ trợ."} Các ngành giảm 70% học phí hoặc hỗ trợ 800.000đ/tháng: <a href="${ROOT}hoc-phi.html#tung-nganh">xem bảng học phí từng ngành</a>.</p>`;
    h+=`<p class="tt-src">Theo mức thu học kỳ I năm học 2026 – 2027 (Thông báo 127/TB-CĐKTCN), NĐ 238/2025, NQ 36/2025, QĐ 53/2015; lương cơ sở ${vnd(P.LCS)}. Nhà trường xét theo hồ sơ. <a href="${ROOT}mien-giam-hoc-phi.html">Xem đủ quyền lợi</a></p>
    <div class="tt-btns"><a class="tt-b1" href="#dang-ky" data-tt-dk>Đăng ký tư vấn</a><a class="tt-b2" href="${ROOT}nop-ho-so.html">Nộp hồ sơ online</a>${o.anNganh?"":`<a class="tt-b3" href="${ROOT}nganh/${PAGES[m[0]]}.html?em=${k==="lt"?"tc":(k==="thn"||qthcs(k,A))?9:12}&td=${k}">Xem ngành ${m[0]}</a>`}</div>
    <p class="tt-re"><button type="button" class="tt-link tt-again">Tính lại từ đầu</button></p></div>`;
    el.innerHTML=h;if(!done){done=1;ev("tinh-hoc-phi-xong","Tính học phí xong")}
    el.querySelector(".tt-edit").onclick=()=>{const k=hist.pop()||"hc";delete A[k];draw();top()};
    el.querySelector(".tt-again").onclick=()=>{A={};hist=[];save({who:undefined,bang:undefined,pt:undefined,tuoi:undefined,dtoc:undefined,hc:undefined,huong:undefined});draw();top()};
    const dk=el.querySelector("[data-tt-dk]");if(dk&&!document.getElementById("dang-ky"))dk.href=ROOT+"#dang-ky"}
  draw()}
// ===== Trang ngành: học sinh đi từ kết quả trắc nghiệm (?em=…&td=…) – chỉ hiện đúng đối tượng =====
function nganh(){const q=new URLSearchParams(location.search),em=q.get("em");if(!em||!document.querySelector(".lvcs"))return;
  const td=q.get("td"),h1=document.querySelector("h1 span"),m=h1&&find(h1.textContent.trim());if(!m)return;
  document.body.classList.add("tt-q");
  const GW={"9":L9,"12":L12,"tc":TCW},A=Object.assign({},load());if(!A.who||(em==="9")!==(A.who===L9||A.bang==="thcs"))A.who=GW[em]||L12;
  const cards=[...document.querySelectorAll(".lvcs .lvc")],lvk=c=>((c.querySelector("[data-lvk]")||{}).dataset||{}).lvk;
  let sh=cards.filter(c=>c.dataset.g===em&&(!td||lvk(c)===td));if(!sh.length)sh=cards.filter(c=>c.dataset.g===em);
  cards.forEach(c=>c.classList.toggle("off",!sh.includes(c)));
  const lvName={cd:"Cao đẳng",tc:"Trung cấp",lt:"Liên thông",thn:"Trung học nghề"};
  document.querySelectorAll(".fees .r[data-g]").forEach(r=>{const lb=(r.querySelector(".lv b")||{}).textContent||"";r.hidden=r.dataset.g!==em||(td&&!lb.startsWith(lvName[td]||""))});
  const has=!!(A.dtoc||A.hc);let main=null;
  sh.forEach(cd=>{const k=lvk(cd);if(!k)return;const clc=/chất lượng cao/.test(cd.querySelector("h3").textContent),AA=Object.assign({},A,{clc:clc?1:0});
    if(k==="thn")return;const c=qcs(m,k,AA);if(!main&&!clc)main={c,k,b:qloi(m,k,AA)};if(!has)return;
    const f=cd.querySelector(".fee");if(!f)return;const dong=c.pct===100?0:c.rate*(100-c.pct)/100;
    f.innerHTML=`<b>${dong?vnd(dong)+"/tháng":"0đ"}</b><small>${c.vb2?"văn bằng 2 không được miễn, giảm":c.pct?c.why:"mức thu "+vnd(c.rate)}</small>`+(c.n36?`<small class="ttp">+ ${A.who===L12?"Được hỗ trợ lại":"Có thể được hỗ trợ"} 800.000đ/tháng (NQ 36)</small>`:"")+(c.qd&&P.LCS?`<small class="ttp">+ Học bổng nội trú khoảng ${vnd(P.LCS*c.qd)}/tháng (QĐ 53)</small>`:"")});
  const lvs=[...new Set(sh.map(c=>lvk(c)).filter(Boolean))];if(!main&&lvs.includes("thn"))main={c:{thn:1,pct:100},k:"thn"};
  const tg=document.querySelector(".hero .tags");if(tg){let t=lvs.map(k=>`<span class="tag">${LV[k]}</span>`).join("");
    if(main){const c=main.c;t+=c.thn||c.pct===100?`<span class="tag t0">Miễn 100% học phí</span>`:c.pct?`<span class="tag t70">Giảm ${c.pct}% học phí</span>`:c.n36?`<span class="tag t70">Hỗ trợ 800.000đ/tháng</span>`:"";if(c.qd)t+=`<span class="tag t0">Học bổng nội trú</span>`}
    tg.innerHTML=t}
  const ld=document.querySelector(".hero .lead");if(ld)ld.textContent=ld.textContent.split(/(?<=\.)\s+/).filter(x=>!/giảm 70%|800\.000đ|miễn học phí/i.test(x)).join(" ");
  const dk=document.querySelector(".hero .ctas a.btn-g");if(dk&&lvs.length===1)dk.textContent=`Đăng ký ${LV[lvs[0]].toLowerCase().replace("trung cấp","trung cấp")} ngành này`;
  const hp=document.querySelector("#hoc-phi .note");if(hp&&main)hp.hidden=true}
function auto(){document.querySelectorAll("[data-tt]").forEach(el=>{if(!el.dataset.ttOk){el.dataset.ttOk=1;mount(el,{anNganh:el.dataset.tt==="nganh"})}});try{nganh()}catch(e){}}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",auto);else auto();
return{M,FEE,G70,N36,G,PAGES,JOBS,P,LV,LV_IDX,vnd,qtr,effWho,n36ok,qflags,qthcs,qcs,qloi,load,save,mount,nganh};})();
