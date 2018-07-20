# wasmjs-fat-binaries

Experimenting with combining WebAssembly and JavaScript into a single file.

At this point this is just that, an experiment and I do not recommend using this example in production as there are several issues with it and whether or not it actually would be useful or a performance win is dubious.

## Custom Section

JavaScript is embedded into the WebAssembly file in a custom section named "wasmjs". This was done to allow us to still use streaming compilation via `WebAssembly.compileStreaming()`. Because custom sections are ignored, the fat binary can be streamed into the compiler as-is. Once it has been compiled we can then access the custom section containing the JavaScript, which is evaluated and passed the WebAssembly.Module instance, letting it finish up the actual instantiation of the Module and provide any JS imports it might need.

## Thanks

The current technique was [suggested by Sander Spies](https://twitter.com/Sander_Spies/status/1019872826696794113).
