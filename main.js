
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Loading animation
  setTimeout(function () {
    document.getElementById('loading').style.opacity = '0';
    setTimeout(function () {
      document.getElementById('loading').style.display = 'none';
    }, 500);
  }, 1000);

  // Mobile menu toggle
  const menuBtn = document.querySelector('.menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  menuBtn.addEventListener('click', function () {
    menuBtn.classList.toggle('open');
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu when clicking a link
  const mobileLinks = document.querySelectorAll('#mobile-menu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function () {
      menuBtn.classList.remove('open');
      mobileMenu.classList.add('hidden');
    });
  });

  // Dark/light mode toggle
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
  const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const themeToggleDarkIconMobile = document.getElementById('theme-toggle-dark-icon-mobile');
  const themeToggleLightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');

  // Change the icons inside the button based on previous settings
  if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
    themeToggleLightIconMobile.classList.remove('hidden');
  } else {
    themeToggleDarkIcon.classList.remove('hidden');
    themeToggleDarkIconMobile.classList.remove('hidden');
  }

  function toggleTheme() {
    // Toggle icons
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');
    themeToggleDarkIconMobile.classList.toggle('hidden');
    themeToggleLightIconMobile.classList.toggle('hidden');

    // Toggle theme
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'light') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      }
    } else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      }
    }
  }

  themeToggle.addEventListener('click', toggleTheme);
  themeToggleMobile.addEventListener('click', toggleTheme);


  const tabButtons = document.querySelectorAll('.tab-button');
  const jadwalContainer = document.getElementById('jadwal-container');

  function renderJadwal(hari) {
    const data = jadwalJumat[hari];
    jadwalContainer.innerHTML = `
      <div class="grid md:grid-cols-2 gap-6">
        <div class="glass-card p-6 rounded-lg prayer-time">
          <h3 class="text-xl font-heading font-semibold mb-4">Jadwal Sholat Jumat (${hari.charAt(0).toUpperCase() + hari.slice(1)})</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
              <span>Muadzin</span>
              <span class="font-medium">${data.muadzin}</span>
            </div>
            <div class="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
              <span>Khotib</span>
              <span class="font-medium">${data.khotib}</span>
            </div>
            <div class="flex justify-between items-center">
              <span>Imam</span>
              <span class="font-medium">${data.imam}</span>
            </div>
          </div>
        </div>
        <div class="glass-card p-6 rounded-lg prayer-time">
          <h3 class="text-xl font-heading font-semibold mb-4">Waktu Sholat</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
              <span>Khutbah</span>
              <span class="font-medium">${data.khutbah}</span>
            </div>
            <div class="flex justify-between items-center">
              <span>Sholat Jumat</span>
              <span class="font-medium">${data.sholat}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.tab-button.active')?.classList.remove('active');
      btn.classList.add('active');
      renderJadwal(btn.dataset.tab);
    });
  });

  function getPasaranJawa(date) {
    const daftarPasaran = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
    const baseDate = new Date('2024-01-01'); // patokan pasaran Legi
    const hariIni = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const selisihHari = Math.floor((hariIni - baseDate) / (1000 * 60 * 60 * 24));
    const indexPasaran = (selisihHari % 5 + 5) % 5; // hindari index negatif
    return daftarPasaran[indexPasaran].toLowerCase();
  }

  // Deteksi pasaran hari ini
  const pasaranHariIni = getPasaranJawa(new Date());

  // Jika pasaran tidak ditemukan di data, fallback ke 'kliwon'
  const tabDefault = jadwalJumat[pasaranHariIni] ? pasaranHariIni : 'kliwon';

  // Tampilkan data dan aktifkan tab
  renderJadwal(tabDefault);
  document.querySelector(`[data-tab="${tabDefault}"]`)?.classList.add('active');





  // Back to top button
  const backToTopButton = document.getElementById('back-to-top');

  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.remove('opacity-0', 'invisible');
      backToTopButton.classList.add('opacity-100', 'visible');
    } else {
      backToTopButton.classList.remove('opacity-100', 'visible');
      backToTopButton.classList.add('opacity-0', 'invisible');
    }
  });

  backToTopButton.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Current time display
  function updateTime() {
    const now = new Date();
    const timeElement = document.getElementById('current-time');
    const dateElement = document.getElementById('current-date');
    const hijriElement = document.getElementById('current-hijri');

    // Format time
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    timeElement.textContent = now.toLocaleTimeString('id-ID', timeOptions);

    // Format date
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('id-ID', dateOptions);

    // Simple Hijri date approximation (for demo purposes)
    const hijriDate = getHijriDate(now);
    hijriElement.textContent = hijriDate;
  }

  // Simple Hijri date approximation (not precise)
  function getHijriDate(gregorianDate) {
    const gregYear = gregorianDate.getFullYear();
    const gregMonth = gregorianDate.getMonth();
    const gregDay = gregorianDate.getDate();

    // Approximation: Hijri year is about (Gregorian year - 622) * 1.03
    const hijriYear = Math.floor((gregYear - 622) * 1.03);

    // List of Hijri month names
    const hijriMonths = [
      'Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani',
      'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
      'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
    ];

    // Simple approximation for month and day
    const hijriMonthIndex = (gregMonth + Math.floor(gregDay / 30)) % 12;
    const hijriDay = (gregDay % 30) + 1;

    return `${hijriDay} ${hijriMonths[hijriMonthIndex]} ${hijriYear} H`;
  }

  // Update time immediately and then every second
  updateTime();
  setInterval(updateTime, 1000);

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});



// Global variables
let currentPage = 1;
let currentSlideshowIndex = 0;

// Function to generate gallery HTML
function generateGallery() {
  // Get current page images
  const paginatedImages = paginateImages(galleryData.images, currentPage, galleryData.itemsPerPage);

  // Generate gallery items
  const galleryItemsHTML = paginatedImages.map((image, index) => `
        <div class="gallery-item" data-index="${index + ((currentPage - 1) * galleryData.itemsPerPage)}">
            <div class="group relative overflow-hidden rounded-lg cursor-pointer">
                <img src="${image.src}" alt="${image.alt}"
                    class="w-full h-64 object-cover transition duration-500 group-hover:scale-110" loading="lazy">
                <div
                    class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                </div>
            </div>
        </div>
    `).join('');

  // Generate pagination
  const totalPages = Math.ceil(galleryData.images.length / galleryData.itemsPerPage);
  const paginationHTML = generatePagination(totalPages, currentPage);

  // Combine everything
  return `
        <!-- Gallery Section -->
        <section id="gallery" class="py-20 bg-white dark:bg-gray-900">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-heading font-bold mb-4">${galleryData.title} <span
                            class="text-primary-emerald">Kegiatan</span></h2>
                    <div class="w-20 h-1 bg-primary-emerald mx-auto mb-6"></div>
                    <p class="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
                        ${galleryData.description}
                    </p>
                </div>

                <!-- Gallery Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${galleryItemsHTML}
                </div>

                <!-- Pagination -->
                ${paginationHTML}

                
            </div>
        </section>
    `;
}

// Paginate images
function paginateImages(images, page, itemsPerPage) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return images.slice(startIndex, endIndex);
}

// Generate pagination HTML
function generatePagination(totalPages, currentPage) {
  if (totalPages <= 1) return '';

  let paginationHTML = '<div class="pagination">';

  // Previous button
  if (currentPage > 1) {
    paginationHTML += `
            <div class="page-item">
                <a class="page-link" data-page="${currentPage - 1}">Previous</a>
            </div>
        `;
  }

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
            <div class="page-item">
                <a class="page-link ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</a>
            </div>
        `;
  }

  // Next button
  if (currentPage < totalPages) {
    paginationHTML += `
            <div class="page-item">
                <a class="page-link" data-page="${currentPage + 1}">Next</a>
            </div>
        `;
  }

  paginationHTML += '</div>';
  return paginationHTML;
}

