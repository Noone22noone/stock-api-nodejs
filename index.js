const express = require("express");
const yahooFinance = require("yahoo-finance2").default;
const app = express();
const PORT = 3000;

// Your API endpoint
app.get("/getStockData", async (req, res) => {
  try {
    const stockSymbols = ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN", "META", "NFLX", "NVDA", "INTC", "BABA"];
    const results = [];

    for (const symbol of stockSymbols) {
      const quote = await yahooFinance.quote(symbol);

      results.push({
        symbol: quote.symbol,
        name: quote.shortName,
        price: quote.regularMarketPrice,
        currency: quote.currency,
        peRatio: quote.trailingPE ?? "N/A",
        eps: quote.epsTrailingTwelveMonths ?? "N/A"
      });
    }

    // This makes the output clean and readable
    res.setHeader("Content-Type", "application/json");
    res.status(200).json({
      success: true,
      data: results
    });
  } catch (error) {
    console.error("Error fetching stock data:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch stock data",
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ API running on http://localhost:${PORT}`);
});
