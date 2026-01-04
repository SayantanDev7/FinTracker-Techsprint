document.getElementById('assetForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const form = e.target;
  const crypto = form.crypto.value;
  const price = parseFloat(form.price.value);
  const amount = parseFloat(form.amount.value);
  const currentPrice = mockPrice(crypto);

  const cost = (price * amount).toFixed(2);
  const value = (currentPrice * amount).toFixed(2);
  const pl = (((value - cost) / cost) * 100).toFixed(1);

  // Create and append table row
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${crypto}</td>
    <td>${amount}</td>
    <td>$${cost}</td>
    <td>$${currentPrice}</td>
    <td>$${value}</td>
    <td class="${pl >= 0 ? 'positive' : 'negative'}">${pl}%</td>
  `;
  document.getElementById('assetTable').appendChild(row);

  // Save to localStorage for use in insights page
  const storedAssets = JSON.parse(localStorage.getItem('userAssets')) || [];
  const newAsset = {
    symbol: crypto,
    amount: amount,
    price: currentPrice,
    entry: price,
    change: getMockChange(), // Optional for insights recommendation
  };
  storedAssets.push(newAsset);
  localStorage.setItem('userAssets', JSON.stringify(storedAssets));

  // Reset form
  form.reset();
});

// Fake price generator
function mockPrice(symbol) {
  const basePrices = {
    BTC: 3235.87,
    ETH: 3506.18,
    ENB: 177.54,
    XRP: 1024.48,
    ADA: 3.2057
  };
  return basePrices[symbol] || 100;
}

// Optional: generate a mock 24h change value for insights
function getMockChange() {
  return (Math.random() * 10 - 5).toFixed(2); // random -5% to +5%
}


// ---------- Feature 1: Get Started CTA ----------
document.addEventListener("DOMContentLoaded", () => {
  const getStartedBtn = document.getElementById("getStartedBtn");
  if (getStartedBtn) {
    getStartedBtn.addEventListener("click", () => {
      document
        .getElementById("asset-section")
        .scrollIntoView({ behavior: "smooth" });
    });
  }
});

// ---------- Feature 2: Feature Cards Info ----------
document.querySelectorAll(".feature").forEach((card) => {
  card.addEventListener("click", () => {
    const type = card.dataset.feature;

    const info = {
      portfolio: "Unified crypto portfolio tracking",
      pnl: "Live profit & loss tracking",
      security: "OAuth2 & encrypted data protection",
    };

    if (info[type]) alert(info[type]);
  });
});

// ---------- Feature 3: Rule-Based Asset Validation ----------
const assetForm = document.getElementById("assetForm");

if (assetForm) {
  assetForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const crypto = this.crypto.value;
    const price = Number(this.price.value);
    const amount = Number(this.amount.value);

    // Rule checks
    if (!crypto || price <= 0 || amount <= 0) {
      alert("Rule Violation: Invalid input values");
      return;
    }

    if (price * amount > 100000) {
      alert("Rule Alert: High-value asset detected");
    }

    addAssetRow(crypto, amount, price);
    this.reset();
  });
}

// ---------- Feature 4: Portfolio Table + P/L ----------
function addAssetRow(symbol, amount, buyPrice) {
  const currentPrice = buyPrice * (0.9 + Math.random() * 0.2);
  const value = amount * currentPrice;
  const pnl = ((currentPrice - buyPrice) / buyPrice) * 100;

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${symbol}</td>
    <td>${amount}</td>
    <td>$${buyPrice.toFixed(2)}</td>
    <td>$${currentPrice.toFixed(2)}</td>
    <td>$${value.toFixed(2)}</td>
    <td class="${pnl >= 0 ? "positive" : "negative"}">${pnl.toFixed(2)}%</td>
  `;

  document.getElementById("assetTable").appendChild(row);
  checkPnLAlert(pnl);
}

// ---------- Feature 5: Rule-Based Alerts ----------
function checkPnLAlert(pnl) {
  if (pnl <= -10) {
    alert("⚠️ Alert: Asset dropped more than 10%");
  } else if (pnl >= 15) {
    alert("🎉 Alert: Asset gained more than 15%");
  }
}

// ---------- Feature 6: Info Cards ----------
document.querySelectorAll(".info-card").forEach((card) => {
  card.addEventListener("click", () => {
    const info = card.dataset.info;

    const details = {
      snapshots: "Daily portfolio snapshots",
      auto: "Automatic asset categorization",
      rollover: "Unused budget rollover",
      cashflow: "Income vs expense visualization",
    };

    if (details[info]) alert(details[info]);
  });
});

// ---------- Feature 7: Login Security Info ----------
const loginBtn = document.querySelector(".loginbutton");
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    alert("Secure login using OAuth2 & Firebase Authentication");
  });
}

// ---------- Feature 8: Footer Utilities ----------
const footerButtons = document.querySelectorAll(".footer-buttons button");

if (footerButtons.length) {
  footerButtons[0].onclick = () =>
    alert("AI-powered investment tips coming soon");

  footerButtons[1].onclick = () =>
    alert("Live crypto market news integration planned");

  footerButtons[2].onclick = () =>
    alert("Contact us at rapiddebuggers@fintrackr.com");
}
