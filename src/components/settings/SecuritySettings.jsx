// src/components/settings/SecuritySettings.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import Input from "../common/Input";
import Button from "../common/Button";
import { useAuth } from "../../hooks/useAuth";

const SecuritySettings = ({ onPasswordChange }) => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = () => {
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      return "All password fields are required.";
    }
    if (form.newPassword.length < 8) {
      return "New password must be at least 8 characters.";
    }
    if (!/[A-Z]/.test(form.newPassword) || !/[0-9]/.test(form.newPassword)) {
      return "New password must include at least one uppercase letter and one number.";
    }
    if (form.newPassword !== form.confirmPassword) {
      return "New password and confirmation do not match.";
    }
    return null;
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setUpdating(true);

      // Placeholder: call API or context method if you have one
      if (onPasswordChange) {
        await onPasswordChange({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        });
      }

      setMessage("Password updated successfully.");
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch {
      setError("Failed to update password. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="rounded-xl border border-emerald-900/50 bg-slate-950/60 p-4 shadow-sm md:p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-emerald-50 md:text-xl">
          Security
        </h2>
        <p className="text-xs text-slate-400 md:text-sm">
          Manage your password and advanced security preferences for your{" "}
          {user?.email || "account"}.
        </p>
      </div>

      {error && (
        <p className="mb-3 text-xs text-rose-300 md:text-sm">{error}</p>
      )}
      {message && (
        <p className="mb-3 text-xs text-emerald-300 md:text-sm">{message}</p>
      )}

      {/* Change password */}
      <form onSubmit={handlePasswordChange} className="space-y-4">
        <Input
          label="Current password"
          type="password"
          value={form.currentPassword}
          onChange={handleChange("currentPassword")}
        />
        <Input
          label="New password"
          type="password"
          value={form.newPassword}
          onChange={handleChange("newPassword")}
          helperText="Use at least 8 characters, including an uppercase letter and a number."
        />
        <Input
          label="Confirm new password"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange("confirmPassword")}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              setForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
              })
            }
          >
            Clear
          </Button>
          <Button type="submit" loading={updating} disabled={updating}>
            Update password
          </Button>
        </div>
      </form>

      {/* Advanced */}
      <div className="mt-6 border-t border-emerald-900/60 pt-4">
        <button
          type="button"
          onClick={() => setShowAdvanced((v) => !v)}
          className="text-xs font-medium text-emerald-300 underline md:text-sm"
        >
          {showAdvanced ? "Hide advanced security options" : "Show advanced security options"}
        </button>

        {showAdvanced && (
          <div className="mt-3 space-y-3 text-xs text-slate-300 md:text-sm">
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1"
                disabled
              />
              <div>
                <p className="font-medium text-emerald-50">
                  Two-factor authentication (coming soon)
                </p>
                <p className="text-slate-400">
                  Add an extra layer of protection with a one-time code sent to your device.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1"
                disabled
              />
              <div>
                <p className="font-medium text-emerald-50">
                  Email alerts for new logins
                </p>
                <p className="text-slate-400">
                  Receive alerts when your account is accessed from a new device or location.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

SecuritySettings.propTypes = {
  onPasswordChange: PropTypes.func,
};

export default SecuritySettings;
