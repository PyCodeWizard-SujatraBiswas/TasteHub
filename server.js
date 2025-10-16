const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// ================= MENU (50 Items) =================
const MENU = [
  { name: "Masala Dosa", region: "South", state: "All", price_min: 120, price_max: 180, type: "Main" },
  { name: "Paneer Butter Masala", region: "North", state: "All", price_min: 180, price_max: 290, type: "Main" },
  { name: "Rogan Josh", region: "North", state: "All", price_min: 260, price_max: 380, type: "Main" },
  { name: "Hyderabadi Biryani", region: "South", state: "Telangana", price_min: 260, price_max: 420, type: "Main" },
  { name: "Chole Bhature", region: "North", state: "Punjab", price_min: 180, price_max: 260, type: "Main" },
  { name: "Idli Sambar", region: "South", state: "Tamil Nadu", price_min: 60, price_max: 100, type: "Breakfast" },
  { name: "Medu Vada", region: "South", state: "Tamil Nadu", price_min: 50, price_max: 90, type: "Snack" },
  { name: "Pesarattu", region: "South", state: "Andhra Pradesh", price_min: 80, price_max: 120, type: "Breakfast" },
  { name: "Appam with Stew", region: "South", state: "Kerala", price_min: 120, price_max: 180, type: "Main" },
  { name: "Fish Molee", region: "South", state: "Kerala", price_min: 220, price_max: 320, type: "Main" },
  { name: "Rajma Chawal", region: "North", state: "Punjab", price_min: 120, price_max: 180, type: "Main" },
  { name: "Aloo Paratha", region: "North", state: "Punjab", price_min: 80, price_max: 120, type: "Breakfast" },
  { name: "Kadhi Pakora", region: "North", state: "Punjab", price_min: 100, price_max: 160, type: "Main" },
  { name: "Butter Chicken", region: "North", state: "Delhi", price_min: 280, price_max: 400, type: "Main" },
  { name: "Tandoori Chicken", region: "North", state: "Delhi", price_min: 240, price_max: 360, type: "Main" },
  { name: "Macher Jhol", region: "East", state: "West Bengal", price_min: 180, price_max: 260, type: "Main" },
  { name: "Shukto", region: "East", state: "West Bengal", price_min: 100, price_max: 160, type: "Main" },
  { name: "Litti Chokha", region: "East", state: "Bihar", price_min: 80, price_max: 140, type: "Main" },
  { name: "Chhena Poda", region: "East", state: "Odisha", price_min: 100, price_max: 160, type: "Dessert" },
  { name: "Momos", region: "East", state: "Sikkim", price_min: 80, price_max: 140, type: "Snack" },
  { name: "Dhokla", region: "West", state: "Gujarat", price_min: 60, price_max: 100, type: "Snack" },
  { name: "Undhiyu", region: "West", state: "Gujarat", price_min: 180, price_max: 260, type: "Main" },
  { name: "Misal Pav", region: "West", state: "Maharashtra", price_min: 80, price_max: 140, type: "Snack" },
  { name: "Pav Bhaji", region: "West", state: "Maharashtra", price_min: 100, price_max: 160, type: "Snack" },
  { name: "Goan Prawn Curry", region: "West", state: "Goa", price_min: 240, price_max: 360, type: "Main" },
  { name: "Gulab Jamun", region: "All", state: "All", price_min: 60, price_max: 100, type: "Dessert" },
  { name: "Rasgulla", region: "East", state: "West Bengal", price_min: 60, price_max: 100, type: "Dessert" },
  { name: "Jalebi", region: "North", state: "All", price_min: 50, price_max: 90, type: "Dessert" },
  { name: "Mysore Pak", region: "South", state: "Karnataka", price_min: 80, price_max: 120, type: "Dessert" },
  { name: "Kaju Katli", region: "North", state: "All", price_min: 120, price_max: 200, type: "Dessert" },
  { name: "Pani Puri", region: "All", state: "All", price_min: 40, price_max: 80, type: "Snack" },
  { name: "Bhel Puri", region: "West", state: "Maharashtra", price_min: 50, price_max: 90, type: "Snack" },
  { name: "Samosa", region: "North", state: "All", price_min: 20, price_max: 40, type: "Snack" },
  { name: "Kathi Roll", region: "East", state: "West Bengal", price_min: 80, price_max: 140, type: "Snack" },
  { name: "Vada Pav", region: "West", state: "Maharashtra", price_min: 30, price_max: 60, type: "Snack" },
  { name: "Thalipeeth", region: "West", state: "Maharashtra", price_min: 80, price_max: 120, type: "Breakfast" },
  { name: "Sarson da Saag", region: "North", state: "Punjab", price_min: 160, price_max: 240, type: "Main" },
  { name: "Makki di Roti", region: "North", state: "Punjab", price_min: 60, price_max: 100, type: "Main" },
  { name: "Bhutte ka Kees", region: "Central", state: "Madhya Pradesh", price_min: 80, price_max: 140, type: "Snack" },
  { name: "Poha", region: "Central", state: "Madhya Pradesh", price_min: 40, price_max: 80, type: "Breakfast" },
  { name: "Dal Baati Churma", region: "West", state: "Rajasthan", price_min: 180, price_max: 260, type: "Main" },
  { name: "Laal Maas", region: "West", state: "Rajasthan", price_min: 280, price_max: 400, type: "Main" },
  { name: "Khar", region: "East", state: "Assam", price_min: 160, price_max: 240, type: "Main" },
  { name: "Bamboo Shoot Curry", region: "East", state: "Nagaland", price_min: 180, price_max: 260, type: "Main" },
  { name: "Chak Hao Kheer", region: "East", state: "Manipur", price_min: 100, price_max: 160, type: "Dessert" },
  { name: "Neer Dosa", region: "South", state: "Karnataka", price_min: 80, price_max: 120, type: "Breakfast" },
  { name: "Kozhukattai", region: "South", state: "Tamil Nadu", price_min: 60, price_max: 100, type: "Dessert" },
  { name: "Kozhi Varuval", region: "South", state: "Tamil Nadu", price_min: 220, price_max: 320, type: "Main" }
];

