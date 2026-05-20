let currentCat = 'all';
let searchText = '';

function render() {
  const grid = document.getElementById('resGrid');
  const q = searchText.trim().toLowerCase();
  let list = resources;

  if (currentCat !== 'all') list = list.filter(r => r.cat === currentCat);
  if (q) list = list.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.desc.toLowerCase().includes(q) ||
    r.tag.toLowerCase().includes(q)
  );

  if (!list.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:#999">未找到匹配资源，试试其他关键词</div>`;
    updateStats(0);
    return;
  }

  grid.innerHTML = list.map(r => `
    <div class="card">
      ${r.hot ? '<span class="hot-badge">🔥 热门</span>' : ''}
      <span class="tag">${r.tag}</span>
      <h3><a href="${r.url}" target="_blank" rel="noopener">${r.name}</a></h3>
      <p>${r.desc}</p>
      <div class="url-row">
        <a href="${r.url}" target="_blank" rel="noopener">打开 ↗</a>
      </div>
    </div>
  `).join('');

  updateStats(list.length);
}

function updateStats(n) {
  document.getElementById('stats').textContent = `${n} 个资源`;
}

function filterByCat(cat) {
  currentCat = cat;
  document.querySelectorAll('.cat-nav button').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === cat);
  });
  render();
}

function onSearch(e) {
  searchText = e.target.value;
  render();
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  // Build category nav
  const nav = document.getElementById('catNav');
  nav.innerHTML = categories.map(c =>
    `<button data-cat="${c.id}" onclick="filterByCat('${c.id}')">${c.icon} ${c.name}</button>`
  ).join('');

  // Add "全部" button at front
  nav.insertAdjacentHTML('afterbegin',
    `<button data-cat="all" class="active" onclick="filterByCat('all')">🏠 全部</button>`
  );

  render();
});
