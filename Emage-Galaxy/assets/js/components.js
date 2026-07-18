/**
 * EMAGE GALAXY - Reusable UI Components
 */

const Components = {
  /** Inject shared HTML components */
  init() {
    this.injectNavbar();
    this.injectFooter();
    this.initLoader();
    this.initScrollProgress();
    this.initScrollTop();
    this.initCosmicParticles();
    this.initWelcomePopup();
    this.initMobileMenu();
    this.initSidebarToggle();
    this.highlightActiveNav();
    this.updateAuthUI();
  },

  injectNavbar() {
    const placeholder = document.getElementById('navbar-placeholder');
    if (!placeholder) return;

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    placeholder.innerHTML = `
      <nav class="navbar-galaxy" id="mainNavbar">
        <div class="container">
          <a href="index.html" class="navbar-brand-galaxy">
            <i class="fas fa-circle-nodes"></i>
            <span>EMAGE <span class="text-gradient">GALAXY</span></span>
          </a>

          <div class="navbar-search d-none d-lg-block">
            <i class="fas fa-search"></i>
            <input type="search" id="globalSearch" placeholder="Search wallpapers..." aria-label="Search">
          </div>

          <ul class="navbar-nav-galaxy" id="navbarMenu">
            <li class="d-lg-none navbar-mobile-search">
              <div class="navbar-search-mobile">
                <i class="fas fa-search"></i>
                <input type="search" id="mobileGlobalSearch" placeholder="Search wallpapers..." aria-label="Search">
              </div>
            </li>
            <li><a href="categories.html" class="${currentPage === 'categories.html' ? 'active' : ''}"><i class="fas fa-th-large"></i> Categories</a></li>
            <li><a href="downloads.html" class="${currentPage === 'downloads.html' ? 'active' : ''}"><i class="fas fa-download"></i> Downloads</a></li>
            <li><a href="ratings.html" class="${currentPage === 'ratings.html' ? 'active' : ''}"><i class="fas fa-star"></i> Ratings</a></li>
            <li><a href="about.html" class="${currentPage === 'about.html' ? 'active' : ''}"><i class="fas fa-info-circle"></i> About</a></li>
            <li><a href="contact.html" class="${currentPage === 'contact.html' ? 'active' : ''}"><i class="fas fa-envelope"></i> Contact</a></li>
            <li class="d-lg-none"><a href="subscription.html"><i class="fas fa-crown"></i> Subscribe</a></li>
          </ul>

          <div class="navbar-actions">
            <button class="theme-toggle" aria-label="Toggle theme"><i class="fas fa-sun"></i></button>
            <a href="subscription.html" class="btn-subscribe-nav d-none d-lg-inline-flex"><i class="fas fa-crown"></i> Subscribe</a>
            <span id="authButtons">
              <a href="login.html" class="btn-glass btn-sm" id="loginBtn"><i class="fas fa-sign-in-alt"></i> <span class="btn-text">Login</span></a>
            </span>
            <button class="mobile-toggle" id="mobileToggle" aria-label="Menu"><i class="fas fa-bars"></i></button>
          </div>
        </div>
      </nav>
    `;

    this.bindGlobalSearch();
    this.bindMobileSearch();
  },

  injectFooter() {
    const placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) return;

    placeholder.innerHTML = `
      <footer class="footer-galaxy">
        <div class="container">
          <div class="row g-4">
            <div class="col-lg-4 col-md-6">
              <div class="footer-brand"><i class="fas fa-circle-nodes"></i> EMAGE GALAXY</div>
              <p class="footer-desc">Every Image Tells A Tale. Discover premium wallpapers across galaxies of categories. Download stunning HD & 4K wallpapers for free.</p>
              <div class="footer-social">
                <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                <a href="#" aria-label="Discord"><i class="fab fa-discord"></i></a>
              </div>
            </div>
            <div class="col-lg-2 col-md-6">
              <h5 class="footer-title">Quick Links</h5>
              <ul class="footer-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="categories.html">Categories</a></li>
                <li><a href="downloads.html">Downloads</a></li>
                <li><a href="ratings.html">Top Rated</a></li>
                <li><a href="upload.html">Prime Upload</a></li>
              </ul>
            </div>
            <div class="col-lg-2 col-md-6">
              <h5 class="footer-title">Account</h5>
              <ul class="footer-links">
                <li><a href="login.html">Login</a></li>
                <li><a href="register.html">Register</a></li>
                <li><a href="dashboard.html">Dashboard</a></li>
                <li><a href="subscription.html">Subscription</a></li>
                <li><a href="about.html">About Us</a></li>
              </ul>
            </div>
            <div class="col-lg-4 col-md-6">
              <h5 class="footer-title">Newsletter</h5>
              <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:1rem;">Get the latest wallpapers delivered to your inbox.</p>
              <div class="footer-newsletter">
                <input type="email" id="footerEmail" placeholder="Enter your email">
                <button class="btn-galaxy w-100" id="footerSubscribe"><i class="fas fa-paper-plane"></i> Subscribe</button>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2026 EMAGE GALAXY. All rights reserved. |
              <a href="privacy.html">Privacy</a> |
              <a href="terms.html">Terms</a> |
              <a href="disclaimer.html">Disclaimer</a>
            </p>
          </div>
        </div>
      </footer>
    `;

    document.getElementById('footerSubscribe')?.addEventListener('click', () => {
      const email = document.getElementById('footerEmail')?.value;
      if (email) {
        UI.showToast('Thank you for subscribing to our newsletter!');
        document.getElementById('footerEmail').value = '';
      }
    });
  },

  initLoader() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.id = 'pageLoader';
    loader.innerHTML = `
      <div class="loader-logo"><i class="fas fa-circle-nodes"></i> EMAGE GALAXY</div>
      <div class="loader-spinner"></div>
      <p style="margin-top:1rem;color:var(--text-muted);font-size:0.9rem;">Loading the cosmos...</p>
    `;
    document.body.prepend(loader);

    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.add('page-loaded');
      }, 800);
    });
  },

  initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.id = 'scrollProgress';
    document.body.prepend(bar);

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${progress}%`;
    });
  },

  initScrollTop() {
    const btn = document.createElement('button');
    btn.className = 'scroll-top';
    btn.id = 'scrollTopBtn';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  },

  initCosmicParticles() {
    const container = document.createElement('div');
    container.className = 'cosmic-particles';
    document.body.prepend(container);

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 3}s`;
      particle.style.animationDuration = `${2 + Math.random() * 3}s`;
      container.appendChild(particle);
    }
  },

  initWelcomePopup() {
    this.checkAndShowWelcomePopup();
  },

  async fetchUserIP() {
    const response = await fetch('https://api.ipify.org?format=json');
    if (!response.ok) throw new Error('IP fetch failed');
    const data = await response.json();
    return data.ip;
  },

  async checkAndShowWelcomePopup() {
    try {
      const ip = await this.fetchUserIP();
      if (Storage.hasVisitedIP(ip)) return;
      this.showWelcomeModal(ip);
    } catch {
      if (!Storage.get(StorageKeys.WELCOME_SHOWN)) {
        this.showWelcomeModal(null);
      }
    }
  },

  showWelcomeModal(ip) {
    setTimeout(() => {
      if (document.getElementById('welcomeModal')) return;

      const ipNote = ip
        ? `<p class="welcome-ip-note"><i class="fas fa-globe"></i> First visit detected from <strong>${ip}</strong></p>`
        : '';

      const modal = document.createElement('div');
      modal.className = 'modal fade welcome-popup modal-galaxy';
      modal.id = 'welcomeModal';
      modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-body p-4">
              <div class="welcome-icon"><i class="fas fa-circle-nodes"></i></div>
              <h3>Welcome to EMAGE GALAXY!</h3>
              <p style="color:var(--text-secondary);margin:0.75rem 0 0;">Every Image Tells A Tale. Here's how to get started:</p>
              ${ipNote}
              <div class="welcome-instructions">
                <div class="welcome-tier">
                  <span class="welcome-tier-badge guest"><i class="fas fa-user"></i> Guest User</span>
                  <ul>
                    <li>Browse & explore all categories</li>
                    <li>View wallpaper previews</li>
                    <li>Download wallpapers for free</li>
                    <li>Rate wallpapers with stars</li>
                  </ul>
                </div>
                <div class="welcome-tier">
                  <span class="welcome-tier-badge user"><i class="fas fa-sign-in-alt"></i> Login User</span>
                  <ul>
                    <li>All Guest features</li>
                    <li>Post comments on wallpapers</li>
                    <li>Save favourites & track downloads</li>
                  </ul>
                </div>
                <div class="welcome-tier">
                  <span class="welcome-tier-badge prime"><i class="fas fa-crown"></i> Prime User</span>
                  <ul>
                    <li>All Login User features</li>
                    <li>Upload your own wallpapers</li>
                    <li>Access exclusive Prime collections</li>
                  </ul>
                </div>
              </div>
              <div class="d-flex flex-column flex-sm-row gap-2 justify-content-center">
                <a href="register.html" class="btn-galaxy"><i class="fas fa-user-plus"></i> Create Account</a>
                <button class="btn-outline-galaxy" data-bs-dismiss="modal"><i class="fas fa-rocket"></i> Start Exploring</button>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
      const bsModal = new bootstrap.Modal(modal);
      bsModal.show();
      modal.addEventListener('hidden.bs.modal', () => {
        if (ip) Storage.markIPVisited(ip);
        else Storage.set(StorageKeys.WELCOME_SHOWN, true);
        modal.remove();
      });
    }, 1500);
  },

  initMobileMenu() {
    document.addEventListener('click', (e) => {
      const toggle = document.getElementById('mobileToggle');
      const menu = document.getElementById('navbarMenu');
      if (!toggle || !menu) return;

      if (e.target.closest('#mobileToggle')) {
        menu.classList.toggle('open');
        toggle.querySelector('i').className = menu.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
      } else if (!e.target.closest('.navbar-galaxy')) {
        menu.classList.remove('open');
        toggle.querySelector('i').className = 'fas fa-bars';
      }
    });
  },

  initSidebarToggle() {
    const sidebar = document.querySelector('.dashboard-sidebar, .admin-sidebar');
    const main = document.querySelector('.dashboard-main');
    if (!sidebar || !main || document.getElementById('sidebarToggle')) return;

    const toggle = document.createElement('button');
    toggle.className = 'sidebar-toggle';
    toggle.id = 'sidebarToggle';
    toggle.innerHTML = '<i class="fas fa-bars"></i>';
    toggle.setAttribute('aria-label', 'Toggle menu');

    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'sidebar-overlay';
      document.body.appendChild(overlay);
    }

    const closeSidebar = () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    };

    toggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      overlay.classList.toggle('active', isOpen);
    });
    overlay.addEventListener('click', closeSidebar);
    sidebar.querySelectorAll('a').forEach(link => link.addEventListener('click', closeSidebar));

    main.insertBefore(toggle, main.firstChild);
  },

  bindMobileSearch() {
    const searchInput = document.getElementById('mobileGlobalSearch');
    if (!searchInput) return;

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        window.location.href = query
          ? `categories.html?search=${encodeURIComponent(query)}`
          : 'categories.html';
      }
    });
  },

  highlightActiveNav() {
    window.addEventListener('scroll', () => {
      const navbar = document.getElementById('mainNavbar');
      if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  },

  updateAuthUI() {
    const container = document.getElementById('authButtons');
    if (!container) return;

    const user = Storage.getCurrentUser();
    if (user) {
      const tier = AccessControl.getTier();
      const tierIcon = tier === 'prime' ? 'fa-crown' : 'fa-user-circle';
      container.innerHTML = `
        <div class="dropdown">
          <button class="btn-glass dropdown-toggle" data-bs-toggle="dropdown">
            <i class="fas ${tierIcon}"></i> ${user.name.split(' ')[0]}
            <span class="access-tier-pill ${tier}">${AccessControl.getTierLabel()}</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end" style="background:var(--bg-surface);border:1px solid var(--border-glass);">
            <li><a class="dropdown-item" href="dashboard.html" style="color:var(--text-primary);"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
            ${user.role === 'admin' ? '<li><a class="dropdown-item" href="admin.html" style="color:var(--text-primary);"><i class="fas fa-shield-alt"></i> Admin</a></li>' : ''}
            ${AccessControl.canUpload() ? '<li><a class="dropdown-item" href="upload.html" style="color:var(--text-primary);"><i class="fas fa-cloud-upload-alt"></i> Upload</a></li>' : ''}
            <li><hr class="dropdown-divider" style="border-color:var(--border-glass);"></li>
            <li><a class="dropdown-item" href="#" id="logoutBtn" style="color:var(--text-primary);"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
          </ul>
        </div>
      `;
      document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        Auth.logout();
      });
    }
  },

  bindGlobalSearch() {
    const searchInput = document.getElementById('globalSearch');
    if (!searchInput) return;

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        window.location.href = query
          ? `categories.html?search=${encodeURIComponent(query)}`
          : 'categories.html';
      }
    });
  }
};

