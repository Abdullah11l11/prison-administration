import KawaremLogo from "@/components/shared/logo.component";
import { Outlet } from "react-router";

const AuthPageShell = () => {
  return (
    <div className="w-screen bg-white h-screen overflow-x-hidden *:flex-1 flex">
      <div className="bg-[url(/base/login-image.png)] justify-center bg-cover  flex items-center">
        <div className="flex justify-center items-center bg-white rounded-md max-sm:w-[90%] *:flex-1">
          <div className="mx-6 flex flex-col sm:min-w-md w-full items-center mt-17 *:w-full">
            <div className="w-fit! mb-6">
              <KawaremLogo />
            </div>
            <div className="max-w-[480px] h-fit">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-[#161618]">مرحبا بك</h1>
                <p className="text-[#5B5A64] text-base font-medium">
                  ادخل معلومات تسجيل الدخول
                </p>
              </div>
              <Outlet />
            </div>
            <p className="text-sm py-10 text-center text-black font-bold">
              Powered by <span className="text-primary-500">Kawarem</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPageShell;
