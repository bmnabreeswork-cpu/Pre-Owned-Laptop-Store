// ===== INITIAL DATA =====
let laptops = JSON.parse(localStorage.getItem("laptops")) || [
  { name: "Dell Latitude 5490 (i5 / 8GB / 256GB SSD)", price: 120, offer: "Good Condition", image: "images/laptop-1.png" },
  { name: "HP EliteBook 840 G5 (i7 / 16GB / 512GB SSD)", price: 180, offer: "Excellent", image: "images/laptop-1.png" },
  { name: "Lenovo ThinkPad T480 (i5 / 8GB / SSD)", price: 140, offer: "Best Seller", image: "images/laptop-1.png" },
  { name: "Dell Precision 5520 (i7 / 16GB / SSD)", price: 220, offer: "Workstation", image: "images/laptop-1.png" }
];

// ===== RENDER PRODUCTS =====
const productList = document.getElementById("productList");

function loadProducts() {
  productList.innerHTML = "";
  laptops.forEach((laptop, index) => {
    productList.innerHTML += `
      <div class="product" data-index="${index}">
        <div class="badge">${laptop.offer}</div>
        <img src="${laptop.image}" alt="${laptop.name}">
        <h3>${laptop.name}</h3>
        <p>OMR ${laptop.price.toFixed(2)}</p>
      </div>
    `;
  });
  saveData();
}
loadProducts();

// ===== POPUP =====
const popup = document.getElementById("popup");
const popupImage = document.getElementById("popupImage");
const popupName = document.getElementById("popupName");
const popupPrice = document.getElementById("popupPrice");
const whatsappBtn = document.getElementById("whatsappBtn");
const closeBtn = document.querySelector(".popup .close");

productList.addEventListener("click", (e) => {
  const prod = e.target.closest(".product");
  if (!prod) return;

  const laptop = laptops[prod.dataset.index];
  popup.style.display = "flex";
  popupImage.src = laptop.image;
  popupName.textContent = laptop.name;
  popupPrice.textContent = `OMR ${laptop.price.toFixed(2)}`;

  whatsappBtn.href =
    `https://wa.me/96878122684?text=` +
    encodeURIComponent(`I want to order this laptop:\n${laptop.name}\nPrice: OMR ${laptop.price}`);
});

closeBtn.onclick = () => popup.style.display = "none";
window.onclick = (e) => { if (e.target === popup) popup.style.display = "none"; };

// ===== ADMIN PANEL =====
const adminPanel = document.getElementById("adminPanel");
const adminToggleBtn = document.getElementById("adminToggleBtn");
const adminCloseBtn = document.getElementById("adminCloseBtn");

adminToggleBtn.onclick = () => adminPanel.classList.add("show");
adminCloseBtn.onclick = () => adminPanel.classList.remove("show");

// ===== ADMIN LOGIN =====
const adminForm = document.getElementById("adminForm");
const productAdmin = document.getElementById("productAdmin");
const productForm = document.getElementById("productForm");
const adminProductList = document.getElementById("adminProductList");

adminForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    document.getElementById("adminUser").value === "bm" &&
    document.getElementById("adminPass").value === "bm"
  ) {
    productAdmin.classList.remove("hidden");
    adminForm.classList.add("hidden");
    renderAdminProducts();
  } else {
    alert("Invalid credentials");
  }
});

// ===== ADD / EDIT LAPTOP =====
productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const index = document.getElementById("prodIndex").value;
  const laptop = {
    name: document.getElementById("prodName").value,
    price: parseFloat(document.getElementById("prodPrice").value),
    offer: document.getElementById("prodOffer").value,
    image: "images/" + document.getElementById("prodImage").value
  };

  if (index === "") laptops.push(laptop);
  else laptops[index] = laptop;

  loadProducts();
  renderAdminProducts();
  productForm.reset();
  document.getElementById("prodIndex").value = "";
});

// ===== ADMIN LIST =====
function renderAdminProducts() {
  adminProductList.innerHTML = "";
  laptops.forEach((laptop, index) => {
    adminProductList.innerHTML += `
      <div>
        ${laptop.name} - OMR ${laptop.price.toFixed(2)}
        <button onclick="editProduct(${index})">Edit</button>
        <button onclick="deleteProduct(${index})">Delete</button>
      </div>
    `;
  });
}

window.editProduct = (index) => {
  const l = laptops[index];
  prodIndex.value = index;
  prodName.value = l.name;
  prodPrice.value = l.price;
  prodOffer.value = l.offer;
  prodImage.value = l.image.replace("images/", "");
};

window.deleteProduct = (index) => {
  if (confirm("Delete this laptop?")) {
    laptops.splice(index, 1);
    loadProducts();
    renderAdminProducts();
  }
};

// ===== LOCAL STORAGE =====
function saveData() {
  localStorage.setItem("laptops", JSON.stringify(laptops));
}
