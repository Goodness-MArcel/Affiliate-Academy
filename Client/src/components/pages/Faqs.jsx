import React, { useState } from 'react'
import './Faqs.css'
import { Link } from 'react-router-dom';

const Faqs = () => {
  const [activeCategory, setActiveCategory] = useState('general')

  const faqData = {
    general: [
      {
        id: 1,
        question: 'What is Affiliate Academy?',
        answer: 'Affiliate Academy is a comprehensive learning platform and affiliate marketing program designed to help individuals build profitable online businesses. We offer training, resources, and opportunities to earn commissions through our affiliate program.'
      },
      {
        id: 2,
        question: 'How do I get started with Affiliate Academy?',
        answer: 'Getting started is simple! Visit our Affiliate page, fill out the registration form, and join our community. Once approved, you\'ll have access to all training materials, marketing resources, and tools needed to succeed.'
      },
      {
        id: 3,
        question: 'Is Affiliate Academy free?',
        answer: 'While basic registration is straightforward, we offer premium membership tiers with advanced courses and tools. Some features may require a one-time registration fee of 5,000 naira to access all benefits and earning opportunities.'
      },
      {
        id: 4,
        question: 'What courses and services do you offer?',
        answer: 'We offer comprehensive training in Digital Marketing, Programming, Web Design, Graphics Design, CAD, Affiliate Marketing, Animation, and Video Editing. All courses are designed by industry experts with practical, hands-on learning.'
      },
      {
        id: 5,
        question: 'Can I use Affiliate Academy on mobile?',
        answer: 'Yes! Affiliate Academy is fully optimized for mobile devices. You can access your courses, track your earnings, and manage your affiliate links from any smartphone or tablet.'
      },
      {
        id: 6,
        question: 'Is there customer support available?',
        answer: 'Absolutely! Our dedicated support team is available to help you with any questions or issues. You can reach us through email, live chat, or our contact form, and we typically respond within 24 hours.'
      }
    ],
    affiliate: [
      {
        id: 7,
        question: 'How much commission can I earn?',
        answer: 'As an affiliate, you can earn up to 40% commission on every sale you refer. Plus, you\'ll receive lifetime commissions on your referrals, meaning you earn passive income indefinitely.'
      },
      {
        id: 8,
        question: 'What is the affiliate registration fee?',
        answer: 'The annual affiliate registration fee is 5,000 naira. This one-time yearly payment gives you access to all affiliate tools, marketing materials, real-time analytics, and our exclusive partner community.'
      },
      {
        id: 9,
        question: 'When do I get paid?',
        answer: 'Commissions are processed monthly. Payments are typically made between the 1st and 5th of each month via bank transfer or preferred payment method. Minimum withdrawal amount is 1,000 naira.'
      },
      {
        id: 10,
        question: 'How do I track my earnings?',
        answer: 'You have access to a comprehensive dashboard where you can track clicks, conversions, and earnings in real-time. Detailed reports are available daily, weekly, or monthly.'
      },
      {
        id: 11,
        question: 'Do you provide marketing materials?',
        answer: 'Yes! We provide banners, email templates, social media graphics, landing pages, and promotional videos. All materials are professionally designed and ready to use immediately.'
      },
      {
        id: 12,
        question: 'Can I promote Affiliate Academy multiple ways?',
        answer: 'Definitely! You can promote through social media, blogs, email, YouTube, podcasts, or any other channel. We encourage creativity and provide flexible promotion guidelines.'
      }
    ],
    courses: [
      {
        id: 13,
        question: 'What are the course prerequisites?',
        answer: 'Most of our courses are designed for beginners with no prior experience required. Some advanced courses may recommend basic knowledge, but we provide foundational modules to get you up to speed.'
      },
      {
        id: 14,
        question: 'How long do the courses take?',
        answer: 'Course duration varies from 2-12 weeks depending on the subject matter and your pace. Most students complete courses at their own speed, with flexibility to study anytime.'
      },
      {
        id: 15,
        question: 'Do I get a certificate upon completion?',
        answer: 'Yes! Upon completing any course, you\'ll receive a professional certificate of completion that you can add to your portfolio or LinkedIn profile.'
      },
      {
        id: 16,
        question: 'Can I download course materials?',
        answer: 'Yes! All course materials including video lectures, PDFs, and resources are available for download so you can study offline.'
      },
      {
        id: 17,
        question: 'Are there live sessions or just recorded content?',
        answer: 'We offer both! Many courses include live Q&A sessions and group projects where you can interact with instructors and peers. Recorded sessions are available for those who cannot attend live.'
      },
      {
        id: 18,
        question: 'What if I don\'t understand something?',
        answer: 'Our instructors and mentors are available to help! You can ask questions in course forums, schedule one-on-one tutoring sessions, or join our community groups for peer support.'
      }
    ],
    payment: [
      {
        id: 19,
        question: 'What payment methods do you accept?',
        answer: 'We accept bank transfers, credit/debit cards (Visa, Mastercard), mobile money transfers, and cryptocurrency. All payments are secure and encrypted.'
      },
      {
        id: 20,
        question: 'Is my payment information secure?',
        answer: 'Yes! We use industry-leading SSL encryption and comply with PCI DSS standards to protect your payment information. Your data is never shared with third parties.'
      },
      {
        id: 21,
        question: 'What if my payment fails?',
        answer: 'If a payment fails, you\'ll receive an email notification with the reason and next steps. You can retry the payment or try an alternative payment method.'
      },
      {
        id: 22,
        question: 'Can I get a refund?',
        answer: 'We offer a 14-day money-back guarantee on all purchases. If you\'re not satisfied, simply contact our support team for a full refund, no questions asked.'
      },
      {
        id: 23,
        question: 'Do you offer payment plans?',
        answer: 'Yes! For higher-priced courses and memberships, we offer flexible payment plans with no interest. Choose to pay in 2, 3, or 6 installments.'
      },
      {
        id: 24,
        question: 'Is there a student discount?',
        answer: 'Absolutely! We offer 20% discount for students with valid student ID. Additionally, group discounts are available for teams or organizations.'
      }
    ]
  }

  const categories = [
    { key: 'general', label: 'General', icon: 'bi-info-circle' },
    { key: 'affiliate', label: 'Affiliate Program', icon: 'bi-person-check' },
    { key: 'courses', label: 'Courses', icon: 'bi-book' },
    { key: 'payment', label: 'Payment & Billing', icon: 'bi-credit-card' }
  ]

  return (
    <div className="faqs-page">
      {/* Banner Section */}
      <section className="faqs-banner">
        <div className="banner-overlay"></div>
        <div className="container-fluid h-100">
          <div className="row h-100 align-items-center justify-content-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-6">
              <div className="banner-content text-center">
                <h1 className="banner-title animate__animated animate__fadeInUp">
                  <span className="text-white">Frequently Asked Questions</span>
                </h1>
                <h2 className="banner-subtitle animate__animated animate__fadeInUp animate__delay-1s">
                  Find Your <span className="text-success">Answers</span>
                </h2>
                <p className="banner-description animate__animated animate__fadeInUp animate__delay-2s">
                  We are here to help you with all your questions about Affiliate Academy. 
                  Get the information you need to start your journey with us.
                </p>
                <div className="banner-button animate__animated animate__fadeInUp animate__delay-3s">
                  <Link to="/contact" className="btn btn-success btn-lg px-4 py-3">
                    <i className="bi bi-headset me-2"></i>
                    CONTACT SUPPORT
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Content Section */}
      <section className="faqs-content-section py-5">
        <div className="container">
          {/* Category Navigation */}
          <div className="category-nav mb-5">
            <div className="row">
              <div className="col-12">
                <div className="d-flex flex-wrap gap-3 justify-content-center">
                  {categories.map((category) => (
                    <button
                      key={category.key}
                      className={`category-btn ${activeCategory === category.key ? 'active' : ''}`}
                      onClick={() => setActiveCategory(category.key)}
                    >
                      <i className={`bi ${category.icon}`}></i>
                      <span>{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FAQs List */}
          <div className="row">
            <div className="col-12">
              <div className="faqs-list">
                {faqData[activeCategory].map((faq, index) => (
                  <div key={faq.id} className="faq-item" style={{ animationDelay: `${index * 0.1}s` }}>
                    <details className="faq-details">
                      <summary className="faq-question">
                        <span className="question-number">{String(faq.id).padStart(2, '0')}</span>
                        <span className="question-text">{faq.question}</span>
                        <span className="expand-icon">
                          <i className="bi bi-chevron-down"></i>
                        </span>
                      </summary>
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Faqs
