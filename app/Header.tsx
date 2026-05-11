import Link from "next/link";
const Header = () => {
  return (
    <div className="fixed-top bg-white w-100 border-bottom">
      <div className=" mx-auto p-3">
        <div className="d-flex px-20 gap-220  border-gray-300 ">
          <h1 className="font-bold!">Job Portal</h1>
          <div className="flex justify-center items-center gap-4">
            <Link
              href="/"
              className="text-decoration-none text-gray-700 hover:text-blue-500 transition-colors"
            >
              Home
            </Link>
            <Link href="/jobs" className="text-decoration-none">
              Jobs
            </Link>
            <Link href="/admin">
              <button className="btn btn-primary">Post a Job</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
