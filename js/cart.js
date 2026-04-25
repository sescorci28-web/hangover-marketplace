const Cart = (() => {
  const KEY = 'hangover_cart';

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  }

  function save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    updateCartBadge();
  }

  function getItems() { return load(); }

  function addItem(product, mode, days = 1, eventDate = '') {
    const items = load();
    const existing = items.find(i => i.id === product.id && i.mode === mode);
    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
      existing.days = days;
      existing.eventDate = eventDate;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        image: product.image,
        category: product.category,
        mode,
        price: mode === 'rental' ? product.priceRental : product.pricePurchase,
        days: mode === 'rental' ? days : 1,
        eventDate,
        qty: 1,
      });
    }
    save(items);
    showToast(`✅ ${product.name} agregado al carrito`);
  }

  function removeItem(id, mode) {
    const items = load().filter(i => !(i.id === id && i.mode === mode));
    save(items);
  }

  function updateQty(id, mode, qty) {
    const items = load();
    const item = items.find(i => i.id === id && i.mode === mode);
    if (item) {
      item.qty = qty < 1 ? 1 : qty;
      save(items);
    }
  }

  function updateDays(id, mode, days) {
    const items = load();
    const item = items.find(i => i.id === id && i.mode === mode);
    if (item && item.mode === 'rental') {
      item.days = days < 1 ? 1 : days;
      save(items);
    }
  }

  function clear() { localStorage.removeItem(KEY); updateCartBadge(); }

  function count() { return load().reduce((s, i) => s + (i.qty || 1), 0); }

  function subtotal() {
    return load().reduce((s, i) => {
      const days = i.mode === 'rental' ? (i.days || 1) : 1;
      return s + i.price * (i.qty || 1) * days;
    }, 0);
  }

  function updateCartBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const n = count();
    badges.forEach(b => {
      b.textContent = n;
      b.style.display = n > 0 ? 'flex' : 'none';
    });
  }

  function showToast(msg) {
    let t = document.getElementById('hg-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'hg-toast';
      t.style.cssText = 'position:fixed;bottom:24px;right:24px;background:linear-gradient(135deg,#7c3aed,#ec4899);color:#fff;padding:14px 22px;border-radius:12px;font-weight:600;font-size:14px;z-index:9999;box-shadow:0 8px 32px rgba(124,58,237,0.4);transition:all 0.4s ease;opacity:0;transform:translateY(10px)';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = '1';
    t.style.transform = 'translateY(0)';
    clearTimeout(t._timer);
    t._timer = setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(10px)'; }, 2800);
  }

  return { getItems, addItem, removeItem, updateQty, updateDays, clear, count, subtotal, updateCartBadge, showToast };
})();
