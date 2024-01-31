import { getHeader, hqInstance } from ".";

/**
 * To get token after number verification
 */
export const loginWithFirebaseAuthToken = (token) => {
  return hqInstance.post(`/auth/mobile/token`, { token });
};

/**
 * To verify if Phone Number exists in DB and is a Chronos user (admin)
 */
export const verifyPhoneNumberForOTP = (phone_number) => {
  return hqInstance.post(`/auth/mobile/verify`, { phone_number });
};
export const refreshToken = () => hqInstance.get("/auth/token", getHeader());
