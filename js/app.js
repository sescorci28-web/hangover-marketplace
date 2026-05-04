/* ── app.js – Hangover Marketplace ── */

document.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const isLoginPage = window.location.pathname.endsWith('login.html') || window.location.pathname.endsWith('register.html');
  
  if (!isLoggedIn && !isLoginPage) {
    window.location.href = 'login.html';
    return;
  }
  if (isLoggedIn && isLoginPage) {
    window.location.href = 'index.html';
    return;
  }

  updateNavbar();
  Cart.updateCartBadge();
  const page = document.body.dataset.page;
  if (page === 'index')    initIndex();
  if (page === 'catalog')  initCatalog();
  if (page === 'cart')     initCart();
  if (page === 'product')  initProduct();
});

function updateNavbar() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const navRight = document.querySelector('.nav-right');
  if (navRight && isLoggedIn) {
    const cartBtn = navRight.querySelector('.cart-btn');
    navRight.innerHTML = `<a href="#" class="btn btn-ghost" style="padding: 8px 16px; font-size: 14px;" onclick="handleLogout(event)">Cerrar sesión</a>`;
    if (cartBtn) navRight.appendChild(cartBtn);
  }
}

function handleLogout(e) {
  if (e) e.preventDefault();
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userType');
  window.location.href = 'login.html';
}

/* ─── SHARED: product card ─── */
function buildCard(p, compact = false) {
  const cat = CATEGORIES[p.category];
  const mainPrice = p.priceRental || p.pricePurchase;
  const label = p.type === 'rental' ? '/día' : p.type === 'both' ? '/día' : '';
  const badge = p.badge ? `<span class="card-badge">${p.badge}</span>` : '';
  const stars = '★'.repeat(Math.floor(p.rating)) + (p.rating % 1 >= 0.5 ? '½' : '');
  return `
  <article class="product-card" data-id="${p.id}">
    <div class="card-img-wrap">
      <img src="${p.image}" alt="${p.name}" loading="lazy">
      <span class="card-cat" style="--cat-color:${cat.color}">${cat.icon} ${cat.name}</span>
      ${badge}
    </div>
    <div class="card-body">
      <h3 class="card-title">${p.name}</h3>
      <div class="card-rating"><span class="stars">${stars}</span><span class="rev">${p.rating} (${p.reviews})</span></div>
      <p class="card-desc">${p.description.slice(0,90)}…</p>
      <div class="card-footer">
        <div class="card-price">
          <span class="price-main">${formatPrice(mainPrice)}</span>
          <span class="price-label">${label}</span>
        </div>
        <div class="card-actions">
          <a href="producto.html?id=${p.id}" class="btn btn-outline btn-sm">Ver más</a>
          <button class="btn btn-primary btn-sm" onclick="quickAdd(${p.id})">Agregar</button>
        </div>
      </div>
    </div>
  </article>`;
}

function quickAdd(id) {
  const p = getProductById(id);
  if (!p) return;
  const mode = p.type === 'purchase' ? 'purchase' : 'rental';
  Cart.addItem(p, mode, 1, '');
}

/* ─── INDEX ─── */
function initIndex() {
  const grid = document.getElementById('featured-grid');
  if (grid) {
    const featured = PRODUCTS.filter(p => p.badge).slice(0, 6);
    grid.innerHTML = featured.map(p => buildCard(p)).join('');
  }
  // Animate counter stats
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    let n = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      n = Math.min(n + step, target);
      el.textContent = n.toLocaleString('es-CO') + (el.dataset.suffix || '');
      if (n >= target) clearInterval(timer);
    }, 25);
  });
}

/* ─── CATALOG ─── */
let catalogState = { category:'all', type:'all', search:'', sortBy:'rating', page:1 };
const PER_PAGE = 9;

