'use client';

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

interface UserFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCompany: string;
  onCompanyChange: (value: string) => void;
  companies: string[];
}

export const UserFilters = ({
  searchQuery,
  onSearchChange,
  selectedCompany,
  onCompanyChange,
  companies,
}: UserFiltersProps) => {
  const companyOptions = [
    { value: 'all', label: 'All Companies' },
    ...companies.map((company) => ({ value: company, label: company })),
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="w-full sm:w-64">
        <Select
          value={selectedCompany}
          onValueChange={onCompanyChange}
          options={companyOptions}
          placeholder="Filter by company"
        />
      </div>
    </div>
  );
};
