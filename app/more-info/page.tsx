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
              We're building a space where meaningful connections and personal development take center stage.
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
                  Find valuable resources, promotions, and opportunities in our dedicated marketplace - the only place where you'll see promotional content.
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
