import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul>
              <li className="mb-2">
                <Link href="#" className="hover:text-gray-400">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-400">
                  Careers
                </a>
              </li>
              <li className="mb-2">
                <a href="/crud-blog" className="hover:text-gray-400">
                  Admin
                </a>
              </li>
              <li className="mb-2">
                <Link href="/blog" className="hover:text-gray-400">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul>
              <li className="mb-2">
                <Link href="#" className="hover:text-gray-400">
                  Help Center
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-gray-400">
                  Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-400">
                  Privacy Policy
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-gray-400">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Insurances</h4>
            <ul>
              <li className="mb-2">
                <Link href="/insurances/life" className="hover:text-gray-400">
                  Life Insurance
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/insurances/health" className="hover:text-gray-400">
                  Health Insurance
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/insurances/child" className="hover:text-gray-400">
                  Child Insurance
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/insurances/pension"
                  className="hover:text-gray-400"
                >
                  Pension Plan
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/insurances/term" className="hover:text-gray-400">
                  Term Insurance
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/insurances/car" className="hover:text-gray-400">
                  Car Insurance
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Admin</h4>
            <ul>
              <li className="mb-2">
                <Link href="/crud-blog" className="hover:text-gray-400">
                  Blog
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/crud-cards" className="hover:text-gray-400">
                  Cards
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/crud-loans" className="hover:text-gray-400">
                  Loan
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8">
          <p className="text-center text-gray-500">
            &copy; 2024 Investment Better. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
