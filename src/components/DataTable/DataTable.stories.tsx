import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';
import type { DataTableColumn } from '../../types';

const meta = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
  { id: 1, name: 'Anasuya Roy', email: 'Anasuya@example.com', role: 'Admin', status: 'Active', joinDate: '2023-01-15' },
  { id: 2, name: 'Rudra', email: 'Rudra@example.com', role: 'Editor', status: 'Active', joinDate: '2023-02-20' },
  { id: 3, name: 'Antika Johnson', email: 'Antika@example.com', role: 'Viewer', status: 'Inactive', joinDate: '2023-03-10' },
  { id: 4, name: 'Brown', email: 'Brown@example.com', role: 'Admin', status: 'Active', joinDate: '2023-04-05' },
  { id: 5, name: 'Black', email: 'Black@example.com', role: 'Editor', status: 'Active', joinDate: '2023-05-12' },
];

const columns: DataTableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { 
    key: 'role', 
    label: 'Role', 
    sortable: true,
    render: (value) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        value === 'Admin' ? 'bg-purple-100 text-purple-800' :
        value === 'Editor' ? 'bg-blue-100 text-blue-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {value}
      </span>
    )
  },
  { 
    key: 'status', 
    label: 'Status', 
    sortable: true,
    render: (value) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        value === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {value}
      </span>
    )
  },
  { key: 'joinDate', label: 'Join Date', sortable: true },
];

export const Default: Story = {
  args: {
    columns,
    data: sampleData,
  },
};

export const WithSelection: Story = {
  args: {
    columns,
    data: sampleData,
    selectable: true,
  },
};

export const Loading: Story = {
  args: {
    columns,
    data: [],
    loading: true,
  },
};

export const EmptyState: Story = {
  args: {
    columns,
    data: [],
  },
};

export const WithoutSearch: Story = {
  args: {
    columns,
    data: sampleData,
    searchable: false,
  },
};

export const WithoutPagination: Story = {
  args: {
    columns,
    data: sampleData,
    paginated: false,
  },
};