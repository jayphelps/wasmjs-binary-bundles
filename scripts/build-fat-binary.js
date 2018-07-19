'use strict';

const fs = require('fs');
const js = fs.readFileSync('./src/main.js');
const wasm = fs.readFileSync('./src/main.wasm');

/*
  id           | varuint7    | section code
  payload_len	 | varuint32   | size of this section in bytes
  name_len     | varuint32 ? | length of name in bytes, present if id == 0
  name         | bytes ?     | section name: valid UTF-8 byte sequence, present if id == 0
  payload_data | bytes       | content of this section, of length payload_len - sizeof(name) - sizeof(name_len)
*/

const nameBuf = Buffer.from('wasmjs');
let jsSection;

jsSection = [
  ...varuint32(nameBuf.length),
  ...nameBuf,
  ...js
];

jsSection = [
  ...varuint7(0),
  ...varuint32(jsSection.length, 4),
  ...jsSection
];

const wasmjs = Buffer.concat([wasm, Buffer.from(jsSection)]);
fs.writeFileSync('./main.wasm', wasmjs);
WebAssembly.validate(wasmjs);

/**
 * Utility functions lifted from https://gist.github.com/miklund/79c1f3eb129ea5689c03c41d17922c14
 * No license specified
 */

// A LEB128 variable-length integer, limited to the values [0, 127]. varuint7 values may contain leading zeros.
function varuint7(n) {
  if (n < 0 || n > 127) {
    throw new Error('varuint7 is limited to [0, 127]');
  }

  return unsignedLEB128(n);
}

// A LEB128 variable-length integer, limited to uint32 values. varuint32 values may contain leading zeros.
function varuint32(n, padding) {
  if (n < 0 || n > 0xFFFFFFFF) {
    throw new Error('varuint32 is limited to [0, 4294967295]')
  }

  return unsignedLEB128(n, padding);
}

function unsignedLEB128(value, padding) {
  var v = [],
    b = 0;

  // no padding unless specified
  padding = padding || 0;

  do {
    b = value & 127;
    value = value >> 7;
    if (value != 0 || padding > 0) {
      b = b | 128;
    }
    v.push(b);
    padding--;
  } while (value != 0 || padding > -1);

  return v;
}