import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Alert from "../components/common/Alert";
import { useAuth } from "../hooks/useAuth";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPasswordPage = () => {
  const { requestPasswordReset } = useAuth();
  const [status, setStatus] = useState({ error: "", success: "" });
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async ({ email }) => {
    setStatus({ error: "", success: "" });
    setLoading(true);
    try {
      await requestPasswordReset(email);
      setStatus({
        error: "",
        success:
          "If an account exists for this email, a reset link has been sent.",
      });
    } catch (err) {
      setStatus({
        error: err?.message || "Could not start password reset.",
        success: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Forgot your password?
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Enter your email and we&apos;ll send a link to reset your password.
        </p>

        {status.error && (
          <Alert type="error" className="mb-4">
            {status.error}
          </Alert>
        )}
        {status.success && (
          <Alert type="success" className="mb-4">
            {status.success}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />
          <Button type="submit" fullWidth loading={loading} disabled={loading}>
            Send reset link
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Remembered your password?{" "}
          <Link to="/login" className="text-blue-600 font-medium">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