/** UI Utilities */
const UI = {
  showToast(message, duration = 3000) {
    let toast = document.querySelector('.toast-galaxy');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-galaxy';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
  },

  renderStars(rating, interactive = false, wallpaperId = null, options = {}) {
    const { showValue = true, emptyLabel = 'Not rated yet' } = options;
    const numRating = parseFloat(rating) || 0;
    const full = Math.floor(numRating);
    const half = !interactive && numRating % 1 >= 0.5;

    let html = '<div class="rating-stars' + (interactive ? ' interactive-rating' : '') + '"';
    if (wallpaperId) html += ` data-id="${wallpaperId}"`;
    html += '>';

    for (let i = 1; i <= 5; i++) {
      if (i <= full) html += `<i class="fas fa-star${interactive ? ' star-btn' : ''}" data-value="${i}"></i>`;
      else if (i === full + 1 && half) html += `<i class="fas fa-star-half-alt${interactive ? ' star-btn' : ''}" data-value="${i}"></i>`;
      else html += `<i class="far fa-star empty${interactive ? ' star-btn' : ''}" data-value="${i}"></i>`;
    }

    if (showValue) {
      if (numRating > 0) {
        html += `<span class="rating-value">${numRating.toFixed(1)}</span>`;
      } else if (!interactive) {
        html += `<span class="rating-value rating-value--empty">${emptyLabel}</span>`;
      }
    }

    html += '</div>';
    return html;
  },

  renderRatingSummary(wallpaperId) {
    const { average, count, userRating } = Storage.getWallpaperRating(wallpaperId);
    let html = '<div class="wallpaper-rating-block">';

    if (count > 0) {
      html += `<div class="rating-summary">${this.renderStars(average)}<span class="rating-count">(${count} ${count === 1 ? 'rating' : 'ratings'})</span></div>`;
    } else {
      html += '<p class="rating-summary rating-summary--empty">No ratings yet. Be the first to rate!</p>';
    }

    html += `<p class="rating-label">${userRating ? 'Your rating' : 'Rate this wallpaper'}</p>`;
    html += this.renderStars(userRating || 0, true, wallpaperId, { showValue: false });
    html += '</div>';
    return html;
  },

  formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  },

  formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  }
};

window.Components = Components;
window.UI = UI;
