import { getHashedPassword } from '../helpers/helpers';

describe('Testing helper functions', () => {

    test('testing hashed password function', async () => {
        const samplePassword = 'sample';
        expect(async () => { await getHashedPassword(samplePassword); }).not.toThrow();
    });
});