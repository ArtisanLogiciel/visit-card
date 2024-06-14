// Modify the way you are mocking the module to avoid top-level variables inside the vi.mock call

// describe("DisplayQrCOde component", () => {
// it.skip('should containes title "Votre carte de visite à partager"', () => {
//   const mockAuthUser: UserContextProvider = {
//     authUser: {
//       email: "test@example.com",
//       uid: "5",
//       emailVerified: false,
//       isAnonymous: false,
//       metadata: {},
//       providerData: [],
//       refreshToken: "",
//       tenantId: null,
//       displayName: null,
//       phoneNumber: null,
//       photoURL: null,
//       providerId: "",
//       delete: vi.fn().mockResolvedValue(null),
//       getIdToken: vi.fn().mockResolvedValue(""),
//       getIdTokenResult: vi.fn().mockResolvedValue({} as IdTokenResult),
//       reload: vi.fn().mockResolvedValue(null),
//       toJSON: vi.fn().mockResolvedValue({}),
//     },
//     errorFirebaseUser: "",
//     loginUser: vi.fn().mockReturnValue(null),
//     logoutUser: vi.fn().mockReturnValue(null),
//     registerUser: vi.fn().mockReturnValue(null),
//   };
//   render(
//     <UserContext.Provider value={mockAuthUser}>
//       <DisplayQrCode />
//     </UserContext.Provider>
//   );
//   vi.mock("@/Providers/usersProviders", () => ({
//     UserContext: {
//       authUser: mockAuthUser,
//     },
//   }));
//   const title = screen.getByText(/Votre carte de visite à partager/);
//   expect(title).toBeInTheDocument();
// });
// });
