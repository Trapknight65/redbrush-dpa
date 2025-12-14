import Vivrecard from "@/components/ui/Vivrecard";

export default function Footer() {
    return (
        <footer className="bg-charcoal text-off-white border-t border-gray-800 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand */}
                <div className="flex flex-col items-center md:items-start gap-6">
                    <div>
                        <span className="text-2xl font-bold text-crimson-red mb-4 block">Redbrush</span>
                        <p className="text-sm opacity-80 text-center md:text-left">
                            Creative digital solutions for modern brands.
                            <br />
                            Let's build something amazing together.
                        </p>
                    </div>

                    <Vivrecard />
                </div>

                {/* Links */}
                <div className="flex flex-col items-center">
                    <h3 className="text-lg font-bold mb-4 text-electric-blue">Quick Links</h3>
                    <ul className="flex flex-wrap gap-4 sm:gap-6 justify-center">
                        {['Services', 'Portfolio', 'About', 'Contact', 'Privacy'].map((item) => (
                            <li key={item}>
                                <a href={item === 'Privacy' ? '/privacy' : `/${item.toLowerCase()}`} className="hover:text-crimson-red transition-colors text-sm font-medium">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Copyright */}
                <div className="flex flex-col items-center md:items-end justify-center">
                    <p className="text-sm opacity-60">
                        &copy; {new Date().getFullYear()} Redbrush Digital Agency.
                    </p>
                    <p className="text-xs opacity-60 mt-1">
                        &copy; {new Date().getFullYear()} Allan Deschamps. All rights reserved.
                    </p>
                    <p className="text-xs opacity-40 mt-2">
                        Crafted with Next.js & Tailwind CSS
                    </p>
                </div>
            </div>
        </footer>
    );
}
