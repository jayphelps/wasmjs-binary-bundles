const fs = require('fs');
const js = fs.readFileSync('./src/main.js');
const wasm = fs.readFileSync('./src/main.wasm');

// "wajs" as 32-bit unsigned int
const MAGIC_NUMBER = 0x736A6177;
const header = new Uint32Array([MAGIC_NUMBER, wasm.length]);

const wasmjs = Buffer.concat([
  Buffer.from(header.buffer),
  wasm,
  js
]);

fs.writeFileSync('./main.wasmjs', wasmjs);
