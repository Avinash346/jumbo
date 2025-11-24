'use client';

import * as SwitchPrimitive from '@radix-ui/react-switch';

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
}

export const Switch = ({ checked, onCheckedChange, label }: SwitchProps) => {
  return (
    <div className="flex items-center gap-2">
      <SwitchPrimitive.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative data-[state=checked]:bg-blue-600 transition-colors"
      >
        <SwitchPrimitive.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform translate-x-0.5 data-[state=checked]:translate-x-[22px]" />
      </SwitchPrimitive.Root>
      {label && <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>}
    </div>
  );
};
