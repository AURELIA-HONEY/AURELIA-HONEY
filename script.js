let products = {
  sidr:{name:"سدر",price:120,img:"images/sidr.jpg",desc:"عسل فاخر"},
  talh:{name:"طلح",price:90,img:"images/talh.jpg"},
  samar:{name:"سمر",price:100,img:"images/samar.jpg"}
};

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

function loadProduct(){
  let id=new URLSearchParams(location.search).get("id");
  let p=products[id];
  window.current=p;

  document.getElementById("title").innerText=p.name;
  document.getElementById("image").src=p.img;
  document.getElementById("price").innerText=p.price+" ريال";
}

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
  showToast();
}

function showToast(){
  let t=document.getElementById("toast");
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),2000);
}

function openCart(){
  document.getElementById("drawer").classList.add("open");
  document.querySelector(".overlay").classList.add("show");
  loadDrawer();
}

function closeCart(){
  document.getElementById("drawer").classList.remove("open");
  document.querySelector(".overlay").classList.remove("show");
}

function loadDrawer(){
  let cart=JSON.parse(localStorage.getItem("cart"))||[];
  let box=document.getElementById("drawerItems");
  let total=0;
  box.innerHTML="";

  cart.forEach((i,index)=>{
    total+=i.price*i.qty;

    box.innerHTML+=`
      <div class="cart-item">
        <img src="${i.img}">
        <div>
          ${i.name}
          <br>${i.size}ك
          <br>${i.price*i.qty} ريال
          <br>
          <button onclick="changeQty(${index},1)">+</button>
          ${i.qty}
          <button onclick="changeQty(${index},-1)">-</button>
        </div>
      </div>`;
  });

  document.getElementById("drawerTotal").innerText="الإجمالي: "+total;
}

function changeQty(i,c){
  let cart=JSON.parse(localStorage.getItem("cart"))||[];
  cart[i].qty+=c;
  if(cart[i].qty<=0) cart.splice(i,1);
  localStorage.setItem("cart",JSON.stringify(cart));
  loadDrawer();
}

function goCheckout(){
  window.location.href="checkout.html";
}

function loadCheckout(){
  let cart=JSON.parse(localStorage.getItem("cart"))||[];
  let box=document.getElementById("summary");
  let total=0;

  cart.forEach(i=>{
    total+=i.price*i.qty;
    box.innerHTML+=`<div>${i.name} × ${i.qty}</div>`;
  });

  document.getElementById("total").innerText=total+" ريال";
}

function confirmOrder(){
  alert("تم الطلب ✨");
  localStorage.removeItem("cart");
}
