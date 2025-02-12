"use client";

export function DonationSection() {
  return (
    <div className="text-center">
      <h2 className="gradient-text text-2xl sm:text-3xl font-bold mb-4">Skip the Waiting List</h2>
      <p className="text-lg mb-6 opacity-80">Support our development with a minimum €5 donation</p>
      <div className="flex flex-wrap gap-4 justify-center">
        <a
          href="https://ko-fi.com/zenitogr"
          target="_blank"
          rel="noopener noreferrer"
          className="cyberpunk-button px-8 py-3 rounded-lg inline-flex items-center gap-2"
        >
          <span>☕ Support on Ko-fi</span>
        </a>
        <a
          href="https://revolut.me/zenitogr"
          target="_blank"
          rel="noopener noreferrer"
          className="cyberpunk-button px-8 py-3 rounded-lg inline-flex items-center gap-2"
        >
          <span>💳 Donate via Revolut</span>
        </a>
      </div>
    </div>
  );
}
