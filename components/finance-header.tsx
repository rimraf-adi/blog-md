'use client';

import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

export function FinanceHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="max-w-6xl mx-auto px-4 py-4">
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-shadow">
                            <TrendingUp className="w-6 h-6 text-[#0A1628]" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gold-gradient">FinanceInsight</h1>
                            <p className="text-xs text-[#94A3B8]">Financial Markets & Analysis</p>
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className="text-[#F8FAFC] hover:text-[#D4AF37] transition-colors font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            href="/"
                            className="text-[#94A3B8] hover:text-[#D4AF37] transition-colors"
                        >
                            Markets
                        </Link>
                        <Link
                            href="/"
                            className="text-[#94A3B8] hover:text-[#D4AF37] transition-colors"
                        >
                            Analysis
                        </Link>
                        <Link
                            href="/"
                            className="text-[#94A3B8] hover:text-[#D4AF37] transition-colors"
                        >
                            About
                        </Link>
                    </div>

                    {/* CTA Button */}
                    <Link
                        href="/"
                        className="hidden sm:block px-4 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-[#0A1628] font-semibold hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all"
                    >
                        Subscribe
                    </Link>
                </nav>
            </div>
        </header>
    );
}
