/* ----------------------------------------------------
   AETHERIS LUXURY HOROLOGY - APPLICATION SCRIPT
   ---------------------------------------------------- */

// --- PRODUCT DATABASE ---
const PRODUCTS = [
  {
    id: 1,
    name: "Aura Skeleton Automatic",
    category: "skeleton",
    price: 4950,
    oldPrice: 5500,
    rating: 4.9,
    reviews: 64,
    image: "assets/hero_watch.png",
    badge: "Signature",
    desc: "A breathtaking display of mechanical elegance, showcasing intricately skeletonized hand-assembled gears, custom Swiss balance springs, and double-domed anti-reflective sapphire crystal.",
    specs: {
      "Caliber": "Automatic AE-82",
      "Power Reserve": "80 Hours",
      "Case Material": "316L Gold-Plated Steel",
      "Water Resistance": "50m (5 ATM)"
    }
  },
  {
    id: 2,
    name: "Vanguard Blue Chronograph",
    category: "classic",
    price: 3200,
    oldPrice: null,
    rating: 4.7,
    reviews: 38,
    image: "assets/chronograph.png",
    badge: "Best Seller",
    desc: "Engineered for absolute timing accuracy. Features deep sunburst blue subdials, polished silver steel bezel, and a flyback chronograph complication perfect for racing enthusiasts.",
    specs: {
      "Caliber": "Swiss Quartz Chrono v7",
      "Function": "Flyback Chronograph",
      "Case Material": "Brushed Stainless Steel",
      "Water Resistance": "100m (10 ATM)"
    }
  },
  {
    id: 3,
    name: "Horizon Rose Gold Quartz",
    category: "minimalist",
    price: 1850,
    oldPrice: 2100,
    rating: 4.6,
    reviews: 29,
    image: "assets/minimalist.png",
    badge: "Sale",
    desc: "An exercise in restraint and luxury. Featuring a ultra-thin 6mm chassis, clean porcelain-white dial, rose-gold accents, and premium Italian hand-stitched tan leather straps.",
    specs: {
      "Caliber": "Ultra-Slim Quartz Cal. 10",
      "Thickness": "6.2mm",
      "Strap": "Full-grain Tuscan Leather",
      "Water Resistance": "30m (3 ATM)"
    }
  },
  {
    id: 4,
    name: "Neptune Automatic Diver",
    category: "diver",
    price: 2800,
    oldPrice: null,
    rating: 4.8,
    reviews: 55,
    image: "assets/diver.png",
    badge: "New",
    desc: "A professional tool watch designed to conquer ocean depths. Outfitted with a unidirectional ceramic rotating bezel, helium escape valve, and Super-LumiNova indexes for high visibility.",
    specs: {
      "Caliber": "Caliber AE-45 Automatic",
      "Bezel": "Unidirectional Ceramic",
      "Case Material": "Marine-grade Steel",
      "Water Resistance": "300m (30 ATM)"
    }
  },
  {
    id: 5,
    name: "Chronos Gold Skeleton",
    category: "skeleton",
    price: 5200,
    oldPrice: 6200,
    rating: 4.9,
    reviews: 41,
    image: "assets/skeleton.png",
    badge: "Special Edition",
    desc: "An architectural marvel showing off premium gold-plated bridges, industrial-grade screws, and custom torque-spring barrel mechanism visible through both front and display caseback.",
    specs: {
      "Caliber": "Hand-Wound AE-91S",
      "Jewels": "25 Synthetic Rubies",
      "Case Material": "Solid 18K Gold PVD Coating",
      "Water Resistance": "50m (5 ATM)"
    }
  },
  {
    id: 6,
    name: "Spectre Forged Carbon",
    category: "classic",
    price: 7800,
    oldPrice: 8500,
    rating: 5.0,
    reviews: 12,
    image: "assets/limited_edition.png",
    badge: "1 of 100",
    desc: "The pinnacle of high-tech horology. Features a case composed of forged carbon fibers, lightweight grade-5 titanium accents, and a sports-minded matte-black vulcanized FKM strap.",
    specs: {
      "Caliber": "AE-99 Tourbillon-lite",
      "Weight": "72 grams (Ultra-Light)",
      "Band": "High-Temp FKM Rubber",
      "Water Resistance": "100m (10 ATM)"
    }
  }
];

