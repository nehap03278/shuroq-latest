// Utility functions for building WhatsApp and email links
export function buildWALink(msg) {
  return `https://wa.me/918983140094?text=${encodeURIComponent(msg)}`;
}

export function buildMailLink({ name, email, service, message } = {}) {
  const subject = "Contact Shuroq";
  const bodyLines = [];
  if (name) bodyLines.push(`Name: ${name}`);
  if (email) bodyLines.push(`Email: ${email}`);
  if (service) bodyLines.push(`Service: ${service}`);
  if (message) bodyLines.push(`Message: ${message}`);
  bodyLines.push("\nHi Shuroq team,\n");
  bodyLines.push("I would like to discuss a project and learn how you can help. Please get back to me at your earliest convenience.");
  const body = bodyLines.join("\n");
  return `mailto:contact@shuroq.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function submitLead({ name, email, service, message }) {
  const text = `*New Enquiry via Shuroq Website*\n\nName: ${name}\nEmail: ${email}\nService: ${service}\nMessage: ${message}`;
  window.open(buildWALink(text), "_blank");
}

// Hook for intersection observer animations
import { useState, useEffect, useRef } from "react";

export function useIntersection(opts = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, ...opts });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [opts]);

  return [ref, visible];
}
