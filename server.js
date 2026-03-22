const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

/* ✅ CORS */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));

app.use(express.json());

/* ✅ Serve frontend */
app.use(express.static(path.join(__dirname, "public")));

/* ✅ Temporary database */
let records = [
  {
    id: "254517",
    fileNo: "34843895G",
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

/* ✅ HOME */
app.get("/", (req, res) => {
  res.send("🌕 Lunar Property API Running");
});

/* ✅ VERIFY */
app.get("/verify", (req, res) => {
  const { id, fileNo } = req.query;

  if (!id || !fileNo) {
    return res.status(400).json({
      status: "error",
      message: "Missing id or fileNo"
    });
  }

  const record = records.find(
    r => r.id === id && r.fileNo === fileNo
  );

  if (record) {
    res.json({ status: "valid", data: record });
  } else {
    res.json({ status: "invalid" });
  }
});

/* ✅ PURCHASE */
app.post("/purchase", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      status: "error",
      message: "Name is required"
    });
  }

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

/* ✅ FALLBACK (NO ERROR VERSION) */
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* ✅ START SERVER */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
