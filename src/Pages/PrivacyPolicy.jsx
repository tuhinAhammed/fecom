import React, { useEffect, useState } from "react";
import Container from "../Layout/Container";
import LargeTitle from "../Layout/Title/LargeTitle";
import Breadcrumb from "../Layout/Breadcrumb/BreadcrumbPath";
import PolicyCard from "../Layout/PolicyCard/PolicyCard"
const PrivacyPolicy = () => {
    const htmlContent = `<p>Welcome to <strong>Object-Fashion</strong>. Your privacy is very important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit or make a purchase from our website.</p>

    <h3>1. Information We Collect</h3>
    <ul>
      <li><strong>Personal Information:</strong> Name, email address, phone number, billing/shipping address, and payment details when you make a purchase.</li>
      <li><strong>Account Information:</strong> Username, password, and preferences if you create an account.</li>
      <li><strong>Usage Data:</strong> Information about your browser, device, IP address, and how you interact with our website.</li>
      <li><strong>Cookies and Tracking Data:</strong> We use cookies and similar technologies to enhance user experience and analyze site performance.</li>
    </ul>
    
    <h3>2. How We Use Your Information</h3>
    <ul>
      <li>To process and fulfill your orders.</li>
      <li>To communicate with you regarding your orders, products, or promotions.</li>
      <li>To improve and personalize your shopping experience.</li>
      <li>To maintain website security and prevent fraudulent activity.</li>
      <li>To comply with legal obligations.</li>
    </ul>
    
    <h3>3. Sharing of Information</h3>
    <p>We <strong>do not sell or rent</strong> your personal data. We may share information with:</p>
    <ul>
      <li><strong>Service Providers:</strong> For order processing, payment gateways, delivery services, and marketing tools.</li>
      <li><strong>Legal Authorities:</strong> If required by law or to protect our rights.</li>
    </ul>
    
    <h3>4. Cookies</h3>
    <p>Cookies help us remember your preferences and provide a better browsing experience. You can manage or disable cookies through your browser settings, but some parts of the site may not function properly without them.</p>
    
    <h3>5. Data Security</h3>
    <p>We use appropriate technical and organizational measures to protect your information from unauthorized access, alteration, disclosure, or destruction.</p>
    
    <h3>6. Your Rights</h3>
    <ul>
      <li>Access, correct, or delete your personal information.</li>
      <li>Withdraw consent for data use (where applicable).</li>
      <li>Contact us for any privacy-related questions.</li>
    </ul>
    
    <h3>7. Changes to This Policy</h3>
    <p><strong>Object-Fashion</strong> may update this Privacy Policy from time to time. Any updates will be posted on this page with a revised “Last Updated” date.</p>
    
  `
    return (
        <div className="py-sectionSm md:py-sectionSm lg:py-sectionSm xl:py-sectionSm bg-secondary ">
            <Container>
                <div className="flex items-center justify-between ">
                    <LargeTitle className="font-semibold" text="Privacy Policy" />
                    <Breadcrumb />
                </div>
                <PolicyCard pageData={htmlContent} />
            </Container>
        </div>
    );
};

export default PrivacyPolicy;
