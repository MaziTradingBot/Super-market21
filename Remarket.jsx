import { useState, useEffect, useRef, useCallback } from "react";

/* ─── GOOGLE FONTS ─────────────────────────────────────────────────────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Syne:wght@400;500;600;700;800&display=swap');
    :root {
      --bg: #04080f;
      --surface: #0c1524;
      --surface2: #111d2e;
      --surface3: #182438;
      --border: rgba(255,255,255,0.08);
      --border2: rgba(255,255,255,0.12);
      --gold: #f0b429;
      --gold2: #fcd34d;
      --gold-dim: rgba(240,180,41,0.12);
      --emerald: #10b981;
      --emerald-dim: rgba(16,185,129,0.12);
      --blue: #3b82f6;
      --blue-dim: rgba(59,130,246,0.12);
      --text: #f0f4f8;
      --text2: #94a3b8;
      --text3: #4a5568;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: var(--bg); font-family: 'Syne', sans-serif; color: var(--text); overflow-x: hidden; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--surface); }
    ::-webkit-scrollbar-thumb { background: var(--surface3); border-radius: 4px; }

    .display { font-family: 'Cormorant Garamond', serif; }
    .grain { position: fixed; inset: 0; pointer-events: none; z-index: 9999; opacity: 0.035;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size: 200px; }
    
    @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes shimmer { 0%,100% { opacity:0.5; } 50% { opacity:1; } }
    @keyframes pulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.05); } }
    @keyframes spin { from { transform:rotate(0); } to { transform:rotate(360deg); } }
    @keyframes scanline { 0% { top:-10%; } 100% { top:110%; } }
    @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
    @keyframes bounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-4px); } }
    @keyframes glow { 0%,100% { box-shadow:0 0 20px rgba(240,180,41,0.2); } 50% { box-shadow:0 0 40px rgba(240,180,41,0.5); } }

    .fade-up { animation: fadeUp 0.6s ease both; }
    .fade-in { animation: fadeIn 0.4s ease both; }
    .d1 { animation-delay: 0.1s; }
    .d2 { animation-delay: 0.2s; }
    .d3 { animation-delay: 0.3s; }
    .d4 { animation-delay: 0.4s; }
    .d5 { animation-delay: 0.5s; }
    .d6 { animation-delay: 0.6s; }

    .hero-glow { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; }
    .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
    .card-hover:hover { transform: translateY(-4px); box-shadow: 0 24px 48px rgba(0,0,0,0.4); }
    .btn-gold { background: linear-gradient(135deg, #f0b429, #d97706); color:#0c0a00; font-weight:700; 
      transition: all 0.2s; border-radius:10px; }
    .btn-gold:hover { transform:translateY(-1px); box-shadow:0 8px 24px rgba(240,180,41,0.35); }
    .btn-gold:active { transform:translateY(0); }
    .btn-outline { border: 1px solid var(--border2); background:transparent; color:var(--text2); 
      transition: all 0.2s; border-radius:10px; }
    .btn-outline:hover { border-color:var(--gold); color:var(--gold); background:var(--gold-dim); }
    .tag { display:inline-flex; align-items:center; gap:4px; padding:3px 10px; border-radius:99px; font-size:11px; font-weight:700; letter-spacing:0.04em; }
    .tag-gold { background:var(--gold-dim); color:var(--gold); border:1px solid rgba(240,180,41,0.3); }
    .tag-green { background:var(--emerald-dim); color:var(--emerald); border:1px solid rgba(16,185,129,0.3); }
    .tag-blue { background:var(--blue-dim); color:var(--blue); border:1px solid rgba(59,130,246,0.3); }
    .tag-gray { background:rgba(255,255,255,0.05); color:var(--text2); border:1px solid var(--border); }
    .divider { height:1px; background:linear-gradient(90deg, transparent, var(--border2), transparent); }
    
    .nav-link { color:var(--text2); font-size:14px; font-weight:500; text-decoration:none; 
      transition:color 0.2s; padding:6px 0; position:relative; }
    .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1px; 
      background:var(--gold); transition:width 0.2s; }
    .nav-link:hover { color:var(--text); }
    .nav-link:hover::after { width:100%; }
    .nav-link.active { color:var(--gold); }
    .nav-link.active::after { width:100%; }

    .product-card { background:var(--surface); border:1px solid var(--border); border-radius:16px; overflow:hidden; }
    .product-card:hover .card-img { transform:scale(1.04); }
    .card-img { transition: transform 0.5s ease; }

    .filter-chip { padding:6px 14px; border-radius:99px; font-size:12px; font-weight:600; cursor:pointer;
      border:1px solid var(--border); background:transparent; color:var(--text2); transition:all 0.2s; }
    .filter-chip:hover { border-color:var(--gold); color:var(--gold); }
    .filter-chip.active { background:var(--gold-dim); border-color:rgba(240,180,41,0.4); color:var(--gold); }

    .battery-bar { height:6px; border-radius:99px; background:rgba(255,255,255,0.08); overflow:hidden; }
    .battery-fill { height:100%; border-radius:99px; transition:width 1.2s ease; }
    .bat-high { background: linear-gradient(90deg, #10b981, #34d399); }
    .bat-med { background: linear-gradient(90deg, #f59e0b, #fcd34d); }
    .bat-low { background: linear-gradient(90deg, #ef4444, #f97316); }

    .inspection-row { display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid var(--border); }
    .inspection-row:last-child { border-bottom:none; }
    .check-circle { width:20px; height:20px; border-radius:50%; background:var(--emerald-dim); border:1px solid rgba(16,185,129,0.4);
      display:flex; align-items:center; justify-content:center; flex-shrink:0; }

    .chat-bubble-ai { background:var(--surface2); border-radius:16px 16px 16px 4px; padding:10px 14px; color:var(--text); font-size:13px; line-height:1.5; }
    .chat-bubble-user { background:linear-gradient(135deg,#f0b429,#d97706); border-radius:16px 16px 4px 16px; padding:10px 14px; color:#0c0a00; font-size:13px; font-weight:600; }
    .chat-dot { width:7px; height:7px; border-radius:50%; background:var(--gold); animation:bounce 1s ease infinite; }
    
    .hero-scanline { position:absolute; left:0; right:0; height:60px; background:linear-gradient(180deg,rgba(240,180,41,0)0%,rgba(240,180,41,0.04)50%,rgba(240,180,41,0)100%); pointer-events:none; animation:scanline 4s linear infinite; }
    
    .mobile-nav { display:none; }
    @media (max-width:768px) {
      .desktop-nav { display:none; }
      .mobile-nav { display:flex; }
    }

    .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.8); backdrop-filter:blur(8px); z-index:200; display:flex; align-items:center; justify-content:center; padding:16px; }
    .modal-box { background:var(--surface); border:1px solid var(--border2); border-radius:20px; max-width:900px; width:100%; max-height:90vh; overflow-y:auto; }

    .floating-badge { position:absolute; background:var(--surface); border:1px solid var(--border2); border-radius:12px; padding:10px 14px; box-shadow:0 8px 32px rgba(0,0,0,0.5); }

    .trust-stripe { background:linear-gradient(135deg,rgba(240,180,41,0.06)0%,rgba(16,185,129,0.04)100%); border-top:1px solid var(--border); border-bottom:1px solid var(--border); }
    .section-label { font-size:11px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--gold); }

    .input-field { background:var(--surface2); border:1px solid var(--border2); border-radius:10px; padding:10px 14px; color:var(--text); font-family:inherit; font-size:13px; outline:none; transition:border-color 0.2s; width:100%; }
    .input-field:focus { border-color:var(--gold); }
    .input-field::placeholder { color:var(--text3); }

    .drawer-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.7); backdrop-filter:blur(4px); z-index:100; }
    .drawer { position:fixed; right:0; top:0; bottom:0; width:320px; background:var(--surface); border-left:1px solid var(--border2); z-index:101; overflow-y:auto; transform:translateX(100%); transition:transform 0.3s ease; }
    .drawer.open { transform:translateX(0); }
    
    .qty-btn { width:32px; height:32px; border-radius:8px; background:var(--surface3); border:1px solid var(--border); color:var(--text); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.2s; font-size:16px; }
    .qty-btn:hover { border-color:var(--gold); color:var(--gold); }

    .price-tag { font-family:'Cormorant Garamond',serif; font-weight:700; }
    .hero-bg { background: radial-gradient(ellipse 80% 60% at 50% -20%, rgba(240,180,41,0.08) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(16,185,129,0.04) 0%, transparent 70%), var(--bg); }
    
    .tab-underline { position:relative; padding-bottom:8px; }
    .tab-underline::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:var(--gold); border-radius:2px; transform:scaleX(0); transition:transform 0.2s; }
    .tab-underline.tab-active::after { transform:scaleX(1); }
    .tab-underline.tab-active { color:var(--gold); }
  `}</style>
);

/* ─── DATA ─────────────────────────────────────────────────────────────────── */
const GRADES = {
  "Certified Like-New": { color: "gold", dot: "#f0b429", short: "CLN", desc: "Flawless, battery ≥95%" },
  "Open Box Pristine":  { color: "blue",  dot: "#3b82f6", short: "OBP", desc: "Unopened feel, battery ≥92%" },
  "Excellent+":         { color: "green", dot: "#10b981", short: "EX+", desc: "Light use only, battery ≥87%" },
};