function initCatalog() {
  const _p = new URLSearchParams(window.location.search).get('cat');
  if (_p) catalogState.category = _p;
  // Populate category buttons
  const catWrap = document.getElementById('filter-cats');
  if (catWrap) {
    catWrap.innerHTML = `<button class="filter-btn ${catalogState.category==='all'?'active':''}" data-cat="all">Todos</button>` +
      Object.entries(CATEGORIES).map(([k,v]) =>
        `<button class="filter-btn ${catalogState.category===k?'active':''}" data-cat="${k}">${v.icon} ${v.name}</button>`).join('');
    catWrap.addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      catWrap.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      catalogState.category = btn.dataset.cat;
      catalogState.page = 1;
      renderCatalog();
    });
  }

  document.getElementById('search-input')?.addEventListener('input', e => {
    catalogState.search = e.target.value;
    catalogState.page = 1;
    renderCatalog();
  });

  document.getElementById('sort-select')?.addEventListener('change', e => {
    catalogState.sortBy = e.target.value;
    renderCatalog();
  });

  document.getElementById('filter-type')?.addEventListener('change', e => {
    catalogState.type = e.target.value;
    renderCatalog();
  });

  renderCatalog();
}

function renderCatalog() {
  const results = filterProducts(catalogState);
  const total = results.length;
  const start = (catalogState.page - 1) * PER_PAGE;
  const slice = results.slice(start, start + PER_PAGE);

  const grid = document.getElementById('catalog-grid');
  const info = document.getElementById('results-info');
  const pag  = document.getElementById('pagination');

  if (grid) grid.innerHTML = slice.length ? slice.map(p => buildCard(p)).join('') : '<p class="no-results">No se encontraron productos.</p>';
  if (info) info.textContent = `${total} producto${total !== 1 ? 's' : ''} encontrado${total !== 1 ? 's' : ''}`;

  if (pag) {
    const pages = Math.ceil(total / PER_PAGE);
    pag.innerHTML = '';
    for (let i = 1; i <= pages; i++) {
      const b = document.createElement('button');
      b.className = 'pag-btn' + (i === catalogState.page ? ' active' : '');
      b.textContent = i;
      b.onclick = () => { catalogState.page = i; renderCatalog(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
      pag.appendChild(b);
    }
  }
}

/* ─── CART PAGE ─── */
function initCart() {
  renderCartPage();
}

function renderCartPage() {
  const items = Cart.getItems();
  const wrap  = document.getElementById('cart-items');
  const empty = document.getElementById('cart-empty');
  const summary = document.getElementById('cart-summary');

  if (!items.length) {
    if (wrap) wrap.innerHTML = '';
    if (empty) empty.style.display = 'flex';
    if (summary) summary.style.display = 'none';
    return;
  }
  if (empty) empty.style.display = 'none';
  if (summary) summary.style.display = 'grid';

  if (wrap) {
    wrap.innerHTML = items.map(item => {
      const days = item.mode === 'rental' ? item.days || 1 : 1;
      const total = item.price * (item.qty || 1) * days;
      return `
      <div class="cart-item" data-id="${item.id}" data-mode="${item.mode}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <span class="cart-mode-badge">${item.mode === 'rental' ? '📅 Alquiler' : '🛒 Compra'}</span>
          ${item.mode === 'rental' ? `<div class="cart-days-wrap">Días: <input type="number" min="1" value="${days}" class="days-input" onchange="changeDays(${item.id},'${item.mode}',this.value)"></div>` : ''}
          ${item.eventDate ? `<div class="cart-date">📆 ${item.eventDate}</div>` : ''}
        </div>
        <div class="cart-item-qty">
          <button onclick="changeQty(${item.id},'${item.mode}',-1)">−</button>
          <span>${item.qty || 1}</span>
          <button onclick="changeQty(${item.id},'${item.mode}',1)">+</button>
        </div>
        <div class="cart-item-price">${formatPrice(total)}</div>
        <button class="cart-remove" onclick="removeCartItem(${item.id},'${item.mode}')">✕</button>
      </div>`;
    }).join('');
  }

  const sub = Cart.subtotal();
  const fee = Math.round(sub * 0.05);
  const total = sub + fee;

  const elSub   = document.getElementById('summary-sub');
  const elFee   = document.getElementById('summary-fee');
  const elTotal = document.getElementById('summary-total');
  if (elSub)   elSub.textContent   = formatPrice(sub);
  if (elFee)   elFee.textContent   = formatPrice(fee);
  if (elTotal) elTotal.textContent = formatPrice(total);
}

function changeQty(id, mode, delta) {
  const items = Cart.getItems();
  const item = items.find(i => i.id === id && i.mode === mode);
  if (item) Cart.updateQty(id, mode, (item.qty || 1) + delta);
  renderCartPage();
}
function changeDays(id, mode, val) {
  Cart.updateDays(id, mode, parseInt(val));
  renderCartPage();
}
function removeCartItem(id, mode) {
  Cart.removeItem(id, mode);
  renderCartPage();
}

document.addEventListener('click', e => {
  if (e.target.id === 'clear-cart-btn') { Cart.clear(); renderCartPage(); }
});

function handleCheckout() {
  const name  = document.getElementById('co-name')?.value.trim();
  const email = document.getElementById('co-email')?.value.trim();
  const phone = document.getElementById('co-phone')?.value.trim();
  const date  = document.getElementById('co-date')?.value;
  if (!name || !email || !phone || !date) {
    Cart.showToast('⚠️ Por favor completa todos los campos');
    return;
  }
  Cart.clear();
  renderCartPage();
  const modal = document.getElementById('success-modal');
  if (modal) { modal.style.display = 'flex'; document.getElementById('modal-name').textContent = name; }
}

/* ─── PRODUCT DETAIL ─── */
function initProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const p = getProductById(id);
  if (!p) { document.getElementById('product-wrap').innerHTML = '<p class="no-results">Producto no encontrado.</p>'; return; }

  document.title = `${p.name} – Hangover`;
  const cat = CATEGORIES[p.category];
  const stars = '★'.repeat(Math.floor(p.rating)) + (p.rating % 1 >= 0.5 ? '½' : '');
  const wrap = document.getElementById('product-wrap');

  wrap.innerHTML = `
  <div class="pd-img-col">
    <img src="${p.image}" alt="${p.name}" class="pd-main-img">
    <div class="pd-cat-tag" style="--cat-color:${cat.color}">${cat.icon} ${cat.name}</div>
  </div>
  <div class="pd-info-col">
    ${p.badge ? `<span class="card-badge">${p.badge}</span>` : ''}
    <h1 class="pd-title">${p.name}</h1>
    <div class="pd-rating"><span class="stars">${stars}</span> ${p.rating} · ${p.reviews} reseñas</div>
    <p class="pd-desc">${p.description}</p>
    <ul class="pd-features">${p.features.map(f => `<li>✓ ${f}</li>`).join('')}</ul>
    <div class="pd-mode-tabs">
      ${p.type !== 'purchase' ? `<button class="mode-tab active" id="tab-rental" onclick="selectMode('rental')">📅 Alquiler – ${formatPrice(p.priceRental)}/día</button>` : ''}
      ${p.type !== 'rental'   ? `<button class="mode-tab ${p.type==='purchase'?'active':''}" id="tab-purchase" onclick="selectMode('purchase')">🛒 Compra – ${formatPrice(p.pricePurchase)}</button>` : ''}
    </div>
    <div id="rental-opts" style="${p.type==='purchase'?'display:none':''}">
      <div class="pd-field"><label>Días de alquiler</label><input type="number" id="pd-days" min="1" value="1" class="field-input"></div>
      <div class="pd-field"><label>Fecha del evento</label><input type="date" id="pd-date" class="field-input" min="${new Date().toISOString().split('T')[0]}"></div>
    </div>
    <button class="btn btn-primary btn-lg" id="pd-add-btn" onclick="pdAddToCart(${p.id})">🛒 Agregar al carrito</button>
    <a href="cart.html" class="btn btn-outline btn-lg" style="margin-top:8px">Ver carrito</a>
  </div>`;

  // Initialize mode
  _initPdMode(p);

  // Related
  const related = PRODUCTS.filter(r => r.category === p.category && r.id !== p.id).slice(0, 3);
  const relGrid = document.getElementById('related-grid');
  if (relGrid) relGrid.innerHTML = related.map(r => buildCard(r)).join('');
}

let _pdMode = null;

function _initPdMode(p) {
  _pdMode = p.type === 'purchase' ? 'purchase' : 'rental';
}
function selectMode(mode) {
  _pdMode = mode;
  document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + mode)?.classList.add('active');
  document.getElementById('rental-opts').style.display = mode === 'rental' ? 'block' : 'none';
}
function pdAddToCart(id) {
  const p = getProductById(id);
  if (!p) return;
  const mode = _pdMode || (p.type === 'purchase' ? 'purchase' : 'rental');
  const days = parseInt(document.getElementById('pd-days')?.value) || 1;
  const date = document.getElementById('pd-date')?.value || '';
  Cart.addItem(p, mode, days, date);
}
