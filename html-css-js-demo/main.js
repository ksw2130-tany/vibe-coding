const openCartBtn = document.getElementById("openCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartPanel = document.getElementById("cartPanel");
const backdrop = document.getElementById("backdrop");
const cartCount = document.getElementById("cartCount");
const cartItemsEl = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const productGrid = document.getElementById("productGrid");

const cart = [];

function toWon(value) {
  return `${value.toLocaleString("ko-KR")}원`;
}

function openCart() {
  cartPanel.classList.add("open");
  backdrop.classList.add("show");
  cartPanel.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartPanel.classList.remove("open");
  backdrop.classList.remove("show");
  cartPanel.setAttribute("aria-hidden", "true");
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  cartCount.textContent = totalCount;
  cartTotal.textContent = toWon(totalPrice);

  if (cart.length === 0) {
    cartItemsEl.innerHTML = "<li class='cart-item'>장바구니가 비어 있습니다.</li>";
    return;
  }

  cartItemsEl.innerHTML = cart
    .map(
      (item) => `
      <li class="cart-item">
        <strong>${item.name}</strong>
        <p>${toWon(item.price)} x ${item.qty}</p>
        <div class="item-actions">
          <span>소계: ${toWon(item.price * item.qty)}</span>
          <button data-remove-id="${item.id}">삭제</button>
        </div>
      </li>
    `
    )
    .join("");
}

function addToCart(product) {
  const exists = cart.find((item) => item.id === product.id);
  if (exists) {
    exists.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
}

openCartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
backdrop.addEventListener("click", closeCart);

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".add-btn");
  if (!button) return;

  const card = button.closest(".card");
  const product = {
    id: card.dataset.id,
    name: card.dataset.name,
    price: Number(card.dataset.price)
  };

  addToCart(product);
  openCart();
});

cartItemsEl.addEventListener("click", (event) => {
  const removeBtn = event.target.closest("button[data-remove-id]");
  if (!removeBtn) return;

  const id = removeBtn.dataset.removeId;
  const idx = cart.findIndex((item) => item.id === id);
  if (idx !== -1) {
    cart.splice(idx, 1);
    updateCartUI();
  }
});

updateCartUI();
