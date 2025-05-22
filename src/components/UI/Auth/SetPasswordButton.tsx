export const SetPasswordButton = ({ password }: { password: string }) => {
  return (
    <div className="w-full flex items-center justify-center pb-10">
      <button
        disabled={password.length < 8}
        className="text-xl text-gray-400 cursor-pointer hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        SET PASSWORD
      </button>
    </div>
  );
};
