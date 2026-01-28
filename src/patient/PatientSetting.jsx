import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function PatientSetting() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Patient",
  });

  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const [channels, setChannels] = useState({
    email: true,
    inApp: true,
    sms: false,
  });

  const [notifications, setNotifications] = useState({
    assessment: true,
    followUp: true,
    weekly: false,
    product: true,
  });

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserData({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "",
          role: user.role || "Patient",
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem("accessibility_settings");
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setFontSize(settings.fontSize || 16);
        setHighContrast(settings.highContrast || false);
        setReduceMotion(settings.reduceMotion || false);
      } catch (error) {
        console.error("Error parsing settings:", error);
      }
    }

    const savedNotifications = localStorage.getItem("notification_settings");
    if (savedNotifications) {
      try {
        const notifSettings = JSON.parse(savedNotifications);
        setChannels(notifSettings.channels || { email: true, inApp: true, sms: false });
        setNotifications(notifSettings.notifications || { assessment: true, followUp: true, weekly: false, product: true });
      } catch (error) {
        console.error("Error parsing notification settings:", error);
      }
    }
  }, []);

  // Apply font size changes to document root
  useEffect(() => {
    document.documentElement.style.setProperty('--base-font-size', `${fontSize}px`);
  }, [fontSize]);

  // Apply high contrast mode
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Apply reduced motion
  useEffect(() => {
    if (reduceMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [reduceMotion]);

  const handleSaveAccessibility = () => {
    const settings = {
      fontSize,
      highContrast,
      reduceMotion,
    };
    localStorage.setItem("accessibility_settings", JSON.stringify(settings));
    toast.success("Accessibility settings saved!");
  };

  const handleSaveNotifications = () => {
    const settings = {
      channels,
      notifications,
    };
    localStorage.setItem("notification_settings", JSON.stringify(settings));
    toast.success("Notification preferences saved!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 p-4 md:p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-2xl md:text-3xl font-bold text-emerald-900 mb-6"
      >
        Settings
      </motion.h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6 bg-emerald-100 rounded-xl">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile">
          <Card className="rounded-2xl shadow-lg border-2 border-emerald-100">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-emerald-900">Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-emerald-900 mb-2 block">Name</label>
                  <p className="text-sm text-emerald-800 bg-emerald-50 rounded-xl px-4 py-2.5 border-2 border-emerald-100">
                    {userData.name || "Not provided"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-emerald-900 mb-2 block">Email</label>
                  <p className="text-sm text-emerald-800 bg-emerald-50 rounded-xl px-4 py-2.5 border-2 border-emerald-100">
                    {userData.email || "Not provided"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-emerald-900 mb-2 block">Phone Number</label>
                  <p className="text-sm text-emerald-800 bg-emerald-50 rounded-xl px-4 py-2.5 border-2 border-emerald-100">
                    {userData.phone || "Not provided"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-emerald-900 mb-2 block">Role</label>
                  <p className="text-sm text-emerald-800 bg-emerald-50 rounded-xl px-4 py-2.5 border-2 border-emerald-100">
                    {userData.role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <Card className="rounded-2xl shadow-lg border-2 border-emerald-100">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-emerald-900">Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-w-md">
              <Input placeholder="Current Password" type="password" />
              <Input placeholder="New Password" type="password" />
              <Input placeholder="Confirm New Password" type="password" />
              <div className="flex justify-end">
                <Button className="text-sm px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700">
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card className="rounded-2xl shadow-lg border-2 border-emerald-100">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-emerald-900">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-emerald-900 mb-3">Channels</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-emerald-900">Email</span>
                    <Switch
                      checked={channels.email}
                      onCheckedChange={(v) =>
                        setChannels({ ...channels, email: v })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-emerald-900">In-app Notifications</span>
                    <Switch
                      checked={channels.inApp}
                      onCheckedChange={(v) =>
                        setChannels({ ...channels, inApp: v })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between opacity-60">
                    <span className="text-sm font-medium text-emerald-900">SMS (Coming soon)</span>
                    <Switch disabled checked={channels.sms} />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-emerald-900 mb-3">
                  What You Receive
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-emerald-900">Assessment Results</span>
                    <Switch
                      checked={notifications.assessment}
                      onCheckedChange={(v) =>
                        setNotifications({ ...notifications, assessment: v })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-emerald-900">Follow-up Reminders</span>
                    <Switch
                      checked={notifications.followUp}
                      onCheckedChange={(v) =>
                        setNotifications({ ...notifications, followUp: v })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-emerald-900">Weekly Summary</span>
                    <Switch
                      checked={notifications.weekly}
                      onCheckedChange={(v) =>
                        setNotifications({ ...notifications, weekly: v })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-emerald-900">Product Updates</span>
                    <Switch
                      checked={notifications.product}
                      onCheckedChange={(v) =>
                        setNotifications({ ...notifications, product: v })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleSaveNotifications}
                  className="text-sm px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700"
                >
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Accessibility */}
        <TabsContent value="accessibility">
          <Card className="rounded-2xl shadow-lg border-2 border-emerald-100">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-emerald-900">Accessibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 max-w-lg">
              <div>
                <h3 className="text-sm font-semibold text-emerald-900 mb-2">Font Size</h3>
                <Slider
                  value={[fontSize]}
                  min={12}
                  max={24}
                  step={1}
                  onValueChange={(v) => setFontSize(v[0])}
                />
                <p className="text-sm font-medium text-emerald-700 mt-2">
                  Current: {fontSize}px
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-emerald-900">High Contrast</span>
                <Switch
                  checked={highContrast}
                  onCheckedChange={(v) => setHighContrast(v)}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-emerald-900">Reduce Motion</span>
                <Switch
                  checked={reduceMotion}
                  onCheckedChange={(v) => setReduceMotion(v)}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleSaveAccessibility}
                  className="text-sm px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700"
                >
                  Apply Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
