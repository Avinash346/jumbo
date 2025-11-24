import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserFilters } from '@/components/users/UserFilters';
import userEvent from '@testing-library/user-event';

describe('UserFilters', () => {
  const mockProps = {
    searchQuery: '',
    onSearchChange: () => {},
    selectedCompany: 'all',
    onCompanyChange: () => {},
    companies: ['Company A', 'Company B', 'Company C'],
  };

  it('should render search input', () => {
    render(<UserFilters {...mockProps} />);
    const searchInput = screen.getByPlaceholderText('Search by name...');
    expect(searchInput).toBeInTheDocument();
  });

  it('should call onSearchChange when typing', async () => {
    const user = userEvent.setup();
    const searchValues: string[] = [];
    const onSearchChange = (value: string) => {
      searchValues.push(value);
    };

    render(<UserFilters {...mockProps} onSearchChange={onSearchChange} />);
    const searchInput = screen.getByPlaceholderText('Search by name...');
    
    await user.type(searchInput, 'J');
    expect(searchValues.length).toBeGreaterThan(0);
    expect(searchValues).toContain('J');
  });

  it('should display search query value', () => {
    render(<UserFilters {...mockProps} searchQuery="Test Query" />);
    const searchInput = screen.getByPlaceholderText('Search by name...') as HTMLInputElement;
    expect(searchInput.value).toBe('Test Query');
  });
});
