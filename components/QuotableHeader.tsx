import { useRouter } from "next/router";
("next/router");
import { FaHome } from "react-icons/fa";
const QuotableHeader = () => {
  const router = useRouter();
  return (
    <div className="flex flex-row justify-center w-full px-20 items-center space-x-5">
      {/* <div className="flex justify-center items-center">
        <Link href="\">
          <a className="mt-3 text-xl border pt-1 pb-2 px-3 bg-indigo-300 rounded-xl ">
            Home
          </a>
        </Link>
      </div> */}
      <div
        onClick={() => router.push("/")}
        className="group border border-black bg-indigo-200 hover:bg-indigo-300 py-2 px-5 rounded-2xl hover:scale-110 
          transition-all ease-in-out duration-500"
      >
        <FaHome
          size={25}
          className="group-hover:scale-110 transition-all ease-in-out duration-500"
        />
      </div>
      <div className="flex justify-center items-center">
        <h1 className="text-6xl self-center">Quotable</h1>
      </div>
    </div>
  );
};

export default QuotableHeader;
