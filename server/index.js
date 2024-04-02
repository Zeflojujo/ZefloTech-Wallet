const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0308bb50b34fad46cdb3531509118119363addecf97404d940ffc260cdf8e82d34": 100,
  "0249574250aadc2197fc2ad68b4eb0d91e3e1f77a9caf7338e6c72ef98b9e6e115": 50,
  "039f1ea15dbf03328ca62977a79f2920efdb225bc7526b570efca27678d5ed189e": 75,
};

// privateskeys
// 1: "6e026372213e24f356f36bf8fc92aada2176f92027ea111316915240c0a374de"
// 2: "a77ca7e7cb79c3c60a5e6bcef3116826efeab2029af355d607213b6f3045c2e3"
// 3: "f4578758311f7c25d6e1bce78c360b37fed81071f4c2eb8347ad88091fcdf889"


app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
