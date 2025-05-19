import { MdArrowOutward } from "react-icons/md";
export const TransactionCard = () => {
  return (
    <div className="w-full flex items-center justify-between my-5">
      <div className="w-full flex items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center">
            <MdArrowOutward color="black" size={20} />
          </div>

          <div>
            <h3 className="text-white text-xl">Send MND</h3>
            <p className="text-green-500 text-sm">Confirmed</p>
          </div>
        </div>

        <div>
            <h3 className="text-white text-xl">-200000 MND</h3>
        </div>
      </div>
    </div>
  );
};