// --- APP STATE ---
let state = {
  cart: [],
  wishlist: [],
  activeCategory: "all",
  searchQuery: "",
  sortOrder: "featured"
};

// --- DOM ELEMENTS ---
const headerEl = document.getElementById("header");
const navMenuEl = document.getElementById("nav-menu");
const burgerMenuBtn = document.getElementById("burger-menu-btn");
const cartToggleBtn = document.getElementById("cart-toggle-btn");
const cartCloseBtn = document.getElementById("cart-close-btn");
const cartOverlayEl = document.getElementById("cart-overlay");
const cartBodyEl = document.getElementById("cart-body");
const cartBadgeEl = document.getElementById("cart-badge");
const cartSubtotalEl = document.getElementById("cart-subtotal");
const cartTotalEl = document.getElementById("cart-total");
const productsGridEl = document.getElementById("products-grid");
const searchInputEl = document.getElementById("search-input");
const filterTabsContainer = document.getElementById("filter-tabs");
const sortSelectEl = document.getElementById("sort-select");
const copyCouponBtn = document.getElementById("copy-coupon-btn");
const newsletterForm = document.getElementById("newsletter-form");
const toastContainerEl = document.getElementById("toast-container");
const wishlistToggleBtn = document.getElementById("wishlist-toggle-btn");
const wishlistBadgeEl = document.getElementById("wishlist-badge");

// Modal Elements
const modalOverlayEl = document.getElementById("modal-overlay");
const modalCloseBtn = document.getElementById("modal-close-btn");
const modalContentEl = document.getElementById("modal-content");

// --- INITIALIZE APPLICATION ---
function init() {
  loadLocalStorage();
  renderProducts();
  setupEventListeners();
  updateCartUI();
  updateWishlistUI();
  startCountdown();
}

// --- LOCAL STORAGE HANDLING ---
function loadLocalStorage() {
  try {
    const savedCart = localStorage.getItem("aetheris_cart");
    if (savedCart) state.cart = JSON.parse(savedCart);
    
    const savedWishlist = localStorage.getItem("aetheris_wishlist");
    if (savedWishlist) state.wishlist = JSON.parse(savedWishlist);
  } catch (error) {
    console.error("Local storage error:", error);
  }
}

function saveCart() {
  localStorage.setItem("aetheris_cart", JSON.stringify(state.cart));
}

function saveWishlist() {
  localStorage.setItem("aetheris_wishlist", JSON.stringify(state.wishlist));
}

