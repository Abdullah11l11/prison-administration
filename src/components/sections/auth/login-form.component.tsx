import { loginSchema } from "@/schema/login.schema";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { routes } from "@/routes/route-names";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const validate = () => {
    const result = loginSchema.safeParse({ username, password });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        username: fieldErrors.username?.[0],
        password: fieldErrors.password?.[0],
      });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // mutate({ username, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-right">
      {/* Username */}
      <div>
        <label className="block mb-2 text-sm text-[#161618]">
          اسم المستخدم
        </label>
        <input
          maxLength={50}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={errors.username || "اسم المستخدم"}
          className={`w-full h-12 rounded-lg border-2 px-4 text-sm outline-none ${
            errors.username
              ? "border-red-500 placeholder:text-[#FF0000]"
              : "border-gradient-ocean placeholder:text-[#adadad]"
          }`}
        />
      </div>

      {/* Password */}
      <div>
        <label className="block mb-2 text-sm text-[#161618]">كلمة السر</label>
        <div className="relative">
          <input
            maxLength={50}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={errors.password || "********"}
            className={`w-full h-12 rounded-lg border-2 px-4 pr-12 text-sm outline-none ${
              errors.password
                ? "border-red-500 placeholder:text-[#FF0000]"
                : "border-gradient-ocean placeholder:text-[#adadad]"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Remember Me */}
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="hidden peer"
          />
          <label
            htmlFor="remember"
            className="w-5 h-5 border-2 border-gray-300 rounded cursor-pointer flex items-center justify-center peer-checked:bg-teal-500 peer-checked:border-teal-500"
          >
            {rememberMe && (
              <svg
                className="w-3.5 h-3.5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            )}
          </label>
          <label htmlFor="remember" className="text-sm  text-[#5B5A64] ">
            تذكر معلومات تسجيل الدخول
          </label>
        </div>
        <div>
          <Link
            to={routes.forgotPassword.path}
            className="text-sm duration-300  text-[#5B5A64] hover:text-[#2472bc]"
          >
            اعادة تعيين كلمة السر
          </Link>
        </div>
      </div>
      {/*
        //! remember here
       */}
      <button
        type="submit"
        disabled={false}
        className="w-full cursor-pointer h-12 mt-6 bg-gradient-ocean text-sm text-white rounded-lg flex items-center justify-center shadow-lg transition-all disabled:opacity-50"
      >
        {false ? <Loader2 className="animate-spin w-5 h-5" /> : "تسجيل دخول"}
      </button>
    </form>
  );
};

export default LoginForm;
