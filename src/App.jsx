import { useState, useEffect } from 'react';
import { MapPin, CloudRain, Sun, Clock, Coffee, Sparkles, Navigation, X, Check, Wallet, Ticket, History, ScanLine, RefreshCw, LineChart, Cpu, Leaf } from 'lucide-react';
import './index.css';

const MERCHANTS = [
  // Old Town
  { name: 'Café Lumen', type: 'coffee', location: 'Old Town', baseDemand: 'low', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Gelato Maestro', type: 'dessert', location: 'Old Town', baseDemand: 'medium', image: 'https://images.unsplash.com/photo-1563805042-7684c8e9e533?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Old Town Bakery', type: 'food', location: 'Old Town', baseDemand: 'high', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  
  // Business District
  { name: 'Ramen Ichiraku', type: 'food', location: 'Business District', baseDemand: 'medium', image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'The Daily Grind', type: 'coffee', location: 'Business District', baseDemand: 'high', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Corp Bowl', type: 'food', location: 'Business District', baseDemand: 'low', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Juice Bar Vita', type: 'cold_drink', location: 'Business District', baseDemand: 'low', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },

  // Park Area
  { name: 'Sunny Side Café', type: 'coffee', location: 'Park Area', baseDemand: 'low', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Park Picnic Prep', type: 'food', location: 'Park Area', baseDemand: 'high', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Chill Pops', type: 'dessert', location: 'Park Area', baseDemand: 'medium', image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Green Blendz', type: 'cold_drink', location: 'Park Area', baseDemand: 'low', image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },

  // Shopping Street
  { name: 'Burger Joint', type: 'food', location: 'Shopping Street', baseDemand: 'high', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Boutique Beans', type: 'coffee', location: 'Shopping Street', baseDemand: 'medium', image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Sweet Shopper', type: 'dessert', location: 'Shopping Street', baseDemand: 'low', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Thirst Quencher', type: 'cold_drink', location: 'Shopping Street', baseDemand: 'high', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
];

const generateDynamicOffer = (location, weather, time, intent) => {
  let preferredTypes = [];
  if (weather === 'Cold' || weather === 'Rainy') preferredTypes.push('coffee', 'food');
  if (weather === 'Sunny' || weather === 'Cloudy') preferredTypes.push('cold_drink', 'dessert', 'food');
  
  if (intent === 'Quick Snack') preferredTypes.push('dessert', 'cold_drink');
  if (intent === 'Relax / Coffee Break') preferredTypes.push('coffee');
  if (intent === 'Full Meal') preferredTypes.push('food');
  if (intent === 'Just Browsing') preferredTypes.push('coffee', 'dessert', 'cold_drink');
  
  let locationMerchants = MERCHANTS.filter(m => m.location === location);
  let availableMerchants = locationMerchants.filter(m => preferredTypes.includes(m.type));
  if (availableMerchants.length === 0) availableMerchants = locationMerchants;
  
  const merchant = availableMerchants[Math.floor(Math.random() * availableMerchants.length)];
  const distance = `${Math.floor(Math.random() * 250) + 50}m`;
  
  let tag = '';
  if (merchant.baseDemand === 'low') {
    tag = 'Quiet hour';
  } else if (merchant.baseDemand === 'high') {
    tag = 'High demand';
  } else {
    tag = 'Limited offer';
  }
  
  const discountValues = [15, 20, 25, 30, 40, 'BUY 1 GET 1', 'FREE UPGRADE'];
  if (merchant.baseDemand === 'low') discountValues.push(50, 40);
  const discount = discountValues[Math.floor(Math.random() * discountValues.length)];
  const discountText = typeof discount === 'number' ? `${discount}% OFF` : discount;
  
  const urgent = Math.random() > 0.3 || intent === 'Full Meal' || merchant.baseDemand === 'high';
  const expiry = urgent ? `Valid for next ${Math.floor(Math.random() * 20) + 10} mins` : 'Valid for 1 hour';

  const adjectives = ['Fresh', 'Cozy', 'Delicious', 'Quick', 'Special', 'Perfect'];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  
  const typeNoun = merchant.type === 'coffee' ? 'Brew' : merchant.type === 'food' ? 'Bite' : merchant.type === 'dessert' ? 'Treat' : 'Refreshment';
  
  const title = `${adjective} ${time} ${typeNoun}`;
  
  const weatherDesc = (weather === 'Cold' || weather === 'Rainy') ? 'Warm up from the weather' : 'Enjoy the day';
  const intentDesc = intent === 'Quick Snack' ? 'Grab a quick bite' : intent === 'Relax / Coffee Break' ? 'Take a relaxing break' : intent === 'Full Meal' ? 'Sit down for a proper meal' : 'Treat yourself while browsing';
  
  const description = `${weatherDesc}! ${intentDesc} at ${merchant.name}. We noticed you're nearby in ${location}. Enjoy ${discountText} on your order immediately.`;
  
  const reasons = [
    `${weather} weather detected in ${location}.`,
    `Matched your intent ('${intent}') during the ${time}.`,
    `Merchant is experiencing ${merchant.baseDemand} traffic right now.`
  ];

  return {
    merchant: merchant.name,
    distance,
    title,
    description,
    discount: discountText,
    expiry,
    image: merchant.image,
    urgent,
    reasons,
    tag
  };
};

function App() {
  const [loadingAI, setLoadingAI] = useState(true);
  const [aiStatus, setAiStatus] = useState('Analyzing your situation...');
  const [offerVisible, setOfferVisible] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [redeemed, setRedeemed] = useState(false);

  const [location, setLocation] = useState('Old Town');
  const [weather, setWeather] = useState('Cloudy');
  const [time, setTime] = useState('Afternoon');
  const [intent, setIntent] = useState('Just Browsing');
  
  const [currentOffer, setCurrentOffer] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [rewardAmount, setRewardAmount] = useState('0.00');
  const [walletBalance, setWalletBalance] = useState(10.00);
  const [viewMode, setViewMode] = useState('consumer');
  const [co2Saved, setCo2Saved] = useState(1.2);

  const generateOffer = (loc, wea, tim, int) => {
    setLoadingAI(true);
    setOfferVisible(false);
    setCheckoutOpen(false);
    
    setAiStatus('Finding local matches...');
    
    setTimeout(() => {
      setAiStatus('Optimizing yield and intent...');
    }, 800);
    
    setTimeout(() => {
      setAiStatus('Generating personalized offer...');
    }, 1600);
    
    setTimeout(() => {
      const newOffer = generateDynamicOffer(loc, wea, tim, int);
      setCurrentOffer(newOffer);
      setLoadingAI(false);
      setOfferVisible(true);
    }, 2400);
  };

  useEffect(() => {
    generateOffer(location, weather, time, intent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  const handleAccept = () => {
    setCheckoutOpen(true);
  };

  const handleDismiss = () => {
    setOfferVisible(false);
    generateOffer(location, weather, time, intent);
  };

  const handleRedeem = () => {
    const randomReward = (Math.random() * 6.5 + 1.5).toFixed(2);
    setRewardAmount(randomReward);
    setWalletBalance(prev => prev + parseFloat(randomReward));
    setCo2Saved(prev => prev + parseFloat((Math.random() * 0.4 + 0.1).toFixed(2)));
    setRedeemed(true);
    setTimeout(() => {
      setCheckoutOpen(false);
      setTimeout(() => {
        setOfferVisible(false);
        setRedeemed(false);
        generateOffer(location, weather, time, intent);
      }, 400);
    }, 2500);
  };

  return (
    <div className="mobile-container">
      <div className="location-bg"></div>
      
      {/* Header */}
      <header className="app-header">
        <div className="greeting">
          <h1>Hello, Mia 👋</h1>
          <p>Ready for a break?</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(16, 185, 129, 0.1)', padding: '6px 12px', borderRadius: '100px', border: '1px solid rgba(16, 185, 129, 0.2)' }} title="Carbon saved by walking to local merchants">
            <Leaf size={14} color="var(--success-color)" />
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--success-color)' }}>{co2Saved.toFixed(1)}kg</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Wallet size={14} color="var(--success-color)" />
            <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>€{walletBalance.toFixed(2)}</span>
          </div>
          <div className="profile-pic" style={{ width: '36px', height: '36px', fontSize: '0.9rem' }}>M</div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="content-area">
        
        {viewMode === 'consumer' && (
          <div style={{ animation: 'fadeIn 0.3s ease', display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Sleek Context Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
          
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', alignItems: 'center' }}>
            <select 
              value={location} 
              onChange={(e) => { setLocation(e.target.value); generateOffer(e.target.value, weather, time, intent); }}
              className="context-select primary"
            >
              <option value="Old Town">📍 Old Town</option>
              <option value="Business District">📍 Business</option>
              <option value="Park Area">📍 Park</option>
              <option value="Shopping Street">📍 Shopping</option>
            </select>
            
            <select 
              value={weather} 
              onChange={(e) => { setWeather(e.target.value); generateOffer(location, e.target.value, time, intent); }}
              className="context-select primary"
            >
              <option value="Sunny">☀️ Sunny</option>
              <option value="Cloudy">☁️ Cloudy</option>
              <option value="Rainy">🌧️ Rainy</option>
              <option value="Cold">❄️ Cold</option>
            </select>

            <button 
              onClick={() => setShowAdvanced(!showAdvanced)}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', marginLeft: 'auto' }}
              title="Advanced Settings"
            >
              {showAdvanced ? <X size={16}/> : <Sparkles size={16}/>}
            </button>
          </div>

          {showAdvanced && (
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', animation: 'slideDown 0.2s ease' }}>
              <select 
                value={time} 
                onChange={(e) => { setTime(e.target.value); generateOffer(location, weather, e.target.value, intent); }}
                className="context-select secondary"
              >
                <option value="Morning">🌅 Morning</option>
                <option value="Afternoon">☀️ Afternoon</option>
                <option value="Evening">🌆 Evening</option>
                <option value="Night">🌙 Night</option>
              </select>

              <select 
                value={intent} 
                onChange={(e) => { setIntent(e.target.value); generateOffer(location, weather, time, e.target.value); }}
                className="context-select secondary"
              >
                <option value="Just Browsing">🚶 Browsing</option>
                <option value="Quick Snack">🥨 Snack</option>
                <option value="Relax / Coffee Break">☕ Coffee Break</option>
                <option value="Full Meal">🍽️ Meal</option>
              </select>
            </div>
          )}
        </div>

        {/* AI Processing Overlay */}
        {loadingAI && (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '40px 20px', marginTop: '20px' }}>
            <div className="spinner" style={{ margin: '0 auto 20px' }}></div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>City Wallet AI</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{aiStatus}</p>
          </div>
        )}

        {/* Dynamic Offer Card */}
        {offerVisible && !loadingAI && currentOffer && (
          <div className="offer-card" style={{ animation: 'slideUp 0.5s ease' }}>
            <div className="offer-glow"></div>
            
            {currentOffer.urgent && (
              <div className="offer-badge urgent">
                <Clock size={12} />
                {currentOffer.expiry}
              </div>
            )}
            
            <img src={currentOffer.image} alt="Offer" className="offer-image" />
            
            <div className="offer-content">
              <div className="merchant-info" style={{ flexWrap: 'wrap' }}>
                <div className="merchant-logo">
                  <Coffee size={16} color="white" style={{ margin: '4px' }}/>
                </div>
                <span className="merchant-name">{currentOffer.merchant}</span>
                <span className="merchant-distance">
                  <Navigation size={10} style={{ display: 'inline', marginRight: '2px', verticalAlign: 'middle' }}/>
                  {currentOffer.distance}
                </span>
                <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                  {currentOffer.tag}
                </span>
              </div>
              
              <h2 className="offer-title">{currentOffer.title}</h2>
              <p className="offer-desc">{currentOffer.description}</p>
              
              <div className="offer-actions">
                <button className="btn btn-secondary" onClick={handleDismiss}>
                  <X size={18} /> Pass
                </button>
                <button className="btn btn-primary" onClick={handleAccept}>
                  <Check size={18} /> Get {currentOffer.discount}
                </button>
              </div>
            </div>
            
            <div style={{ padding: '16px 24px', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <h4 style={{ fontSize: '0.8rem', color: 'var(--accent-color)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} /> Why this offer?
              </h4>
              <ul style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', paddingLeft: '20px', margin: 0, lineHeight: '1.5' }}>
                {currentOffer.reasons.map((reason, i) => <li key={i} style={{ marginBottom: '4px' }}>{reason}</li>)}
              </ul>
            </div>
          </div>
            )}
          </div>
        )}

        {viewMode === 'merchant' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <h2 style={{ marginBottom: '4px' }}>Merchant Portal</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>Automated AI Yield Management</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '16px' }}>
                <h4 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Live Footfall</h4>
                <div style={{ color: 'var(--danger-color)', fontSize: '1.5rem', fontWeight: 'bold' }}>Low</div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Impacted by {weather}</p>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '16px' }}>
                <h4 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>AI Offers Issued</h4>
                <div style={{ color: 'var(--accent-color)', fontSize: '1.5rem', fontWeight: 'bold' }}>142</div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>+24% vs yesterday</p>
              </div>
            </div>
            
            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Active AI Campaigns</h3>
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <strong style={{ fontSize: '0.95rem' }}>"Dynamic Weather Routing"</strong>
                <span style={{ color: 'var(--success-color)', fontSize: '0.8rem', fontWeight: '600' }}>Active</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                Automatically issuing aggressive yields (up to 50% OFF) to users within 300m to counteract {weather.toLowerCase()} weather footfall drop.
              </p>
            </div>
          </div>
        )}

        {viewMode === 'xray' && (
          <div style={{ animation: 'fadeIn 0.3s ease', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h2 style={{ color: 'var(--accent-color)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={20} /> AI Engine X-Ray
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.85rem' }}>Live state representation of the dynamic generative engine.</p>
            
            <div style={{ background: '#050505', padding: '16px', borderRadius: '12px', border: '1px solid #222', flex: 1, overflowY: 'auto' }}>
              <pre style={{ color: '#a0a0ab', fontSize: '0.7rem', whiteSpace: 'pre-wrap', margin: 0, fontFamily: 'monospace' }}>
{JSON.stringify({
  timestamp: new Date().toISOString(),
  environment_signals: {
    location: location,
    weather: weather,
    time: time,
    user_intent: intent
  },
  yield_engine_eval: {
    scanned_merchants: 15,
    distance_radius: "50m - 300m",
    demand_multipliers_applied: true
  },
  ai_generation_output: currentOffer
}, null, 2)}
              </pre>
            </div>
          </div>
        )}

      </main>

      {/* Presentation Switcher Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px 20px', background: 'rgba(15, 16, 21, 0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255, 255, 255, 0.05)', position: 'sticky', bottom: 0, zIndex: 50 }}>
        <button onClick={() => setViewMode('consumer')} style={{ flex: 1, background: 'none', border: 'none', color: viewMode === 'consumer' ? 'var(--accent-color)' : 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', fontSize: '0.7rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}>
          <Wallet size={20} /> Consumer
        </button>
        <button onClick={() => setViewMode('merchant')} style={{ flex: 1, background: 'none', border: 'none', color: viewMode === 'merchant' ? 'var(--accent-color)' : 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', fontSize: '0.7rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}>
          <LineChart size={20} /> Merchant
        </button>
        <button onClick={() => setViewMode('xray')} style={{ flex: 1, background: 'none', border: 'none', color: viewMode === 'xray' ? 'var(--accent-color)' : 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', fontSize: '0.7rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}>
          <Cpu size={20} /> AI Engine
        </button>
      </div>

      {/* Checkout/Redemption Backdrop */}
      <div 
        className={`modal-backdrop ${checkoutOpen ? 'open' : ''}`} 
        onClick={() => setCheckoutOpen(false)}
      ></div>

      {/* Checkout/Redemption Modal */}
      <div className={`checkout-modal ${checkoutOpen ? 'open' : ''}`}>
        <div className="modal-handle"></div>
        {redeemed ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--success-color)', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px', animation: 'scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
              <Check size={32} color="white" />
            </div>
            <h2 style={{ marginBottom: '8px', animation: 'slideUp 0.3s ease 0.1s both' }}>Offer Redeemed Successfully!</h2>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '8px 16px', borderRadius: '100px', display: 'inline-block', color: 'var(--success-color)', fontWeight: '600', marginBottom: '16px', fontSize: '0.9rem', animation: 'slideUp 0.3s ease 0.2s both' }}>
              +€{rewardAmount} cashback added
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', animation: 'slideUp 0.3s ease 0.3s both' }}>Cashback has been applied to your City Wallet.</p>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ marginBottom: '8px' }}>Redeem at Counter</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>Show this code to the merchant at {currentOffer?.merchant}</p>
            <div style={{ display: 'inline-block', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#fca5a5', fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px', marginBottom: '16px' }}>
              Demo QR Code - Simulated Redemption
            </div>
            
            <div className="qr-container">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=CityWallet_Redeem_CafeLumen" alt="QR Code" style={{ width: '100%', height: '100%' }} />
            </div>
            
            <button className="btn btn-primary" style={{ width: '100%', marginBottom: '12px' }} onClick={handleRedeem}>
              Simulate Merchant Scan
            </button>
            <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => setCheckoutOpen(false)}>
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Simple style block for animations not in index.css */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .context-select {
          padding: 8px 14px;
          border-radius: 100px;
          font-size: 0.8rem;
          outline: none;
          cursor: pointer;
          font-family: inherit;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          white-space: nowrap;
          transition: all 0.2s ease;
        }
        .context-select.primary {
          background: rgba(99, 102, 241, 0.15);
          border: 1px solid rgba(99, 102, 241, 0.3);
          color: #fff;
          font-weight: 500;
        }
        .context-select.secondary {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
        }
        .context-select:hover {
          border-color: rgba(99, 102, 241, 0.5);
          background: rgba(255, 255, 255, 0.1);
        }
        .context-select option {
          background: #1c1c28;
          color: #fff;
        }
        /* Hide scrollbar for select containers */
        div[style*="overflow-x: auto"]::-webkit-scrollbar {
          display: none;
        }
        div[style*="overflow-x: auto"] {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}

export default App;
