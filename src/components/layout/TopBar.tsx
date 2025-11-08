/**
 * TopBar Component
 *
 * Top utility bar with certifications, contact info, and delivery information.
 * Responsive: Hides on mobile, shows condensed on tablet, full on desktop.
 *
 * @component
 */

import { Award, Mail, Truck } from 'lucide-react';

const iconMap = {
  award: Award,
  mail: Mail,
  truck: Truck,
};

interface TopBarItemProps {
  icon: keyof typeof iconMap;
  text: string;
}

const TopBarItem = ({ icon, text }: TopBarItemProps) => {
  const Icon = iconMap[icon];
  return (
    <div className="flex items-center gap-2 hover:text-black transition-colors duration-200 cursor-pointer">
      <Icon size={12} className="flex-shrink-0" />
      <span className="whitespace-nowrap">{text}</span>
    </div>
  );
};

export const TopBar = () => {
  return (
    <div className="bg-gray-50 border-b border-gray-200 py-2 hidden md:block">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="flex justify-end items-center gap-6 text-[11px] text-gray-600">
          <TopBarItem icon="award" text="DERMATOLOGIST TESTED" />
          <TopBarItem icon="mail" text="hello@luxeskincare.com" />
          <TopBarItem icon="truck" text="FREE SHIPPING OVER $75" />
        </div>
      </div>
    </div>
  );
};
