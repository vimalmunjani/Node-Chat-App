let generateMessage = require('../server/utils/message');

describe(`generateMessage`, () => {
    
    it(`should genrate correct mesaage`, () => {

        message = generateMessage(`dummyAdmin`, `dummy message`);

        expect(message.from).toBe('dummyAdmin');
        expect(message.text).toBe('dummy message');
        expect(message.createdAt).toBeGreaterThan(0);

    });
});