import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Alert from "../components/common/Alert";
import { useAuth } from "../hooks/useAuth";

const schema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [status, setStatus] = useState({ error: "", success: "" });
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async ({ password }) => {
    setStatus({ error: "", success: "" });
    setLoading(true);
    try {
      await resetPassword({ token, newPassword: password });
      setStatus({ error: "", success: "Password updated. You can log in now." });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setStatus({
        error: err?.message || "Could not reset password.",
        success: "",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <Alert type="error" className="mb-4">
            Invalid or missing reset link.
          </Alert>
          <Link to="/forgot-password" className="text-blue-600 text-sm">
            Request a new reset link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Reset password
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Choose a new password for your account.
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
            label="New password"
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />
          <Input
            label="Confirm new password"
            type="password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
          <Button type="submit" fullWidth loading={loading} disabled={loading}>
            Update password
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Remembered your password?{" "}
          <Link to="/login" className="text-blue-600 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
