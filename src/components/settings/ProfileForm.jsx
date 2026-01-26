// src/components/settings/ProfileForm.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import Input from "../common/Input";
import Button from "../common/Button";
import { useAuth } from "../../hooks/useAuth";

const ProfileForm = ({ onSave }) => {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    organization: user?.organization || "",
    role: user?.role || "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      if (updateProfile) {
        await updateProfile(form);
      }
      if (onSave) {
        onSave(form);
      }
      setMessage("Profile updated successfully.");
    } catch {
      setMessage("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-xl border border-emerald-900/50 bg-slate-950/60 p-4 shadow-sm md:p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-emerald-50 md:text-xl">
          Profile information
        </h2>
        <p className="text-xs text-slate-400 md:text-sm">
          Keep your personal details up to date. This information is used on
          reports and reminders.
        </p>
      </div>

      {message && (
        <p className="mb-4 text-xs text-emerald-300 md:text-sm">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="First name"
            value={form.firstName}
            onChange={handleChange("firstName")}
          />
          <Input
            label="Last name"
            value={form.lastName}
            onChange={handleChange("lastName")}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            disabled
            helperText="Email is used for login and cannot be changed here."
          />
          <Input
            label="Phone"
            type="tel"
            value={form.phone}
            onChange={handleChange("phone")}
            placeholder="Optional"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Organization"
            value={form.organization}
            onChange={handleChange("organization")}
            placeholder="Clinic, hospital, or affiliation"
          />
          <Input
            label="Role"
            value={form.role}
            onChange={handleChange("role")}
            placeholder="e.g. Neurologist, Caregiver"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setForm({
              firstName: user?.firstName || "",
              lastName: user?.lastName || "",
              email: user?.email || "",
              phone: user?.phone || "",
              organization: user?.organization || "",
              role: user?.role || "",
            })}
          >
            Reset
          </Button>
          <Button type="submit" loading={saving} disabled={saving}>
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
};

ProfileForm.propTypes = {
  onSave: PropTypes.func,
};

export default ProfileForm;
