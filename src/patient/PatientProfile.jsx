import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, Calendar, MapPin, Edit, Save } from "lucide-react";
import { useState } from "react";

export default function PatientProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "January 15, 1950",
    address: "123 Main Street, Springfield, IL 62701",
    emergencyContact: "Jane Doe - +1 (555) 987-6543",
  });

  const handleSave = () => {
    setIsEditing(false);
    // Add save logic here
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-1">
          Patient Profile
        </h1>
        <p className="text-base text-emerald-700">Manage your personal information</p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card className="rounded-2xl shadow-lg border-2 border-emerald-100 overflow-hidden max-w-4xl hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <User className="h-12 w-12 text-emerald-600" />
                </motion.div>
                <div>
                  <CardTitle className="text-3xl font-bold">{profileData.name}</CardTitle>
                  <p className="text-emerald-100 text-lg mt-1">Patient ID: #12345</p>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                  className="text-sm px-4 py-2 rounded-xl bg-white text-emerald-700 hover:bg-emerald-50 font-semibold shadow-lg transition-all duration-200 ease-out"
                >
                  <AnimatePresence mode="wait">
                    {isEditing ? (
                      <motion.div
                        key="save"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-center"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </motion.div>
                    ) : (
                      <motion.div
                        key="edit"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-center"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>
          </CardHeader>

          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <motion.div
                className="space-y-2"
                custom={0}
                initial="hidden"
                animate="visible"
                variants={fieldVariants}
              >
                <label className="flex items-center gap-2 text-sm font-semibold text-emerald-900">
                  <Mail className="h-4 w-4 text-emerald-600" />
                  Email Address
                </label>
                <AnimatePresence mode="wait">
                  {isEditing ? (
                    <motion.input
                      key="email-input"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({ ...profileData, email: e.target.value })
                      }
                      className="w-full rounded-xl border-2 border-emerald-200 px-4 py-2.5 text-sm text-emerald-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                    />
                  ) : (
                    <motion.p
                      key="email-display"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="text-lg text-emerald-800 bg-emerald-50 rounded-xl px-4 py-3 border-2 border-emerald-100 hover:bg-emerald-100 transition-colors duration-200"
                    >
                      {profileData.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Phone */}
              <motion.div
                className="space-y-2"
                custom={1}
                initial="hidden"
                animate="visible"
                variants={fieldVariants}
              >
                <label className="flex items-center gap-2 text-base font-semibold text-emerald-900">
                  <Phone className="h-5 w-5 text-emerald-600" />
                  Phone Number
                </label>
                <AnimatePresence mode="wait">
                  {isEditing ? (
                    <motion.input
                      key="phone-input"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({ ...profileData, phone: e.target.value })
                      }
                      className="w-full rounded-xl border-2 border-emerald-200 px-4 py-2.5 text-sm text-emerald-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                    />
                  ) : (
                    <motion.p
                      key="phone-display"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="text-lg text-emerald-800 bg-emerald-50 rounded-xl px-4 py-3 border-2 border-emerald-100 hover:bg-emerald-100 transition-colors duration-200"
                    >
                      {profileData.phone}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Date of Birth */}
              <motion.div
                className="space-y-2"
                custom={2}
                initial="hidden"
                animate="visible"
                variants={fieldVariants}
              >
                <label className="flex items-center gap-2 text-sm font-semibold text-emerald-900">
                  <Calendar className="h-4 w-4 text-emerald-600" />
                  Date of Birth
                </label>
                <p className="text-sm text-emerald-800 bg-emerald-50 rounded-xl px-4 py-2.5 border-2 border-emerald-100 hover:bg-emerald-100 transition-colors duration-200">
                  {profileData.dateOfBirth}
                </p>
              </motion.div>

              {/* Address */}
              <motion.div
                className="space-y-2"
                custom={3}
                initial="hidden"
                animate="visible"
                variants={fieldVariants}
              >
                <label className="flex items-center gap-2 text-sm font-semibold text-emerald-900">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                  Address
                </label>
                <AnimatePresence mode="wait">
                  {isEditing ? (
                    <motion.input
                      key="address-input"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      type="text"
                      value={profileData.address}
                      onChange={(e) =>
                        setProfileData({ ...profileData, address: e.target.value })
                      }
                      className="w-full rounded-xl border-2 border-emerald-200 px-4 py-2.5 text-sm text-emerald-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                    />
                  ) : (
                    <motion.p
                      key="address-display"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="text-lg text-emerald-800 bg-emerald-50 rounded-xl px-4 py-3 border-2 border-emerald-100 hover:bg-emerald-100 transition-colors duration-200"
                    >
                      {profileData.address}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Emergency Contact */}
              <motion.div
                className="space-y-2 md:col-span-2"
                custom={4}
                initial="hidden"
                animate="visible"
                variants={fieldVariants}
              >
                <label className="flex items-center gap-2 text-base font-semibold text-emerald-900">
                  <Phone className="h-5 w-5 text-emerald-600" />
                  Emergency Contact
                </label>
                <AnimatePresence mode="wait">
                  {isEditing ? (
                    <motion.input
                      key="emergency-input"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      type="text"
                      value={profileData.emergencyContact}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          emergencyContact: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border-2 border-emerald-200 px-4 py-2.5 text-sm text-emerald-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                    />
                  ) : (
                    <motion.p
                      key="emergency-display"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="text-lg text-emerald-800 bg-emerald-50 rounded-xl px-4 py-3 border-2 border-emerald-100 hover:bg-emerald-100 transition-colors duration-200"
                    >
                      {profileData.emergencyContact}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Additional Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 max-w-4xl"
      >
        <Card className="rounded-2xl shadow-lg border-2 border-emerald-100 hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-emerald-900">
              Medical Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <p className="text-sm font-semibold text-emerald-900 mb-2">Blood Type</p>
                <p className="text-sm text-emerald-800 bg-emerald-50 rounded-xl px-4 py-2.5 border-2 border-emerald-100 hover:bg-emerald-100 transition-colors duration-200">
                  O+
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <p className="text-sm font-semibold text-emerald-900 mb-2">Allergies</p>
                <p className="text-sm text-emerald-800 bg-emerald-50 rounded-xl px-4 py-2.5 border-2 border-emerald-100 hover:bg-emerald-100 transition-colors duration-200">
                  None reported
                </p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
