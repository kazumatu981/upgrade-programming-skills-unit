export class GlobalMocker {
    _mocks = {};
    addMock(globalName, mockValue) {
        if (this._mocks[globalName] !== undefined)
            throw new Error('already defined');

        this._mocks[globalName] = {
            original: globalThis[globalName],
            mockValue,
            mocked: false,
        };
        return this;
    }
    removeMock(globalName) {
        if (this._mocks[globalName] === undefined) return this;

        if (this._mocks[globalName].mocked) {
            this.#unsafeUnmockOne(globalName);
        }
        delete this._mocks[globalName];
        return this;
    }
    replaceMock(globalName, mockValue) {
        const mockDefine = this.#unsafeUnmockOne(globalName);
        mockDefine.mockValue = mockValue;
        return this;
    }

    mock() {
        Object.keys(this._mocks).forEach((globalName) => {
            if (!mocked) this.#unsafeMockOne(globalName);
        });
        return this;
    }
    unmock() {
        Object.keys(this._mocks).forEach((globalName) => {
            if (mocked) this.#unsafeUnmockOne(globalName);
        });
        return this;
    }

    #unsafeMockOne(globalName) {
        const mockDefine = this._mocks[globalName];
        Object.defineProperties(globalThis, globalName, {
            value: mockDefine.mockValue,
            configurable: true,
            writable: true,
        });
        mockDefine.mocked = true;
        return mockDefine;
    }
    #unsafeUnmockOne(globalName) {
        const mockDefine = this._mocks[globalName];
        if (mockDefine.mocked === false) return mockDefine;
        if (mockDefine.original === undefined) {
            delete globalThis[globalName];
            mockDefine.mocked = false;
            return mockDefine;
        }

        Object.defineProperties(globalThis, globalName, {
            value: mockDefine.original,
            configurable: true,
            writable: true,
        });
        return mockDefine;
    }
}
