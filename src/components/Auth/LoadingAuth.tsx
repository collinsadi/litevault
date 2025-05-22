import { SiLiteral } from "react-icons/si";
import { Layout } from "../Layout/Layout";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { openDB } from "../../utils/storage/indexedDB";
import { PasswordAuth } from "./PasswordAuth";
export const LoadingAuth = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    currentUser,
    setShowPasswordModal,
    isPasswordSet,
    showPasswordModal,
  } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      const address = localStorage.getItem("0xaddress");
      console.log(address);
      if (address) {
        try {
          // Check if IndexedDB exists and has data
          const db = await openDB();
          const tx = db.transaction("vault", "readonly");
          const store = tx.objectStore("vault");
          const request = store.get("data");

          request.onsuccess = () => {
            // If we have both address and IndexedDB data, but no password is set
            if (request.result && !isPasswordSet) {
              setIsAuthenticated(null);
              setShowPasswordModal(true);
            }
          };
        } catch (error) {
          console.error("Error checking IndexedDB:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [isAuthenticated, currentUser]);

  if (showPasswordModal) {
    return <PasswordAuth />;
  }

  return (
    <Layout>
      <div className="flex flex-col items-center  h-full font-mono">
        <div className="flex flex-col items-center justify-center my-10">
          <span className="text-4xl">
            <SiLiteral />
          </span>
          <h1 className="text-2xl font-bold">Lite Vault</h1>
        </div>

        <div className="flex flex-col items-center justify-center my-10 w-full">
          <div className="w-full h-[200px] flex items-center justify-center">
            <div className="spinner">
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
