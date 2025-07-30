import { LoginForm } from "@/components/login-form";

export default function SignIn() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left side - Hero text and illustration */}
      <div className="relative bg-gradient-to-br from-blue-600 to-indigo-800 text-white flex items-center justify-center p-10">
        <div className="max-w-md animate-fade-in">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight drop-shadow-md">
            One Portfolio. <br />
            All the Data You Need.
          </h1>
          <p className="text-lg text-blue-100 mb-6">
            Access consolidated datasets across multiple apps — from deals and news to insights — all in one place.
          </p>
        </div>
      </div>

      {/* Right side - Fancy login form */}
      <div className="flex items-center justify-center bg-gray-100 p-6 relative overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute -top-24 -left-24 w-[300px] h-[300px] bg-indigo-400 rounded-full filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-purple-300 rounded-full filter blur-2xl opacity-40 animate-pulse delay-200" />

        {/* Stylized login card */}
        <div className="relative z-10 w-full max-w-md bg-white/30 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-10 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-indigo-300/40">
          <LoginForm />
          {/* <PasswordlessLogin/> */}
        </div>
      </div>
    </div>
  );
}
