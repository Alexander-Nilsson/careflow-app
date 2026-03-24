// @ts-nocheck
export const useAuth0 = () => {
  return {
    isAuthenticated: true,
    isLoading: false,
    user: {
      name: "user123", // Using user123 to match mockUsers
      email: "test@example.com",
      sub: "user123", 
      updated_at: new Date().toISOString(),
      nickname: "testuser",
      clinic: "Medicinkliniken"
    },
    logout: () => {
      console.log("Mock Logout");
      window.location.href = "/login";
    },
    loginWithRedirect: () => {
      console.log("Mock Login");
      window.location.href = "/start";
    },
    getAccessTokenSilently: async () => "mock-token"
  };
};

export const Auth0Provider = ({ children }: any) => {
  return children;
};
