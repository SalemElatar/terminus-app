import { Outlet, Navigate, Link } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <div className="flex bg-backgroundAuthPage">
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-col items-center justify-center flex-1 h-screen py-10 md:py-20 md:h-auto">
            <Link to="/">
              <div className="text-center select-none">
                <span>
                  <span className="px-2 mr-2 font-bold text-center text-yellow-200 bg-yellow-600 rounded-md">
                    !
                  </span>
                  <span className="font-bold text-red-500">Welcome</span>
                  <small> to the </small>
                </span>
                <h1 className="text-3xl font-extrabold tracking-[10px] uppercase">
                  Terminus
                </h1>
              </div>
            </Link>
            <Outlet />
          </section>

          <img
            src="/cover.jpg"
            alt="logo"
            className="hidden object-cover w-2/3 h-screen bg-no-repeat rounded-tl-full md:block "
          />
        </>
      )}
    </div>
  );
};

export default AuthLayout;
