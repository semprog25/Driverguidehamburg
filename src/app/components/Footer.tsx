import React from 'react';

export function Footer() {
  return (
    <footer className="bg-slate-900 py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-white">Hamburg DriverGuide</h3>
            <p className="mt-4 text-sm leading-6">
              Professional chauffeur and guide services in Hamburg.
              Experience the city with a local expert.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Angela Scheefeld</li>
              <li>Hamburg, Germany</li>
              <li>
                <a href="mailto:info@hamburgdriverguide.de" className="hover:text-white">
                  info@hamburgdriverguide.de
                </a>
              </li>
              <li>
                <a href="tel:+491721234567" className="hover:text-white">
                  +49 172 123 4567
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Imprint</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Angela Scheefeld. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
