let products = {
  sidr:{name:"سدر",price:120,img:"images/sidr.jpg",desc:"عسل فاخر"},
  talh:{name:"طلح",price:90,img:"images/talh.jpg",desc:"نكهة قوية"},
  samar:{name:"سمر",price:100,img:"images/samar.jpg",desc:"طعم داكن"},
};

/* عرض المنتجات */
function renderProducts(){
  let box=document.getElementById("products");
  for(let id in products){
    let p=products[id];
    box.innerHTML+=`
      <div class="card">
        <img src="${p.img}">
        <h4>${p.name}</h4>
        <p>${p.price} ريال</p>
        <a href="product.html?id=${id}">
          <button>عرض</button>
        </a>
      </div>`;
  }
}

/* صفحة المنتج */
function loadProduct(){
  let id=new URLSearchParams(location.search).get("id");
  let p=products[id];

  document.getElementById("title").innerText=p.name;
  document.getElementById("image").src=p.img;
  document.getElementById("desc").innerText=p.desc;

  document.getElementById("price").innerText=p.price+" ريال";

  window.current=p;
}

/* إضافة */
function addProduct(){
  let size=parseFloat(document.getElementById("size").value);

  let cart=JSON.parse(localStorage.getItem("cart"))||[];

  cart.push({
    name:current.name,
    size,
    price:current.price*size
  });

  localStorage.setItem("cart",JSON.stringify(cart));
  updateCartCount();
  alert("تمت الإضافة");
}

/* عداد السلة */
function updateCartCount(){
  let cart=JSON.parse(localStorage.getItem("cart"))||[];
  let el=document.getElementById("cartCount");
  if(el) el.innerText=cart.length;
}

/* عرض السلة */
function loadCart(){
  let cart=JSON.parse(localStorage.getItem("cart"))||[];
  let box=document.getElementById("cartItems");
  let total=0;

  cart.forEach((i,index)=>{
    total+=i.price;

    box.innerHTML+=`
    <div class="cart-item">
      ${i.name} (${i.size}ك)
      - ${i.price} ريال
      <button onclick="removeItem(${index})">❌</button>
    </div>`;
  });

  document.getElementById("total").innerText="الإجمالي: "+total;
}

/* حذف */
function removeItem(i){
  let cart=JSON.parse(localStorage.getItem("cart"))||[];
  cart.splice(i,1);
  localStorage.setItem("cart",JSON.stringify(cart));
  location.reload();
}

/* طلب */
function checkout(){
  let phone=document.getElementById("phone").value;
  if(!phone) return;

  let cart=JSON.parse(localStorage.getItem("cart"))||[];

  let total=cart.reduce((s,i)=>s+i.price,0);
  let id="AUR-"+Date.now();

  let msg=`طلب جديد\n${id}\n${total}`;

  window.open(`https://wa.me/966552256034?text=${encodeURIComponent(msg)}`);

  localStorage.removeItem("cart");
  alert("تم الطلب");
}
