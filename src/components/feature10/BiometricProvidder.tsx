import { PropsWithChildren, createContext, useContext, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";

type BiometricContext = {
  hasBiometrics: boolean;
  authenticatePerson: () => Promise<void>;
};

const BiometricContext = createContext<BiometricContext>({
  hasBiometrics: false,
  authenticatePerson: async () => {},
});

const BiometricProvider = ({ children }: PropsWithChildren) => {
  const [hasBiometrics, setHasBiometrics] = useState(false);

  const authenticatePerson = async () => {
    const res = await LocalAuthentication.authenticateAsync();
    setHasBiometrics(res.success);
  };

  return (
    <BiometricContext.Provider value={{ hasBiometrics, authenticatePerson }}>
      {children}
    </BiometricContext.Provider>
  );
};

export default BiometricProvider;

export const useBiometric = () => useContext(BiometricContext);
