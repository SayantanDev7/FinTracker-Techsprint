// document.getElementById('assetForm').addEventListener('submit', function(e) {
//   e.preventDefault();

//   const form = e.target;
//   const crypto = form.crypto.value;
//   const price = parseFloat(form.price.value);
//   const amount = parseFloat(form.amount.value);
//   const currentPrice = mockPrice(crypto);

//   const cost = (price * amount).toFixed(2);
//   const value = (currentPrice * amount).toFixed(2);
//   const pl = (((value - cost) / cost) * 100).toFixed(1);

//   // Create and append table row
//   const row = document.createElement('tr');
//   row.innerHTML = `
//     <td>${crypto}</td>
//     <td>${amount}</td>
//     <td>&#8377;${cost}</td>
//     <td>&#8377;${currentPrice}</td>
//     <td>&#8377;${value}</td>
//     <td class="${pl >= 0 ? 'positive' : 'negative'}">${pl}%</td>
//   `;
//   document.getElementById('assetTable').appendChild(row);

//   // Save to localStorage for use in insights page
//   const storedAssets = JSON.parse(localStorage.getItem('userAssets')) || [];
//   const newAsset = {
//     symbol: crypto,
//     amount: amount,
//     price: currentPrice,
//     entry: price,
//     change: getMockChange(), // Optional for insights recommendation
//   };
//   storedAssets.push(newAsset);
//   localStorage.setItem('userAssets', JSON.stringify(storedAssets));

//   // Reset form
//   form.reset();
// });

// // Fake price generator
// function mockPrice(symbol) {
//   const basePrices = {
//     BTC: 3235.87,
//     ETH: 3506.18,
//     ENB: 177.54,
//     XRP: 1024.48,
//     ADA: 3.2057
//   };
//   return basePrices[symbol] || 100;
// }

// // Optional: generate a mock 24h change value for insights
// function getMockChange() {
//   return (Math.random() * 10 - 5).toFixed(2); // random -5% to +5%
// }


// // ---------- Feature 1: Get Started CTA ----------
// document.addEventListener("DOMContentLoaded", () => {
//   const getStartedBtn = document.getElementById("getStartedBtn");
//   if (getStartedBtn) {
//     getStartedBtn.addEventListener("click", () => {
//       document
//         .getElementById("asset-section")
//         .scrollIntoView({ behavior: "smooth" });
//     });
//   }
// });

// // ---------- Feature 2: Feature Cards Info ----------
// document.querySelectorAll(".feature").forEach((card) => {
//   card.addEventListener("click", () => {
//     const type = card.dataset.feature;

//     const info = {
//       portfolio: "Unified crypto portfolio tracking",
//       pnl: "Live profit & loss tracking",
//       security: "OAuth2 & encrypted data protection",
//     };

//     if (info[type]) alert(info[type]);
//   });
// });

// // ---------- Feature 3: Rule-Based Asset Validation ----------
// const assetForm = document.getElementById("assetForm");

// if (assetForm) {
//   assetForm.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const crypto = this.crypto.value;
//     const price = Number(this.price.value);
//     const amount = Number(this.amount.value);

//     // Rule checks
//     if (!crypto || price <= 0 || amount <= 0) {
//       alert("Rule Violation: Invalid input values");
//       return;
//     }

//     if (price * amount > 100000) {
//       alert("Rule Alert: High-value asset detected");
//     }

//     addAssetRow(crypto, amount, price);
//     this.reset();
//   });
// }

// // ---------- Feature 4: Portfolio Table + P/L ----------
// function addAssetRow(symbol, amount, buyPrice) {
//   const currentPrice = buyPrice * (0.9 + Math.random() * 0.2);
//   const value = amount * currentPrice;
//   const pnl = ((currentPrice - buyPrice) / buyPrice) * 100;

//   const row = document.createElement("tr");
//   row.innerHTML = `
//     <td>${symbol}</td>
//     <td>${amount}</td>
//     <td>&#8377;${buyPrice.toFixed(2)}</td>
//     <td>&#8377;$${currentPrice.toFixed(2)}</td>
//     <td>&#8377;${value.toFixed(2)}</td>
//     <td class="${pnl >= 0 ? "positive" : "negative"}">${pnl.toFixed(2)}%</td>
//   `;

//   document.getElementById("assetTable").appendChild(row);
//   checkPnLAlert(pnl);
// }

// // ---------- Feature 5: Rule-Based Alerts ----------
// function checkPnLAlert(pnl) {
//   if (pnl <= -10) {
//     alert(" Alert: Asset dropped more than 10%");
//   } else if (pnl >= 15) {
//     alert(" Alert: Asset gained more than 15%");
//   }
// }

// // ---------- Feature 6: Info Cards ----------
// document.querySelectorAll(".info-card").forEach((card) => {
//   card.addEventListener("click", () => {
//     const info = card.dataset.info;