const PRODUCTS = [
  { id:1,  name:"iPhone 15 Pro Max", brand:"Apple",   category:"phones",   grade:"Certified Like-New", storage:"256GB", ram:"8GB",  price:879,  original:1199, battery:96, color:"Natural Titanium", img:"📱", imgBg:"from-slate-700 to-slate-900", inStock:3,  rating:4.9, reviews:218, processor:"A17 Pro",      os:"iOS 17",  screen:'6.7"', weight:"221g", ports:"USB-C", year:2023 },
  { id:2,  name:"Samsung Galaxy S24 Ultra", brand:"Samsung", category:"phones", grade:"Certified Like-New", storage:"512GB", ram:"12GB", price:749,  original:1299, battery:94, color:"Titanium Black",  img:"📱", imgBg:"from-zinc-700 to-zinc-900",  inStock:5,  rating:4.8, reviews:143, processor:"Snapdragon 8 Gen 3", os:"Android 14", screen:'6.8"', weight:"232g", ports:"USB-C", year:2024 },
  { id:3,  name:"MacBook Pro 14\" M3 Pro", brand:"Apple", category:"laptops",  grade:"Open Box Pristine",  storage:"512GB", ram:"18GB", price:1849, original:2199, battery:98, color:"Space Black",     img:"💻", imgBg:"from-gray-700 to-gray-900",   inStock:2,  rating:5.0, reviews:67,  processor:"Apple M3 Pro",os:"macOS Sonoma", screen:'14.2"', weight:"1.61kg", ports:"Thunderbolt 4", year:2023 },
  { id:4,  name:"iPad Pro 13\" M4", brand:"Apple",     category:"tablets",  grade:"Certified Like-New", storage:"256GB", ram:"8GB",  price:999,  original:1299, battery:97, color:"Space Gray",      img:"📟", imgBg:"from-stone-700 to-stone-900",  inStock:4,  rating:4.9, reviews:89,  processor:"Apple M4",  os:"iPadOS 17", screen:'13"', weight:"579g", ports:"Thunderbolt 4", year:2024 },
  { id:5,  name:"Google Pixel 8 Pro", brand:"Google",  category:"phones",   grade:"Excellent+",          storage:"128GB", ram:"12GB", price:529,  original:999,  battery:88, color:"Obsidian",        img:"📱", imgBg:"from-neutral-700 to-neutral-900",inStock:7,  rating:4.7, reviews:201, processor:"Google Tensor G3", os:"Android 14", screen:'6.7"', weight:"213g", ports:"USB-C", year:2023 },
  { id:6,  name:"iPhone 14 Pro", brand:"Apple",        category:"phones",   grade:"Open Box Pristine",  storage:"256GB", ram:"6GB",  price:649,  original:999,  battery:93, color:"Deep Purple",     img:"📱", imgBg:"from-purple-900 to-purple-950", inStock:6,  rating:4.8, reviews:312, processor:"A16 Bionic", os:"iOS 17", screen:'6.1"', weight:"206g", ports:"Lightning", year:2022 },
  { id:7,  name:"Dell XPS 15 OLED", brand:"Dell",      category:"laptops",  grade:"Excellent+",          storage:"512GB", ram:"16GB", price:1199, original:1799, battery:87, color:"Platinum Silver",  img:"💻", imgBg:"from-slate-600 to-slate-800",  inStock:3,  rating:4.6, reviews:54,  processor:"Intel Core Ultra 7", os:"Windows 11", screen:'15.6"', weight:"1.86kg", ports:"Thunderbolt 4", year:2023 },
  { id:8,  name:"Samsung Galaxy Tab S9+", brand:"Samsung", category:"tablets", grade:"Certified Like-New", storage:"256GB", ram:"12GB", price:699,  original:999,  battery:95, color:"Beige",          img:"📟", imgBg:"from-amber-900 to-amber-950", inStock:4,  rating:4.8, reviews:76,  processor:"Snapdragon 8 Gen 2", os:"Android 13", screen:'12.4"', weight:"586g", ports:"USB-C", year:2023 },
  { id:9,  name:"iPhone 15", brand:"Apple",            category:"phones",   grade:"Certified Like-New", storage:"128GB", ram:"6GB",  price:679,  original:799,  battery:99, color:"Pink",            img:"📱", imgBg:"from-rose-800 to-rose-950",   inStock:8,  rating:4.9, reviews:167, processor:"A16 Bionic", os:"iOS 17", screen:'6.1"', weight:"171g", ports:"USB-C", year:2023 },
  { id:10, name:"MacBook Air M2", brand:"Apple",        category:"laptops",  grade:"Open Box Pristine",  storage:"256GB", ram:"8GB",  price:899,  original:1099, battery:97, color:"Midnight",        img:"💻", imgBg:"from-indigo-900 to-indigo-950",inStock:5,  rating:4.9, reviews:134, processor:"Apple M2",  os:"macOS Sonoma", screen:'13.6"', weight:"1.24kg", ports:"Thunderbolt 3", year:2022 },
  { id:11, name:"OnePlus 12", brand:"OnePlus",          category:"phones",   grade:"Excellent+",          storage:"256GB", ram:"12GB", price:449,  original:799,  battery:91, color:"Flowy Emerald",   img:"📱", imgBg:"from-emerald-900 to-emerald-950",inStock:9, rating:4.7, reviews:88,  processor:"Snapdragon 8 Gen 3", os:"Android 14", screen:'6.82"', weight:"220g", ports:"USB-C", year:2024 },
  { id:12, name:"iPad Air M2", brand:"Apple",           category:"tablets",  grade:"Excellent+",          storage:"128GB", ram:"8GB",  price:579,  original:749,  battery:89, color:"Blue",            img:"📟", imgBg:"from-blue-900 to-blue-950",   inStock:6,  rating:4.8, reviews:103, processor:"Apple M2",  os:"iPadOS 17", screen:'11"', weight:"462g", ports:"USB-C", year:2024 },
];

const INSPECT_POINTS = [
  { icon:"🔋", label:"Battery Health", detail:"Verified via OEM diagnostics" },
  { icon:"🖥️", label:"Display Quality", detail:"Dead pixel, burn-in, ghosting test" },
  { icon:"👆", label:"Touch & Biometrics", detail:"Face ID, Touch ID, screen response" },
  { icon:"📷", label:"All Cameras", detail:"Photo & video quality verified" },
  { icon:"🔊", label:"Audio System", detail:"Speaker, earpiece, microphone test" },
  { icon:"📡", label:"Connectivity", detail:"WiFi, BT, Cellular, GPS signal" },
  { icon:"🔌", label:"All Ports & Buttons", detail:"Charging, volume, power tested" },
  { icon:"🧹", label:"Deep Sanitized", detail:"Professional cleaning certificate" },
  { icon:"🔒", label:"Activation Lock Clear", detail:"iCloud/Google lock removed & verified" },
  { icon:"🗑️", label:"Factory Reset", detail:"Data wipe, fresh OS install" },
];

/* ─── HELPERS ──────────────────────────────────────────────────────────────── */
const fmt = (n) => `$${n.toLocaleString()}`;
const pct = (a, b) => Math.round((1 - a / b) * 100);
const GradeTag = ({ grade, small }) => {
  const g = GRADES[grade];
  return (
    <span className={`tag tag-${g.color} ${small ? "" : ""}`}>
      {grade}
    </span>
  );
};
const BatteryBar = ({ pct: p }) => {
  const cls = p >= 90 ? "bat-high" : p >= 80 ? "bat-med" : "bat-low";
  const col = p >= 90 ? "#10b981" : p >= 80 ? "#f59e0b" : "#ef4444";
  return (
    <div>
      <div className="battery-bar">
        <div className={`battery-fill ${cls}`} style={{ width: `${p}%` }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        <span style={{ fontSize: 11, color: "var(--text2)" }}>Battery Health</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: col }}>{p}%</span>
      </div>
    </div>
  );
};
const StarRating = ({ rating, reviews, small }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
    <div style={{ display: "flex", gap: 1 }}>
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{ fontSize: small ? 10 : 12, color: s <= Math.round(rating) ? "#f0b429" : "var(--border2)" }}>★</span>
      ))}
    </div>
    <span style={{ fontSize: small ? 10 : 12, color: "var(--text2)", fontWeight: 600 }}>{rating}</span>
    {reviews && <span style={{ fontSize: small ? 10 : 11, color: "var(--text3)" }}>({reviews})</span>}
  </div>
);
const TrustRow = ({ icon, text }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <span style={{ fontSize: 14 }}>{icon}</span>
    <span style={{ fontSize: 12, color: "var(--text2)", fontWeight: 500 }}>{text}</span>
  </div>
);

