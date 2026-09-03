export class GlobalDocumentMock {
    constructor() {
        this._originalGlobals = globalThis.document;
    }

    mock(mockDocument) {
        Object.defineProperty(globalThis, 'document', {
            value: mockDocument,
            configurable: true,
            writable: true,
        });
    }

    unmock() {
        if (this._originalGlobals === undefined) {
            delete globalThis.document;
            return;
        }
        Object.defineProperty(globalThis, 'document', {
            value: this._originalGlobals,
            configurable: true,
            writable: true,
        });
    }
}
