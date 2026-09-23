const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxjToJenKk4wR3a3yL_dbEZD1k4RmmgPzOk3n0FQgZsXEdm_8xHwBz9DVs60HDpjMifDQ/exec";

// 1. DATA EKSKUL
const ekskulData = [
  { id: "PMR", nama: "PMR", deskripsi: "Kemanusiaan & Pertolongan Pertama", img: "assets/pmr.jpeg" },
  { id: "Pramuka", nama: "Pramuka", deskripsi: "Kemandirian & Petualangan", img: "assets/pramuka.jpg" },
  { id: "Futsal", nama: "Futsal", deskripsi: "Olahraga & Kerja Sama Tim", img: "assets/futsal.jpeg" },
  { id: "Seni Musik", nama: "Seni Musik", deskripsi: "Melatih Musik & Vokal", img: "assets/it.jpeg" },
  { id: "Basket", nama: "Basket", deskripsi: "Ketangkasan Fisik & Strategi", img: "assets/basket.jpg" },
  { id: "Debat", nama: "Debat", deskripsi: "Berpikir Kritis & Public Speaking", img: "assets/debat.jpg" },
  { id: "Marching Band", nama: "Marching Band", deskripsi: "Seni Musik & Kekompakan Tim", img: "assets/marching-band.jpeg" },
  { id: "Paskibra", nama: "Paskibra", deskripsi: "Kedisiplinan & Nasionalisme", img: "assets/paskibra.jpg" }
];

// 2. NAVIGASI TAB
window.switchTab = function(tabId, navId) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  const targetTab = document.getElementById(tabId);
  if (targetTab) {
    targetTab.classList.add('active');
  }

  document.querySelectorAll('.nav-item').forEach(nav => {
    nav.classList.remove('active');
  });
  
  if (navId) {
    const targetNav = document.getElementById(navId);
    if (targetNav) targetNav.classList.add('active');
  }

  // Auto-scroll ke atas saat ganti tab
  const mainContainer = document.getElementById('mainContainer');
  if (mainContainer) mainContainer.scrollTop = 0;
};

// 3. RENDER KARTU EKSKUL
function renderEkskul() {
  const container = document.getElementById('ekskulGrid');
  if (!container) return;

  let htmlContent = '';
  ekskulData.forEach(ekskul => {
    htmlContent += `
      <div class="ekskul-card">
        <img src="${ekskul.img}" alt="${ekskul.nama}" class="ekskul-img" onerror="this.src='https://via.placeholder.com/110x110?text=Ekskul'">
        <div class="ekskul-info">
          <h3>${ekskul.nama}</h3>
          <p>${ekskul.deskripsi}</p>
          <button class="btn-primary" onclick="daftarEkskul('${ekskul.id}')">Daftar Ini</button>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = htmlContent;
}

// 4. DAFTAR LANGSUNG DARI KARTU EKSKUL
window.daftarEkskul = function(ekskulId) {
  switchTab('tab-daftar', 'nav-daftar'); 
  const selectElement = document.getElementById('pilihanEkskul');
  if (selectElement) {
    selectElement.value = ekskulId; 
  }
};

// 5. FORM SUBMIT
document.addEventListener('DOMContentLoaded', function() {
  renderEkskul();

  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault(); 

      const submitBtn = document.getElementById('submitBtn');
      const messageEl = document.getElementById('formMessage');

      submitBtn.innerText = "Mengirim...";
      submitBtn.disabled = true;

      const formData = {
        nama: document.getElementById('nama').value,
        kelas: document.getElementById('kelas').value,
        ekskul: document.getElementById('pilihanEkskul').value,
        alasan: document.getElementById('alasan').value
      };
      
      fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      .then(() => {
        messageEl.style.color = '#10b981';
        messageEl.innerText = `Berhasil! Pendaftaran atas nama ${formData.nama} (${formData.kelas}) telah dikirim.`;
        registerForm.reset();
      })
      .catch(error => {
        messageEl.style.color = '#ef4444';
        messageEl.innerText = "Gagal mengirim data. Periksa koneksi internetmu.";
        console.error('Error:', error);
      })
      .finally(() => {
        submitBtn.innerText = "Kirim Pendaftaran";
        submitBtn.disabled = false;
        
        setTimeout(() => {
          messageEl.innerText = '';
        }, 5000);
      });
    });
  }
});