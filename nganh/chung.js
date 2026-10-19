// Trang ngành – dùng chung: gửi đăng ký về Google Sheets, ghi kênh, đánh dấu mục đang xem
(function(){
const SHEET_URL="https://script.google.com/macros/s/AKfycbzNSQJMOURAFVrGaNKgF0lqLLHR6SoTt3_0mY6zGAkjFrUcqTPgSRrxsYcU5XJZdKblrQ/exec";
const $=s=>document.querySelector(s);
// Kênh: ?nguon=... ?gt=... (giống trang chủ, nhớ trên máy người xem)
try{const q=new URLSearchParams(location.search),c=s=>String(s).replace(/[^\p{L}\p{N} ._-]/gu,"").slice(0,40),n=q.get("nguon"),g=q.get("gt");
  if(n)localStorage.setItem("vcet-nguon",c(n));if(g)localStorage.setItem("vcet-gt",c(g));
  if(!n&&!localStorage.getItem("vcet-nguon")&&document.referrer){const h=new URL(document.referrer).hostname;if(!/tuyensinhvcet/.test(h))localStorage.setItem("vcet-nguon",h.replace(/^(www|m|l|lm)\./,""))}}catch(e){}
function srcTag(){let n="",g="";try{n=localStorage.getItem("vcet-nguon")||"";g=localStorage.getItem("vcet-gt")||""}catch(e){}return (n?" · Kênh: "+n:"")+(g?" · Người giới thiệu: "+g:"")}
// Form
const f=$("#rf");if(f){f.addEventListener("submit",e=>{e.preventDefault();
  const v=id=>($(id)?$(id).value.trim():""),name=v("#r-name"),phone=v("#r-phone").replace(/[\s.]/g,""),err=$("#r-err"),done=$("#r-done"),btn=f.querySelector("[type=submit]");
  let m="";if(!name)m="Vui lòng nhập họ và tên.";else if(!/^0\d{9}$/.test(phone))m="Số điện thoại cần đủ 10 số, bắt đầu bằng 0.";
  err.hidden=!m;err.textContent=m;if(m)return;
  const major=f.dataset.major,lv=v("#r-level");
  const data={name,phone,who:v("#r-who"),major:[lv,major].filter(Boolean).join(" – "),cs:"",place:v("#r-place")||"Tỉnh Phú Thọ",form:"Trang ngành "+major+srcTag(),note:"",page:location.href,hp:v("#r-hp")};
  const thanks=()=>{done.hidden=false;done.innerHTML="Cảm ơn <b>"+name.replace(/[<>&]/g,"")+"</b>! Thầy Phan Thanh Bình sẽ gọi lại số <b>"+phone+"</b> để tư vấn ngành <b>"+major+"</b>. Cần gấp, em nhắn Zalo 0989 465 017 nhé.";f.reset()};
  btn.disabled=true;btn.textContent="Đang gửi...";
  fetch(SHEET_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(data)})
   .then(thanks).catch(()=>{err.hidden=false;err.textContent="Chưa gửi được do lỗi mạng. Em thử lại hoặc nhắn Zalo 0989 465 017."})
   .finally(()=>{btn.disabled=false;btn.textContent="Gửi đăng ký"})})}
// Chọn sẵn trình độ khi bấm ở bảng học phí
document.addEventListener("click",e=>{const b=e.target.closest("[data-lv]");if(!b)return;const s=$("#r-level");if(s)s.value=b.dataset.lv});
// Mục lục: đánh dấu mục đang xem
const links=[...document.querySelectorAll(".toc a")];
if("IntersectionObserver" in window&&links.length){const io=new IntersectionObserver(es=>{es.forEach(en=>{if(en.isIntersecting){links.forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+en.target.id))}})},{rootMargin:"-40% 0px -55% 0px"});
  links.forEach(a=>{const t=document.querySelector(a.getAttribute("href"));if(t)io.observe(t)})}
})();