// --- SETUP EVENT LISTENERS ---
function setupEventListeners() {
  // Sticky Navbar on scroll
  window.addEventListener("scroll", () => {
    headerEl.classList.toggle("scrolled", window.scrollY > 50);
  });

  // Mobile navigation drawer toggle
  burgerMenuBtn.addEventListener("click", () => {
    navMenuEl.classList.toggle("active");
    burgerMenuBtn.querySelector("i").classList.toggle("fa-bars-staggered");
    burgerMenuBtn.querySelector("i").classList.toggle("fa-xmark");
  });

  // Close mobile navigation drawer on link click
  navMenuEl.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenuEl.classList.remove("active");
      burgerMenuBtn.querySelector("i").classList.add("fa-bars-staggered");
      burgerMenuBtn.querySelector("i").classList.remove("fa-xmark");
    });
  });

  // Cart Drawer show/hide
  cartToggleBtn.addEventListener("click", () => cartOverlayEl.classList.add("active"));
  cartCloseBtn.addEventListener("click", () => cartOverlayEl.classList.remove("active"));
  
  // Close cart when clicking outside drawer
  cartOverlayEl.addEventListener("click", (e) => {
    if (e.target === cartOverlayEl) cartOverlayEl.classList.remove("active");
  });

  // Close modal when clicking outside card
  modalOverlayEl.addEventListener("click", (e) => {
    if (e.target === modalOverlayEl) modalOverlayEl.classList.remove("active");
  });
  modalCloseBtn.addEventListener("click", () => modalOverlayEl.classList.remove("active"));

  // Real-time Search Handler
  searchInputEl.addEventListener("input", (e) => {
    state.searchQuery = e.target.value.toLowerCase().trim();
    renderProducts();
  });

  // Category Filtering via Tabs
  filterTabsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-tab")) {
      filterTabsContainer.querySelectorAll(".filter-tab").forEach(tab => tab.classList.remove("active"));
      e.target.classList.add("active");
      state.activeCategory = e.target.dataset.category;
      renderProducts();
    }
  });

  // Category selection via Image Cards (Collections section)
  document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => {
      const targetCat = card.dataset.category;
      state.activeCategory = targetCat;
      
      // Update Filter Tab states
      filterTabsContainer.querySelectorAll(".filter-tab").forEach(tab => {
        if (tab.dataset.category === targetCat) {
          tab.classList.add("active");
        } else {
          tab.classList.remove("active");
        }
      });
      
      renderProducts();
      document.getElementById("products").scrollIntoView({ behavior: "smooth" });
    });
  });

  // Wishlist toggle filter (show only wishlisted)
  wishlistToggleBtn.addEventListener("click", () => {
    const icon = wishlistToggleBtn.querySelector("i");
    if (icon.classList.contains("fa-regular")) {
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid");
      icon.style.color = "#ff6b6b";
      showToast("Displaying Wishlist Items");
      
      // Temporary state filter
      renderProducts(true);
    } else {
      icon.classList.remove("fa-solid");
      icon.classList.add("fa-regular");
      icon.style.color = "";
      renderProducts();
    }
  });

  // Sort Selector
  sortSelectEl.addEventListener("change", (e) => {
    state.sortOrder = e.target.value;
    renderProducts();
  });

  // Coupon Clipboard action
  copyCouponBtn.addEventListener("click", () => {
    navigator.clipboard.writeText("AETHERIS10")
      .then(() => {
        showToast("Anniversary coupon 'AETHERIS10' copied to clipboard!", "success");
      })
      .catch(err => {
        console.error("Clipboard error: ", err);
        showToast("Unable to copy coupon code automatically.");
      });
  });

  // Newsletter form submission
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("newsletter-email");
    if (emailInput.value) {
      showToast(`Welcome! ${emailInput.value} has been added to our exclusive list.`, "success");
      emailInput.value = "";
    }
  });
}

// --- RENDER PRODUCTS GRID ---
function renderProducts(onlyWishlist = false) {
  productsGridEl.innerHTML = "";

  // Filter
  let filtered = PRODUCTS.filter(p => {
    const matchesCategory = (state.activeCategory === "all" || p.category === state.activeCategory);
    const matchesSearch = p.name.toLowerCase().includes(state.searchQuery) || 
                          p.category.toLowerCase().includes(state.searchQuery) ||
                          p.desc.toLowerCase().includes(state.searchQuery);
    const matchesWishlist = !onlyWishlist || state.wishlist.includes(p.id);
    return matchesCategory && matchesSearch && matchesWishlist;
  });

  // Sort
  if (state.sortOrder === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortOrder === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sortOrder === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // Display
  if (filtered.length === 0) {
    productsGridEl.innerHTML = `
      <div class="no-results">
        <i class="fa-solid fa-face-frown-open"></i>
        <h3>No Timepieces Found</h3>
        <p>Try refining your search keyword or selecting a different category filter.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(p => {
    const isWishlisted = state.wishlist.includes(p.id);
    const isCarted = state.cart.some(item => item.product.id === p.id);
    
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
      <button class="product-wishlist-btn ${isWishlisted ? 'active' : ''}" data-id="${p.id}" aria-label="Toggle Wishlist">
        <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
      </button>
      
      <div class="product-img-box">
        <img src="${p.image}" alt="${p.name}">
        <div class="product-quick-view">
          <button class="quick-view-btn" data-id="${p.id}">Quick View</button>
        </div>
      </div>
      
      <div class="product-info">
        <span class="product-category">${p.category}</span>
        <h3 class="product-name">${p.name}</h3>
        
        <div class="product-rating">
          ${renderStars(p.rating)}
          <span>(${p.reviews})</span>
        </div>
        
        <div class="product-footer">
          <div class="product-price-box">
            <span class="product-price">$${p.price.toLocaleString()}</span>
            ${p.oldPrice ? `<span class="product-old-price">$${p.oldPrice.toLocaleString()}</span>` : ""}
          </div>
          
          <button class="add-cart-btn ${isCarted ? 'added' : ''}" data-id="${p.id}">
            <i class="fa-solid ${isCarted ? 'fa-circle-check' : 'fa-cart-plus'}"></i>
            <span>${isCarted ? 'Added' : 'Add To Cart'}</span>
          </button>
        </div>
      </div>
    `;
    
    // Wire up events internally for components inside grid
    card.querySelector(".product-wishlist-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      toggleWishlist(p.id);
    });

    card.querySelector(".quick-view-btn").addEventListener("click", () => {
      openQuickView(p.id);
    });

    card.querySelector(".add-cart-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(p.id);
    });

    productsGridEl.appendChild(card);
  });
}

