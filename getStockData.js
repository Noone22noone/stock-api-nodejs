const yf = require("yahoo-finance2").default;

const symbols = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "META", "NFLX", "NVDA", "INTC", "BABA"];

async function getStockData() {
  const results = [];

  for (const symbol of symbols) {
    try {
      const quote = await yf.quote(symbol);
      results.push({
        symbol,
        name: quote.shortName,
        price: quote.regularMarketPrice,
        currency: quote.currency,
        peRatio: quote.trailingPE,
        eps: quote.epsTrailingTwelveMonths
      });
    } catch (error) {
      results.push({
        symbol,
        error: `Failed to fetch data: ${error.message}`
      });
    }
  }

  return results;
}

module.exports = getStockData;
