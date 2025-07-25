import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const LoadingScreen = ({ onLoadComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState('Initializing Solar System...');
  const { currentTheme } = useTheme();
  
  // Default color fallbacks
  const background = currentTheme?.background || 'linear-gradient(to bottom, #000428, #004e92)';
  const textPrimary = currentTheme?.textPrimary || '#ffffff';
  const textSecondary = currentTheme?.textSecondary || '#cccccc';
  const border = currentTheme?.border || 'rgba(255, 255, 255, 0.2)';
  
  useEffect(() => {
    const loadingStages = [
      'Initializing Solar System...',
      'Generating Planet Textures...',
      'Loading 3D Components...',
      'Optimizing Performance...',
      'Preparing Orbital Mechanics...',
      'Almost Ready!'
    ];
    
    let currentStage = 0;
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 8; // Smoother progress
        
        // Update loading stage based on progress
        const stageIndex = Math.floor((newProgress / 100) * loadingStages.length);
        if (stageIndex !== currentStage && stageIndex < loadingStages.length) {
          currentStage = stageIndex;
          setLoadingStage(loadingStages[currentStage]);
        }
        
        if (newProgress >= 100) {
          clearInterval(timer);
          setLoadingStage('Complete!');
          setTimeout(() => onLoadComplete(), 300);
          return 100;
        }
        return newProgress;
      });
    }, 80); // Optimized interval
    
    return () => clearInterval(timer);
  }, [onLoadComplete]);
  
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: background }}
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto flex items-center justify-center text-6xl mb-4">
            🌟
          </div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: textPrimary }}>
            Alex Cosmos
          </h1>
          <p style={{ color: textSecondary }}>
            {loadingStage}
          </p>
        </motion.div>
        
        <div className="w-64 h-3 rounded-full overflow-hidden border" style={{ backgroundColor: border, borderColor: border }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${loadingProgress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
          </motion.div>
        </div>
        
        <p className="mt-4" style={{ color: textSecondary }}>
          {Math.round(loadingProgress)}%
        </p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;