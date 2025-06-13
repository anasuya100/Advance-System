import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CloudArrowUpIcon, 
  XMarkIcon, 
  DocumentIcon,
  PhotoIcon,
  VideoCameraIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { FileUploadProps } from '../../types';
import { Button } from '../Button/Button';

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  preview?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept = '*/*',
  multiple = true,
  maxSize = 10 * 1024 * 1024, // 10MB
  maxFiles = 5,
  onUpload,
  onRemove,
  className,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return PhotoIcon;
    if (file.type.startsWith('video/')) return VideoCameraIcon;
    if (file.type.startsWith('audio/')) return MusicalNoteIcon;
    return DocumentIcon;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const simulateUpload = (file: UploadedFile) => {
    const interval = setInterval(() => {
      setUploadedFiles(prev => 
        prev.map(f => 
          f.id === file.id 
            ? { ...f, progress: Math.min(f.progress + 10, 100) }
            : f
        )
      );
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setUploadedFiles(prev => 
        prev.map(f => 
          f.id === file.id 
            ? { ...f, status: 'completed', progress: 100 }
            : f
        )
      );
    }, 2000);
  };

  const processFiles = useCallback((files: FileList) => {
    const fileArray = Array.from(files);
    
    // Check file count limit
    if (uploadedFiles.length + fileArray.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const validFiles = fileArray.filter(file => {
      // Check file size
      if (file.size > maxSize) {
        alert(`File ${file.name} is too large. Maximum size is ${formatFileSize(maxSize)}`);
        return false;
      }
      return true;
    });

    const newFiles: UploadedFile[] = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: 'uploading',
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload for each file
    newFiles.forEach(simulateUpload);

    // Call onUpload callback
    onUpload?.(validFiles);
  }, [uploadedFiles.length, maxFiles, maxSize, onUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  }, [processFiles]);

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    onRemove?.(fileId);
  };

  return (
    <div className={clsx('space-y-6', className)}>
      {/* Upload Area */}
      <div
        className={clsx(
          'border-2 border-dashed rounded-xl p-8 text-center transition-colors theme-transition',
          isDragOver
            ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
        )}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
      >
        <CloudArrowUpIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-primary mb-2">
          Drop files here or click to upload
        </h3>
        <p className="text-secondary mb-4">
          Support for {accept === '*/*' ? 'all file types' : accept}
          <br />
          Maximum file size: {formatFileSize(maxSize)}
          <br />
          Maximum files: {maxFiles}
        </p>
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          Choose Files
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* File List */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <h4 className="text-lg font-medium text-primary">
              Uploaded Files ({uploadedFiles.length})
            </h4>
            {uploadedFiles.map((file) => {
              const Icon = getFileIcon(file.file);
              return (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 theme-transition"
                >
                  {file.preview ? (
                    <img
                      src={file.preview}
                      alt={file.file.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  ) : (
                    <Icon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                  )}
                  
                  <div className="flex-1 ml-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-primary truncate">
                        {file.file.name}
                      </p>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                      >
                        <XMarkIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      </button>
                    </div>
                    <p className="text-xs text-secondary mb-2">
                      {formatFileSize(file.file.size)}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={clsx(
                          'h-2 rounded-full transition-all duration-300',
                          file.status === 'completed'
                            ? 'bg-green-500'
                            : file.status === 'error'
                            ? 'bg-red-500'
                            : 'bg-blue-500'
                        )}
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-secondary">
                        {file.status === 'completed'
                          ? 'Upload completed'
                          : file.status === 'error'
                          ? 'Upload failed'
                          : `${file.progress}% uploaded`
                        }
                      </span>
                      {file.status === 'completed' && (
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                          ✓ Complete
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};