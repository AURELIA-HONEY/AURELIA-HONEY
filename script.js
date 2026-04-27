let cart = [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

/* 🛒 إضافة للسلة */
function addToCart(name, price) {
  cart.push({ name, price });
  renderCart();
}

/* 📦 عرض السلة */
function renderCart() {
  let box = document.getElementById("cartItems");
  let total = 0;

  box.innerHTML = "";

  cart.forEach((i, index) => {
    total += i.price;

    box.innerHTML += `
      <div class="item">
        ${i.name} - ${i.price} ريال
        <button onclick="removeItem(${index})">حذف</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = "الإجمالي: " + total + " ريال";
}

function removeItem(i) {
  cart.splice(i, 1);
  renderCart();
}

/* 🧠 رقم طلب */
function generateOrderId() {
  return "AUR-" + Date.now();
}

/* 💳 Checkout احترافي */
function checkout() {

  let phone = document.getElementById("phone").value;

  if (!phone || cart.length === 0) return;

  let total = cart.reduce((s, i) => s + i.price, 0);

  let order = {
    id: generateOrderId(),
    phone,
    items: cart,
    total,
    status: "جديد",
    date: new Date().toLocaleString()
  };

  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  /* 📲 واتساب منظم */
  let msg =
`🍯 طلب جديد - أوريليا

رقم الطلب: ${order.id}
جوال العميل: ${phone}
الإجمالي: ${total} ريال

الطلبات:
${cart.map(i => i.name).join(" - ")}`;

  let adminNumber = "966552256034";

  window.open(
    `https://wa.me/${adminNumber}?text=${encodeURIComponent(msg)}`
  );

  cart = [];
  renderCart();

  alert("تم إنشاء الطلب بنجاح ✨");
}