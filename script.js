let isAdmin = false;

function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

async function loadProducts(adminMode = false) {
  const res = await fetch('data/products.json');
  const products = await res.json();
  const container = document.getElementById('product-list');
  container.innerHTML = '';
  document.getElementById('add-button').style.display = adminMode ? 'block' : 'none';

  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="\${product.gambar}" alt="\${product.nama}" />
      <div class="product-details">
        <h3 contenteditable="\${adminMode}">\${product.nama}</h3>
        <p contenteditable="\${adminMode}">Rp \${product.harga.toLocaleString()}</p>
        <p contenteditable="\${adminMode}">\${product.deskripsi}</p>
        \${adminMode ? '<button onclick="alert(\'Perubahan disimpan sementara\')">Simpan</button>' : ''}
      </div>
    `;
    container.appendChild(div);
  });
}

function adminLogin() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  if (user === 'admin' && pass === 'secondchance') {
    isAdmin = true;
    showSection('store');
    loadProducts(true);
  } else {
    document.getElementById('login-msg').textContent = 'Login gagal. Coba lagi!';
  }
}

function addProduct() {
  const container = document.getElementById('product-list');
  const div = document.createElement('div');
  div.className = 'product';
  div.innerHTML = `
    <img src="https://via.placeholder.com/300x200?text=Gambar+Baru" />
    <div class="product-details">
      <h3 contenteditable="true">Produk Baru</h3>
      <p contenteditable="true">Rp 0</p>
      <p contenteditable="true">Deskripsi produk baru.</p>
      <button onclick="alert('Perubahan disimpan sementara')">Simpan</button>
    </div>
  `;
  container.appendChild(div);
}

loadProducts();