export default function SimpleHome() {
  return (
    <div className="min-h-screen bg-[#8B5DFF] from-purple-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Design Anything with{" "}
            <span className="text-purple-600">AI-Powered</span>{" "}
            Creativity
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create stunning logos, social media posts, marketing materials, and more in seconds. 
            Professional design has never been this fast or accessible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              Start Creating Free
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">50K+</div>
              <div className="text-gray-600">Designs Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">25K+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">99.8%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">4.9★</div>
              <div className="text-gray-600">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need for Professional Design
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered tools make it easy to create stunning designs without any design experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Design",
                description: "Generate stunning designs with our advanced AI engine that understands your creative vision."
              },
              {
                title: "Lightning Fast",
                description: "Create professional designs in seconds, not hours. Our optimized workflow speeds up your creative process."
              },
              {
                title: "Multiple Formats",
                description: "From logos to social media posts, banners to presentations - create anything you need."
              },
              {
                title: "Smart Color Palettes",
                description: "AI-generated color schemes that perfectly match your brand and design requirements."
              },
              {
                title: "Team Collaboration",
                description: "Work together seamlessly with real-time collaboration tools and shared asset libraries."
              },
              {
                title: "Trending Styles",
                description: "Stay ahead with AI insights on the latest design trends and popular styles."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-[#8B5DFF] to-purple-700 rounded-xl flex items-center justify-center mb-4">
                  <div className="w-8 h-8 bg-white rounded"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-purple-600">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Creative Process?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using CreateDOT to bring their ideas to life faster than ever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Creating Free
            </button>
            <button className="border border-purple-400 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-500 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
