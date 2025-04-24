let cart = [];

function showScreen(screenId) {
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
}

function updateCheckout() {
  const container = document.getElementById('checkoutItems');
  const total = document.getElementById('checkoutTotal');
  container.innerHTML = '';
  let sum = 0;

  cart.forEach(item => {
    container.innerHTML += `<p>${item.name} - $${item.price.toFixed(2)}</p>`;
    sum += item.price;
  });

  total.textContent = sum.toFixed(2);
}

function updateReview() {
  const container = document.getElementById('reviewItems');
  container.innerHTML = '';
  cart.forEach(item => {
    container.innerHTML += `<p>${item.name} - $${item.price.toFixed(2)}</p>`;
  });
}

function resetOrder() {
  cart = [];
  showScreen('welcomeScreen');
}
