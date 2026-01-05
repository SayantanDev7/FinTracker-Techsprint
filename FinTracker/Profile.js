const assets = JSON.parse(localStorage.getItem("userAssets")) || [];
const USD_TO_INR = 83;

function formatINR(value) {
  return "₹" + value.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

// Portfolio Value
let totalValue = 0;
assets.forEach(asset => {
  totalValue += asset.price * asset.amount * USD_TO_INR;
});

document.getElementById("portfolioValue").innerText = formatINR(totalValue);
document.getElementById("portfolioChange").innerText =
  assets.length ? "Based on current holdings" : "No assets added";

// Asset List
const assetList = document.getElementById("assetList");

assets.forEach(asset => {
  const valueINR = asset.price * asset.amount * USD_TO_INR;

  const li = document.createElement("li");
  li.className = "asset-item";

  li.innerHTML = `
    <div class="asset-name">${asset.symbol}</div>
    <div class="asset-holdings">${formatINR(valueINR)}</div>
    <div class="asset-value ${asset.change >= 0 ? "positive" : "negative"}">
      ${asset.change}%
    </div>
  `;

  assetList.appendChild(li);
});