function renderStars(rating) {
  let starsHTML = "";
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      starsHTML += '<i class="fa-solid fa-star"></i>';
    } else if (i === fullStars + 1 && hasHalf) {
      starsHTML += '<i class="fa-solid fa-star-half-stroke"></i>';
    } else {
      starsHTML += '<i class="fa-regular fa-star"></i>';
    }
  }
  return starsHTML;
}

// --- WISH LIST LOGIC ---
function toggleWishlist(productId) {
  const index = state.wishlist.indexOf(productId);
  if (index === -1) {
    state.wishlist.push(productId);
    showToast("Added item to Wishlist", "success");
  } else {
    state.wishlist.splice(index, 1);
    showToast("Removed item from Wishlist");
  }
  saveWishlist();
  updateWishlistUI();
  
  // Re-render target card icon changes
  const wishlistBtnEl = document.querySelector(`.product-wishlist-btn[data-id="${productId}"]`);
  if (wishlistBtnEl) {
    wishlistBtnEl.classList.toggle("active");
    const icon = wishlistBtnEl.querySelector("i");
    icon.classList.toggle("fa-solid");
    icon.classList.toggle("fa-regular");
  }
}

function updateWishlistUI() {
  const count = state.wishlist.length;
  if (count > 0) {
    wishlistBadgeEl.innerText = count;
    wishlistBadgeEl.style.display = "flex";
  } else {
    wishlistBadgeEl.style.display = "none";
  }
}

// --- SHOPPING CART LOGIC ---
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = state.cart.find(item => item.product.id === productId);
  if (existing) {
    existing.quantity += 1;
    showToast(`Increased quantity of ${product.name}`, "success");
  } else {
    state.cart.push({ product, quantity: 1 });
    showToast(`Added ${product.name} to Cart`, "success");
  }

  saveCart();
  updateCartUI();
  renderProducts(); // Update the main display states
  
  // Slide open the cart drawer for clear feedback
  cartOverlayEl.classList.add("active");
}

function updateCartQty(productId, amount) {
  const item = state.cart.find(item => item.product.id === productId);
  if (!item) return;

  item.quantity += amount;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  
  saveCart();
  updateCartUI();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(item => item.product.id !== productId);
  showToast("Removed item from cart");
  saveCart();
  updateCartUI();
  renderProducts(); // Refresh main catalog buttons
}

function updateCartUI() {
  // Update totals
  let subtotal = 0;
  let itemsCount = 0;
  
  cartBodyEl.innerHTML = "";

  if (state.cart.length === 0) {
    cartBodyEl.innerHTML = `
      <div class="cart-empty-message">
        <i class="fa-solid fa-hourglass-empty cart-empty-icon"></i>
        <p>Your shopping bag is empty.</p>
      </div>
    `;
    cartBadgeEl.style.display = "none";
    cartSubtotalEl.innerText = "$0.00";
    cartTotalEl.innerText = "$0.00";
    return;
  }

  state.cart.forEach(item => {
    subtotal += item.product.price * item.quantity;
    itemsCount += item.quantity;

    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";
    itemEl.innerHTML = `
      <div class="cart-item-img">
        <img src="${item.product.image}" alt="${item.product.name}">
      </div>
      <div class="cart-item-details">
        <h4 class="cart-item-name">${item.product.name}</h4>
        <span class="cart-item-price">$${(item.product.price * item.quantity).toLocaleString()}</span>
        <div class="cart-qty-ctrl">
          <button class="cart-qty-btn dec-qty"><i class="fa-solid fa-minus"></i></button>
          <span class="cart-qty-val">${item.quantity}</span>
          <button class="cart-qty-btn inc-qty"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>
      <button class="cart-item-remove" aria-label="Remove item"><i class="fa-solid fa-trash-can"></i></button>
    `;

    // Bind item specific actions
    itemEl.querySelector(".dec-qty").addEventListener("click", () => updateCartQty(item.product.id, -1));
    itemEl.querySelector(".inc-qty").addEventListener("click", () => updateCartQty(item.product.id, 1));
    itemEl.querySelector(".cart-item-remove").addEventListener("click", () => removeFromCart(item.product.id));

    cartBodyEl.appendChild(itemEl);
  });

  // Calculate totals and render
  cartSubtotalEl.innerText = `$${subtotal.toLocaleString()}`;
  cartTotalEl.innerText = `$${subtotal.toLocaleString()}`;
  
  cartBadgeEl.innerText = itemsCount;
  cartBadgeEl.style.display = "flex";
}

