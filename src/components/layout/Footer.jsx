import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-emerald-900/60 bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-10 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <h3 className="mb-3 text-base font-semibold text-emerald-100">
              About
            </h3>
            <p className="text-xs leading-relaxed text-slate-300 md:text-sm">
              Research prototype for AI‑assisted dementia screening using
              speech. Designed to support earlier conversations with clinicians
              and families.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-base font-semibold text-emerald-100">
              Quick links
            </h3>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <Link
                  to="/dashboard"
                  className="text-slate-300 transition-colors hover:text-emerald-300"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className="text-slate-300 transition-colors hover:text-emerald-300"
                >
                  Assessment history
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="text-slate-300 transition-colors hover:text-emerald-300"
                >
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-3 text-base font-semibold text-emerald-100">
              Information
            </h3>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <Link
                  to="/privacy"
                  className="text-slate-300 transition-colors hover:text-emerald-300"
                >
                  Privacy notice
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-slate-300 transition-colors hover:text-emerald-300"
                >
                  Terms of use
                </Link>
              </li>
              <li>
                <Link
                  to="/hipaa"
                  className="text-slate-300 transition-colors hover:text-emerald-300"
                >
                  Data & compliance
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-base font-semibold text-emerald-100">
              Contact
            </h3>
            <p className="mb-3 text-xs text-slate-300 md:text-sm">
              support@dementiadetection.example
            </p>
            <div className="flex gap-4 text-slate-400">
              <a
                href="#"
                className="transition-colors hover:text-emerald-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="transition-colors hover:text-emerald-300"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="transition-colors hover:text-emerald-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="transition-colors hover:text-emerald-300"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-emerald-900/60 pt-6 text-center">
          <p className="text-xs text-slate-400 md:text-sm">
            © 2026 Dementia Detection System. For research and educational use
            only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
