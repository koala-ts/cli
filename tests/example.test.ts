import { describe, expect, test } from 'vitest';
import { main } from '../src';

describe('Example', ()=> {
    test('should pass', ()=> {
        expect(main()).toBe('Hello, World!');
    });
});
