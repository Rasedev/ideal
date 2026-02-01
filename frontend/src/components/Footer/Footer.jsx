

import React from "react";
import { Avatar } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

/**
 * Responsive, Dynamic & Professional Footer Component
 * ---------------------------------------------------
 * - Fully responsive (mobile-first, grid-based)
 * - Uses TailwindCSS utilities for layout & styling
 * - Accepts dynamic association data
 * - Clean, modern UI/UX (professional corporate style)
 */

export default function Footer({ association }) {
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    {
      icon: <EnvironmentOutlined />, // Address
      label: "Address",
      value:
        association?.headOffice?.addressLine ||
        association?.associationAddress ||
        "Address not provided",
    },
    {
      icon: <MailOutlined />, // Email
      label: "Email",
      value: association?.contactEmail || "email@example.com",
    },
    {
      icon: <PhoneOutlined />, // Phone
      label: "Phone",
      value: Array.isArray(association?.contactPhone)
        ? association.contactPhone.join(" | ")
        : association?.contactPhone || "Phone not set",
    },
  ];

  const usefulLinks = [
    { label: "Home", id: "home-section" },
    { label: "Association", id: "association-section" },
    { label: "Financial", id: "financial-section" },
    { label: "Member", id: "member-section" },
    { label: "Our Work", id: "our-work-section" },
    { label: "Contact Us", id: "contact-us-section" },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-900 text-gray-300 pt-12 pb-6 font-montserrat">
      <div className="container mx-auto px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo + About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Avatar
                size={56}
                shape="square"
                src={association?.logo}
                alt={association?.associationName}
                className="bg-white shadow-md"
              >
                {!association?.logo && (association?.associationName?.charAt(0) || "A")}
              </Avatar>
              <h2 className="text-xl font-bold text-white">
                {association?.associationName || "AHCKS Association"}
              </h2>
            </div>

            <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
              {association?.shortDescription ||
                "We deliver professional financial, business, and community services with trust and integrity."}
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 tracking-wide">
              Useful Links
            </h3>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li
                  key={link.id}
                  className="flex items-center gap-2 group cursor-pointer"
                  onClick={() => scrollToSection(link.id)}
                >
                  <ArrowRightOutlined className="text-[#00abc9] group-hover:translate-x-1 transition" />
                  <span className="group-hover:text-white transition text-sm">
                    {link.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 tracking-wide">
              Contact Information
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[#00abc9] mt-1 text-lg">{item.icon}</span>
                  <div>
                    <p className="font-medium text-white text-sm">{item.label}</p>
                    <p className="text-gray-400 text-sm leading-tight">
                      {item.value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider Line */}
        <div className="my-10 border-t border-gray-700"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>
            © {currentYear} {association?.associationName || "AHCKS Association"}. All Rights Reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0 text-gray-400 text-sm">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-white transition">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
