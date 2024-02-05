"use client"
import React, { useState } from 'react';
import '@/styles/styles.layout.css';

const StorageBar: React.FC = () => {
  const [storage, setStorage] = useState('150');
  const [usedStorage, setUsedStorage] = useState('115');

  return (
    <div className='d-grid justify-content-center m-2'>
      <div className='storage' style={{ width: `${storage}px` }}>
        <div className='storage usedStorage' style={{ width: `${usedStorage}px` }}></div>
      </div>
      <p className='text-white small text-center'>{usedStorage}GB/{storage}GB</p>
    </div>
  );
};

export default StorageBar;
