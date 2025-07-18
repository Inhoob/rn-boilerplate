const fs = require("fs");
const path = require("path");

const assetsDir = path.join(__dirname, "../src", "assets");
const indexFile = path.join(assetsDir, "index.ts");

const files = fs.readdirSync(assetsDir);

const exportStatements = files
  .filter((file) => /\.(png|jpg|jpeg|svg|pdf)$/.test(file)) // 이미지 파일 필터
  .map((file) => {
    const name = path.basename(file, path.extname(file));
    return `export { default as ${name} } from './${file}';`;
  })
  .join("\n");

fs.writeFileSync(indexFile, exportStatements, "utf8");
console.log("Icons index.ts generated!");
