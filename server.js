const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ serve frontend
app.use(express.static("public"));

let records = [
  {
    id: "254517",
    fileNo: "348438956",
    name: "Chandraja Sen",
    location: "Lacus Somniorum (Lake of Dreams)",
    coordinates: {
      lat: "38.52° S",
      long: "8.09° W"
    },
    date: "22 March 2026",
    price: "60$",
    land: "2 Acres",
    tokenId: "16336568868",
    contract: "0x1454e586E7dB35eE1EFDbDbc49E0350"
  }
];

/* HOME */
app.get("/", (req, res) => {
  res.send("🌕 Lunar Property API Running");
});

/* VERIFY */
app.get("/verify", (req, res) => {
  const { id, fileNo } = req.query;

  const record = records.find(
    r => r.id === id && r.fileNo === fileNo
  );

  if (record) {
    res.json({ status: "valid", data: record });
  } else {
    res.json({ status: "invalid" });
  }
});

/* PURCHASE */
app.post("/purchase", (req, res) => {
  const { name } = req.body;

  const newRecord = {
    id: Math.floor(Math.random() * 1000000).toString(),
    fileNo: Math.floor(Math.random() * 1000000000).toString(),
    name,
    location: "Sinus Iridum (Bay of Rainbows)",
    coordinates: {
      lat: "38.52° S",
      long: "8.09° W"
    },
    date: new Date().toDateString(),
    price: "45.27 ETH",
    land: "5 Acres",
    tokenId: Math.floor(Math.random() * 10000000000).toString(),
    contract: "0x" + Math.random().toString(16).substring(2, 15)
  };

  records.push(newRecord);

  res.json({ status: "success", data: newRecord });
});

/* START SERVER */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});