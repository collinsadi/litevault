import { FaLocationArrow } from "react-icons/fa6";

export const LockedInButton = ({ acknowledged }: { acknowledged: boolean }) => {
  return (
    <div className="w-full flex items-center justify-center mt-auto  text-xl text-gray-400">
      <button
        className={`flex items-center gap-2  ${
          !acknowledged
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:text-white "
        }`}
        disabled={!acknowledged}
      >
        Locked In{" "}
        <span>
          <FaLocationArrow className="" />
        </span>
      </button>
    </div>
  );
};
