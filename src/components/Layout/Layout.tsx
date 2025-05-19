export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-col min-h-screen flex items-center justify-center w-full bg-gray-900">
      <div className="w-[500px] h-[700px] bg-black rounded-xl p-4 relative overflow-x-hidden">{children}</div>
    </div>
  );
};
