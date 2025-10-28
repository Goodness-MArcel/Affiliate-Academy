import React from 'react'
import './Terms.css'

const Terms = () => {
  return (
    <div className="terms-page">
      {/* Banner Section */}
      <section className="terms-banner">
        <div className="container">
          <div className="banner-content">
            <h1>Terms and Conditions</h1>
            <p>Please read these terms carefully before using our services</p>
            <div className="last-updated">
              <i className="bi bi-calendar-check"></i>
              <span>Last Updated: October 28, 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="terms-content">
        <div className="container">
          <div className="content-wrapper">
            {/* Introduction */}
            <div className="terms-section">
              <h2>1. Introduction</h2>
              <p>
                Welcome to Affiliate Academy ("we," "our," or "us"). These Terms and Conditions govern your access to and use of our website, services, and educational content. By accessing or using our platform, you agree to be bound by these terms.
              </p>
              <p>
                If you do not agree with any part of these terms, you may not access our services. We reserve the right to update or modify these terms at any time without prior notice.
              </p>
            </div>

            {/* Account Registration */}
            <div className="terms-section">
              <h2>2. Account Registration</h2>
              <p>To access certain features of our platform, you must register for an account. You agree to:</p>
              <ul>
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password and accept all risks of unauthorized access</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Be responsible for all activities that occur under your account</li>
              </ul>
              <p>
                We reserve the right to suspend or terminate your account if any information provided is inaccurate, fraudulent, or violates these terms.
              </p>
            </div>

            {/* Services and Content */}
            <div className="terms-section">
              <h2>3. Services and Educational Content</h2>
              <p>Affiliate Academy provides educational courses, training materials, and affiliate marketing resources. You understand and agree that:</p>
              <ul>
                <li>All content is for educational and informational purposes only</li>
                <li>Course materials are licensed, not sold, to you for personal use</li>
                <li>You may not reproduce, distribute, or share course content without permission</li>
                <li>We do not guarantee specific income or results from our training</li>
                <li>Your success depends on your own effort, dedication, and business practices</li>
                <li>We reserve the right to modify, suspend, or discontinue any service at any time</li>
              </ul>
            </div>

            {/* Payment Terms */}
            <div className="terms-section">
              <h2>4. Payment and Refund Policy</h2>
              <h3>4.1 Payment Methods</h3>
              <p>We accept payments through:</p>
              <ul>
                <li>Cryptocurrency (Bitcoin, Ethereum, USDT)</li>
                <li>Paystack (Card, Bank Transfer, USSD)</li>
              </ul>
              
              <h3>4.2 Pricing</h3>
              <p>
                All prices are displayed in your selected currency and are subject to change. You agree to pay all fees associated with your purchases, including applicable taxes.
              </p>

              <h3>4.3 Refund Policy</h3>
              <p>
                We offer a 7-day money-back guarantee for course purchases. Refund requests must be submitted within 7 days of purchase and must include a valid reason. Refunds are processed within 14 business days.
              </p>
              <p>
                No refunds will be issued for courses where more than 30% of the content has been accessed or for subscription services after the first billing cycle.
              </p>
            </div>

            {/* Affiliate Program */}
            <div className="terms-section">
              <h2>5. Affiliate Program Terms</h2>
              <p>As an affiliate partner, you agree to:</p>
              <ul>
                <li>Promote our services in a truthful and ethical manner</li>
                <li>Not make false or misleading claims about our products or services</li>
                <li>Comply with all applicable advertising and consumer protection laws</li>
                <li>Not engage in spam, unsolicited emails, or unethical marketing practices</li>
                <li>Disclose your affiliate relationship in accordance with FTC guidelines</li>
              </ul>
              <p>
                We reserve the right to withhold commission payments or terminate affiliate accounts that violate these terms or engage in fraudulent activities.
              </p>
            </div>

            {/* Intellectual Property */}
            <div className="terms-section">
              <h2>6. Intellectual Property Rights</h2>
              <p>
                All content on Affiliate Academy, including text, graphics, logos, images, videos, audio, software, and course materials, is the property of Affiliate Academy or its licensors and is protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p>You are granted a limited, non-exclusive, non-transferable license to:</p>
              <ul>
                <li>Access and use the platform for personal, non-commercial purposes</li>
                <li>View and download course materials for your personal learning</li>
              </ul>
              <p>You may NOT:</p>
              <ul>
                <li>Copy, modify, or distribute our content without written permission</li>
                <li>Reverse engineer or attempt to extract source code from our platform</li>
                <li>Remove any copyright or proprietary notices from materials</li>
                <li>Use our content for commercial purposes without authorization</li>
              </ul>
            </div>

            {/* User Conduct */}
            <div className="terms-section">
              <h2>7. Prohibited Activities</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Violate any laws, regulations, or third-party rights</li>
                <li>Share your account credentials with others</li>
                <li>Use automated systems or bots to access the platform</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Upload viruses, malware, or malicious code</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Engage in fraudulent activities or money laundering</li>
                <li>Impersonate any person or entity</li>
              </ul>
            </div>

            {/* Disclaimers */}
            <div className="terms-section">
              <h2>8. Disclaimers and Limitation of Liability</h2>
              <p>
                Our services are provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied. We do not guarantee that our platform will be uninterrupted, secure, or error-free.
              </p>
              <p>
                We are not responsible for any indirect, incidental, consequential, or punitive damages arising from your use of our services. Our total liability shall not exceed the amount you paid for our services in the 12 months preceding the claim.
              </p>
            </div>

            {/* Privacy */}
            <div className="terms-section">
              <h2>9. Privacy and Data Protection</h2>
              <p>
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy. By using our services, you consent to our data practices as described in the Privacy Policy.
              </p>
            </div>

            {/* Termination */}
            <div className="terms-section">
              <h2>10. Termination</h2>
              <p>
                We may terminate or suspend your account and access to our services immediately, without prior notice, for any reason, including but not limited to breach of these terms.
              </p>
              <p>
                Upon termination, your right to use our services will cease immediately. All provisions of these terms that by their nature should survive termination shall survive.
              </p>
            </div>

            {/* Governing Law */}
            <div className="terms-section">
              <h2>11. Governing Law and Dispute Resolution</h2>
              <p>
                These terms shall be governed by and construed in accordance with applicable international laws. Any disputes arising from these terms or your use of our services shall be resolved through binding arbitration.
              </p>
            </div>

            {/* Changes to Terms */}
            <div className="terms-section">
              <h2>12. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new terms on our platform and updating the "Last Updated" date.
              </p>
              <p>
                Your continued use of our services after changes are posted constitutes your acceptance of the modified terms.
              </p>
            </div>

            {/* Contact Information */}
            <div className="terms-section">
              <h2>13. Contact Us</h2>
              <p>
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <i className="bi bi-envelope"></i>
                  <span>support@affiliateacademy.com</span>
                </div>
                <div className="contact-item">
                  <i className="bi bi-telephone"></i>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <i className="bi bi-geo-alt"></i>
                  <span>123 Business Street, Suite 100, City, Country</span>
                </div>
              </div>
            </div>

            {/* Agreement */}
            <div className="terms-section agreement-section">
              <div className="agreement-box">
                <i className="bi bi-check-circle"></i>
                <p>
                  By creating an account or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Terms