//     const details = {
//       snapshots: "Daily portfolio snapshots",
//       auto: "Automatic asset categorization",
//       rollover: "Unused budget rollover",
//       cashflow: "Income vs expense visualization",
//     };

//     if (details[info]) alert(details[info]);
//   });
// });

// // ---------- Feature 7: Login Security Info ----------
// const loginBtn = document.querySelector(".loginbutton");
// if (loginBtn) {
//   loginBtn.addEventListener("click", () => {
//     alert("Secure login using OAuth2 & Firebase Authentication");
//   });
// }

// // ---------- Feature 8: Footer Utilities ----------
// const footerButtons = document.querySelectorAll(".footer-buttons button");

// if (footerButtons.length) {
//   footerButtons[0].onclick = () =>
//     alert("AI-powered investment tips coming soon");

//   footerButtons[1].onclick = () =>
//     alert("Live crypto market news integration planned");

//   footerButtons[2].onclick = () =>
//     alert("Contact us at rapiddebuggers@fintrackr.com");
// }
const USD_TO_INR = 83;

// ---------- Utility ----------
function formatINR(value) {
  return "₹" + value.toLocaleString("en-IN", {
    maximumFractionDigits: 2
  });
}

// ---------- Asset Form Submit ----------
document.getElementById("assetForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const crypto = this.crypto.value;
  const buyPrice = Number(this.price.value); // INR
  const amount = Number(this.amount.value);

  if (!crypto || buyPrice <= 0 || amount <= 0) {
    alert("Rule Violation: Invalid input values");
    return;
  }

  const currentPrice = mockPrice(crypto);
  const value = currentPrice * amount;
  const pnlPercent = ((currentPrice - buyPrice) / buyPrice) * 100;

  // ---------- Table Row ----------
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${crypto}</td>
    <td>${amount}</td>
    <td>${formatINR(buyPrice)}</td>
    <td>${formatINR(currentPrice)}</td>
    <td>${formatINR(value)}</td>
    <td class="${pnlPercent >= 0 ? "positive" : "negative"}">
      ${pnlPercent.toFixed(2)}%
    </td>
  `;
  document.getElementById("assetTable").appendChild(row);

  // ---------- Save to localStorage ----------
  const storedAssets = JSON.parse(localStorage.getItem("userAssets")) || [];

  storedAssets.push({
    symbol: crypto,
    amount: amount,
    price: currentPrice, // INR
    entry: buyPrice,     // INR
    change: getMockChange()
  });

  localStorage.setItem("userAssets", JSON.stringify(storedAssets));

  checkPnLAlert(pnlPercent);
  this.reset();
});

// ---------- Mock INR Prices ----------
function mockPrice(symbol) {
  const basePricesINR = {
    BTC: 3140000,   // ~31.4 lakh
    ETH: 175000,   // ~1.75 lakh
    BNB: 27000,
    XRP: 50,
    ADA: 45
  };

  const base = basePricesINR[symbol] || 1000;

  // ±5% fluctuation
  return base * (0.95 + Math.random() * 0.1);
}

// ---------- Mock 24h Change ----------
function getMockChange() {
  return (Math.random() * 10 - 5).toFixed(2); // -5% to +5%
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

// ---------- Feature 2: Feature Cards ----------
document.querySelectorAll(".feature").forEach((card) => {
  card.addEventListener("click", () => {
    const info = {
      portfolio: "Unified crypto portfolio tracking",
      pnl: "Live profit & loss tracking",
      security: "OAuth2 & encrypted data protection"
    };
    alert(info[card.dataset.feature] || "");
  });
});

// ---------- Feature 5: Rule-Based Alerts ----------
function checkPnLAlert(pnl) {
  if (pnl <= -10) {
    alert("⚠️ Alert: Asset dropped more than 10%");
  } else if (pnl >= 15) {
    alert("🚀 Alert: Asset gained more than 15%");
  }
}

// ---------- Feature 6: Info Cards ----------
document.querySelectorAll(".info-card").forEach((card) => {
  card.addEventListener("click", () => {
    const details = {
      snapshots: "Daily portfolio snapshots",
      auto: "Automatic asset categorization",
      rollover: "Unused budget rollover",
      cashflow: "Income vs expense visualization"
    };
    alert(details[card.dataset.info] || "");
  });
});

// ---------- Feature 7: Login Security ----------
const loginBtn = document.querySelector(".loginbutton");
if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    alert("Secure login using OAuth2 & Firebase Authentication");
  });
}

// ---------- Feature 8: Footer ----------
const footerButtons = document.querySelectorAll(".footer-buttons button");
if (footerButtons.length) {
  footerButtons[0].onclick = () =>
    alert("AI-powered investment tips coming soon");

  footerButtons[1].onclick = () =>
    alert("Live crypto market news integration planned");

  footerButtons[2].onclick = () =>
    alert("Contact us at rapiddebuggers@fintracker.com");
}
