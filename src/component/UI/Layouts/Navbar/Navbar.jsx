import { Image } from "antd";

const Navbar = () => {
  return (
    <div className="bg-white rounded-3xl shadow-md  p-2">
      <div
        className="flex  items-center gap-2 md:gap-4  font-medium cursor-pointer font-[Poppins] 
      text-gray-800 ml-2"
      >
        <div className="w-9 mt-1">
          <Image
            src={
              "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1191"
            }
            width={"auto"}
            height={"auto"}
            alt="Picture of the author"
            className="rounded-full"
          />
        </div>

        <div>
          <p className="md:text-base font-semibold text-[12px] text-gray-800  bg-transparent ">
            ABC Data Therapy Centers
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
