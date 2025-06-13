import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TableCellsIcon, 
  DocumentArrowUpIcon, 
  CommandLineIcon,
  WindowIcon,
  CursorArrowRaysIcon
} from '@heroicons/react/24/outline';
import { 
  Button, 
  DataTable, 
  WizardForm, 
  FileUpload, 
  Modal, 
  ModalBody, 
  ModalFooter,
  ConfirmationModal,
  ThemeToggle
} from './components';
import { useTheme } from './contexts/ThemeContext';
import type { DataTableColumn, WizardStep } from './types';

// Sample data for DataTable
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
        value === 'Admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
        value === 'Editor' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
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
        value === 'Active' 
          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      }`}>
        {value}
      </span>
    )
  },
  { key: 'joinDate', label: 'Join Date', sortable: true },
];

// Sample steps for WizardForm
const wizardSteps: WizardStep[] = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Please provide your basic information',
    fields: [
      { name: 'firstName', label: 'First Name', type: 'text', required: true, placeholder: 'Enter your first name' },
      { name: 'lastName', label: 'Last Name', type: 'text', required: true, placeholder: 'Enter your last name' },
      { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'Enter your email address' },
      { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Enter your phone number' },
    ]
  },
  {
    id: 'company',
    title: 'Company Details',
    description: 'Tell us about your organization',
    fields: [
      { name: 'company', label: 'Company Name', type: 'text', required: true, placeholder: 'Enter company name' },
      { name: 'position', label: 'Position', type: 'text', required: true, placeholder: 'Enter your position' },
      { name: 'website', label: 'Website', type: 'url', placeholder: 'Enter company website' },
      { name: 'employees', label: 'Number of Employees', type: 'number', validation: { min: 1, max: 10000 } },
    ]
  },
  {
    id: 'preferences',
    title: 'Preferences',
    description: 'Set your account preferences',
    fields: [
      { name: 'newsletter', label: 'Newsletter Subscription', type: 'text', placeholder: 'Yes/No' },
      { name: 'notifications', label: 'Email Notifications', type: 'text', placeholder: 'Frequency preference' },
      { name: 'timezone', label: 'Timezone', type: 'text', placeholder: 'Select your timezone' },
    ]
  }
];

function App() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const { theme } = useTheme();

  const demos = [
    {
      id: 'datatable',
      title: 'Advanced Data Table',
      description: 'Feature-rich table with sorting, filtering, pagination, and selection',
      icon: TableCellsIcon,
      color: 'bg-blue-500',
    },
    {
      id: 'wizard',
      title: 'Multi-Step Wizard Form',
      description: 'Guided form experience with validation and step navigation',
      icon: CommandLineIcon,
      color: 'bg-green-500',
    },
    {
      id: 'fileupload',
      title: 'Advanced File Upload',
      description: 'Drag & drop file upload with progress tracking and previews',
      icon: DocumentArrowUpIcon,
      color: 'bg-purple-500',
    },
    {
      id: 'modal',
      title: 'Advanced Modal System',
      description: 'Flexible modal system with various sizes and confirmation dialogs',
      icon: WindowIcon,
      color: 'bg-orange-500',
    },
  ];

  const handleWizardComplete = (data: any) => {
    console.log('Wizard completed with data:', data);
    alert('Form completed successfully!');
  };

  const handleFileUpload = (files: File[]) => {
    console.log('Files uploaded:', files);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 theme-transition">
      {/* Header */}
      <header className="surface border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">Advanced Design System</h1>
              <p className="text-secondary mt-1">Production-ready React components for modern applications</p>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-sm font-medium rounded-full">
                {theme === 'dark' ? '🌙' : '☀️'} {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!activeDemo ? (
          <>
            {/* Overview */}
            <div className="mb-12">
              <div className="surface rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">Component Library Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <CursorArrowRaysIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-medium text-primary">Interactive</h3>
                    <p className="text-sm text-secondary">Rich interactions with animations</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-green-600 dark:text-green-400 font-bold">TS</span>
                    </div>
                    <h3 className="font-medium text-primary">Type Safe</h3>
                    <p className="text-sm text-secondary">Full TypeScript support</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-purple-600 dark:text-purple-400 font-bold">📱</span>
                    </div>
                    <h3 className="font-medium text-primary">Responsive</h3>
                    <p className="text-sm text-secondary">Mobile-first design</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <span className="text-orange-600 dark:text-orange-400 font-bold">🎨</span>
                    </div>
                    <h3 className="font-medium text-primary">Themeable</h3>
                    <p className="text-sm text-secondary">Dark & light themes</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Component Demos */}
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-6">Component Demonstrations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {demos.map((demo, index) => (
                  <motion.div
                    key={demo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="surface rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer surface-hover"
                    onClick={() => setActiveDemo(demo.id)}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 ${demo.color} rounded-lg flex items-center justify-center`}>
                          <demo.icon className="w-6 h-6 text-white" />
                        </div>
                        <Button variant="outline" size="sm">
                          View Demo
                        </Button>
                      </div>
                      <h3 className="text-lg font-semibold text-primary mb-2">{demo.title}</h3>
                      <p className="text-secondary">{demo.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Back Button */}
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={() => setActiveDemo(null)}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                }
              >
                Back to Overview
              </Button>
            </div>

            {/* Active Demo */}
            {activeDemo === 'datatable' && (
              <div>
                <h2 className="text-2xl font-semibold text-primary mb-6">Advanced Data Table</h2>
                <DataTable
                  columns={columns}
                  data={sampleData}
                  searchable
                  selectable
                  onRowClick={(row) => console.log('Row clicked:', row)}
                  onSelectionChange={(rows) => console.log('Selection changed:', rows)}
                />
              </div>
            )}

            {activeDemo === 'wizard' && (
              <div>
                <h2 className="text-2xl font-semibold text-primary mb-6">Multi-Step Wizard Form</h2>
                <WizardForm
                  steps={wizardSteps}
                  onComplete={handleWizardComplete}
                  onStepChange={(step) => console.log('Step changed:', step)}
                />
              </div>
            )}

            {activeDemo === 'fileupload' && (
              <div>
                <h2 className="text-2xl font-semibold text-primary mb-6">Advanced File Upload</h2>
                <div className="surface rounded-xl shadow-lg p-8">
                  <FileUpload
                    accept="image/*,application/pdf,.doc,.docx"
                    multiple
                    maxSize={5 * 1024 * 1024}
                    maxFiles={3}
                    onUpload={handleFileUpload}
                    onRemove={(fileId) => console.log('File removed:', fileId)}
                  />
                </div>
              </div>
            )}

            {activeDemo === 'modal' && (
              <div>
                <h2 className="text-2xl font-semibold text-primary mb-6">Advanced Modal System</h2>
                <div className="surface rounded-xl shadow-lg p-8 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button onClick={() => setIsModalOpen(true)}>
                      Open Standard Modal
                    </Button>
                    <Button 
                      variant="warning"
                      onClick={() => setIsConfirmModalOpen(true)}
                    >
                      Open Confirmation
                    </Button>
                    <Button variant="outline">
                      View Documentation
                    </Button>
                  </div>
                </div>

                {/* Standard Modal */}
                <Modal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  title="Advanced Modal Example"
                  size="lg"
                >
                  <ModalBody>
                    <p className="text-secondary mb-4">
                      This is an example of our advanced modal system with dark mode support. It includes:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-secondary">
                      <li>Multiple sizes (sm, md, lg, xl, full)</li>
                      <li>Keyboard navigation (ESC to close)</li>
                      <li>Click outside to close (configurable)</li>
                      <li>Smooth animations with theme transitions</li>
                      <li>Portal rendering</li>
                      <li>Focus management</li>
                      <li>Dark mode support</li>
                    </ul>
                  </ModalBody>
                  <ModalFooter>
                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsModalOpen(false)}>
                      Confirm
                    </Button>
                  </ModalFooter>
                </Modal>

                {/* Confirmation Modal */}
                <ConfirmationModal
                  isOpen={isConfirmModalOpen}
                  onClose={() => setIsConfirmModalOpen(false)}
                  onConfirm={() => console.log('Confirmed!')}
                  title="Confirm Action"
                  message="Are you sure you want to proceed with this action? This cannot be undone."
                  variant="danger"
                  confirmText="Yes, Proceed"
                  cancelText="Cancel"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;