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
                        <div className="w-10 h-10 rounded-[11px] bg-gradient-to-br from-[#059669] to-[#10B981] flex items-center justify-center shadow-lg group-hover:shadow-[0_0_24px_rgba(5,150,105,0.4)] transition-all duration-400 ease-out">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gold-gradient">FinanceInsight</h1>
                            <p className="text-xs text-[#6B7280] tracking-wide">Financial Markets & Analysis</p>
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className="text-[#111827] hover:text-[#059669] transition-colors font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            href="/blogs"
                            className="text-[#4B5563] hover:text-[#059669] transition-colors"
                        >
                            Blogs
                        </Link>
                        <Link
                            href="/#about"
                            className="text-[#4B5563] hover:text-[#059669] transition-colors"
                        >
                            About
                        </Link>
                    </div>

                    {/* CTA Button */}
                    <Link
                        href="/blogs"
                        className="hidden sm:block px-5 py-2.5 rounded-[10px] bg-gradient-to-r from-[#059669] via-[#10B981] to-[#059669] text-white font-semibold hover:shadow-[0_0_28px_rgba(5,150,105,0.35)] transition-all duration-400 ease-out"
                    >
                        Read Articles
                    </Link>
                </nav>
            </div>
        </header>
    );
}
