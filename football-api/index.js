const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
    try {
      // const url = "https://www.espn.in/football/table/_/league/eng.1";
      const url = "https://www.espn.in/football/table/_/league/esp.1";
      const { data } = await axios.get(url);
      //   console.log(data);
      const $ = cheerio.load(data);

      const tableData1 = [];

      // Scrape table rows
      $("table tbody tr").each((index, element) => {
        const row = $(element).find("td");
        if (row.length > 0) {
          const positionText = $(row[0])
            .text()
            .trim()
            .replace(/^\d+/, "")
            .slice(3);
          if (/[a-zA-Z]/.test(positionText)) {
            tableData1.push({
              position: positionText,
            });
          }
        }
      });

      const tableData2 = [];
      $("table tbody tr").each((index, element) => {
        const row = $(element).find("td").slice(0);
        if (row.length > 0) {
          const positionText = $(row[0]).text().trim();
          if (/^\d+$/.test(positionText)) {
            tableData2.push({
              GP: $(row[0]).text().trim(),
              W: $(row[1]).text(),
              D: $(row[2]).text().trim(),
              L: $(row[3]).text().trim(),
              F: $(row[4]).text().trim(),
              A: $(row[5]).text().trim(),
              GD: $(row[6]).text().trim(),
              P: $(row[7]).text().trim(),
            });
          }
        }
      });

      const combinedData = tableData1.map((data1, index) => ({
        position: data1.position,
        GP: tableData2[index]?.GP || "",
        W: tableData2[index]?.W || "",
        D: tableData2[index]?.D || "",
        L: tableData2[index]?.L || "",
        F: tableData2[index]?.F || "",
        A: tableData2[index]?.A || "",
        GD: tableData2[index]?.GD || "",
        P: tableData2[index]?.P || "",
      }));

      res.json(combinedData);
    } catch (error) {
        console.error('Error scraping data:', error.message);
        res.status(500).json({ error: 'Failed to scrape data' });
    }
});

app.listen(4444, () => {
    console.log("Server Running at port 4444");
});






