// Modify the way you are mocking the module to avoid top-level variables inside the vi.mock call

import { UserContext, UserContextProvider } from "@/Providers/usersProviders";
import { DisplayQrCode } from "@/components/elements/qrcode/DisplayQrCode";
import { render, screen } from "@testing-library/react";
import { IdTokenResult, User } from "firebase/auth";

describe("DisplayQrCOde component", () => {
  it('should containes title "Votre carte de visite à partager"', () => {
    
    const mockAuthUser: UserContextProvider = {
      authUser:{
        email: "test@example.com",
        uid: "5",
        emailVerified: false,
        isAnonymous: false,
        metadata: {},
        providerData: [],
        refreshToken: "",
        tenantId: null,
        displayName: null,
        phoneNumber: null,
        photoURL: null,
        providerId: "",
        delete: jest.fn().mockResolvedValue(null),
        getIdToken: jest.fn().mockResolvedValue(""),
        getIdTokenResult: jest.fn().mockResolvedValue({} as IdTokenResult),
        reload: jest.fn().mockResolvedValue(null),
        toJSON: jest.fn().mockResolvedValue({})
      },
      errorFirebaseUser:"",
      loginUser:jest.fn().mockReturnValue(null),
      logoutUser:jest.fn().mockReturnValue(null),
      registerUser:jest.fn().mockReturnValue(null)
    
    };
    render(
      <UserContext.Provider value={mockAuthUser}>
        <DisplayQrCode />
      </UserContext.Provider>);
    
    vi.mock("@/Providers/usersProviders", () => ({
      UserContext: {
        authUser: mockAuthUser,
      },
    }));
    
    const title = screen.getByText(/Votre carte de visite à partager/);
    expect(title).toBeInTheDocument();
  });
});