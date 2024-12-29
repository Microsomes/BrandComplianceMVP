const fs = require("fs");

const d = JSON.parse(fs.readFileSync("carphonewarehouse_phones4-2024-12-28.json", "utf8"));

for (let i = 0; i < d.length; i++) {
  console.log(d[i].preData.name.split("\n"));
}