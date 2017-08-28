export default class MockBrowser {
    static mock() {
        global.SharedArrayBuffer = ArrayBuffer;
        global.console.debug = console.log;
    }
}
