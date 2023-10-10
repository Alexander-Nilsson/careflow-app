import auth0 from 'auth0-js';

export const auth0Client = new auth0.WebAuth({
  domain: 'dev-ni7jkmfx0oybqzdf.us.auth0.com',
  clientID: 'mkmVvsZQwku14qYIH34tA4kPKdTzejse',
  responseType: 'token id_token',
  scope: 'openid profile email',
});