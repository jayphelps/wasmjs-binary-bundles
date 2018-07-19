WebAssembly.compile(wasm).then(module => {
  // Whatever imports are required, none for this demo
  const imports = {};
  WebAssembly.instantiate(module, imports).then(instance => {
    const result = instance.exports.main();
    console.log(result);
    // 9001
  });
});
