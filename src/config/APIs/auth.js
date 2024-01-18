import { forgeInstance } from ".";

/**
 * To get token after number verification
 */
export const loginWithFirebaseAuthToken = (token) => {
  return forgeInstance.post(`/auth/mobile/token`, { token });
};

/**
 * To verify if Phone Number exists in DB and is a Chronos user (admin)
 */
export const verifyPhoneNumberForOTP = (phone_number) => {
  return forgeInstance.post(`/auth/mobile/verify`, { phone_number });
};
