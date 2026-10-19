// Trang ngành – dùng chung. Dữ liệu ngành, đối tượng, tỉnh/xã lấy từ trang chủ để form giống hệt.
const $=s=>document.querySelector(s);
const M=[
 ["Công nghệ ô tô","co","kt",{cd:100,clc:1,y:3},{lt:120},{tc:195}],
 ["Công nghệ kỹ thuật cơ khí","co","kt",{cd:25,clc:1,y:3},{lt:70},null],
 ["Cắt gọt kim loại","co","kt",{cd:95,clc:1,y:3},{lt:70},{tc:90}],
 ["Cơ khí chế tạo","co","kt",null,null,{tc:100}],
 ["Hàn","co","kt",null,null,{tc:30}],
 ["Cơ điện tử","dien","kt",{cd:35,y:2},null,{tc:70},{thn:1}],
 ["Công nghệ kỹ thuật điện, điện tử","dien","kt",{cd:35,clc:1,y:3},{lt:50},{tc:100}],
 ["Công nghệ kỹ thuật điều khiển và tự động hóa","dien","kt",{cd:35,clc:1,y:3},null,null],
 ["Điện công nghiệp","dien","kt",{cd:85,clc:1,y:3},{lt:70},{tc:125},{thn:1}],
 ["Điện công nghiệp và dân dụng","dien","kt",null,null,{tc:150}],
 ["Điện tử công nghiệp","dien","kt",{cd:40,clc:1,y:3},{lt:110},{tc:170}],
 ["Công nghệ vi mạch bán dẫn","dien","kt",{cd:30,y:3},null,null],
 ["Kỹ thuật máy lạnh và điều hòa không khí","dien","kt",{cd:70,clc:1,y:3},{lt:90},{tc:170}],
 ["Công nghệ cơ khí, sưởi ấm và điều hòa không khí","dien","kt",{cd:30,y:2},null,{tc:70}],
 ["Truyền thông và mạng máy tính","it","kt",{cd:50,clc:1,y:3},{lt:55},null,{thn:1}],
 ["Công nghệ thông tin (Ứng dụng phần mềm)","it","kt",{cd:30,clc:1,y:3},{lt:30},null],
 ["Kỹ thuật sửa chữa, lắp ráp máy tính","it","kt",{cd:25,y:3},{lt:90},{tc:150}],
 ["Tin học văn phòng","it","kt",null,null,{tc:190}],
 ["Thương mại điện tử","kd","kd",{cd:15,y:2},{lt:35},{tc:70}],
 ["Marketing thương mại","kd","kd",{cd:15,y:2},{lt:25},{tc:70}],
 ["Logistics","kd","kd",{cd:15,y:2},null,{tc:15}],
 ["Kế toán","kd","kd",{cd:70,y:3},{lt:50},null],
 ["Kế toán doanh nghiệp","kd","kd",{cd:70,y:3},{lt:50},{tc:70}],
 ["Quản trị kinh doanh","kd","kd",{cd:80,y:2},null,null],
 ["Quản trị khách sạn","dv","dv",{cd:15,y:2},null,null,{thn:1}],
 ["Kỹ thuật chế biến món ăn","dv","dv",{cd:30,y:3},{lt:25},{tc:65}],
 ["Chăm sóc sắc đẹp","dv","dv",null,null,{tc:100}],
 ["May thời trang","dv","sx",{cd:15,y:2},{lt:25},{tc:70}],
 ["Dịch vụ thú y","ny","ny",{cd:15,clc:1,y:3},{lt:15},null],
 ["Thú y","ny","ny",{cd:20,y:2},null,null],
 ["Chăn nuôi – thú y","ny","ny",null,null,{tc:36}],
 ["Tiếng Trung Quốc","nn","kd",{cd:70,y:3},null,{tc:78}]
];
const LV={tc:"Trung cấp",thn:"Trung học nghề",cd:"Cao đẳng",lt:"Liên thông cao đẳng"},LV_IDX={cd:3,lt:4,tc:5,thn:6};
const WHO=[["Tốt nghiệp THCS (lớp 9)",["tc","thn"]],["Học hết lớp 10, 11 rồi nghỉ",["tc"]],["Tốt nghiệp THPT (lớp 12)",["cd","tc"]],["Đã có bằng trung cấp",["lt","cd"]],["Đã có bằng cao đẳng, đại học (văn bằng 2)",["cd","tc"]],["Người đi làm",["cd","lt","tc"]],["Bộ đội xuất ngũ",["cd","tc","lt"]],["Phụ huynh",["tc","thn","cd","lt"]],["Chưa rõ, cần tư vấn",["cd","tc","thn","lt"]]];
const WHO_LV=Object.fromEntries(WHO);
const TINH="1=Thành phố Hà Nội,4=Tỉnh Cao Bằng,8=Tỉnh Tuyên Quang,11=Tỉnh Điện Biên,12=Tỉnh Lai Châu,14=Tỉnh Sơn La,15=Tỉnh Lào Cai,19=Tỉnh Thái Nguyên,20=Tỉnh Lạng Sơn,22=Tỉnh Quảng Ninh,24=Tỉnh Bắc Ninh,25=Tỉnh Phú Thọ,31=Thành phố Hải Phòng,33=Tỉnh Hưng Yên,37=Tỉnh Ninh Bình,38=Tỉnh Thanh Hóa,40=Tỉnh Nghệ An,42=Tỉnh Hà Tĩnh,44=Tỉnh Quảng Trị,46=Thành phố Huế,48=Thành phố Đà Nẵng,51=Tỉnh Quảng Ngãi,52=Tỉnh Gia Lai,56=Tỉnh Khánh Hòa,66=Tỉnh Đắk Lắk,68=Tỉnh Lâm Đồng,75=Tỉnh Đồng Nai,79=Thành phố Hồ Chí Minh,80=Tỉnh Tây Ninh,82=Tỉnh Đồng Tháp,86=Tỉnh Vĩnh Long,91=Tỉnh An Giang,92=Thành phố Cần Thơ,96=Tỉnh Cà Mau".split(',').map(x=>x.split('='));
const PT_XA="#Tân Hòa;#Hòa Bình;#Thống Nhất;@Đà Bắc;@Đức Nhàn;@Tân Pheo;@Quy Đức;@Cao Sơn;@Tiền Phong;#Kỳ Sơn;@Thịnh Minh;@Lương Sơn;@Liên Sơn;@Kim Bôi;@Nật Sơn;@Mường Động;@Cao Dương;@Hợp Kim;@Dũng Tiến;@Cao Phong;@Thung Nai;@Mường Thàng;@Tân Lạc;@Mường Hoa;@Vân Sơn;@Mường Bi;@Toàn Thắng;@Mai Châu;@Tân Mai;@Pà Cò;@Bao La;@Mai Hạ;@Lạc Sơn;@Mường Vang;@Nhân Nghĩa;@Thượng Cốc;@Yên Phú;@Quyết Thắng;@Ngọc Sơn;@Đại Đồng;@Yên Thủy;@Lạc Lương;@Yên Trị;@Lạc Thủy;@An Nghĩa;@An Bình;#Nông Trang;#Việt Trì;#Thanh Miếu;#Vân Phú;#Phú Thọ;#Âu Cơ;#Phong Châu;@Đoan Hùng;@Bằng Luân;@Chí Đám;@Tây Cốc;@Chân Mộng;@Hạ Hòa;@Đan Thượng;@Hiền Lương;@Yên Kỳ;@Văn Lang;@Vĩnh Chân;@Thanh Ba;@Quảng Yên;@Hoàng Cương;@Đông Thành;@Chí Tiên;@Liên Minh;@Phù Ninh;@Phú Mỹ;@Trạm Thản;@Dân Chủ;@Bình Phú;@Yên Lập;@Sơn Lương;@Xuân Viên;@Trung Sơn;@Thượng Long;@Minh Hòa;@Cẩm Khê;@Tiên Lương;@Vân Bán;@Phú Khê;@Hùng Việt;@Đồng Lương;@Tam Nông;@Hiền Quan;@Vạn Xuân;@Thọ Văn;@Lâm Thao;@Xuân Lũng;@Hy Cương;@Phùng Nguyên;@Bản Nguyên;@Thanh Sơn;@Thu Cúc;@Lai Đồng;@Tân Sơn;@Võ Miếu;@Xuân Đài;@Minh Đài;@Văn Miếu;@Cự Đồng;@Long Cốc;@Hương Cần;@Khả Cửu;@Yên Sơn;@Đào Xá;@Thanh Thủy;@Tu Vũ;#Vĩnh Yên;#Vĩnh Phúc;#Phúc Yên;#Xuân Hòa;@Lập Thạch;@Hợp Lý;@Yên Lãng;@Hải Lựu;@Thái Hòa;@Liên Hòa;@Tam Sơn;@Tiên Lữ;@Sông Lô;@Sơn Đông;@Tam Dương;@Tam Dương Bắc;@Hoàng An;@Hội Thịnh;@Tam Đảo;@Đạo Trù;@Đại Đình;@Bình Nguyên;@Bình Tuyền;@Bình Xuyên;@Xuân Lãng;@Yên Lạc;@Tề Lỗ;@Tam Hồng;@Nguyệt Đức;@Liên Châu;@Vĩnh Tường;@Vĩnh An;@Vĩnh Hưng;@Vĩnh Thành;@Thổ Tang;@Vĩnh Phú";
const XA_CACHE={'25':PT_XA};
const decXa=s=>s.split(';').map(w=>w.replace(/^#/,'Phường ').replace(/^@/,'Xã ').replace(/^!/,'Đặc khu ')).sort((a,b)=>a.replace(/^\S+ (khu )?/,'').localeCompare(b.replace(/^\S+ (khu )?/,''),'vi'));
const nd=s=>(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/g,'d').replace(/\s+/g,' ').trim();
let curTinh='25',xaList=[];
function combo(inp,items,onPick){const ul=inp.parentNode.querySelector('.cbl');let act=-1,shown=[];
  const close=()=>{ul.hidden=true;inp.setAttribute('aria-expanded','false');act=-1};
  const render=all=>{const q=all?'':nd(inp.value);const L=items();shown=(q?L.filter(x=>nd(x).includes(q)):L).slice(0,80);
    ul.innerHTML=shown.length?shown.map((x,i)=>'<li role="option" data-i="'+i+'"'+(i===act?' class="on"':'')+'>'+x+'</li>').join(''):'<li class="none">'+(L.length?'Không tìm thấy, em cứ gõ tên đầy đủ':'Đang tải danh sách...')+'</li>';
    ul.hidden=false;inp.setAttribute('aria-expanded','true')};
  const pick=i=>{if(shown[i]==null)return;inp.value=shown[i];close();onPick&&onPick(shown[i])};
  inp.addEventListener('focus',()=>{act=-1;render(true);inp.select()});
  inp.addEventListener('input',()=>{act=0;render(false)});
  inp.addEventListener('keydown',e=>{if(ul.hidden&&e.key==='ArrowDown'){render(true);return}
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();act=Math.max(0,Math.min(shown.length-1,act+(e.key==='ArrowDown'?1:-1)));render(!nd(inp.value)||items().includes(inp.value));const li=ul.querySelector('.on');li&&li.scrollIntoView({block:'nearest'})}
    else if(e.key==='Enter'&&!ul.hidden&&act>=0){e.preventDefault();pick(act)}else if(e.key==='Escape')close()});
  ul.addEventListener('mousedown',e=>{const li=e.target.closest('li[data-i]');if(li){e.preventDefault();pick(+li.dataset.i)}});
  inp.addEventListener('blur',()=>setTimeout(()=>{if(!ul.hidden){const q=nd(inp.value);const m=q&&items().filter(x=>nd(x)===q||nd(x).endsWith(' '+q));if(m&&m.length===1){inp.value=m[0];onPick&&onPick(m[0])}close();inp.dispatchEvent(new Event('change'))}},120));}
async function fillXa(){const c=curTinh;xaList=[];
  if(!XA_CACHE[c]){try{const r=await fetch('https://provinces.open-api.vn/api/v2/p/'+c+'?depth=2');const j=await r.json();
    XA_CACHE[c]=j.wards.map(w=>w.name.replace(/^xã /,'Xã ').replace(/^Phường /,'#').replace(/^Xã /,'@').replace(/^Đặc khu /,'!')).join(';')}catch(e){XA_CACHE[c]=''}}
  if(curTinh===c)xaList=XA_CACHE[c]?decXa(XA_CACHE[c]):[]}

// ===== Form đăng ký trang ngành: dùng cùng dữ liệu, cùng cách lọc với form trang chủ =====
const SHEET_URL="https://script.google.com/macros/s/AKfycbzNSQJMOURAFVrGaNKgF0lqLLHR6SoTt3_0mY6zGAkjFrUcqTPgSRrxsYcU5XJZdKblrQ/exec";
// Kênh: ?nguon=... ?gt=... (giống trang chủ)
try{const q=new URLSearchParams(location.search),c=s=>String(s).replace(/[^\p{L}\p{N} ._-]/gu,"").slice(0,40),n=q.get("nguon"),g=q.get("gt");
  if(n)localStorage.setItem("vcet-nguon",c(n));if(g)localStorage.setItem("vcet-gt",c(g));
  if(!n&&!localStorage.getItem("vcet-nguon")&&document.referrer){const h=new URL(document.referrer).hostname;if(!/tuyensinhvcet/.test(h))localStorage.setItem("vcet-nguon",h.replace(/^(www|m|l|lm)\./,""))}}catch(e){}
function srcTag(){let n="",g="";try{n=localStorage.getItem("vcet-nguon")||"";g=localStorage.getItem("vcet-gt")||""}catch(e){}return (n?" · Kênh: "+n:"")+(g?" · Người giới thiệu: "+g:"")}
(function(){
const f=$("#rf");if(!f)return;
const PAGE=f.dataset.major,w=$("#r-who"),l=$("#r-level"),mj=$("#r-major"),note=$("#r-note"),ALL=["cd","lt","tc","thn"];
const row=n=>M.find(m=>m[0]===n);
w.innerHTML='<option value="">Chọn đối tượng</option>'+WHO.map(x=>"<option>"+x[0]+"</option>").join("");
function fillM(){const k=l.value,cur=mj.value||PAGE;const L=k?M.filter(m=>m[LV_IDX[k]]):M;
  mj.innerHTML='<option value="">Chọn ngành học</option>'+L.map(m=>"<option>"+m[0]+"</option>").join("");if(L.some(m=>m[0]===cur))mj.value=cur}
function fillL(){const who=w.value,ks=who?(WHO_LV[who]||ALL):ALL,m=row(mj.value||PAGE),cur=l.value;
  let fit=m?ks.filter(k=>m[LV_IDX[k]]):ks;const miss=!!(who&&m&&!fit.length);if(miss)fit=ks;
  note.hidden=!miss;if(miss)note.textContent="Ngành "+m[0]+" chưa tuyển trình độ phù hợp với em. Em vẫn gửi được, Thầy sẽ tư vấn ngành gần nhất cho em.";
  l.innerHTML='<option value="">'+(who?"Chọn trình độ":"Chọn đối tượng trước")+'</option>'+fit.map(k=>'<option value="'+k+'">'+LV[k]+"</option>").join("");
  l.disabled=!who;if(fit.includes(cur))l.value=cur;else if(fit.length===1)l.value=fit[0];fillM()}
w.addEventListener("change",fillL);l.addEventListener("change",fillM);
mj.addEventListener("change",()=>{const k=l.value;fillL();if(k&&[...l.options].some(o=>o.value===k))l.value=k});
f.addEventListener("reset",()=>setTimeout(()=>{fillL();mj.value=PAGE},0));
fillL();mj.value=PAGE;
// Tỉnh / xã
const names=TINH.map(x=>x[1]),t=$("#r-tinh");
const setT=n=>{const x=TINH.find(x=>x[1]===n);if(x&&x[0]!==curTinh){curTinh=x[0];$("#r-place").value="";fillXa()}};
t.value="Tỉnh Phú Thọ";fillXa();combo(t,()=>names,setT);combo($("#r-place"),()=>xaList,null);
t.addEventListener("change",()=>{if(!names.includes(t.value)){const x=TINH.find(x=>x[0]===curTinh);t.value=x?x[1]:"Tỉnh Phú Thọ"}});
f.addEventListener("reset",()=>setTimeout(()=>{t.value="Tỉnh Phú Thọ";if(curTinh!=="25"){curTinh="25";fillXa()}},0));
// Gửi
f.addEventListener("submit",e=>{e.preventDefault();
  const v=id=>($(id)?$(id).value.trim():""),name=v("#r-name"),phone=v("#r-phone").replace(/[\s.]/g,""),err=$("#r-err"),done=$("#r-done"),btn=f.querySelector("[type=submit]");
  let m="";if(!name)m="Vui lòng nhập họ và tên.";else if(!/^0\d{9}$/.test(phone))m="Số điện thoại cần đủ 10 số, bắt đầu bằng 0.";else if(!w.value)m="Vui lòng chọn đối tượng.";
  err.hidden=!m;err.textContent=m;if(m)return;
  const major=(mj.value||PAGE)+(note.hidden?"":" (cần tư vấn trình độ)"),lvn=l.value?LV[l.value]:"";
  const place=[v("#r-place"),v("#r-tinh")].filter(Boolean).join(", ");
  const data={name,phone,who:w.value,major:[lvn,major].filter(Boolean).join(" – "),cs:v("#r-cs"),place,form:"Trang ngành "+PAGE+srcTag(),note:"",page:location.href,hp:v("#r-hp")};
  const thanks=()=>{done.hidden=false;done.innerHTML="Cảm ơn <b>"+name.replace(/[<>&]/g,"")+"</b>! Thầy Phan Thanh Bình sẽ gọi lại số <b>"+phone+"</b> để tư vấn ngành <b>"+major.replace(/[<>&]/g,"")+"</b>. Cần gấp, em nhắn Zalo 0989 465 017 nhé.";f.reset()};
  btn.disabled=true;btn.textContent="Đang gửi...";
  fetch(SHEET_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(data)})
   .then(thanks).catch(()=>{err.hidden=false;err.textContent="Chưa gửi được do lỗi mạng. Em thử lại hoặc nhắn Zalo 0989 465 017."})
   .finally(()=>{btn.disabled=false;btn.textContent="Gửi đăng ký"})});
// Form bật lên: bấm "Đăng ký" ở bất kỳ đâu → chuyển form vào hộp giữa màn hình
const modal=$("#modal"),slot=$("#mslot"),home=$("#rf-home");
function openM(){slot.appendChild(f);modal.hidden=false;document.body.style.overflow="hidden";setTimeout(()=>$("#r-name").focus(),60)}
function closeM(){modal.hidden=true;document.body.style.overflow="";home.appendChild(f)}
document.addEventListener("click",e=>{const a=e.target.closest('a[href="#dang-ky"],[data-open]');if(!a)return;e.preventDefault();
  const pw=a.dataset.who||"";if(pw){w.value=pw;fillL();mj.value=PAGE;fillL();if(a.dataset.lvk&&[...l.options].some(o=>o.value===a.dataset.lvk)){l.value=a.dataset.lvk;fillM();mj.value=PAGE}}openM()});
// "Em là": lọc trình độ trên trang
const GW={"9":"Tốt nghiệp THCS (lớp 9)","12":"Tốt nghiệp THPT (lớp 12)","tc":"Đã có bằng trung cấp"};let GRP="all";
function setG(g){GRP=g;document.querySelectorAll(".emla button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.grp===g));
  document.querySelectorAll(".lvcs [data-g],.path[data-g]").forEach(el=>el.classList.toggle("off",g!=="all"&&el.dataset.g!==g));
  document.querySelectorAll(".fees .r[data-g]").forEach(el=>el.classList.toggle("hl",g!=="all"&&el.dataset.g===g));
  if(GW[g]&&w.value!==GW[g]){w.value=GW[g];mj.value=PAGE;fillL();mj.value=PAGE}}
document.addEventListener("click",e=>{const b=e.target.closest(".emla button");if(b)setG(b.dataset.grp)});
try{const q=new URLSearchParams(location.search).get("em");if(q&&GW[q]&&document.querySelector(".emla"))setG(q)}catch(e){}
$("#mclose").addEventListener("click",closeM);
modal.addEventListener("click",e=>{if(e.target===modal)closeM()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!modal.hidden)closeM()});
})();
// Mục lục: đánh dấu mục đang xem
(function(){const links=[...document.querySelectorAll(".toc a")];
if("IntersectionObserver" in window&&links.length){const io=new IntersectionObserver(es=>{es.forEach(en=>{if(en.isIntersecting){links.forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+en.target.id))}})},{rootMargin:"-40% 0px -55% 0px"});
  links.forEach(a=>{const t=document.querySelector(a.getAttribute("href"));if(t)io.observe(t)})}})();
