# fat-wasmjs-binaries

Experimenting with combining WebAssembly and JavaScript into a single file.

At this point this is just that, an experiment and I do not recommend using this example in production as there are several issues with it and whether or not it actually would be useful or a performance win is dubious.

## Magic number

The .wasmjs file starts with a magic number 0x736A6177 which is a 32-bit integer of the ASCII `wajs`.

## WebAssembly

Immediately following the magic number is a 32-bit integer of how many bytes the WebAssembly binary portion is. The bytes of the WASM then immediately follows it.

## JavaScript

Anything after the WASM binary is considered JavaScript until EOF.
