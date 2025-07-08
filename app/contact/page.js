import React from "react";

const Contact = () => {
  return (
    <section className="bg-orange-50 py-16 px-4 md:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-orange-700 mb-4">
          📞 Contact Us
        </h2>
        <p className="text-lg text-gray-700 mb-10">
          Whether you have a question, an idea, or just want to say hi over a
          virtual cup of chai — we're all ears! ☕
        </p>

        <div className="grid md:grid-cols-2 gap-10 text-left">
          <div>
            <h3 className="text-2xl font-semibold text-orange-600 mb-2">
              📬 Email Us
            </h3>
            <p className="text-gray-700">support@chaipecharcha.in</p>

            <h3 className="text-2xl font-semibold text-orange-600 mt-6 mb-2">
              📞 Call Us
            </h3>
            <p className="text-gray-700">
              +91-9130981522
              <br />
              Mon–Fri | 10 AM – 6 PM
            </p>

            <h3 className="text-2xl font-semibold text-orange-600 mt-6 mb-2">
              🏢 Visit Us
            </h3>
            <p className="text-gray-700">
              2nd Floor, Creators Hub,
              <br />
              Pune, Maharashtra – 411014
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-orange-600 mb-2">
              🤝 Community Support
            </h3>
            <p className="text-gray-700">
              Need help with your campaign or account? Reach out to our support
              team directly. We respond within 24–48 hours.
            </p>

            <h3 className="text-2xl font-semibold text-orange-600 mt-6 mb-2">
              📱 Follow Us
            </h3>
            <div className="flex space-x-4 text-orange-600 text-xl">
              <a href="#" aria-label="Instagram">
                📸
              </a>
              <a href="#" aria-label="Twitter">
                🐦
              </a>
              <a href="#" aria-label="LinkedIn">
                💼
              </a>
              <a href="#" aria-label="YouTube">
                ▶️
              </a>
            </div>

            <h3 className="text-2xl font-semibold text-orange-600 mt-6 mb-2">
              ☕ Let’s Collaborate
            </h3>
            <p className="text-gray-700">
              Are you a brand, influencer, college fest organizer, or NGO
              looking to raise funds with us? We’d love to chat!
            </p>
          </div>
        </div>

        <p className="text-orange-700 text-xl font-semibold mt-12">
          Chai Pe Charcha – Brew Stories. Fund Dreams. 💬
        </p>
      </div>
    </section>
  );
};

export default Contact;
export const metadata = {
  title: "Chai - Contact",
  description: "A Crowdfunding Site for Creators",
};
