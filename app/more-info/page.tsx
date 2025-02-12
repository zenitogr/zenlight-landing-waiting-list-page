import React from 'react';
import Link from 'next/link';

export default function MoreInfo() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Welcome to ZenLight
        </h1>
        
        <div className="space-y-8">
          <section className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">Our Vision</h2>
            <p className="text-lg leading-relaxed">
              ZenLight is a revolutionary social network focused on self-improvement and societal growth. 
              We&apos;re building a space where meaningful connections and personal development take center stage.
            </p>
          </section>

          <section className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">What Makes Us Different</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2 text-pink-400">Ad-Free Feed Experience</h3>
                <p className="text-lg leading-relaxed">
                  Your main feed remains completely ad-free, ensuring a clean and focused environment for meaningful interactions.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2 text-pink-400">Dedicated Marketplace</h3>
                <p className="text-lg leading-relaxed">
                  Find valuable resources, promotions, and opportunities in our dedicated marketplace - the only place where you&apos;ll see promotional content.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">Community Features</h2>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start">
                <span className="text-pink-400 mr-2">•</span>
                Exchange valuable advice and insights with like-minded individuals
              </li>
              <li className="flex items-start">
                <span className="text-pink-400 mr-2">•</span>
                Access curated resources for personal growth
              </li>
              <li className="flex items-start">
                <span className="text-pink-400 mr-2">•</span>
                Discover exclusive promotions in our marketplace
              </li>
              <li className="flex items-start">
                <span className="text-pink-400 mr-2">•</span>
                Connect with others committed to positive change
              </li>
            </ul>
          </section>

          <section className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">Join Our Community</h2>
            <p className="text-lg leading-relaxed mb-4">
              Be part of our growing community! Join our Discord server to connect with other members, get updates, and share your thoughts.
            </p>
            <a 
              href="https://discord.gg/uB5XcA35hq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] text-white transition-colors"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Join our Discord Server
            </a>
          </section>

          <section className="text-center mt-12">
            <p className="text-2xl font-medium text-purple-400">
              Join us in creating a better society, one connection at a time.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
