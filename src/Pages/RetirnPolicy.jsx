import React, { useEffect, useState } from "react";
import Container from "../Layout/Container";
import LargeTitle from "../Layout/Title/LargeTitle";
import Breadcrumb from "../Layout/Breadcrumb/BreadcrumbPath";
import PolicyCard from "../Layout/PolicyCard/PolicyCard"
const ReturnPolicy = () => {
    const htmlContent = `
    <h2>Return & Refund Policy</h2>
    <p>At <strong>Object-Fashion</strong>, we want you to love every item you purchase from us. If you're not fully satisfied with your order, our Return & Refund Policy makes the process simple and transparent.</p>
    
    <h3>1. Return Eligibility</h3>
    <ul>
      <li>Items must be returned within <strong>7 days</strong> of receiving your order.</li>
      <li>Products must be <strong>unused, unwashed, and in their original packaging</strong> with all tags intact.</li>
      <li>Returns are not accepted for items that have been worn, damaged, or altered after delivery.</li>
      <li>Certain products such as innerwear, accessories, or discounted items may not be eligible for return.</li>
    </ul>
    
    <h3>2. How to Initiate a Return</h3>
    <p>If you’d like to return an item, please follow these steps:</p>
    <ol>
      <li>Contact our support team via email at 
      <a href="mailto:returns@objectfashion.com" class="text-theme"><strong>returns@objectfashion.com</strong></a> 
      within 7 days of receiving your order.</li>
      <li>Provide your order number, the item(s) you wish to return, and the reason for return.</li>
      <li>Once approved, you’ll receive instructions for shipping the item back to us.</li>
    </ol>
    
    <h3>3. Refund Process</h3>
    <ul>
      <li>After we receive and inspect your returned item, we’ll notify you about the approval or rejection of your refund.</li>
      <li>If approved, your refund will be processed to your original payment method within <strong>5–10 business days</strong>.</li>
      <li>Shipping charges are non-refundable unless the return is due to a defective or incorrect item.</li>
    </ul>
    
    <h3>4. Exchange Policy</h3>
    <ul>
      <li>We currently offer exchanges for size or color only, subject to stock availability.</li>
      <li>To request an exchange, please contact our support team at 
      <a href="mailto:returns@objectfashion.com" class="text-theme"><strong>returns@objectfashion.com</strong></a>.</li>
    </ul>
    
    <h3>5. Damaged or Incorrect Items</h3>
    <p>If you receive a damaged, defective, or wrong item, please notify us immediately within <strong>48 hours</strong> of delivery with a photo of the product. We will arrange a replacement or a full refund at no extra cost.</p>
    
    <h3>6. Non-Returnable Items</h3>
    <ul>
      <li>Items marked as “Final Sale” or “Non-Returnable.”</li>
      <li>Gift cards and promotional items.</li>
      <li>Personalized or custom-made products.</li>
    </ul>
    
    <h3>7. Contact for Returns</h3>
    <p>If you have any questions or wish to start a return, please contact our Return Department directly:</p>
    <p>
      📧 <a href="mailto:returns@objectfashion.com" class="text-theme"><strong>returns@objectfashion.com</strong></a><br>
      📞 <strong>+880 1234 567890</strong><br>
      🕒 Available: Monday – Friday, 10:00 AM – 6:00 PM (BST)
    </p>
    
    <h3>8. Policy Updates</h3>
    <p><strong>Object-Fashion</strong> reserves the right to update or modify this Return & Refund Policy at any time. Any changes will be posted on this page with an updated “Last Revised” date.</p>
    `
    return (
        <div className="py-sectionSm md:py-sectionSm lg:py-sectionSm xl:py-sectionSm bg-secondary ">
            <Container>
                <div className="flex items-center justify-between ">
                    <LargeTitle className="font-semibold" text="Return Policy" />
                    <Breadcrumb />
                </div>
                <PolicyCard pageData={htmlContent} />
            </Container>
        </div>
    );
};

export default ReturnPolicy;