// --- QUICK VIEW MODAL RENDERING ---
function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const isCarted = state.cart.some(item => item.product.id === productId);

  modalContentEl.innerHTML = `
    <div class="modal-img-box">
      <img src="${product.image}" alt="${product.name}">
    </div>
    
    <div class="modal-info">
      <span class="product-category" style="margin-bottom: 4px;">${product.category}</span>
      <h2 class="modal-title">${product.name}</h2>
      
      <div class="product-rating" style="margin-bottom: 20px;">
        ${renderStars(product.rating)}
        <span>(${product.reviews} reviews)</span>
      </div>
      
      <p class="modal-desc">${product.desc}</p>
      
      <div class="modal-meta">
        ${Object.entries(product.specs).map(([key, val]) => `
          <div class="modal-meta-line">
            <span>${key}:</span>
            <span>${val}</span>
          </div>
        `).join("")}
      </div>
      
      <div class="modal-footer">
        <span class="modal-price">$${product.price.toLocaleString()}</span>
        <button id="modal-add-btn" class="btn-primary" style="padding: 12px 30px;">
          <i class="fa-solid ${isCarted ? 'fa-circle-check' : 'fa-cart-plus'}"></i>
          <span style="margin-left: 8px;">${isCarted ? 'Added to Cart' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  `;

  // Bind modal button action
  const modalAddBtn = document.getElementById("modal-add-btn");
  modalAddBtn.addEventListener("click", () => {
    addToCart(productId);
    modalOverlayEl.classList.remove("active");
  });

  modalOverlayEl.classList.add("active");
}

// --- SPECIAL OFFER COUNTDOWN TIMER ---
function startCountdown() {
  // Set target date (e.g. 5 days from now for constant active timer feel)
  let targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 5);
  targetDate.setHours(targetDate.getHours() + 4);
  targetDate.setMinutes(targetDate.getMinutes() + 18);

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minsEl = document.getElementById("minutes");
  const secsEl = document.getElementById("seconds");

  function updateTimer() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      clearInterval(timerInterval);
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.innerText = String(d).padStart(2, "0");
    hoursEl.innerText = String(h).padStart(2, "0");
    minsEl.innerText = String(m).padStart(2, "0");
    secsEl.innerText = String(s).padStart(2, "0");
  }

  updateTimer(); // run once immediately
  const timerInterval = setInterval(updateTimer, 1000);
}

// --- TOAST ALERTS SYSTEM ---
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = "toast";
  
  const isSuccess = type === "success";
  toast.innerHTML = `
    <i class="fa-solid ${isSuccess ? 'fa-circle-check success' : 'fa-circle-info'} toast-icon"></i>
    <span class="toast-msg">${message}</span>
  `;

  toastContainerEl.appendChild(toast);

  // Auto-remove toast after transition
  setTimeout(() => {
    toast.style.animation = "toastOut 0.35s ease-in forwards";
    toast.addEventListener("animationend", () => {
      toast.remove();
    });
  }, 3000);
}

// Add CSS keyframe for toast closing dynamically
const toastStyleSheet = document.createElement("style");
toastStyleSheet.innerHTML = `
  @keyframes toastOut {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-20px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(toastStyleSheet);

// Run initialization
document.addEventListener("DOMContentLoaded", init);
