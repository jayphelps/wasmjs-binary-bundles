# wasmjs-binary-bundles

Proof of concept experiment combining WebAssembly and JavaScript into a single file with the idea that maybe any JS runtime required wouldn't need a separate network request. This sort of makes a "bundle" of both Wasm and JS.

This isn't currently a library you can use, just a proof of concept. It is not yet clear if this technique would actually provide gains, and in fact there are many situations where it would negatively impact performance because we can't start compiling the JavaScript until the Wasm is done compiling. If there isn't high network count contention concurrent would almost always be better. So it is probably best in most cases to continue to ship two files for this reason or look into [Web Packages](https://github.com/WICG/webpackage/blob/master/explainer.md).

## Custom Section

JavaScript is embedded into the WebAssembly file in a custom section named "wasmjs". This was done to allow us to still use streaming compilation via `WebAssembly.compileStreaming()`. Because custom sections are ignored, the single file can be streamed into the compiler as-is. Once it has been compiled we can then access the custom section containing the JavaScript, which is evaluated and passed the WebAssembly.Module instance, letting it finish up the actual instantiation of the Module and provide any JS imports it might need.

## Thanks

The current technique was [suggested by Sander Spies](https://twitter.com/Sander_Spies/status/1019872826696794113).
