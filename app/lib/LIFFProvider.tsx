// components/LIFFProvider.tsx
'use client';

import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import liff from '@line/liff';

interface LIFFProviderProps {
  children: ReactNode;
}

const LIFFProvider: React.FC<LIFFProviderProps> = ({ children }) => {
  const liffId = process.env.NEXT_PUBLIC_LIFF_ID as string;
  const router = useRouter();

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        const liffModule = (await import('@line/liff')).default;
        await liffModule.init({ liffId });

        if (!liffModule.isLoggedIn()) {
          router.push('/login');
        } else {
          const profile = await liffModule.getProfile();
          console.log('Profile:', profile);
        }
      } catch (error) {
        console.error('LIFF init error', (error as Error).message);
      }
    };

    if (liffId) {
      initializeLiff();
    } else {
      console.error('LIFF ID is not set');
    }
  }, [liffId, router]);

  return <>{children}</>;
};

export default LIFFProvider;
