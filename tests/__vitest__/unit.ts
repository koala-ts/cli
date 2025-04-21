import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest';

beforeAll(() => {
	// This will run before all tests in the test suite
});

beforeEach(() => {
	// This will run before each test in the test suite
});

afterEach(() => {
	vi.resetAllMocks();
});

afterAll(() => {
	// This will run after all tests in the test suite
});
