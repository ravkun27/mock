import { Button } from "./ui/Button";

export const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><a href="/new-arrivals" className="text-gray-600 hover:text-gray-900">New Arrivals</a></li>
              <li><a href="/bestsellers" className="text-gray-600 hover:text-gray-900">Bestsellers</a></li>
              <li><a href="/sale" className="text-gray-600 hover:text-gray-900">Sale</a></li>
              <li><a href="/collections" className="text-gray-600 hover:text-gray-900">Collections</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="/contact" className="text-gray-600 hover:text-gray-900">Contact Us</a></li>
              <li><a href="/shipping" className="text-gray-600 hover:text-gray-900">Shipping & Returns</a></li>
              <li><a href="/warranty" className="text-gray-600 hover:text-gray-900">Warranty</a></li>
              <li><a href="/faq" className="text-gray-600 hover:text-gray-900">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="/our-story" className="text-gray-600 hover:text-gray-900">Our Story</a></li>
              <li><a href="/sustainability" className="text-gray-600 hover:text-gray-900">Sustainability</a></li>
              <li><a href="/stores" className="text-gray-600 hover:text-gray-900">Store Locations</a></li>
              <li><a href="/careers" className="text-gray-600 hover:text-gray-900">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <p className="text-gray-600 mb-4">Subscribe to our newsletter for updates and promotions.</p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
              <Button variant="default" size="sm">
                Subscribe
              </Button>
            </div>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-900">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.272.644 1.772 1.153.509.5.902 1.104 1.153 1.772.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.903 4.903 0 01-1.153 1.772c-.5.509-1.104.902-1.772 1.153-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.903 4.903 0 01-1.772-1.153 4.903 4.903 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427A4.903 4.903 0 013.45 3.45c.5-.509 1.104-.902 1.772-1.153C5.857 2.05 6.585 1.88 7.648 1.832 8.672 1.784 9.027 1.772 11.428 1.77h.87zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8.333a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.17 1.17 0 100 2.338 1.17 1.17 0 000-2.338z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-gray-500">&copy; 2025 ShopBrand, Inc. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="/privacy" className="text-sm text-gray-500 hover:text-gray-900">Privacy Policy</a>
            <a href="/terms" className="text-sm text-gray-500 hover:text-gray-900">Terms of Service</a>
            <a href="/cookies" className="text-sm text-gray-500 hover:text-gray-900">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
