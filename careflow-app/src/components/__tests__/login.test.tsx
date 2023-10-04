import { signIn } from "../../firebase"

// Tests for checking if the connection with firebase works as expected and login works
test('Login - Valid Credentials', async () => {
    // Test with valid credentials
    const validResult = await signIn("sandra@regionostergotland.se", "sandra123");
    expect(validResult).toBe(true);
});

test('Login - Invalid Credentials', async () => {
    // Test with invalid credentials
    const invalidResult = await signIn("invalid@example.com", "invalidPassword");
    expect(invalidResult).toBe(false);
});