/* ─── NAV ──────────────────────────────────────────────────────────────────── */
const Nav = ({ page, setPage, cart, setCartOpen, wishlist }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = cart.reduce((a, b) => a + b.qty, 0);

  return (
    <>
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(4,8,15,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", padding: "0 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          {/* Logo */}
          <button onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#f0b429,#d97706)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚡</div>
            <div style={{ textAlign: "left" }}>
              <div className="display" style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", lineHeight: 1 }}>ReMarket</div>
              <div style={{ fontSize: 9, color: "var(--gold)", letterSpacing: "0.15em", fontWeight: 700, textTransform: "uppercase" }}>Premium Electronics</div>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {[["home","Home"],["shop","Shop"],["about","How It Works"]].map(([p,l]) => (
              <button key={p} onClick={() => setPage(p)} className={`nav-link ${page===p?"active":""}`} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>{l}</button>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setPage("shop")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text2)", padding: 8, borderRadius: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
            <button onClick={() => setPage("wishlist")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text2)", padding: 8, borderRadius: 8, position: "relative" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              {wishlist.length > 0 && <span style={{ position:"absolute", top:4, right:4, width:8, height:8, borderRadius:"50%", background:"var(--gold)" }}/>}
            </button>
            <button onClick={() => setCartOpen(true)} style={{ position: "relative", background: "var(--surface2)", border: "1px solid var(--border2)", borderRadius: 10, padding: "8px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: "var(--text)", fontFamily: "inherit", fontSize: 13, fontWeight: 600 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              Cart
              {cartCount > 0 && <span style={{ background:"var(--gold)", color:"#000", borderRadius:"99px", minWidth:18, height:18, display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,padding:"0 4px" }}>{cartCount}</span>}
            </button>
            <button onClick={() => setMenuOpen(true)} className="mobile-nav" style={{ background:"none",border:"none",cursor:"pointer",color:"var(--text)",padding:8 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",zIndex:150,display:"flex",flexDirection:"column",padding:24 }}>
          <div style={{ background:"var(--surface)",borderRadius:20,padding:24,border:"1px solid var(--border2)" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24 }}>
              <span className="display" style={{ fontSize:20,fontWeight:700 }}>Menu</span>
              <button onClick={() => setMenuOpen(false)} style={{ background:"none",border:"none",cursor:"pointer",color:"var(--text2)",fontSize:24 }}>×</button>
            </div>
            {[["home","🏠 Home"],["shop","🛍️ Shop"],["about","🔍 How It Works"],["wishlist","❤️ Wishlist"]].map(([p,l]) => (
              <button key={p} onClick={() => { setPage(p); setMenuOpen(false); }} style={{ width:"100%",display:"block",textAlign:"left",padding:"14px 0",background:"none",border:"none",borderBottom:"1px solid var(--border)",cursor:"pointer",color:"var(--text)",fontSize:15,fontWeight:600,fontFamily:"inherit" }}>{l}</button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

/* ─── TRUST STRIPE ─────────────────────────────────────────────────────────── */
const TrustStripe = () => (
  <div className="trust-stripe" style={{ padding:"12px 24px" }}>
    <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", flexWrap:"wrap", gap:24, justifyContent:"center" }}>
      {[["🛡️","12-Month Warranty Included"],["🔄","30-Day Money-Back Guarantee"],["🔬","30-Point Inspection Certified"],["🚚","Free Insured Shipping"],["🔒","iCloud/Google Lock Cleared"],["💳","Pay in 4 Installments"]].map(([icon,text]) => (
        <TrustRow key={text} icon={icon} text={text} />
      ))}
    </div>
  </div>
);

/* ─── HOME PAGE ────────────────────────────────────────────────────────────── */
const HomePage = ({ setPage, setSelectedProduct, addToCart, wishlist, toggleWishlist }) => {
  const featured = PRODUCTS.slice(0, 4);
  const [hoveredStat, setHoveredStat] = useState(null);

  return (
    <div>
      {/* Hero */}
      <section className="hero-bg" style={{ position:"relative", overflow:"hidden", padding:"80px 24px 100px" }}>
        <div className="hero-scanline" />
        <div className="hero-glow" style={{ width:600, height:600, background:"radial-gradient(circle,rgba(240,180,41,0.12)0%,transparent 70%)", top:-200, left:"50%", transform:"translateX(-50%)" }}/>
        <div style={{ maxWidth:1100, margin:"0 auto", textAlign:"center" }}>
          <div className="fade-up d1">
            <span className="tag tag-gold" style={{ fontSize:11, marginBottom:16, display:"inline-flex" }}>⚡ Certified Premium Resale · Est. 2021</span>
          </div>
          <h1 className="display fade-up d2" style={{ fontSize:"clamp(40px,7vw,88px)", fontWeight:700, lineHeight:1.05, marginTop:16, marginBottom:24 }}>
            Premium Devices.<br/>
            <span style={{ background:"linear-gradient(135deg,#f0b429,#fcd34d)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Proven Perfect.
            </span>
          </h1>
          <p className="fade-up d3" style={{ fontSize:17, color:"var(--text2)", maxWidth:560, margin:"0 auto 40px", lineHeight:1.7 }}>
            Every device is individually inspected, graded, and certified by licensed technicians. Buy with absolute confidence — or your money back.
          </p>
          <div className="fade-up d4" style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => setPage("shop")} className="btn-gold" style={{ padding:"14px 32px", fontSize:15, display:"flex", alignItems:"center", gap:8 }}>
              Shop All Devices
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6"/></svg>
            </button>
            <button onClick={() => setPage("about")} className="btn-outline" style={{ padding:"14px 32px", fontSize:15 }}>
              How We Certify
            </button>
          </div>

          {/* Stats */}
          <div className="fade-up d5" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))", gap:16, maxWidth:700, margin:"60px auto 0" }}>
            {[["12,400+","Devices Sold"],["4.9★","Avg. Rating"],["30-Pt","Inspection"],["99%","Satisfaction"]].map(([val,label],i) => (
              <div key={label} onMouseEnter={() => setHoveredStat(i)} onMouseLeave={() => setHoveredStat(null)}
                style={{ background:"var(--surface)", border:`1px solid ${hoveredStat===i?"var(--gold)":"var(--border)"}`, borderRadius:16, padding:"20px 12px", transition:"all 0.3s", transform:hoveredStat===i?"translateY(-4px)":"none" }}>
                <div className="display" style={{ fontSize:28, fontWeight:700, color:hoveredStat===i?"var(--gold)":"var(--text)", transition:"color 0.3s" }}>{val}</div>
                <div style={{ fontSize:11, color:"var(--text3)", marginTop:4, fontWeight:600, letterSpacing:"0.05em" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustStripe />

      {/* Category Strip */}
      <section style={{ padding:"60px 24px 0" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28 }}>
            <div>
              <p className="section-label" style={{ marginBottom:6 }}>Browse by Category</p>
              <h2 className="display" style={{ fontSize:32, fontWeight:700 }}>What are you looking for?</h2>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:16 }}>
            {[["📱","Smartphones","48 devices","phones"],["💻","Laptops","22 devices","laptops"],["📟","Tablets","18 devices","tablets"],["⌚","Wearables","Coming Soon",""]].map(([icon,cat,count,filter]) => (
              <button key={cat} onClick={() => { if(filter) setPage("shop"); }} style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:16, padding:"28px 20px", textAlign:"left", cursor:filter?"pointer":"not-allowed", transition:"all 0.3s", display:"block", opacity:filter?1:0.5, width:"100%", fontFamily:"inherit" }}
                onMouseEnter={e => { if(filter) { e.currentTarget.style.borderColor="var(--gold)"; e.currentTarget.style.transform="translateY(-4px)"; }}}
                onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.transform="none"; }}>
                <div style={{ fontSize:36, marginBottom:12 }}>{icon}</div>
                <div style={{ fontWeight:700, fontSize:16, color:"var(--text)" }}>{cat}</div>
                <div style={{ fontSize:12, color:"var(--text3)", marginTop:4, fontWeight:500 }}>{count}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding:"60px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:32, flexWrap:"wrap", gap:16 }}>
            <div>
              <p className="section-label" style={{ marginBottom:6 }}>Handpicked For You</p>
              <h2 className="display" style={{ fontSize:32, fontWeight:700 }}>Featured Devices</h2>
            </div>
            <button onClick={() => setPage("shop")} className="btn-outline" style={{ padding:"10px 20px", fontSize:13 }}>View All →</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:20 }}>
            {featured.map(p => <ProductCard key={p.id} product={p} onView={() => setSelectedProduct(p)} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />)}
          </div>
        </div>
      </section>

      {/* Grade Explainer */}
      <section style={{ padding:"60px 24px", background:"var(--surface)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <p className="section-label" style={{ marginBottom:8 }}>Transparent Quality</p>
            <h2 className="display" style={{ fontSize:36, fontWeight:700, marginBottom:14 }}>Our 3-Tier Grade System</h2>
            <p style={{ color:"var(--text2)", maxWidth:480, margin:"0 auto", fontSize:15, lineHeight:1.7 }}>Every device earns its grade through our 30-point inspection. No guesswork — just clarity.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
            {[
              { grade:"Certified Like-New", color:"gold", icon:"🏅", battery:"≥95%", desc:"Functionally and cosmetically identical to brand-new. May include original accessories. The pinnacle of pre-owned.", perks:["Zero visible scratches","Battery ≥ 95%","Original packaging possible","Highest resale value"] },
              { grade:"Open Box Pristine", color:"blue",  icon:"📦", battery:"≥92%", desc:"Opened but never meaningfully used. All original accessories included. Indistinguishable from new in daily use.", perks:["Micro-scratches only in lab light","Battery ≥ 92%","All accessories present","Ideal mid-tier value"] },
              { grade:"Excellent+",        color:"green", icon:"✨", battery:"≥87%", desc:"Light everyday use with no functional impact. Premium condition at a compelling price point.", perks:["Light use marks only","Battery ≥ 87%","Fully functional","Best value per dollar"] },
            ].map(g => (
              <div key={g.grade} style={{ background:"var(--bg)", border:`1px solid ${g.color==="gold"?"rgba(240,180,41,0.3)":g.color==="blue"?"rgba(59,130,246,0.3)":"rgba(16,185,129,0.3)"}`, borderRadius:20, padding:28, transition:"transform 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.transform="translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform="none"}>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
                  <span style={{ fontSize:28 }}>{g.icon}</span>
                  <GradeTag grade={g.grade} />
                </div>
                <p style={{ fontSize:13, color:"var(--text2)", lineHeight:1.7, marginBottom:20 }}>{g.desc}</p>
                <div style={{ borderTop:"1px solid var(--border)", paddingTop:16, display:"flex", flexDirection:"column", gap:8 }}>
                  {g.perks.map(perk => (
                    <div key={perk} style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ color:"var(--emerald)", fontSize:12 }}>✓</span>
                      <span style={{ fontSize:12, color:"var(--text2)" }}>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspection CTA */}
      <section style={{ padding:"80px 24px", background:"linear-gradient(135deg,rgba(240,180,41,0.06)0%,rgba(16,185,129,0.04)100%)" }}>
        <div style={{ maxWidth:800, margin:"0 auto", textAlign:"center" }}>
          <p className="section-label" style={{ marginBottom:12 }}>Zero Hidden Surprises</p>
          <h2 className="display" style={{ fontSize:"clamp(28px,5vw,52px)", fontWeight:700, marginBottom:20, lineHeight:1.1 }}>Every Device Passes <span style={{ color:"var(--gold)" }}>30 Individual Tests</span></h2>
          <p style={{ color:"var(--text2)", fontSize:16, lineHeight:1.7, marginBottom:40 }}>Before any device is listed, it goes through our complete quality assurance protocol — battery diagnostics, display analysis, connectivity testing, and factory reset verification.</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:12, marginBottom:40 }}>
            {INSPECT_POINTS.map(pt => (
              <div key={pt.label} style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:12, padding:"14px 16px", display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:18 }}>{pt.icon}</span>
                <div style={{ textAlign:"left" }}>
                  <div style={{ fontSize:12, fontWeight:700, color:"var(--text)" }}>{pt.label}</div>
                  <div style={{ fontSize:10, color:"var(--text3)", marginTop:1 }}>{pt.detail}</div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setPage("about")} className="btn-gold" style={{ padding:"14px 32px", fontSize:15 }}>See Full Inspection Process →</button>
        </div>
      </section>

      {/* Reviews */}
      <section style={{ padding:"60px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <p className="section-label" style={{ marginBottom:8 }}>Social Proof</p>
            <h2 className="display" style={{ fontSize:32, fontWeight:700 }}>What Our Buyers Say</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
            {[
              { name:"Jessica T.", loc:"San Francisco, CA", rating:5, device:"iPhone 15 Pro Max · CLN", text:"Honestly couldn't believe it was used. Came in perfect condition, battery at 97%, and the packaging was pristine. Way better than I expected." },
              { name:"Kenji M.", loc:"Tokyo, Japan", rating:5, device:"MacBook Pro M3 · OBP", text:"The inspection certificate gave me confidence before I even opened the box. Device is flawless. ReMarket is now my go-to for Apple devices." },
              { name:"Sarah O.", loc:"London, UK", rating:5, device:"Samsung S24 Ultra · CLN", text:"Returned a phone once for a minor issue and they handled it in 24 hours, no questions. The 30-day guarantee is real. Will always buy here." },
              { name:"Marcus L.", loc:"New York, NY", rating:5, device:"iPad Pro M4 · CLN", text:"The battery health visualization on the product page sold me. 97% — I've seen new iPads with less. Phenomenal transparency." },
              { name:"Amara N.", loc:"Lagos, Nigeria", rating:5, device:"iPhone 14 Pro · OBP", text:"IMEI check matched perfectly, iCloud clear, iOS fresh install. This is how used devices should be sold. Five stars isn't enough." },
              { name:"Daniel C.", loc:"Sydney, Australia", rating:5, device:"Google Pixel 8 Pro · EX+", text:"Bought the Excellent+ grade expecting some wear. There was literally nothing visible. Pays to read their grade descriptions carefully — they're accurate." },
            ].map(r => (
              <div key={r.name} style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:16, padding:24 }}>
                <StarRating rating={r.rating} />
                <p style={{ fontSize:13, color:"var(--text2)", lineHeight:1.7, margin:"14px 0", fontStyle:"italic" }}>"{r.text}"</p>
                <div className="divider" style={{ margin:"14px 0" }} />
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:"var(--text)" }}>{r.name}</div>
                    <div style={{ fontSize:11, color:"var(--text3)" }}>{r.loc}</div>
                  </div>
                  <span className="tag tag-gray" style={{ fontSize:10 }}>{r.device}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer setPage={setPage} />
    </div>
  );
};

/* ─── PRODUCT CARD ─────────────────────────────────────────────────────────── */
const ProductCard = ({ product: p, onView, addToCart, wishlist, toggleWishlist }) => {
  const isWished = wishlist.includes(p.id);
  const savings = pct(p.price, p.original);
  return (
    <div className="product-card card-hover" style={{ cursor:"pointer" }}>
      {/* Image */}
      <div onClick={onView} style={{ position:"relative", height:200, overflow:"hidden", background:`linear-gradient(135deg, var(--surface2), var(--surface3))`, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ fontSize:72, filter:"drop-shadow(0 8px 24px rgba(0,0,0,0.5))" }} className="card-img">{p.img}</div>
        <div style={{ position:"absolute", top:12, left:12 }}><GradeTag grade={p.grade} small /></div>
        {savings > 0 && <div style={{ position:"absolute", top:12, right:12 }}><span className="tag tag-green" style={{ fontSize:10 }}>-{savings}%</span></div>}
        <button onClick={e => { e.stopPropagation(); toggleWishlist(p.id); }} style={{ position:"absolute", bottom:12, right:12, background:"rgba(0,0,0,0.4)", border:"none", borderRadius:"50%", width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color: isWished ? "var(--gold)" : "var(--text2)", fontSize:16 }}>
          {isWished ? "♥" : "♡"}
        </button>
      </div>

      {/* Info */}
      <div onClick={onView} style={{ padding:"16px 16px 0" }}>
        <div style={{ fontSize:11, color:"var(--text3)", fontWeight:600, marginBottom:4, textTransform:"uppercase", letterSpacing:"0.06em" }}>{p.brand}</div>
        <div style={{ fontSize:15, fontWeight:700, color:"var(--text)", marginBottom:8, lineHeight:1.3 }}>{p.name}</div>
        <StarRating rating={p.rating} reviews={p.reviews} small />
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:10 }}>
          <span className="tag tag-gray">{p.storage}</span>
          <span className="tag tag-gray">{p.ram} RAM</span>
          {p.inStock <= 3 && <span className="tag" style={{ background:"rgba(239,68,68,0.1)", color:"#f87171", border:"1px solid rgba(239,68,68,0.2)", fontSize:10 }}>Only {p.inStock} left</span>}
        </div>
        <div style={{ marginTop:12 }}>
          <BatteryBar pct={p.battery} />
        </div>
      </div>

      {/* Price + CTA */}
      <div style={{ padding:16, display:"flex", alignItems:"center", justifyContent:"space-between", borderTop:"1px solid var(--border)", marginTop:12 }}>
        <div>
          <div className="price-tag" style={{ fontSize:22, color:"var(--text)" }}>{fmt(p.price)}</div>
          <div style={{ fontSize:11, color:"var(--text3)", textDecoration:"line-through" }}>{fmt(p.original)}</div>
        </div>
        <button onClick={e => { e.stopPropagation(); addToCart(p); }} className="btn-gold" style={{ padding:"9px 16px", fontSize:12, display:"flex", alignItems:"center", gap:6 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

/* ─── SHOP PAGE ────────────────────────────────────────────────────────────── */
const ShopPage = ({ setSelectedProduct, addToCart, wishlist, toggleWishlist }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [sort, setSort] = useState("featured");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [priceMax, setPriceMax] = useState(2500);
  const [batMin, setBatMin] = useState(80);
  const [storageFilter, setStorageFilter] = useState("all");

  const brands = ["all","Apple","Samsung","Google","Dell","OnePlus"];
  const categories = ["all","phones","laptops","tablets"];
  const grades = ["all",...Object.keys(GRADES)];
  const storages = ["all","128GB","256GB","512GB"];

  const filtered = PRODUCTS.filter(p => {
    if(search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.brand.toLowerCase().includes(search.toLowerCase())) return false;
    if(category !== "all" && p.category !== category) return false;
    if(brand !== "all" && p.brand !== brand) return false;
    if(gradeFilter !== "all" && p.grade !== gradeFilter) return false;
    if(p.price > priceMax) return false;
    if(p.battery < batMin) return false;
    if(storageFilter !== "all" && p.storage !== storageFilter) return false;
    return true;
  }).sort((a,b) => {
    if(sort === "price-asc") return a.price - b.price;
    if(sort === "price-desc") return b.price - a.price;
    if(sort === "battery") return b.battery - a.battery;
    if(sort === "rating") return b.rating - a.rating;
    if(sort === "savings") return pct(a.price,a.original) - pct(b.price,b.original);
    return 0;
  });

  const activeFilterCount = [category!=="all",brand!=="all",gradeFilter!=="all",priceMax<2500,batMin>80,storageFilter!=="all"].filter(Boolean).length;

  const FilterPanel = ({ mobile }) => (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div>
        <p style={{ fontSize:11, fontWeight:700, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:10 }}>Category</p>
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)} style={{ textAlign:"left", padding:"8px 12px", borderRadius:8, background:category===c?"var(--gold-dim)":"transparent", border:`1px solid ${category===c?"rgba(240,180,41,0.3)":"transparent"}`, color:category===c?"var(--gold)":"var(--text2)", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit", textTransform:"capitalize" }}>
              {c === "all" ? "All Categories" : c}
            </button>
          ))}
        </div>
      </div>
      <div className="divider" />
      <div>
        <p style={{ fontSize:11, fontWeight:700, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:10 }}>Brand</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {brands.map(b => (
            <button key={b} onClick={() => setBrand(b)} className={`filter-chip ${brand===b?"active":""}`}>{b === "all" ? "All" : b}</button>
          ))}
        </div>
      </div>
      <div className="divider" />
      <div>
        <p style={{ fontSize:11, fontWeight:700, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:10 }}>Grade</p>
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          {grades.map(g => (
            <button key={g} onClick={() => setGradeFilter(g)} style={{ textAlign:"left", padding:"8px 12px", borderRadius:8, background:gradeFilter===g?"var(--gold-dim)":"transparent", border:`1px solid ${gradeFilter===g?"rgba(240,180,41,0.3)":"transparent"}`, color:gradeFilter===g?"var(--gold)":"var(--text2)", fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:8 }}>
              {g !== "all" && <span style={{ width:8, height:8, borderRadius:"50%", background:GRADES[g].dot, flexShrink:0 }} />}
              {g === "all" ? "All Grades" : g}
            </button>
          ))}
        </div>
      </div>
      <div className="divider" />
      <div>
        <p style={{ fontSize:11, fontWeight:700, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:10 }}>Storage</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {storages.map(s => (
            <button key={s} onClick={() => setStorageFilter(s)} className={`filter-chip ${storageFilter===s?"active":""}`}>{s === "all" ? "Any" : s}</button>
          ))}
        </div>
      </div>
      <div className="divider" />
      <div>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
          <p style={{ fontSize:11, fontWeight:700, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.1em" }}>Max Price</p>
          <span style={{ fontSize:12, fontWeight:700, color:"var(--text)" }}>{fmt(priceMax)}</span>
        </div>
        <input type="range" min={200} max={2500} value={priceMax} onChange={e => setPriceMax(+e.target.value)} style={{ width:"100%", accentColor:"var(--gold)" }} />
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
          <span style={{ fontSize:10, color:"var(--text3)" }}>$200</span>
          <span style={{ fontSize:10, color:"var(--text3)" }}>$2,500</span>
        </div>
      </div>
      <div className="divider" />
      <div>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
          <p style={{ fontSize:11, fontWeight:700, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.1em" }}>Min Battery Health</p>
          <span style={{ fontSize:12, fontWeight:700, color:batMin>=90?"var(--emerald)":batMin>=80?"#f59e0b":"#ef4444" }}>{batMin}%+</span>
        </div>
        <input type="range" min={80} max={99} value={batMin} onChange={e => setBatMin(+e.target.value)} style={{ width:"100%", accentColor:"var(--emerald)" }} />
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
          <span style={{ fontSize:10, color:"var(--text3)" }}>80%</span>
          <span style={{ fontSize:10, color:"var(--text3)" }}>99%</span>
        </div>
      </div>
      {activeFilterCount > 0 && (
        <button onClick={() => { setCategory("all");setBrand("all");setGradeFilter("all");setPriceMax(2500);setBatMin(80);setStorageFilter("all"); }} className="btn-outline" style={{ padding:"10px 0", fontSize:13, textAlign:"center" }}>
          Clear All Filters ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <div style={{ minHeight:"100vh" }}>
      <TrustStripe />

      {/* Search + Sort Bar */}
      <div style={{ padding:"24px 24px 0", background:"var(--surface)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", gap:12, flexWrap:"wrap" }}>
          <div style={{ flex:1, minWidth:200, position:"relative" }}>
            <svg style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--text3)" }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input className="input-field" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search devices, brands..." style={{ paddingLeft:36 }} />
          </div>
          <select className="input-field" value={sort} onChange={e => setSort(e.target.value)} style={{ width:"auto", minWidth:160 }}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="battery">Best Battery</option>
            <option value="rating">Highest Rated</option>
            <option value="savings">Best Savings</option>
          </select>
          <button onClick={() => setDrawerOpen(true)} className="btn-outline" style={{ padding:"10px 18px", fontSize:13, display:"flex", alignItems:"center", gap:8, whiteSpace:"nowrap" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
            Filters {activeFilterCount > 0 && <span style={{ background:"var(--gold)", color:"#000", borderRadius:"99px", padding:"0 6px", fontSize:11, fontWeight:800 }}>{activeFilterCount}</span>}
          </button>
        </div>

        {/* Category Chips */}
        <div style={{ maxWidth:1200, margin:"12px auto 0", display:"flex", gap:8, flexWrap:"wrap", paddingBottom:16, borderBottom:"1px solid var(--border)" }}>
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`filter-chip ${category===c?"active":""}`} style={{ textTransform:"capitalize" }}>{c === "all" ? "All" : c}</button>
          ))}
          <div className="divider" style={{ width:1, height:28, margin:"0 4px", background:"var(--border)" }} />
          {brands.filter(b=>b!=="all").map(b => (
            <button key={b} onClick={() => setBrand(b===brand?"all":b)} className={`filter-chip ${brand===b?"active":""}`}>{b}</button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"24px", display:"flex", gap:24 }}>
        {/* Sidebar Filter — Desktop */}
        <div style={{ width:240, flexShrink:0, display:"none" }} className="desktop-sidebar">
          <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:16, padding:20, position:"sticky", top:80 }}>
            <p style={{ fontWeight:700, fontSize:14, marginBottom:20 }}>Refine Results</p>
            <FilterPanel />
          </div>
        </div>

        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ marginBottom:16, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <p style={{ color:"var(--text2)", fontSize:13 }}>
              <span style={{ color:"var(--text)", fontWeight:700 }}>{filtered.length}</span> devices found
            </p>
          </div>
          {filtered.length === 0 ? (
            <div style={{ textAlign:"center", padding:"80px 24px" }}>
              <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
              <p style={{ fontSize:18, fontWeight:700, marginBottom:8 }}>No devices match your filters</p>
              <p style={{ color:"var(--text2)", marginBottom:24 }}>Try relaxing a filter or clearing them all</p>
              <button onClick={() => { setCategory("all");setBrand("all");setGradeFilter("all");setPriceMax(2500);setBatMin(80);setStorageFilter("all");setSearch(""); }} className="btn-gold" style={{ padding:"12px 24px" }}>Clear All Filters</button>
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:20 }}>
              {filtered.map(p => (
                <ProductCard key={p.id} product={p} onView={() => setSelectedProduct(p)} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {drawerOpen && (
        <>
          <div className="drawer-overlay" onClick={() => setDrawerOpen(false)} />
          <div className="drawer open" style={{ padding:24 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <span style={{ fontWeight:700, fontSize:16 }}>Filters</span>
              <button onClick={() => setDrawerOpen(false)} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text2)", fontSize:24 }}>×</button>
            </div>
            <FilterPanel mobile />
            <button onClick={() => setDrawerOpen(false)} className="btn-gold" style={{ width:"100%", padding:"14px 0", marginTop:20, fontSize:14, textAlign:"center" }}>
              Show {filtered.length} Results
            </button>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

/* ─── PRODUCT DETAIL PAGE ──────────────────────────────────────────────────── */
const ProductPage = ({ product: p, addToCart, goBack, wishlist, toggleWishlist }) => {
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("specs");
  const [inspectOpen, setInspectOpen] = useState(false);
  const [addedMsg, setAddedMsg] = useState(false);
  const isWished = wishlist.includes(p.id);
  const savings = pct(p.price, p.original);
  const installment = Math.round(p.price / 4);

  const handleAdd = () => {
    for(let i=0;i<qty;i++) addToCart(p);
    setAddedMsg(true);
    setTimeout(() => setAddedMsg(false), 2500);
  };

  return (
    <div style={{ minHeight:"100vh" }}>
      {/* Breadcrumb */}
      <div style={{ padding:"16px 24px", background:"var(--surface)", borderBottom:"1px solid var(--border)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", alignItems:"center", gap:8, fontSize:12, color:"var(--text3)" }}>
          <button onClick={goBack} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text3)", fontFamily:"inherit", fontSize:12, display:"flex", alignItems:"center", gap:4 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
            Back to Shop
          </button>
          <span>›</span><span style={{ color:"var(--text2)" }}>{p.brand}</span>
          <span>›</span><span style={{ color:"var(--text)" }}>{p.name}</span>
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"32px 24px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:48 }} className="pdp-grid">
          <style>{`.pdp-grid{@media(max-width:768px){grid-template-columns:1fr!important;}}`}</style>

          {/* Left — Images */}
          <div>
            <div style={{ background:`linear-gradient(135deg,var(--surface),var(--surface3))`, borderRadius:24, height:400, display:"flex", alignItems:"center", justifyContent:"center", border:"1px solid var(--border)", position:"relative", overflow:"hidden", marginBottom:16 }}>
              <div className="hero-scanline" style={{ opacity:0.5 }} />
              <span style={{ fontSize:120, filter:"drop-shadow(0 16px 48px rgba(0,0,0,0.6))", animation:"float 4s ease-in-out infinite" }}>{p.img}</span>
              <div style={{ position:"absolute", top:16, left:16, display:"flex", flexDirection:"column", gap:8 }}>
                <GradeTag grade={p.grade} />
                {savings > 0 && <span className="tag tag-green">Save {savings}%</span>}
              </div>
              <button onClick={() => toggleWishlist(p.id)} style={{ position:"absolute", top:16, right:16, background:"rgba(0,0,0,0.4)", border:"none", borderRadius:"50%", width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:isWished?"var(--gold)":"var(--text2)", fontSize:20 }}>
                {isWished ? "♥" : "♡"}
              </button>
            </div>
            {/* Thumbnail row */}
            <div style={{ display:"flex", gap:10 }}>
              {["📱","📦","🔋","📷","🔌"].slice(0,4).map((icon,i) => (
                <div key={i} style={{ flex:1, background:"var(--surface2)", borderRadius:12, height:64, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, border:"1px solid var(--border)", cursor:"pointer", opacity: i===0?1:0.5 }}>
                  {i===0?p.img:icon}
                </div>
              ))}
            </div>

            {/* Diagnostic Screenshot Proof */}
            <div style={{ marginTop:20, background:"var(--surface)", border:"1px solid var(--border)", borderRadius:16, padding:20 }}>
              <p style={{ fontSize:12, fontWeight:700, color:"var(--gold)", marginBottom:12, display:"flex", alignItems:"center", gap:6 }}>
                <span>📊</span> Diagnostic Screenshot — Verified {new Date().toLocaleDateString()}
              </p>
              <div style={{ background:"var(--surface3)", borderRadius:10, padding:14, fontFamily:"monospace", fontSize:11, color:"var(--emerald)", lineHeight:2 }}>
                <div>Battery Health: <span style={{ color:"var(--gold)" }}>{p.battery}%</span></div>
                <div>Maximum Capacity: <span style={{ color:"var(--gold)" }}>{p.battery}%</span></div>
                <div>Cycle Count: <span style={{ color:"var(--gold)" }}>{Math.round((100-p.battery)*4 + 20)}</span></div>
                <div>IMEI: <span style={{ color:"var(--text2)" }}>35****90****42</span></div>
                <div>iCloud Lock: <span style={{ color:"var(--emerald)" }}>✓ CLEARED</span></div>
                <div>Activation Status: <span style={{ color:"var(--emerald)" }}>✓ CLEAN</span></div>
              </div>
            </div>
          </div>

          {/* Right — Info */}
          <div>
            <div style={{ fontSize:11, color:"var(--text3)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>{p.brand} · {p.year}</div>
            <h1 className="display" style={{ fontSize:"clamp(22px,3vw,34px)", fontWeight:700, lineHeight:1.1, marginBottom:12 }}>{p.name}</h1>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16, flexWrap:"wrap" }}>
              <StarRating rating={p.rating} reviews={p.reviews} />
              <GradeTag grade={p.grade} />
              {p.inStock <= 3 && <span style={{ fontSize:11, color:"#f87171", fontWeight:700 }}>⚠ Only {p.inStock} left</span>}
            </div>

            {/* Price */}
            <div style={{ background:"var(--surface2)", borderRadius:16, padding:20, marginBottom:20 }}>
              <div style={{ display:"flex", alignItems:"baseline", gap:12, marginBottom:4 }}>
                <span className="price-tag" style={{ fontSize:36, color:"var(--text)" }}>{fmt(p.price)}</span>
                <span style={{ fontSize:16, color:"var(--text3)", textDecoration:"line-through" }}>{fmt(p.original)}</span>
                <span className="tag tag-green" style={{ fontSize:11 }}>You save {fmt(p.original-p.price)}</span>
              </div>
              <p style={{ fontSize:12, color:"var(--text3)", marginBottom:12 }}>Or <span style={{ color:"var(--text2)", fontWeight:700 }}>{fmt(installment)}/mo</span> × 4 interest-free with <span style={{ color:"var(--blue)", fontWeight:700 }}>Klarna</span></p>

              {/* Trust Badges */}
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {[["🛡️","12-Month Warranty Included","Covers parts & labor"],["🔄","30-Day Money-Back","No questions asked"],["🚚","Free Insured Shipping","Tracked & insured"],["🔒","iCloud/Google Lock Free","Verified & cleared"]].map(([icon,label,sub]) => (
                  <div key={label} style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:14 }}>{icon}</span>
                    <div>
                      <span style={{ fontSize:12, color:"var(--text)", fontWeight:600 }}>{label}</span>
                      <span style={{ fontSize:11, color:"var(--text3)", marginLeft:6 }}>{sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Color / Config */}
            <div style={{ marginBottom:20 }}>
              <p style={{ fontSize:12, fontWeight:700, color:"var(--text2)", marginBottom:8 }}>Color: <span style={{ color:"var(--text)" }}>{p.color}</span></p>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                <span className="tag tag-gold" style={{ fontSize:12 }}>{p.storage}</span>
                <span className="tag tag-gray" style={{ fontSize:12 }}>{p.ram} RAM</span>
                <span className="tag tag-gray" style={{ fontSize:12 }}>{p.processor}</span>
              </div>
            </div>

            {/* Battery */}
            <div style={{ marginBottom:20 }}>
              <BatteryBar pct={p.battery} />
            </div>

            {/* Qty + CTA */}
            <div style={{ display:"flex", gap:12, marginBottom:16, alignItems:"center" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1,q-1))}>−</button>
                <span style={{ fontSize:15, fontWeight:700, minWidth:20, textAlign:"center" }}>{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => Math.min(p.inStock,q+1))}>+</button>
              </div>
              <button onClick={handleAdd} className="btn-gold" style={{ flex:1, padding:"14px 0", fontSize:15, textAlign:"center", position:"relative" }}>
                {addedMsg ? "✓ Added to Cart!" : "Add to Cart"}
              </button>
            </div>
            <button className="btn-outline" style={{ width:"100%", padding:"13px 0", fontSize:14, textAlign:"center" }}>Buy Now — {fmt(p.price*qty)}</button>

            {/* Inspection Accordion */}
            <div style={{ marginTop:20, border:"1px solid var(--border)", borderRadius:14, overflow:"hidden" }}>
              <button onClick={() => setInspectOpen(!inspectOpen)} style={{ width:"100%", padding:"14px 18px", background:"var(--surface)", border:"none", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", fontFamily:"inherit", color:"var(--text)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ color:"var(--emerald)", fontWeight:700, fontSize:13 }}>✓ 30-Point Inspection Passed</span>
                </div>
                <span style={{ color:"var(--text3)", fontSize:18 }}>{inspectOpen?"−":"+"}</span>
              </button>
              {inspectOpen && (
                <div style={{ padding:"0 18px 18px", background:"var(--surface)" }}>
                  <div className="divider" style={{ marginBottom:12 }} />
                  {INSPECT_POINTS.map(pt => (
                    <div key={pt.label} className="inspection-row">
                      <div className="check-circle">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                      </div>
                      <div style={{ flex:1 }}>
                        <span style={{ fontSize:12, fontWeight:700, color:"var(--text)" }}>{pt.icon} {pt.label}</span>
                        <span style={{ fontSize:11, color:"var(--text3)", marginLeft:6 }}>{pt.detail}</span>
                      </div>
                      <span className="tag tag-green" style={{ fontSize:10 }}>PASS</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs — Specs / Reviews */}
        <div style={{ marginTop:48, borderTop:"1px solid var(--border)", paddingTop:32 }}>
          <div style={{ display:"flex", gap:24, borderBottom:"1px solid var(--border)", paddingBottom:0, marginBottom:32 }}>
            {[["specs","Tech Specs"],["reviews","Reviews"],["shipping","Shipping & Returns"]].map(([t,l]) => (
              <button key={t} onClick={() => setTab(t)} className={`tab-underline ${tab===t?"tab-active":""}`} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:14, fontWeight:700, color:tab===t?"var(--gold)":"var(--text3)", paddingBottom:12 }}>{l}</button>
            ))}
          </div>

          {tab === "specs" && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:12 }}>
              {[["Processor",p.processor],["RAM",p.ram],["Storage",p.storage],["Display",p.screen],["OS",p.os],["Weight",p.weight],["Ports",p.ports],["Year",p.year],["Color",p.color],["Battery",`${p.battery}% Health`],["Grade",p.grade],["IMEI Status","Clean / Unlocked"]].map(([k,v]) => (
                <div key={k} style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:12, padding:"14px 16px" }}>
                  <div style={{ fontSize:10, color:"var(--text3)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>{k}</div>
                  <div style={{ fontSize:14, fontWeight:700, color:"var(--text)" }}>{v}</div>
                </div>
              ))}
            </div>
          )}

          {tab === "reviews" && (
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:24, marginBottom:32, background:"var(--surface)", borderRadius:16, padding:24 }}>
                <div style={{ textAlign:"center" }}>
                  <div className="display" style={{ fontSize:56, fontWeight:700, color:"var(--gold)" }}>{p.rating}</div>
                  <StarRating rating={p.rating} />
                  <div style={{ fontSize:12, color:"var(--text3)", marginTop:4 }}>{p.reviews} reviews</div>
                </div>
                <div style={{ flex:1 }}>
                  {[5,4,3,2,1].map(s => (
                    <div key={s} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                      <span style={{ fontSize:12, color:"var(--text3)", width:8 }}>{s}</span>
                      <span style={{ color:"var(--gold)", fontSize:12 }}>★</span>
                      <div style={{ flex:1, height:6, background:"var(--surface3)", borderRadius:99, overflow:"hidden" }}>
                        <div style={{ height:"100%", background:"var(--gold)", width:`${s===5?78:s===4?15:s===3?5:2}%`, borderRadius:99 }} />
                      </div>
                      <span style={{ fontSize:11, color:"var(--text3)", width:30, textAlign:"right" }}>{s===5?78:s===4?15:s===3?5:2}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:16 }}>
                {[
                  { name:"Alex R.", rating:5, text:"Device is in perfect condition — exactly as described. Battery is 96%, I verified it myself. 100% recommend ReMarket.", verified:true, grade:"Certified Like-New" },
                  { name:"Priya M.", rating:5, text:"Super fast shipping, beautiful packaging. The inspection report was detailed and accurate.", verified:true, grade:"Certified Like-New" },
                  { name:"James K.", rating:5, text:"The IMEI was clean, phone was unlocked, and the screen was flawless. Saved $400 vs new. Perfect.", verified:true, grade:"Open Box Pristine" },
                ].map((r,i) => (
                  <div key={i} style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:16, padding:20 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                      <div>
                        <div style={{ fontSize:13, fontWeight:700 }}>{r.name}</div>
                        <StarRating rating={r.rating} small />
                      </div>
                      {r.verified && <span className="tag tag-green" style={{ fontSize:10 }}>✓ Verified Buyer</span>}
                    </div>
                    <p style={{ fontSize:13, color:"var(--text2)", lineHeight:1.7, fontStyle:"italic" }}>"{r.text}"</p>
                    <div style={{ marginTop:12 }}>
                      <span className="tag tag-gray" style={{ fontSize:10 }}>Bought: {r.grade}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "shipping" && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:16 }}>
              {[
                { icon:"🚚", title:"Free Standard Shipping", body:"3–5 business days. All orders fully insured during transit. Tracked with real-time updates." },
                { icon:"⚡", title:"Express Shipping", body:"1–2 business days available at checkout. Signature required on delivery for security." },
                { icon:"🔄", title:"30-Day Easy Returns", body:"Not happy? Return within 30 days for a full refund — no restocking fee. Free return label provided." },
                { icon:"🛡️", title:"12-Month Warranty", body:"All devices covered for 12 months against defects. Claim online in under 5 minutes." },
                { icon:"📦", title:"Secure Packaging", body:"Devices shipped in double-wall protection with anti-static wrapping and corner guards." },
                { icon:"🌍", title:"International Shipping", body:"We ship to 40+ countries. Duties calculated at checkout. Tracking available worldwide." },
              ].map(s => (
                <div key={s.title} style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:16, padding:20 }}>
                  <div style={{ fontSize:28, marginBottom:12 }}>{s.icon}</div>
                  <div style={{ fontSize:14, fontWeight:700, marginBottom:8 }}>{s.title}</div>
                  <div style={{ fontSize:13, color:"var(--text2)", lineHeight:1.6 }}>{s.body}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

/* ─── ABOUT PAGE ───────────────────────────────────────────────────────────── */
const AboutPage = ({ setPage }) => (
  <div>
    <TrustStripe />
    <section style={{ padding:"80px 24px", textAlign:"center" }}>
      <div style={{ maxWidth:700, margin:"0 auto" }}>
        <p className="section-label" style={{ marginBottom:12 }}>Our Process</p>
        <h1 className="display" style={{ fontSize:"clamp(32px,6vw,60px)", fontWeight:700, marginBottom:20, lineHeight:1.1 }}>
          How We Certify Every Device
        </h1>
        <p style={{ fontSize:16, color:"var(--text2)", lineHeight:1.7 }}>We don't just test — we document, photograph, and certify. Every device earns its grade through a rigorous 30-point inspection by licensed technicians with professional equipment.</p>
      </div>
    </section>

    {/* Steps */}
    <section style={{ padding:"0 24px 80px" }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        {[
          { step:"01", icon:"📦", title:"Device Received & Logged", desc:"Every device is logged into our system with its IMEI/serial, purchase source, and initial condition notes. Activation locks are cleared and verified before the inspection begins.", time:"Day 1" },
          { step:"02", icon:"🔬", title:"30-Point Technical Inspection", desc:"Our technicians test every hardware component — battery, display, cameras, microphones, speakers, biometrics, all ports, antennas, and connectivity modules — using professional diagnostic software.", time:"Day 1–2" },
          { step:"03", icon:"🧹", title:"Professional Deep Clean", desc:"Every device is disassembled at accessible points, ultrasonically cleaned, and sanitized. Screen, body, ports, and buttons are individually cleaned and polished to a pristine finish.", time:"Day 2" },
          { step:"04", icon:"📸", title:"Multi-Angle Photography", desc:"8+ photos per device including macro shots under studio lighting. Any cosmetic mark — however minor — is photographed and disclosed. Battery health screenshot included.", time:"Day 2–3" },
          { step:"05", icon:"🎖️", title:"Grade Assignment & Certificate", desc:"Based on inspection results, each device receives a grade (Certified Like-New, Open Box Pristine, or Excellent+). A digital inspection certificate with technician ID is generated.", time:"Day 3" },
          { step:"06", icon:"🚀", title:"Listed & Ready to Ship", desc:"Device is photographed again for listing, priced with full transparency, and stored in our climate-controlled facility until sale. Shipped in double-wall protective packaging.", time:"Day 3–4" },
        ].map((s, i) => (
          <div key={s.step} style={{ display:"flex", gap:24, marginBottom:40, alignItems:"flex-start" }}>
            <div style={{ flexShrink:0, width:56, height:56, borderRadius:16, background:"var(--surface)", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>{s.icon}</div>
            <div style={{ flex:1, paddingTop:8 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:6 }}>
                <span style={{ fontSize:11, fontWeight:700, color:"var(--gold)", fontFamily:"monospace" }}>STEP {s.step}</span>
                <span className="tag tag-gray" style={{ fontSize:10 }}>{s.time}</span>
              </div>
              <h3 style={{ fontSize:18, fontWeight:700, marginBottom:8 }}>{s.title}</h3>
              <p style={{ fontSize:14, color:"var(--text2)", lineHeight:1.7 }}>{s.desc}</p>
            </div>
            {i < 5 && <div style={{ position:"relative" }} />}
          </div>
        ))}
      </div>
    </section>

    {/* Full Inspection Checklist */}
    <section style={{ padding:"60px 24px", background:"var(--surface)" }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <h2 className="display" style={{ fontSize:32, fontWeight:700, textAlign:"center", marginBottom:40 }}>The Complete 30-Point Checklist</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:12 }}>
          {[
            "Battery health verified via OEM diagnostics","Maximum battery capacity documented","Battery cycle count recorded",
            "Display: dead pixel test","Display: burn-in and ghosting test","Display: touch calibration test",
            "Face ID / Touch ID functionality","Rear camera photo & video quality","Front camera photo & video quality",
            "Speaker audio quality test","Earpiece audio test","Primary microphone test",
            "Secondary microphone test","WiFi connectivity (2.4GHz + 5GHz)","Bluetooth pairing test",
            "Cellular signal reception test","GPS/location accuracy test","USB/Lightning/USB-C port test",
            "SIM tray condition and functionality","Volume buttons tested","Power button tested",
            "Mute switch / side buttons tested","Vibration motor function","iCloud Activation Lock cleared",
            "Google Account Lock cleared","Factory reset completed","Fresh OS installation verified",
            "IMEI blacklist check — clean","Physical body condition documented","Deep sanitization completed",
          ].map((item, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", background:"var(--bg)", border:"1px solid var(--border)", borderRadius:10 }}>
              <div className="check-circle">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
              </div>
              <span style={{ fontSize:12, color:"var(--text2)" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section style={{ padding:"80px 24px", textAlign:"center" }}>
      <h2 className="display" style={{ fontSize:40, fontWeight:700, marginBottom:16 }}>Ready to Find Your Device?</h2>
      <p style={{ color:"var(--text2)", fontSize:16, marginBottom:32 }}>Shop with confidence — every device certified, every claim backed by our guarantee.</p>
      <button onClick={() => setPage("shop")} className="btn-gold" style={{ padding:"16px 40px", fontSize:16 }}>Shop All Certified Devices →</button>
    </section>
    <Footer setPage={setPage} />
  </div>
);

/* ─── WISHLIST PAGE ────────────────────────────────────────────────────────── */
const WishlistPage = ({ wishlist, setSelectedProduct, addToCart, toggleWishlist, setPage }) => {
  const items = PRODUCTS.filter(p => wishlist.includes(p.id));
  return (
    <div style={{ minHeight:"70vh", padding:"40px 24px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <h1 className="display" style={{ fontSize:36, fontWeight:700, marginBottom:32 }}>Your Wishlist {items.length > 0 && <span style={{ fontSize:20, color:"var(--text3)" }}>({items.length})</span>}</h1>
        {items.length === 0 ? (
          <div style={{ textAlign:"center", padding:"80px 24px" }}>
            <div style={{ fontSize:64, marginBottom:20 }}>♡</div>
            <p style={{ fontSize:20, fontWeight:700, marginBottom:8 }}>Your wishlist is empty</p>
            <p style={{ color:"var(--text2)", marginBottom:24 }}>Save devices you love for later</p>
            <button onClick={() => setPage("shop")} className="btn-gold" style={{ padding:"12px 28px" }}>Browse Devices</button>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:20 }}>
            {items.map(p => <ProductCard key={p.id} product={p} onView={() => setSelectedProduct(p)} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />)}
          </div>
        )}
      </div>
      <Footer setPage={setPage} />
    </div>
  );
};

/* ─── CART DRAWER ──────────────────────────────────────────────────────────── */
const CartDrawer = ({ cart, setCart, open, setOpen }) => {
  const total = cart.reduce((a, b) => a + b.product.price * b.qty, 0);
  const removeItem = (id) => setCart(c => c.filter(i => i.product.id !== id));
  const updateQty = (id, qty) => setCart(c => c.map(i => i.product.id===id?{...i,qty:Math.max(1,qty)}:i));

  return (
    <>
      {open && <div className="drawer-overlay" onClick={() => setOpen(false)} />}
      <div className={`drawer ${open?"open":""}`}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 20px 16px", borderBottom:"1px solid var(--border)" }}>
          <span style={{ fontWeight:700, fontSize:16 }}>Your Cart ({cart.reduce((a,b)=>a+b.qty,0)})</span>
          <button onClick={() => setOpen(false)} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text2)", fontSize:24, lineHeight:1 }}>×</button>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:20, display:"flex", flexDirection:"column", gap:16 }}>
          {cart.length === 0 ? (
            <div style={{ textAlign:"center", padding:"60px 0", color:"var(--text3)" }}>
              <div style={{ fontSize:40, marginBottom:12 }}>🛒</div>
              <p>Your cart is empty</p>
            </div>
          ) : cart.map(({ product: p, qty }) => (
            <div key={p.id} style={{ display:"flex", gap:12, background:"var(--surface2)", borderRadius:12, padding:12 }}>
              <div style={{ width:56, height:56, background:"var(--surface3)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, flexShrink:0 }}>{p.img}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:12, fontWeight:700, color:"var(--text)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.name}</div>
                <div style={{ fontSize:11, color:"var(--text3)", marginTop:2 }}>{p.storage} · {p.grade.split(" ").slice(0,2).join(" ")}</div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:8 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <button className="qty-btn" style={{ width:24, height:24, fontSize:14 }} onClick={() => updateQty(p.id, qty-1)}>−</button>
                    <span style={{ fontSize:12, fontWeight:700 }}>{qty}</span>
                    <button className="qty-btn" style={{ width:24, height:24, fontSize:14 }} onClick={() => updateQty(p.id, qty+1)}>+</button>
                  </div>
                  <span style={{ fontSize:13, fontWeight:700, color:"var(--text)" }}>{fmt(p.price * qty)}</span>
                </div>
              </div>
              <button onClick={() => removeItem(p.id)} style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text3)", fontSize:16, alignSelf:"flex-start", padding:4 }}>×</button>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div style={{ padding:20, borderTop:"1px solid var(--border)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
              <span style={{ color:"var(--text2)", fontSize:13 }}>Subtotal</span>
              <span style={{ fontWeight:700, fontSize:13 }}>{fmt(total)}</span>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
              <span style={{ color:"var(--text2)", fontSize:13 }}>Shipping</span>
              <span style={{ color:"var(--emerald)", fontWeight:700, fontSize:13 }}>FREE</span>
            </div>
            <button className="btn-gold" style={{ width:"100%", padding:"14px 0", fontSize:15, textAlign:"center" }}>
              Checkout · {fmt(total)}
            </button>
            <p style={{ fontSize:11, color:"var(--text3)", textAlign:"center", marginTop:10 }}>🔒 Secure checkout · 30-day returns</p>
          </div>
        )}
      </div>
    </>
  );
};

/* ─── AI CHAT ──────────────────────────────────────────────────────────────── */
const AIChat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role:"assistant", content:"Hi there! 👋 I'm your ReMarket support assistant. I can help you choose a device, check on your order, or answer questions about our certification process. What can I help you with?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { if(open) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 150); }}, [open]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if(!text || loading) return;
    setInput("");
    const updated = [...messages, { role:"user", content:text }];
    setMessages(updated);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1000,
          system:`You are a friendly, knowledgeable customer support agent for ReMarket — a premium used electronics resale store. 
You sell certified pre-owned phones, laptops, and tablets at prices 20–50% below retail.
Key facts about ReMarket:
- 30-point inspection on every device
- 3 grades: Certified Like-New (battery ≥95%), Open Box Pristine (≥92%), Excellent+ (≥87%)
- 12-month warranty on all devices
- 30-day money-back guarantee, free returns
- iCloud/Google lock cleared on all devices
- Devices: iPhones, Samsung Galaxy, MacBooks, iPad, Google Pixel, Dell XPS, and more
- Payment: credit card, PayPal, Klarna (pay in 4)
- Free insured shipping, 3–5 business days

Be concise, warm, and helpful. Answer questions about devices, grading, warranty, returns, shipping. If asked to recommend a device, ask about their budget and use case first. Keep answers under 120 words.`,
          messages: updated.map(m => ({ role:m.role, content:m.content })),
        })
      });
      const data = await res.json();
      const reply = data.content?.find(b => b.type==="text")?.text || "Sorry, I couldn't respond. Please try again.";
      setMessages([...updated, { role:"assistant", content:reply }]);
    } catch {
      setMessages([...updated, { role:"assistant", content:"I'm having trouble connecting right now. Please email us at support@remarkethq.com or try again shortly." }]);
    } finally { setLoading(false); }
  };

  const quickPrompts = ["What's your return policy?","How do grades work?","Recommend a phone under $700","Is the battery health accurate?"];

  return (
    <>
      {/* FAB */}
      <button onClick={() => setOpen(!open)} style={{ position:"fixed", bottom:24, right:24, zIndex:500, width:56, height:56, borderRadius:"50%", background:"linear-gradient(135deg,#f0b429,#d97706)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 8px 32px rgba(240,180,41,0.4)", transition:"all 0.2s", animation: !open && unread?"glow 2s ease infinite":"none" }}
        onMouseEnter={e => e.currentTarget.style.transform="scale(1.08)"} onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}
        {!open && unread > 0 && <span style={{ position:"absolute", top:2, right:2, width:18, height:18, background:"#ef4444", borderRadius:"50%", fontSize:10, fontWeight:800, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center" }}>{unread}</span>}
      </button>

      {/* Panel */}
      {open && (
        <div style={{ position:"fixed", bottom:92, right:24, zIndex:500, width:340, height:480, borderRadius:20, overflow:"hidden", border:"1px solid var(--border2)", boxShadow:"0 24px 64px rgba(0,0,0,0.6)", display:"flex", flexDirection:"column", background:"var(--surface)" }} className="fade-in">
          {/* Header */}
          <div style={{ padding:"14px 16px", background:"linear-gradient(135deg,rgba(240,180,41,0.12),rgba(240,180,41,0.04))", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:"50%", background:"var(--gold-dim)", border:"1px solid rgba(240,180,41,0.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>⚡</div>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:"var(--text)" }}>ReMarket Support</div>
              <div style={{ fontSize:11, color:"var(--emerald)", display:"flex", alignItems:"center", gap:4 }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"var(--emerald)", display:"inline-block" }} />
                Online — instant replies
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex:1, overflowY:"auto", padding:14, display:"flex", flexDirection:"column", gap:10 }}>
            {messages.map((m,i) => (
              <div key={i} style={{ display:"flex", justifyContent:m.role==="user"?"flex-end":"flex-start" }}>
                <div className={m.role==="user"?"chat-bubble-user":"chat-bubble-ai"} style={{ maxWidth:"86%", whiteSpace:"pre-wrap" }}>{m.content}</div>
              </div>
            ))}
            {loading && (
              <div style={{ display:"flex", justifyContent:"flex-start" }}>
                <div className="chat-bubble-ai" style={{ display:"flex", gap:5, alignItems:"center", padding:"12px 16px" }}>
                  {[0,1,2].map(d => <div key={d} className="chat-dot" style={{ animationDelay:`${d*0.18}s` }} />)}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length <= 1 && (
            <div style={{ padding:"0 12px 10px", display:"flex", flexWrap:"wrap", gap:6 }}>
              {quickPrompts.map(p => (
                <button key={p} onClick={() => setInput(p)} style={{ fontSize:11, padding:"5px 10px", borderRadius:99, background:"var(--surface3)", border:"1px solid var(--border)", color:"var(--text2)", cursor:"pointer", fontFamily:"inherit" }}>{p}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding:"8px 10px 12px", borderTop:"1px solid var(--border)" }}>
            <div style={{ display:"flex", gap:8, background:"var(--surface2)", border:"1px solid var(--border2)", borderRadius:12, overflow:"hidden", alignItems:"center" }}>
              <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==="Enter" && !e.shiftKey && send()}
                placeholder="Ask anything..." className="input-field" style={{ border:"none", background:"transparent", borderRadius:0, padding:"10px 12px", flex:1 }} />
              <button onClick={send} disabled={loading || !input.trim()} style={{ padding:"8px 12px", background:"none", border:"none", cursor:"pointer", color:input.trim()?"var(--gold)":"var(--text3)", transition:"color 0.2s" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* ─── FOOTER ───────────────────────────────────────────────────────────────── */
const Footer = ({ setPage }) => (
  <footer style={{ background:"var(--surface)", borderTop:"1px solid var(--border)", padding:"48px 24px 24px" }}>
    <div style={{ maxWidth:1100, margin:"0 auto" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:32, marginBottom:40 }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
            <div style={{ width:28, height:28, borderRadius:7, background:"linear-gradient(135deg,#f0b429,#d97706)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>⚡</div>
            <span className="display" style={{ fontSize:16, fontWeight:700 }}>ReMarket</span>
          </div>
          <p style={{ fontSize:12, color:"var(--text3)", lineHeight:1.7, marginBottom:14 }}>Premium certified electronics. Every device inspected, graded, and guaranteed.</p>
          <div style={{ display:"flex", gap:10 }}>
            {["𝕏","in","yt"].map(s => <div key={s} style={{ width:30, height:30, borderRadius:"50%", background:"var(--surface3)", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:"var(--text3)", cursor:"pointer" }}>{s}</div>)}
          </div>
        </div>
        {[
          { title:"Shop", links:[["All Devices","shop"],["Smartphones","shop"],["Laptops","shop"],["Tablets","shop"]] },
          { title:"Trust", links:[["How It Works","about"],["Inspection Process","about"],["Grade System","about"],["Warranty Policy","about"]] },
          { title:"Support", links:[["FAQ","about"],["Returns","about"],["Track Order","about"],["Contact Us","about"]] },
        ].map(col => (
          <div key={col.title}>
            <p style={{ fontSize:11, fontWeight:700, color:"var(--gold)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:14 }}>{col.title}</p>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {col.links.map(([label, pg]) => (
                <button key={label} onClick={() => setPage && setPage(pg)} style={{ background:"none", border:"none", cursor:"pointer", textAlign:"left", fontSize:13, color:"var(--text3)", fontFamily:"inherit", transition:"color 0.2s", padding:0 }}
                  onMouseEnter={e => e.target.style.color="var(--text2)"} onMouseLeave={e => e.target.style.color="var(--text3)"}>{label}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="divider" style={{ marginBottom:20 }} />
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <p style={{ fontSize:11, color:"var(--text3)" }}>© 2025 ReMarket. All rights reserved. Prices in USD.</p>
        <div style={{ display:"flex", gap:8 }}>
          {["💳","🔒","🛡️"].map((i,idx) => <span key={idx} style={{ fontSize:16, opacity:0.5 }}>{i}</span>)}
          <span style={{ fontSize:11, color:"var(--text3)" }}>PCI DSS Compliant · SSL Encrypted</span>
        </div>
      </div>
    </div>
  </footer>
);

/* ─── APP ROOT ─────────────────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");
  const [selectedProduct, _setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const setSelectedProduct = (p) => {
    _setSelectedProduct(p);
    setPage("product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (product) => {
    setCart(c => {
      const existing = c.find(i => i.product.id === product.id);
      if(existing) return c.map(i => i.product.id===product.id ? {...i, qty:i.qty+1} : i);
      return [...c, { product, qty:1 }];
    });
  };

  const toggleWishlist = (id) => setWishlist(w => w.includes(id) ? w.filter(i=>i!==id) : [...w, id]);

  const goBack = () => setPage("shop");

  const navigate = useCallback((pg) => {
    setPage(pg);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <FontLoader />
      <div className="grain" />
      <Nav page={page} setPage={navigate} cart={cart} setCartOpen={setCartOpen} wishlist={wishlist} />
      <CartDrawer cart={cart} setCart={setCart} open={cartOpen} setOpen={setCartOpen} />
      <main className="fade-in">
        {page === "home"    && <HomePage    setPage={navigate} setSelectedProduct={setSelectedProduct} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />}
        {page === "shop"    && <ShopPage    setSelectedProduct={setSelectedProduct} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />}
        {page === "product" && selectedProduct && <ProductPage product={selectedProduct} addToCart={addToCart} goBack={goBack} wishlist={wishlist} toggleWishlist={toggleWishlist} />}
        {page === "about"   && <AboutPage   setPage={navigate} />}
        {page === "wishlist"&& <WishlistPage wishlist={wishlist} setSelectedProduct={setSelectedProduct} addToCart={addToCart} toggleWishlist={toggleWishlist} setPage={navigate} />}
      </main>
      <AIChat />
    </>
  );
}
