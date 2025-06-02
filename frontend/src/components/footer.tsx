import { siteInfo } from '@/data/site'

// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-2 text-sm text-gray-600">
      &copy; {new Date().getFullYear()} <span className="font-medium text-orange-500">
				{siteInfo.brandName}
				</span> . All rights reserved.
    </footer>
  );
}
