// src/pages/SignupPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ArrowLeft } from "lucide-react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Alert from "../components/common/Alert";
import { useAuth } from "../hooks/useAuth";

const schema = yup
  .object({
    userType: yup.string().required("Please select user type"),
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
    // validate the HTML date string and ensure it's not in the future
    dateOfBirth: yup
      .string()
      .required("Date of birth is required")
      .test("max-today", "Date cannot be in the future", (value) => {
        if (!value) return false;
        const selected = new Date(value);
        const today = new Date();
        selected.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        return selected <= today;
      }),
    agreeToTerms: yup
      .boolean()
      .oneOf([true], "You must accept the terms and conditions"),
  })
  .required();

const SignupPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const password = watch("password", "");
  const selectedUserType = watch("userType");

  const getPasswordStrength = () => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    const map = {
      0: { label: "", color: "" },
      1: { label: "Very weak", color: "bg-red-500" },
      2: { label: "Weak", color: "bg-orange-500" },
      3: { label: "Good", color: "bg-yellow-500" },
      4: { label: "Strong", color: "bg-green-500" },
      5: { label: "Very strong", color: "bg-emerald-600" },
    };

    return { strength, ...map[strength] };
  };

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);

    try {
      await signup(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Create your account
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Sign up to start using the Dementia Detection Assistant.
        </p>

        {error && (
          <Alert type="error" className="mb-4">
            {error}
          </Alert>
        )}

        {/* User type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            I am a
          </label>
          <div className="grid grid-cols-2 gap-3">
            {["patient", "caregiver"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() =>
                  setValue("userType", type, { shouldValidate: true })
                }
                className={`border rounded-lg px-3 py-2 text-sm capitalize ${
                  selectedUserType === type
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-300 bg-white text-gray-700"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          {errors.userType && (
            <p className="mt-1 text-xs text-red-600">
              {errors.userType.message}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First name"
              {...register("firstName")}
              error={errors.firstName?.message}
            />
            <Input
              label="Last name"
              {...register("lastName")}
              error={errors.lastName?.message}
            />
          </div>

          <Input
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />

          <div>
            <Input
              label="Password"
              type="password"
              {...register("password")}
              error={errors.password?.message}
            />
            {password && (
              <div className="mt-2">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-2 ${passwordStrength.color} transition-all`}
                    style={{
                      width: `${(passwordStrength.strength / 5) * 100}%`,
                    }}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  Strength: {passwordStrength.label}
                </p>
              </div>
            )}
          </div>

          <Input
            label="Confirm password"
            type="password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <Input
            label="Date of birth"
            type="date"
            {...register("dateOfBirth")}
            error={errors.dateOfBirth?.message}
          />

          <label className="flex items-start gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              className="mt-1"
              {...register("agreeToTerms")}
            />
            <span>
              I agree to the{" "}
              <Link to="/terms" className="text-blue-600 underline">
                Terms and Conditions
              </Link>
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="mt-1 text-xs text-red-600">
              {errors.agreeToTerms.message}
            </p>
          )}

          <Button type="submit" fullWidth disabled={loading} loading={loading}>
            Create account
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
