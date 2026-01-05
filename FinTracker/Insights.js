const assets = JSON.parse(localStorage.getItem("userAssets")) || [];

const USD_TO_INR = 83;

// Format INR in Indian style
function formatINR(value) {
  return "₹" + value.toLocaleString("en-IN", {
    maximumFractionDigits: 2
  });
}

function getRecommendation(change, pl) {
  if (change < -5 || pl < -50000) return { text: "Sell", class: "sell" };
  if (pl > 50000 && change > 0) return { text: "Buy", class: "buy" };
  return { text: "Hold", class: "hold" };
}

function renderInsights(data) {
  const container = document.getElementById("insights-container");

  const portfolioValueINR = data.reduce(
    (sum, asset) => sum + asset.price * asset.amount * USD_TO_INR,
    0
  );

  const best = data.reduce((a, b) => a.change > b.change ? a : b);
  const worst = data.reduce((a, b) => a.change < b.change ? a : b);

  container.innerHTML = `
    <section class="overview">
      <div class="overview-box">
        <h2>Total Portfolio Value</h2>
        <p>${formatINR(portfolioValueINR)}</p>
      </div>
      <div class="overview-box">
        <h2>24h Change</h2>
        <p class="positive">+3.12%</p>
      </div>
      <div class="overview-box">
        <h2>Best Performer</h2>
        <p>${best.symbol}</p>
      </div>
      <div class="overview-box">
        <h2>Worst Performer</h2>
        <p>${worst.symbol}</p>
      </div>
      <div class="overview-box">
        <h2>Portfolio Allocation</h2>
        <canvas id="portfolioChart"></canvas>
      </div>
    </section>

    <section class="insights">
      <h2>Asset Insights</h2>
      <table class="insights-table">
        <thead>
          <tr>
            <th>Asset</th>
            <th>Current Price</th>
            <th>Amount</th>
            <th>Value</th>
            <th>24h</th>
            <th>Entry</th>
            <th>P/L</th>
            <th>Recommend</th>
          </tr>
        </thead>
        <tbody>
          ${data.map(asset => {
            const priceINR = asset.price * USD_TO_INR;
            const entryINR = asset.entry * USD_TO_INR;
            const valueINR = priceINR * asset.amount;
            const plINR = (priceINR - entryINR) * asset.amount;
            const rec = getRecommendation(asset.change, plINR);

            return `
              <tr>
                <td>${asset.symbol}</td>
                <td>${formatINR(priceINR)}</td>
                <td>${asset.amount}</td>
                <td>${formatINR(valueINR)}</td>
                <td class="${asset.change >= 0 ? 'positive' : 'negative'}">
                  ${asset.change}%
                </td>
                <td>${formatINR(entryINR)}</td>
                <td class="${plINR >= 0 ? 'positive' : 'negative'}">
                  ${formatINR(plINR)}
                </td>
                <td class="${rec.class}">${rec.text}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </section>
  `;

  renderChart(data);
}

function renderChart(data) {
  const ctx = document.getElementById("portfolioChart").getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: data.map(a => a.symbol),
      datasets: [{
        data: data.map(a => a.amount * a.price * USD_TO_INR),
        backgroundColor: ["#00e676", "#ff5252", "#2979ff", "#ffea00"]
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: { color: "#fff" }
        }
      }
    }
  });
}

if (assets.length === 0) {
  document.getElementById("insights-container").innerHTML = "No assets added.";
} else {
  renderInsights(assets);
}
