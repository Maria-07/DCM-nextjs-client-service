import Link from "next/link";
import { BiBody } from "react-icons/bi";

const LibrarySidebar = () => {
  return (
    <div className="">
      <div>
        <Link href={"/library/treatment"}>
          <div className="p-5 border border-l-primary border-l-4 border-r-0">
            <BiBody className="text-center mx-auto mb-3 text-2xl" />
            <h1 className="text-center font-semibold">TREATMENT</h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LibrarySidebar;
