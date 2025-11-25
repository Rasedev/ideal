import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-900 via-red-700 to-red-900 text-white px-6">
      <div className="text-center">
        <h1 className="text-[6rem] md:text-[10rem] font-bold">403</h1>
        <p className="text-2xl font-light mb-4">Access Denied</p>
        <p className="mb-8">You don't have permission to view this page.</p>
        <Link to="/">
          <button className="px-6 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-black transition-all">
            GO BACK HOME
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
