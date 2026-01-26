import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, CheckCircle } from 'lucide-react';
import Button from '../common/Button';

const AudioUploader = ({ onFileSelect, maxSize = 100 * 1024 * 1024 }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setError('');
    
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.file.size > maxSize) {
        setError(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
      } else {
        setError('Invalid file format. Please upload MP3, WAV, M4A, or OGG files.');
      }
      return;
    }
    
    if (acceptedFiles.length > 0) {
      const uploadedFile = acceptedFiles[0];
      setFile(uploadedFile);
      setError('');
    }
  }, [maxSize]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/mpeg': ['.mp3'],
      'audio/wav': ['.wav'],
      'audio/x-m4a': ['.m4a'],
      'audio/ogg': ['.ogg']
    },
    maxSize,
    multiple: false
  });
  
  const removeFile = () => {
    setFile(null);
    setError('');
  };
  
  const handleContinue = () => {
    if (file) {
      onFileSelect(file);
    }
  };
  
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-8">
      {!file ? (
        <div
          {...getRootProps()}
          className={`
            border-4 border-dashed rounded-xl p-8 md:p-12 text-center cursor-pointer
            transition-all duration-300
            ${isDragActive 
              ? 'border-blue-600 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }
          `}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center gap-4">
            <div className={`
              w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center
              ${isDragActive ? 'bg-blue-600' : 'bg-gray-200'}
              transition-colors duration-300
            `}>
              <Upload size={32} className={`md:w-10 md:h-10 ${isDragActive ? 'text-white' : 'text-gray-600'}`} />
            </div>
            
            <div>
              <p className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                {isDragActive ? 'Drop your audio file here' : 'Drag & drop your audio file here'}
              </p>
              <p className="text-sm md:text-base text-gray-600">
                or click to browse files
              </p>
            </div>
            
            <div className="text-xs md:text-sm text-gray-500">
              <p>Supported formats: MP3, WAV, M4A, OGG</p>
              <p>Maximum file size: {maxSize / (1024 * 1024)}MB</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <File size={24} className="md:w-7 md:h-7 text-green-600" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 truncate text-sm md:text-base">
                  {file.name}
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="text-gray-400 hover:text-red-600 transition-colors flex-shrink-0"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <CheckCircle size={20} />
              <span className="font-medium text-sm md:text-base">File uploaded successfully</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full w-full transition-all duration-500"></div>
            </div>
          </div>
          
          {/* Audio Preview */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
            <audio 
              src={URL.createObjectURL(file)} 
              controls 
              className="w-full"
              style={{ height: '48px' }}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={removeFile}
              variant="secondary"
              size="lg"
              fullWidth
            >
              Choose Different File
            </Button>
            <Button
              onClick={handleContinue}
              variant="primary"
              size="lg"
              fullWidth
            >
              Continue →
            </Button>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mt-4 bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm md:text-base">
          {error}
        </div>
      )}
    </div>
  );
};

AudioUploader.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
  maxSize: PropTypes.number
};

export default AudioUploader;