// Initialize slideshow
function initSlideshow() {
  const slideshowContainer = document.getElementById('slideshow-container');
  const slideshowImage = document.getElementById('slideshow-image');
  const closeBtn = document.querySelector('.slideshow-close');
  const prevBtn = document.querySelector('.slideshow-prev');
  const nextBtn = document.querySelector('.slideshow-next');

  // Open slideshow when image is clicked
  document.addEventListener('click', function (e) {
    const galleryItem = e.target.closest('.gallery-item');
    if (galleryItem) {
      currentSlideshowIndex = parseInt(galleryItem.dataset.index);
      slideshowImage.src = galleryData.images[currentSlideshowIndex].src;
      slideshowImage.alt = galleryData.images[currentSlideshowIndex].alt;
      slideshowContainer.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  });

  // Close slideshow
  closeBtn.addEventListener('click', function () {
    slideshowContainer.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  // Previous image
  prevBtn.addEventListener('click', function () {
    currentSlideshowIndex = (currentSlideshowIndex - 1 + galleryData.images.length) % galleryData.images.length;
    slideshowImage.src = galleryData.images[currentSlideshowIndex].src;
    slideshowImage.alt = galleryData.images[currentSlideshowIndex].alt;
  });

  // Next image
  nextBtn.addEventListener('click', function () {
    currentSlideshowIndex = (currentSlideshowIndex + 1) % galleryData.images.length;
    slideshowImage.src = galleryData.images[currentSlideshowIndex].src;
    slideshowImage.alt = galleryData.images[currentSlideshowIndex].alt;
  });

  // Close when clicking outside image
  slideshowContainer.addEventListener('click', function (e) {
    if (e.target === slideshowContainer) {
      slideshowContainer.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (slideshowContainer.style.display === 'flex') {
      if (e.key === 'Escape') {
        slideshowContainer.style.display = 'none';
        document.body.style.overflow = 'auto';
      } else if (e.key === 'ArrowLeft') {
        currentSlideshowIndex = (currentSlideshowIndex - 1 + galleryData.images.length) % galleryData.images.length;
        slideshowImage.src = galleryData.images[currentSlideshowIndex].src;
        slideshowImage.alt = galleryData.images[currentSlideshowIndex].alt;
      } else if (e.key === 'ArrowRight') {
        currentSlideshowIndex = (currentSlideshowIndex + 1) % galleryData.images.length;
        slideshowImage.src = galleryData.images[currentSlideshowIndex].src;
        slideshowImage.alt = galleryData.images[currentSlideshowIndex].alt;
      }
    }
  });
}

// Function to initialize gallery functionality
function initGallery() {
  // Pagination
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('page-link')) {
      e.preventDefault();
      currentPage = parseInt(e.target.dataset.page);
      document.getElementById('gallery-container').innerHTML = generateGallery();
      window.scrollTo({ top: document.getElementById('gallery').offsetTop - 100, behavior: 'smooth' });
    }
  });
}

// Initialize the gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('gallery-container').innerHTML = generateGallery();
  initGallery();
  initSlideshow();
});