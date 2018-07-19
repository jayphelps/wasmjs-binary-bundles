const imports = {};
WebAssembly.instantiate(WASM_MODULE, imports).then(instance => {
  const result = instance.exports.main();
  console.log(result);
  // 9001
});
