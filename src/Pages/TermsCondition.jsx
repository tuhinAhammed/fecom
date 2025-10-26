import React, { useEffect, useState } from "react";
import Container from "../Layout/Container";
import LargeTitle from "../Layout/Title/LargeTitle";
import Breadcrumb from "../Layout/Breadcrumb/BreadcrumbPath";
import PolicyCard from "../Layout/PolicyCard/PolicyCard"
const TermsCondition = () => {
    const htmlContent = `<h2>Terms and Conditions</h2>
    <p>Welcome to <strong>Object-Fashion</strong>. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using our services.</p>
    
    <h3>1. Use of Our Website</h3>
    <ul>
      <li>You must be at least 18 years old to use our website.</li>
      <li>You agree to use our website only for lawful purposes and in a way that does not infringe the rights of others.</li>
      <li>You are responsible for maintaining the confidentiality of any account information and passwords.</li>
    </ul>
    
    <h3>2. Product Information</h3>
    <ul>
      <li>We strive to provide accurate product descriptions, pricing, and images. However, we do not guarantee that all information is complete or error-free.</li>
      <li>Object-Fashion reserves the right to modify or discontinue any product at any time without prior notice.</li>
    </ul>
    
    <h3>3. Orders and Payment</h3>
    <ul>
      <li>All orders are subject to acceptance and availability.</li>
      <li>Payment must be made at the time of purchase. We accept only the payment methods listed on our website.</li>
      <li>Prices and promotions are subject to change without notice.</li>
    </ul>
    
    <h3>4. Shipping and Delivery</h3>
    <ul>
      <li>We will make every effort to deliver products on time, but delivery dates are estimates and not guaranteed.</li>
      <li>Object-Fashion is not responsible for delays caused by shipping carriers or customs clearance.</li>
    </ul>
    
    <h3>5. Returns and Refunds</h3>
    <ul>
      <li>Returns and refunds are governed by our Return Policy. Please refer to the Return Policy page for detailed instructions.</li>
      <li>Products must be returned in their original condition and packaging.</li>
    </ul>
    
    <h3>6. Intellectual Property</h3>
    <p>All content on this website, including text, images, logos, and graphics, is the property of <strong>Object-Fashion</strong> and is protected by intellectual property laws. You may not reproduce, distribute, or use any content without our prior written consent.</p>
    
    <h3>7. Limitation of Liability</h3>
    <p>Object-Fashion shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products. Our total liability shall not exceed the purchase price of the product you ordered.</p>
    
    <h3>8. Governing Law</h3>
    <p>These terms and conditions are governed by the laws of [Insert your Country/State]. Any disputes arising from the use of our website shall be subject to the exclusive jurisdiction of the courts in [Insert your City/State].</p>
    
    <h3>9. Changes to Terms</h3>
    <p>Object-Fashion may update these terms and conditions from time to time. Any changes will be posted on this page, and the “Last Updated” date will be revised accordingly.</p>
    
    <h3>10. Contact Us</h3>
    <p>If you have any questions about these Terms and Conditions, please contact us at:</p>`
    return (
        <div className="py-sectionSm md:py-sectionSm lg:py-sectionSm xl:py-sectionSm bg-secondary ">
            <Container>
                <div className="flex items-center justify-between ">
                    <LargeTitle className="font-semibold" text="Terms & Condition" />
                    <Breadcrumb />
                </div>
                <PolicyCard pageData={htmlContent} />
            </Container>
        </div>
    );
};

export default TermsCondition;
