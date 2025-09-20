import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 10,
                page: 1,
                sparkline: false
            }
        });
        const coins = response.data;
        res.render("index", { coins });
    }
    catch (error) {
        console.error("Error fetching data from CoinGecko API:", error);
        res.send("Error fetching data");
    }
});
   

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
