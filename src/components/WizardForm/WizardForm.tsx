import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { WizardStep, BaseComponentProps } from '../../types';
import { Button } from '../Button/Button';

interface WizardFormProps extends BaseComponentProps {
  steps: WizardStep[];
  onComplete: (data: Record<string, any>) => void;
  onStepChange?: (step: number) => void;
}

export const WizardForm: React.FC<WizardFormProps> = ({
  steps,
  onComplete,
  onStepChange,
  className,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [formData, setFormData] = useState<Record<string, any>>({});

  const { register, handleSubmit, formState: { errors }, trigger, reset } = useForm({
    mode: 'onChange',
  });

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const validateCurrentStep = async () => {
    const stepFieldNames = currentStepData.fields.map(field => field.name);
    return await trigger(stepFieldNames);
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      if (isLastStep) {
        handleSubmit(onComplete)();
      } else {
        setCurrentStep(prev => prev + 1);
        onStepChange?.(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
      onStepChange?.(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex < currentStep || completedSteps.has(stepIndex)) {
      setCurrentStep(stepIndex);
      onStepChange?.(stepIndex);
    }
  };

  const getFieldValidation = (field: any) => {
    const validation: any = {
      required: field.required ? `${field.label} is required` : false,
    };

    if (field.validation) {
      if (field.validation.pattern) {
        validation.pattern = {
          value: field.validation.pattern,
          message: `Invalid ${field.label.toLowerCase()} format`,
        };
      }
      if (field.validation.minLength) {
        validation.minLength = {
          value: field.validation.minLength,
          message: `${field.label} must be at least ${field.validation.minLength} characters`,
        };
      }
      if (field.validation.maxLength) {
        validation.maxLength = {
          value: field.validation.maxLength,
          message: `${field.label} must be no more than ${field.validation.maxLength} characters`,
        };
      }
      if (field.validation.min) {
        validation.min = {
          value: field.validation.min,
          message: `${field.label} must be at least ${field.validation.min}`,
        };
      }
      if (field.validation.max) {
        validation.max = {
          value: field.validation.max,
          message: `${field.label} must be no more than ${field.validation.max}`,
        };
      }
    }

    return validation;
  };

  return (
    <div className={clsx('surface rounded-xl shadow-lg overflow-hidden', className)}>
      {/* Step Indicator */}
      <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex items-center cursor-pointer"
              onClick={() => handleStepClick(index)}
            >
              <div className="flex items-center">
                <div
                  className={clsx(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                    index === currentStep
                      ? 'bg-blue-600 text-white'
                      : completedSteps.has(index)
                      ? 'bg-green-600 text-white'
                      : index < currentStep
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-500'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                  )}
                >
                  {completedSteps.has(index) ? (
                    <CheckIcon className="w-6 h-6" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="ml-3">
                  <div
                    className={clsx(
                      'text-sm font-medium',
                      index === currentStep
                        ? 'text-blue-600 dark:text-blue-400'
                        : completedSteps.has(index)
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-secondary'
                    )}
                  >
                    {step.title}
                  </div>
                  {step.description && (
                    <div className="text-xs text-muted">{step.description}</div>
                  )}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={clsx(
                    'flex-1 h-0.5 mx-4 transition-colors',
                    completedSteps.has(index) ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-primary mb-2">
                {currentStepData.title}
              </h2>
              {currentStepData.description && (
                <p className="text-secondary">{currentStepData.description}</p>
              )}
            </div>

            <form onSubmit={handleSubmit(onComplete)} className="space-y-6">
              {currentStepData.fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-primary mb-2">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <input
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    {...register(field.name, getFieldValidation(field))}
                    className={clsx(
                      'input-field',
                      errors[field.name] && 'border-red-300 dark:border-red-600 focus:ring-red-500'
                    )}
                  />
                  {errors[field.name] && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors[field.name]?.message as string}
                    </p>
                  )}
                </div>
              ))}
            </form>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="px-8 py-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={isFirstStep}
          leftIcon={<ChevronLeftIcon className="w-4 h-4" />}
        >
          Previous
        </Button>
        <Button
          variant="primary"
          onClick={handleNext}
          rightIcon={
            isLastStep ? 
              <CheckIcon className="w-4 h-4" /> : 
              <ChevronRightIcon className="w-4 h-4" />
          }
        >
          {isLastStep ? 'Complete' : 'Next'}
        </Button>
      </div>
    </div>
  );
};