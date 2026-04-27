let products = {
  sidr:{
    name:"سدر",
    price:120,
    img:"https://images.unsplash.com/photo-1587049352851-8d4e89133924"
  },
  talh:{
    name:"طلح",
    price:90,
    img:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
  },
  samar:{
    name:"سمر",
    price:100,
    img:"https://images.unsplash.com/photo-1615484477778-ca3b77940c25"
  }
};

/* عرض المنتجات */
function renderProducts(){
  let box=document.getElementById("products");

  for(let id in products){
    let p=products[id];

    box.innerHTML+=`
    <div class="card">
      <img src="${p.img}" onerror="this.src='https://via.placeholder.com/150'">
      <h4>${p.name}</h4>
      <p>${p.price} ريال</p>
      <a href="product.html?id=${id}">
        <button class="primary">عرض المنتج</button>
      </a>
    </div>`;
  }
}

/* صفحة المنتج */
function loadProduct(){
  let id=new URLSearchParams(location.search).get("id");
  let p=products[id];
  window.current=p;

  document.getElementById("title").innerText=p.name;

  let img=document.getElementById("image");
  img.src=p.img;
  img.onerror=()=> img.src="https://via.placeholder.com/300";

  document.getElementById("price").innerText=p.price+" ريال";
}

/* إضافة للسلة + رسالة */
function addProduct(){

  let size=parseFloat(document.getElementById("size").value);
  let cart=JSON.parse(localStorage.getItem("cart"))||[];

  cart.push({
    name:current.name,
    size,
    price:current.price*size,
    img:current.img,
    qty:1
  });

  localStorage.setItem("cart",JSON.stringify(cart));

  updateCartCount();
  showToast();
}

/* رسالة إضافة */
function showToast(){
  let t=document.getElementById("toast");
  t.classList.add("show");

  setTimeout(()=>{
    t.classList.remove("show");
  },2000);
}

/* فتح السلة */
function openCart(){
  document.getElementById("drawer").classList.add("open");
  document.querySelector(".overlay").classList.add("show");
  loadDrawer();
}

/* إغلاق السلة */
function closeCart(){
  document.getElementById("drawer").classList.remove("open");
  document.querySelector(".overlay").classList.remove("show");
}

/* عرض السلة */
function loadDrawer(){

  let cart=JSON.parse(localStorage.getItem("cart"))||[];
  let box=document.getElementById("drawerItems");
  let total=0;

  box.innerHTML="";

  cart.forEach((i,index)=>{

    total+=i.price*i.qty;

    box.innerHTML+=`
    <div class="cart-item">

      <img src="${i.img}" onerror="this.src='https://via.placeholder.com/100'">

      <div>
        <b>${i.name}</b>
        <br>${i.size} ك
        <br>${i.price*i.qty} ريال
        <br><br>

        <button onclick="changeQty(${index},1)">➕</button>
        ${i.qty}
        <button onclick="changeQty(${index},-1)">➖</button>

      </div>

    </div>`;
  });

  document.getElementById("drawerTotal").innerText=
    "الإجمالي: "+total+" ريال";
}

/* تعديل الكمية */
function changeQty(i,c){

  let cart=JSON.parse(localStorage.getItem("cart"))||[];

  cart[i].qty+=c;

  if(cart[i].qty<=0){
    cart.splice(i,1);
  }

  localStorage.setItem("cart",JSON.stringify(cart));

  loadDrawer();
  updateCartCount();
}

/* عداد السلة */
function updateCartCount(){
  let cart=JSON.parse(localStorage.getItem("cart"))||[];
  document.getElementById("cartCount").innerText=cart.length;
}

/* الانتقال للـ checkout */
function goCheckout(){
  window.location.href="checkout.html";
}

/* تحميل checkout */
function loadCheckout(){

  let cart=JSON.parse(localStorage.getItem("cart"))||[];
  let box=document.getElementById("summary");

  let total=0;
  box.innerHTML="";

  cart.forEach(i=>{
    total+=i.price*i.qty;

    box.innerHTML+=`
      <div class="summary-item">
        ${i.name} × ${i.qty}
      </div>
    `;
  });

  document.getElementById("total").innerText=
    "الإجمالي: "+total+" ريال";
}

/* تأكيد الطلب + واتساب */
function confirmOrder(){

  let name=document.getElementById("name").value;
  let phone=document.getElementById("phone").value;
  let city=document.getElementById("city").value;
  let address=document.getElementById("address").value;

  if(!name || !phone || !city || !address){
    alert("كمل البيانات");
    return;
  }

  let cart=JSON.parse(localStorage.getItem("cart"))||[];

  let total=0;

  let details=cart.map(i=>{
    let itemTotal=i.price*i.qty;
    total+=itemTotal;

    return `${i.name} × ${i.qty} = ${itemTotal} ريال`;
  }).join("\n");

  let orderId="AUR-"+Date.now();

  let message=
`🍯 طلب جديد

رقم الطلب: ${orderId}

👤 الاسم: ${name}
📱 الجوال: ${phone}
📍 المدينة: ${city}
🏠 العنوان: ${address}

📦 الطلب:
${details}

💰 الإجمالي: ${total} ريال
`;

  let yourNumber="966509355903"; // 👈 حط رقمك هنا

  let url=`https://wa.me/${yourNumber}?text=${encodeURIComponent(message)}`;

  window.open(url);

  localStorage.removeItem("cart");

  alert("تم إرسال الطلب عبر واتساب ✅");
}
