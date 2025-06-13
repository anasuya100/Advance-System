# Advanced Design System

A production-ready React component library built with TypeScript, Tailwind CSS, and Framer Motion featuring comprehensive dark/light theme support.

## 🚀 Features

- **5 Advanced Components**: DataTable, WizardForm, FileUpload, Modal System, and Button
- **Dark/Light Theme System**: Automatic system preference detection with manual toggle
- **TypeScript First**: Full type safety and IntelliSense support
- **Modern Animations**: Smooth interactions with Framer Motion
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Storybook Documentation**: Interactive component documentation
- **Design Tokens**: Consistent design system with customizable tokens
- **Production Ready**: Optimized for real-world applications

## 🎨 Theme System

### Features
- **Automatic Detection**: Respects system preference (prefers-color-scheme)
- **Manual Toggle**: Theme toggle component for user control
- **Persistent Storage**: Remembers user preference in localStorage
- **Smooth Transitions**: Animated theme switching with CSS transitions
- **Component Support**: All components fully support both themes

### Usage
```tsx
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle';

// Wrap your app with ThemeProvider
<ThemeProvider>
  <App />
</ThemeProvider>

// Use the theme toggle component
<ThemeToggle size="md" />

// Access theme in components
const { theme, toggleTheme, setTheme } = useTheme();
```

## 📦 Components

### 1. Advanced Data Table
- Sorting, filtering, and pagination
- Row selection and bulk actions
- Custom cell renderers
- Loading and empty states
- Dark mode support
- Fully accessible

### 2. Multi-Step Wizard Form
- Form validation with react-hook-form
- Step navigation and progress indicator
- Conditional step validation
- Mobile-responsive design
- Theme-aware styling

### 3. Advanced File Upload
- Drag & drop interface
- File type validation
- Progress tracking
- Image previews
- Multiple file support
- Dark mode compatible

### 4. Advanced Modal System
- Multiple sizes (sm, md, lg, xl, full)
- Confirmation dialogs
- Keyboard navigation
- Portal rendering
- Focus management
- Theme transitions

### 5. Button Component
- Multiple variants and sizes
- Loading and disabled states
- Icon support
- Full accessibility
- Theme-aware colors

### 6. Theme Toggle
- Smooth animations
- Multiple sizes
- System preference detection
- Accessible controls

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first CSS framework with dark mode
- **Framer Motion** - Production-ready animations
- **Storybook** - Component documentation and testing
- **Vite** - Fast build tool and dev server

## 🎨 Design System

The design system includes:

- **Color Palette**: Primary, secondary, accent, and semantic colors with dark variants
- **Typography**: Inter font with consistent scale
- **Spacing**: 8px grid system
- **Shadows**: Elevation system for depth
- **Border Radius**: Consistent corner radius
- **Animations**: Smooth transitions and micro-interactions
- **Theme Support**: Comprehensive dark/light mode implementation

## 📖 Usage

Each component is designed to be:
- **Composable**: Work well together
- **Customizable**: Accept custom props and styling
- **Accessible**: Follow WCAG guidelines
- **Performant**: Optimized for production use
- **Theme-aware**: Support both light and dark modes

## 🌙 Dark Mode Implementation

### CSS Classes
- Uses Tailwind's `dark:` prefix for dark mode styles
- Automatic class switching on `<html>` element
- Smooth transitions between themes

### Color System
- Semantic color tokens that adapt to theme
- Consistent contrast ratios in both modes
- Accessible color combinations

### Component Integration
- All components include dark mode variants
- Theme-aware hover and focus states
- Consistent visual hierarchy across themes

## 🧪 Testing

The components include:
- TypeScript type checking
- Storybook visual testing
- Accessibility testing
- Cross-browser compatibility
- Theme switching validation

## 📱 Responsive Design

All components are built with mobile-first responsive design:
- Touch-friendly interactions
- Adaptive layouts
- Optimized for all screen sizes
- Theme consistency across devices

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run Storybook
npm run storybook

# Build for production
npm run build
```

## 📝 Documentation

Component documentation is available in Storybook with:
- Interactive examples
- Props documentation
- Usage guidelines
- Design tokens reference
- Theme switching demos

This design system demonstrates production-ready React components suitable for enterprise applications, with a focus on developer experience, accessibility, modern design patterns, and comprehensive theme support.
This is a cool screenshot:
## Add some cool ScreenShots
![Screenshot](assets/screenshot1.png)

![Screenshot](assets/screenshot2.png)

![Screenshot](assets/screenshot3.png)

![Screenshot](assets/screenshot4.png)

![Screenshot](assets/screenshot5.png)