"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Button, Checkbox } from "@heroui/react";
import { EyeClosed, Eye } from "@gravity-ui/icons";
import Link from "next/link";
import { signIn, authClient } from "@/lib/auth-client";
import { FaGoogle } from "react-icons/fa";
export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear specific error
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: "/",
      }, {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: (ctx) => {
          router.push("/");
        },
        onError: (ctx) => {
          setErrors({
            submit: ctx.error.message || "Invalid email or password. Please try again.",
          });
          setLoading(false);
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        submit: error.message || "An unexpected error occurred. Please try again.",
      });
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      setLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Google signin error:", error);
      setErrors({
        submit: "Failed to sign in with Google. Please try again.",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-28 overflow-hidden bg-[#0a0a0c] text-white">
      {/* Background Aurora / Radial Glow Elements */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-fuchsia-500/5 blur-3xl pointer-events-none" />

      {/* Main Glassmorphic Card */}
      <Card className="w-full max-w-lg p-8 md:p-10 bg-zinc-950/45 border border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl hover:border-violet-500/20 transition-all duration-500 z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent text-4xl font-extrabold tracking-tight mb-2">
            HireLoop
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h1>
          <p className="text-zinc-400 mt-2 text-sm">Sign in to your account to continue</p>
        </div>

        {/* Global Errors */}
        {errors.submit && (
          <div className="mb-6 p-4 bg-red-950/50 border border-red-500/30 rounded-2xl flex items-start gap-3">
            <span className="text-red-400 text-lg mt-0.5">⚠️</span>
            <p className="text-red-200 text-sm font-medium">{errors.submit}</p>
          </div>
        )}

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-5 w-full">
          
          {/* Email */}
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400 ml-1">
              Email Address
            </label>
            <div className={`w-full flex items-center border transition-all duration-300 rounded-2xl h-12 bg-white/5 px-4 focus-within:bg-white/10 ${
              errors.email
                ? "border-red-500/50 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20"
                : "border-white/10 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20"
            }`}>
              <input
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent border-none outline-none text-white placeholder:text-zinc-600 text-sm h-full"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400 ml-1">
              Password
            </label>
            <div className={`w-full flex items-center border transition-all duration-300 rounded-2xl h-12 bg-white/5 px-4 focus-within:bg-white/10 ${
              errors.password
                ? "border-red-500/50 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20"
                : "border-white/10 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20"
            }`}>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent border-none outline-none text-white placeholder:text-zinc-600 text-sm h-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-zinc-400 hover:text-zinc-200 transition-colors focus:outline-none ml-2"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeClosed width={20} height={20} />
                ) : (
                  <Eye width={20} height={20} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.password}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between px-1">
            <Checkbox
              name="rememberMe"
              isSelected={formData.rememberMe}
              onValueChange={(isSelected) => 
                setFormData(prev => ({ ...prev, rememberMe: isSelected }))
              }
              classNames={{
                label: "text-sm text-zinc-400 select-none",
                wrapper: "border-white/20 after:bg-violet-600",
              }}
            >
              Remember me
            </Checkbox>
            <Link
              href="/forgot-password"
              className="text-xs text-violet-400 hover:text-violet-300 font-semibold hover:underline transition"
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold h-12 rounded-2xl transition duration-300 shadow-lg shadow-violet-600/25 mt-2"
            isLoading={loading}
            disabled={loading}
          >
            Sign In
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">OR</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Google Sign In */}
        <Button
          variant="bordered"
          className="w-full border-white/10 hover:border-white/20 hover:bg-white/5 text-white font-semibold h-12 rounded-2xl transition duration-300"
          onClick={handleGoogleSignin}
          isLoading={loading}
          disabled={loading}
        >
          <span className="text-lg mr-2"><FaGoogle/></span> Continue with Google
        </Button>

        {/* Sign Up Link */}
        <div className="mt-8 text-center text-sm text-zinc-400">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-violet-400 font-semibold hover:text-violet-300 hover:underline transition">
            Create one
          </Link>
        </div>

        {/* Back Link */}
        <div className="mt-4 text-center">
          <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-400 hover:underline transition">
            ← Back to Home
          </Link>
        </div>
      </Card>
    </div>
  );
}
