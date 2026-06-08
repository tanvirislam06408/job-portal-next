"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, Button } from "@heroui/react";
import { EyeClosed, Eye } from "@gravity-ui/icons";
import Link from "next/link";
import { signUp, authClient } from "@/lib/auth-client";
import { Description, Label, Radio, RadioGroup } from "@heroui/react";
import { FaGoogle } from "react-icons/fa";
export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('seeker')
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});
  // get the search params
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Password requirements checklist
  const criteria = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!criteria.length) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!criteria.uppercase) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!criteria.lowercase) {
      newErrors.password = "Password must contain at least one lowercase letter";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
    setSuccess("");
    setErrors({});

    if (!validateForm()) return;

    setLoading(true);

    try {
      await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: role,
        callbackURL: redirect,
      }, {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: (ctx) => {
          setSuccess("Account created successfully! Redirecting...");
          setTimeout(() => {
            router.push("/");
          }, 1500);
        },
        onError: (ctx) => {
          setErrors({
            submit: ctx.error.message || "Failed to create account. Please try again.",
          });
          setLoading(false);
        }
      });
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({
        submit: error.message || "An unexpected error occurred. Please try again.",
      });
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirect,
      });
    } catch (error) {
      console.error("Google signin error:", error);
      setErrors({
        submit: "Failed to sign up with Google. Please try again.",
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

        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent text-4xl font-extrabold tracking-tight mb-2">
            HireLoop
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Create your account</h1>
          <p className="text-zinc-400 mt-2 text-sm">Join the network to find your dream job or hire the best talents</p>
        </div>

        {/* Global Errors / Success Prompts */}
        {errors.submit && (
          <div className="mb-6 p-4 bg-red-950/50 border border-red-500/30 rounded-2xl flex items-start gap-3">
            <span className="text-red-400 text-lg mt-0.5">⚠️</span>
            <p className="text-red-200 text-sm font-medium">{errors.submit}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-emerald-950/50 border border-emerald-500/30 rounded-2xl flex items-start gap-3">
            <span className="text-emerald-400 text-lg mt-0.5">✨</span>
            <p className="text-emerald-200 text-sm font-medium">{success}</p>
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5 w-full">

          {/* Full Name */}
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400 ml-1">
              Full Name
            </label>
            <div className={`w-full flex items-center border transition-all duration-300 rounded-2xl h-12 bg-white/5 px-4 focus-within:bg-white/10 ${errors.name
              ? "border-red-500/50 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20"
              : "border-white/10 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20"
              }`}>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-none outline-none text-white placeholder:text-zinc-600 text-sm h-full"
              />
            </div>
            {errors.name && (
              <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.name}</p>
            )}
          </div>

          {/* Email Address */}
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400 ml-1">
              Email Address
            </label>
            <div className={`w-full flex items-center border transition-all duration-300 rounded-2xl h-12 bg-white/5 px-4 focus-within:bg-white/10 ${errors.email
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


          {/* role options */}
          <div className="flex flex-col gap-4">
            <Label>Select a role</Label>
            <RadioGroup onChange={value => { setRole(value) }} defaultValue="seeker" name="role" orientation="horizontal">
              <Radio value="seeker">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>Job Seeker</Label>
                </Radio.Content>
              </Radio>
              <Radio value="recruiter">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>Recruiter</Label>
                </Radio.Content>
              </Radio>
            </RadioGroup>
          </div>






          {/* Password */}
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400 ml-1">
              Password
            </label>
            <div className={`w-full flex items-center border transition-all duration-300 rounded-2xl h-12 bg-white/5 px-4 focus-within:bg-white/10 ${errors.password
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

            {/* Dynamic Password Checklists */}
            {formData.password && (
              <div className="mt-3 p-3 bg-white/5 rounded-2xl border border-white/5 space-y-1.5 w-full">
                <p className="text-xs text-zinc-400 font-medium mb-1">Password requirements:</p>
                <div className="flex items-center gap-2 text-xs">
                  <span className={criteria.length ? "text-emerald-400" : "text-zinc-500"}>
                    {criteria.length ? "✓" : "○"} Min 8 characters
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className={criteria.uppercase ? "text-emerald-400" : "text-zinc-500"}>
                    {criteria.uppercase ? "✓" : "○"} At least 1 uppercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className={criteria.lowercase ? "text-emerald-400" : "text-zinc-500"}>
                    {criteria.lowercase ? "✓" : "○"} At least 1 lowercase letter
                  </span>
                </div>
              </div>
            )}

            {errors.password && (
              <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400 ml-1">
              Confirm Password
            </label>
            <div className={`w-full flex items-center border transition-all duration-300 rounded-2xl h-12 bg-white/5 px-4 focus-within:bg-white/10 ${errors.confirmPassword
              ? "border-red-500/50 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20"
              : "border-white/10 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20"
              }`}>
              <input
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-transparent border-none outline-none text-white placeholder:text-zinc-600 text-sm h-full"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold h-12 rounded-2xl transition duration-300 shadow-lg shadow-violet-600/25 mt-2"
            isLoading={loading}
            disabled={loading}
          >
            Create Account
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">OR</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Social Sign Up */}
        <Button
          variant="bordered"
          className="w-full border-white/10 hover:border-white/20 hover:bg-white/5 text-white font-semibold h-12 rounded-2xl transition duration-300"
          onClick={handleGoogleSignup}
          isLoading={loading}
          disabled={loading}
        >
          <span className="text-lg mr-2"><FaGoogle /></span> Continue with Google
        </Button>

        {/* Footer Links */}
        <div className="mt-8 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link href={`/login?redirect=${redirect}`} className="text-violet-400 font-semibold hover:text-violet-300 hover:underline transition">
            Login
          </Link>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-400 hover:underline transition">
            ← Back to Home
          </Link>
        </div>

      </Card>
    </div>
  );
}
