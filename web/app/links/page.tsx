import Image from 'next/image';
import Link from 'next/link';
import { getGlobals } from '@/lib/directus';

export default async function LinksPage() {
  const globals = await getGlobals();

  const links = [
    {
      title: 'Sito Web',
      href: '/',
      icon: '🌐',
    },
    {
      title: 'Menu',
      href: globals?.menu_url || 'https://www.jmenu.it/menu-nhero-milano/',
      icon: '📖',
      external: true,
    },
    {
      title: 'Prenota un Tavolo',
      href: globals?.reservation_url || '#',
      icon: '🍽️',
      external: true,
    },
    {
      title: 'Ordina da Casa',
      href: globals?.delivery_url || '#',
      icon: '🚴',
      external: true,
    }
  ];

  return (
    <div className="min-h-screen bg-nhero-green flex flex-col items-center justify-center px-6 py-12">
      {/* Logo */}
      <div className="mb-16">
        <Image
          src="/nhero_white_logo.png"
          alt="Nhero Milano"
          width={200}
          height={80}
          className="w-48 h-auto"
          priority
        />
      </div>

      {/* Links Container */}
      <div className="w-full max-w-sm flex flex-col gap-5 items-center">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            className="w-full max-w-xs"
          >
            <div className="bg-nhero-cream px-6 py-3.5 transition-all duration-300 hover:bg-[#c9a66d] hover:scale-[1.02] shadow-lg min-h-[60px] flex items-center justify-center">
              <div className="flex items-center justify-center gap-3 text-black">
                <span className="text-xl">{link.icon}</span>
                <span className="text-base font-semibold">{link.title}</span>
                {link.external && (
                  <span className="text-sm opacity-80">↗</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>


    </div>
  );
}
