'use client';

import Link from 'next/link';
import { TrendingUp, ArrowRight, BookOpen, Users, Target, Zap } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <FadeIn delay={0.1}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(5,150,105,0.08)] border border-[rgba(5,150,105,0.2)] mb-6">
            <TrendingUp className="w-4 h-4 text-[#059669]" />
            <span className="text-sm text-[#059669]">Expert Financial Insights</span>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-[#111827]">Navigate the</span>
            <br />
            <span className="text-gold-gradient">Financial Markets</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p className="text-xl text-[#4B5563] max-w-2xl mx-auto mb-10">
            Expert analysis, market trends, and investment strategies to help you make informed financial decisions in today's dynamic markets.
          </p>
        </FadeIn>
        <FadeIn delay={0.4}>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#059669] to-[#10B981] text-white font-semibold hover:shadow-[0_0_28px_rgba(5,150,105,0.35)] transition-all hover:scale-105"
            >
              <BookOpen className="w-5 h-5" />
              Read Articles
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#about"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[rgba(5,150,105,0.08)] text-[#059669] font-semibold border border-[rgba(5,150,105,0.2)] hover:bg-[rgba(5,150,105,0.15)] transition-all hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.15}>
          <StaggerItem>
            <div className="glass-card p-8 rounded-2xl text-center h-full hover:scale-105 transition-transform">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#059669] to-[#10B981] flex items-center justify-center mx-auto mb-4">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#111827] mb-3">Market Analysis</h3>
              <p className="text-[#4B5563]">In-depth analysis of market trends, patterns, and opportunities to inform your investment decisions.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="glass-card p-8 rounded-2xl text-center h-full hover:scale-105 transition-transform">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#059669] to-[#10B981] flex items-center justify-center mx-auto mb-4">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#111827] mb-3">Real-Time Updates</h3>
              <p className="text-[#4B5563]">Stay ahead with timely insights on market movements and economic developments.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="glass-card p-8 rounded-2xl text-center h-full hover:scale-105 transition-transform">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#059669] to-[#10B981] flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#111827] mb-3">Expert Community</h3>
              <p className="text-[#4B5563]">Join a community of traders and investors sharing knowledge and strategies.</p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-6xl mx-auto px-4 py-20">
        <FadeIn>
          <div className="glass-card rounded-3xl p-12 md:p-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <FadeIn delay={0.1} direction="right">
                  <span className="text-sm font-semibold text-[#059669] uppercase tracking-wider mb-4 block">About Us</span>
                </FadeIn>
                <FadeIn delay={0.2} direction="right">
                  <h2 className="text-4xl font-bold text-[#111827] mb-6">Your Trusted Financial Partner</h2>
                </FadeIn>
                <FadeIn delay={0.3} direction="right">
                  <p className="text-[#4B5563] mb-6 leading-relaxed">
                    FinanceInsight is dedicated to democratizing financial knowledge. We believe everyone deserves access to quality market analysis and investment education.
                  </p>
                </FadeIn>
                <FadeIn delay={0.4} direction="right">
                  <p className="text-[#4B5563] mb-8 leading-relaxed">
                    Our team of experienced analysts and finance professionals bring you insights that were once reserved for institutional investors.
                  </p>
                </FadeIn>
                <FadeIn delay={0.5} direction="right">
                  <div className="flex gap-8">
                    <div>
                      <div className="text-3xl font-bold text-[#059669]">500+</div>
                      <div className="text-sm text-[#6B7280]">Articles Published</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-[#059669]">50K+</div>
                      <div className="text-sm text-[#6B7280]">Monthly Readers</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-[#059669]">10+</div>
                      <div className="text-sm text-[#6B7280]">Expert Writers</div>
                    </div>
                  </div>
                </FadeIn>
              </div>
              <FadeIn delay={0.3} direction="left">
                <div className="relative">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#059669]/20 to-[#10B981]/10 flex items-center justify-center">
                    <TrendingUp className="w-32 h-32 text-[#059669] opacity-30" />
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <FadeIn>
          <h2 className="text-3xl font-bold text-[#111827] mb-4">Ready to Start Your Financial Journey?</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-[#4B5563] mb-8 max-w-xl mx-auto">
            Explore our latest articles and stay informed about market trends.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#059669] to-[#10B981] text-white font-semibold hover:shadow-[0_0_28px_rgba(5,150,105,0.35)] transition-all hover:scale-105"
          >
            Browse All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>
      </section>
    </main>
  );
}
