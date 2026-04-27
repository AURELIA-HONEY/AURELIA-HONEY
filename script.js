let products = {
  sidr: {
    name: "سدر أوريليا الملكي",
    price: 120,
    img: "images/sidr.jpg",
    desc: "عسل فاخر طبيعي 100%"
  },
  talh: {
    name: "طلح أوريليا",
    price: 90,
    img: "images/talh.jpg",
    desc: "نكهة قوية"
  },
  samar: {
    name: "سمر أوريليا",
    price: 100,
    img: "images/samar.jpg",
    desc: "طعم داكن أصيل"
  },
  pollen: {
    name: "حبوب اللقاح",
    price: 70,
    img: "images/pollen.jpg",
    desc: "مكمل طبيعي"
  }
};

/* تحميل المنتج */
function loadProduct() {
  let id = new URLSearchParams(window.location.search).get("id");
  let p = products[id];

  document.getElementById("title").innerText = p.name;
  document.getElementById("image").src = p.img;
  document.getElementById("desc").innerText = p.desc;

  window.currentProduct = p;
}

/* إضافة للسلة */
function addProduct() {

  let size = parseFloat(document.getElementById("size").value);

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    name: currentProduct.name,
    price: currentProduct.price * size,
    size: size
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("تمت الإضافة للسلة");
}

/* عرض السلة */
function loadCart() {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let box = document.getElementById("cartItems");
  let total = 0;

  cart.forEach(i => {
    total += i.price;

    box.innerHTML += `
      <div>
        ${i.name} (${i.size} كيلو) - ${i.price} ريال
      </div>
    `;
  });

  document.getElementById("total").innerText = "الإجمالي: " + total;
}

/* إنشاء الطلب */
function checkout() {

  let phone = document.getElementById("phone").value;

  if (!phone) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let total = cart.reduce((s, i) => s + i.price, 0);

  let id = "AUR-" + Date.now();

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders.push({
    id,
    phone,
    total,
    status: "قيد المعالجة"
  });

  localStorage.setItem("orders", JSON.stringify(orders));

  /* واتساب */
  let msg = `طلب جديد %0A رقم: ${id} %0A الإجمالي: ${total}`;

  window.open(`https://wa.me/9665XXXXXXXX?text=${msg}`);

  localStorage.removeItem("cart");

  alert("تم الطلب بنجاح، رقم طلبك: " + id);
}

/* تتبع */
function trackOrder() {

  let id = document.getElementById("trackId").value;

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  let o = orders.find(x => x.id === id);

  let box = document.getElementById("trackResult");

  if (!o) {
    box.innerHTML = "❌ غير موجود";
    return;
  }

  box.innerHTML = `
    <p>رقم: ${o.id}</p>
    <p>الحالة: ${o.status}</p>
  `;
}