let cart = [];

function showScreen(screenId) {
  if ((screenId === 'checkoutScreen' || screenId === 'reviewScreen') && cart.length === 0) {
    alert('Your cart is empty. Please add items before proceeding.');
    return;
  }

  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(screenId).classList.add('active');

  if (screenId === 'checkoutScreen') updateCheckout();
  if (screenId === 'reviewScreen') updateReview();
}

function addItem(name, price) {
  cart.push({ name, price });
  alert(`${name} added to your cart.`);
  updateButtonStates();
}

function updateCheckout() {
  const container = document.getElementById('checkoutItems');
  const total = document.getElementById('checkoutTotal');
  container.innerHTML = '';
  let sum = 0;

  const grouped = {};

  cart.forEach(({ name, price }) => {
    if (!grouped[name]) {
      grouped[name] = { price, quantity: 0 };
    }
    grouped[name].quantity += 1;
  });

  for (let name in grouped) {
    const { price, quantity } = grouped[name];
    container.innerHTML += `<p>${name} x${quantity} - ₱${(price * quantity).toFixed(2)}</p>`;
    sum += price * quantity;
  }

  total.textContent = sum.toFixed(2);
}

function updateReview() {
  const container = document.getElementById('reviewItems');
  container.innerHTML = '';

  const grouped = {};

  cart.forEach(({ name, price }) => {
    if (!grouped[name]) {
      grouped[name] = { price, quantity: 0 };
    }
    grouped[name].quantity += 1;
  });

  for (let name in grouped) {
    const { price, quantity } = grouped[name];
    container.innerHTML += `<p>${name} x${quantity} - ₱${(price * quantity).toFixed(2)}</p>`;
  }
}

function resetOrder() {
  cart = [];
  showScreen('welcomeScreen');
  updateButtonStates();
}

function updateButtonStates() {
  const checkoutBtn = document.getElementById('checkoutBtn');
  const confirmBtn = document.getElementById('confirmBtn');

  const isCartEmpty = cart.length === 0;

  if (checkoutBtn) checkoutBtn.disabled = isCartEmpty;
  if (confirmBtn) confirmBtn.disabled = isCartEmpty;
}
