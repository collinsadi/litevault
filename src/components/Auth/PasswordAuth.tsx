import { Modal } from "../UI/Modal";
import { maskAddress } from "../../utils/maskAddress";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { getSeedPhrase } from "../../utils/storage/indexedDB";
import { useState } from "react";
import { Layout } from "../Layout/Layout";
export const PasswordAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    password,
    setPassword,
    setIsPasswordSet,
    currentUser,
    setIsAuthenticated,
    setCurrentUser,
    error,
    setError,
  } = useAuth();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSetPassword = async () => {
    try {
      const seedPhrase = await getSeedPhrase(password);

      if (seedPhrase) {
        setIsPasswordSet(true);
        setIsAuthenticated(true);
        setCurrentUser({ ...currentUser, password, seedPhrase: seedPhrase });
      } else {
        setIsPasswordSet(false);
        setError("Invalid password");
      }
    } catch (error) {
      setError("Invalid password");
    }
  };

  return (
    <Layout>
      <Modal
        onClose={() => {}}
        overrideHeight="h-full"
        overrideColor="bg-black"
        overrideCloseButton={true}
      >
        <div className="w-full h-full flex flex-col items-center justify-between gap-4 font-mono">
          <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full flex flex-col items-center justify-center my-3">
              <img
                src="/avatar.png"
                alt="logo"
                className="w-[100px] h-[100px] rounded-xl"
              />

              <h3 className="my-5 text-gray-400 text-xl">
                {maskAddress(currentUser?.address)}
              </h3>
            </div>

            <div className="w-full flex items-center justify-between  border-gray-700 pb-3 my-20">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" bg-transparent border-none outline-none text-white p-2 w-[90%] text-2xl text-center"
              />

              <button
                onClick={handleShowPassword}
                className="text-xl text-gray-400 cursor-pointer hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="w-full flex items-center justify-center">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          </div>

          <div className="w-full flex items-center justify-center pb-10">
            <button
              disabled={password.length < 8}
              onClick={handleSetPassword}
              className="text-xl text-gray-400 cursor-pointer hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              CONTINUE
            </button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};
