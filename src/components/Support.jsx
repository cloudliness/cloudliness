import React, { useState } from 'react';
import './Support.css';

const Support = () => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const toggleAnswer = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  const faqData = [
    {
      question: 'How do I choose the right hard drive for my needs?',
      answer:
        'Consider factors like storage capacity, interface (SATA, NVMe), form factor (2.5-inch, 3.5-inch), RPM (for HDDs), and intended use (e.g., gaming, professional work).',
    },
    {
      question: 'What is the difference between HDD and SSD?',
      answer:
        'HDDs (Hard Disk Drives) use spinning disks to store data, while SSDs (Solid State Drives) use flash memory. SSDs are generally faster, more durable, and consume less power, but they are more expensive per gigabyte.',
    },
    {
      question: 'How can I troubleshoot a hard drive that is not being detected?',
      answer:
        'Check the connections, try a different cable or port, listen for unusual noises, and check the BIOS/UEFI settings. If the drive is still not detected, it may be faulty.',
    },
    {
      question: 'What should I do if my hard drive is making clicking noises?',
      answer:
        'Clicking noises often indicate a mechanical problem. Back up your data immediately if possible, and consider replacing the drive.',
    },
    {
      question: 'How do I install an internal hard drive?',
      answer:
        'Turn off your computer, open the case, connect the data and power cables to the drive, mount the drive in a drive bay, and close the case. Then, format the drive in your operating system.',
    },
  ];

  return (
    <div className="support-page">
      <h1>Hard Drive Product Support</h1>
      <p>
        Welcome to our support page. Here you'll find information about our
        products, troubleshooting tips, and answers to frequently asked
        questions.
      </p>

      <h2>Contact Support</h2>
      <p>
        If you need further assistance, please don't hesitate to contact our
        support team:
      </p>
      <ul>
        <li>Email: support@harddrives.com</li>
        <li>Phone: 1-800-HARD-DRIVE</li>
        <li>Live Chat: Available on our website during business hours</li>
      </ul>

      <h2>Frequently Asked Questions</h2>
      <div className="faq-section">
        {faqData.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3 
              onClick={() => toggleAnswer(index)} 
              className={`faq-question ${expandedQuestion === index ? 'open' : ''}`}
            >
              {faq.question}
            </h3>
            {expandedQuestion === index && (
              <p className="faq-answer">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Support;
