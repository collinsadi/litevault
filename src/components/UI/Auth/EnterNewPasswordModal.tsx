import { Modal } from "../Modal";
import { useWalletAuth } from "../../../contexts/WalletAuth";
import { maskAddress } from "../../../utils/maskAddress";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { SetPasswordButton } from "./SetPasswordButton";
import { Layout } from "../../Layout/Layout";
export const EnterNewPasswordModal = () => {
  const { setShowNewPasswordModal, address } = useWalletAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const handleClose = () => {
    setShowNewPasswordModal(false);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout>
      <Modal
        onClose={handleClose}
        overrideHeight="h-full"
        overrideColor="bg-black"
        overrideCloseButton={true}
      >
        <div className="w-full h-full flex flex-col items-center justify-between gap-4 font-mono">
          <div className="w-full flex flex-col items-center justify-center">
            {/* <button
            onClick={handleClose}
            className="text-xl text-gray-400 hover:text-white cursor-pointer"
          >
            CANCEL
          </button> */}

            <div className="w-full flex flex-col items-center justify-center my-3">
              <img
                src="/avatar.png"
                alt="logo"
                className="w-[100px] h-[100px] rounded-xl"
              />

              <h3 className="my-5 text-gray-400 text-xl">
                {maskAddress(address)}
              </h3>
            </div>

            <div className="w-full flex items-center justify-between  border-gray-700 pb-3 my-20">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter New Password"
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
          </div>

          <SetPasswordButton password={password} />
        </div>
      </Modal>
    </Layout>
  );
};
