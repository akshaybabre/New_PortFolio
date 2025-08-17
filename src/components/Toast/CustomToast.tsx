import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface CustomToastProps {
  t: any;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

const CustomToast: React.FC<CustomToastProps> = ({ t, message, type, duration = 4000 }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / (duration / 100));
        if (newProgress <= 0) {
          clearInterval(interval);
          return 0;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration]);

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const colors = {
    success: 'from-emerald-500 to-green-500',
    error: 'from-red-500 to-pink-500',
    warning: 'from-amber-500 to-orange-500',
    info: 'from-blue-500 to-indigo-500',
  };

  const Icon = icons[type];

  return (
    <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
      relative bg-gradient-to-r ${colors[type]} text-white px-6 py-4 
      rounded-2xl shadow-2xl backdrop-blur-lg border border-white/20 max-w-md min-w-[300px] overflow-hidden`}>
      
      {/* Main content */}
      <div className="flex items-center gap-3 relative z-10">
        <Icon className="w-6 h-6 flex-shrink-0" />
        <p className="text-sm font-medium flex-1">{message}</p>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="ml-auto hover:scale-110 transition-transform duration-200 p-1 rounded-full hover:bg-white/20"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-white/30 w-full">
        <div 
          className="h-full bg-white/70 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
    </div>
  );
};

export const showToast = {
  success: (message: string, duration?: number) => {
    toast.custom((t) => (
      <CustomToast t={t} message={message} type="success" duration={duration} />
    ), { duration });
  },

  error: (message: string, duration?: number) => {
    toast.custom((t) => (
      <CustomToast t={t} message={message} type="error" duration={duration} />
    ), { duration });
  },

  warning: (message: string, duration?: number) => {
    toast.custom((t) => (
      <CustomToast t={t} message={message} type="warning" duration={duration} />
    ), { duration });
  },

  info: (message: string, duration?: number) => {
    toast.custom((t) => (
      <CustomToast t={t} message={message} type="info" duration={duration} />
    ), { duration });
  }
};

export const CustomToaster = () => {
  return (
    <Toaster
      position="top-right"
      gutter={16}
      containerStyle={{
        top: 80,
        right: 20,
      }}
      toastOptions={{
        style: {
          background: 'transparent',
          boxShadow: 'none',
        }
      }}
    />
  );
};