// ================= GEMINI CHATBOT =================
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyB51JGpkgfWrWo0aQmsEmIqZF9WND3Ww1I"; 
const MODEL_NAME = "models/gemini-2.5-flash";

async function geminiChat(userMessage) {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ role: "user", parts: [{ text: userMessage }] }]
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn’t understand.";
  } catch (err) {
    console.error("Chatbot API Error:", err.response?.data || err.message);
    return "Error connecting to AI.";
  }
}

// ================= API ENDPOINTS =================
app.get("/api/menu", (req, res) => {
  const region = req.query.region || "All";
  const state = req.query.state || "All";
  const filtered = MENU.filter(d => {
    return (region === "All" || d.region.includes(region)) &&
           (state === "All" || d.state === "All" || d.state.includes(state));
  });
  res.json(filtered);
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  const reply = await geminiChat(message);
  res.json({ reply });
});

// ================= FRONTEND =================
app.get("/", (req,res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Taste Hub India</title>
  <style>
    body { font-family: Arial, sans-serif; margin:0; background:#f9f9f9; }
    header { background:#006241; color:white; padding:1rem 2rem; display:flex; justify-content:space-between; }
    header nav a { color:white; margin-left:1rem; text-decoration:none; font-weight:bold; }
    .hero { background:url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80') center/cover; color:white; text-align:center; padding:6rem 2rem; }
    .hero h1 { font-size:3rem; }
    .section { padding:2rem; max-width:1000px; margin:auto; }
    .card { background:white; padding:1rem; margin:0.5rem; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); }
    footer { background:#006241; color:white; text-align:center; padding:1rem; margin-top:2rem; }
    #chatbox { border:1px solid #ccc; border-radius:8px; padding:1rem; background:white; max-width:600px; margin:auto; }
    #chatlog { max-height:300px; overflow-y:auto; border:1px solid #eee; padding:1rem; margin-bottom:1rem; background:#fafafa; }
    .msg { margin:0.5rem 0; }
    .user { font-weight:bold; color:#006241; }
    .bot { font-weight:bold; color:#d35400; }
  </style>
</head>
<body>
  <header>
    <div class="logo">Taste Hub India</div>
    <nav>
      <a href="#menu">Menu</a>
      <a href="#chat">Chatbot</a>
    </nav>
  </header>

  <section class="hero">
    <h1>Welcome to Taste Hub India</h1>
    <p>AI-powered Indian food recommendations 🍴</p>
  </section>

  <section id="menu" class="section">
    <h2>Menu</h2>
    <button onclick="loadMenu()">Show All Menu</button>
    <div id="menu-container"></div>
  </section>

  <section id="chat" class="section">
    <h2>Food Chatbot</h2>
    <div id="chatbox">
      <div id="chatlog"></div>
      <input type="text" id="user-input" placeholder="Ask me about food..." style="width:80%">
      <button onclick="sendMessage()">Send</button>
    </div>
  </section>

  <footer>
    <p>© 2025 Taste Hub India</p>
  </footer>

  <script>
    async function loadMenu() {
      const res = await fetch('/api/menu');
      const data = await res.json();
      document.getElementById('menu-container').innerHTML = 
        data.map(d => \`<div class="card">\${d.name} (₹\${d.price_min}-₹\${d.price_max})</div>\`).join('');
    }

    async function sendMessage() {
      const input = document.getElementById("user-input");
      const message = input.value.trim();
      if(!message) return;
      addMessage("You", message, "user");
      input.value = "";
      const res = await fetch("/api/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ message })
      });
      const data = await res.json();
      addMessage("Bot", data.reply, "bot");
    }

    function addMessage(sender, text, cls) {
      const chatlog = document.getElementById("chatlog");
      const div = document.createElement("div");
      div.className = "msg " + cls;
      div.innerHTML = "<b>" + sender + ":</b> " + text;
      chatlog.appendChild(div);
      chatlog.scrollTop = chatlog.scrollHeight;
    }
  </script>
</body>
</html>
  `);
});

// ================= SERVER =================
app.listen(PORT, () => console.log("Taste Hub India with Gemini running at http://localhost:" + PORT));
