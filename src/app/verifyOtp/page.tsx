'use client';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Page() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const router = useRouter();
  const { data: session, status } = useSession();

  const email = session?.user?.email;
  const otpUserId = session?.user?.otpUserId;
  const isVerified = session?.user?.isVerified;

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/signin');
    } else if (isVerified) {
      router.replace('/user');
    }
  }, [session, isVerified, status, router]);

  useEffect(() => {
    if (email && otpUserId && !isVerified) {
      const sendOtp = async () => {
        try {
          await axios.post('/api/send-otp', { email, userId: otpUserId });
          toast.success('OTP sent to your email');
        } catch {
          toast.error('Failed to send OTP');
        }
      };

      sendOtp();
    }
  }, [email, otpUserId, isVerified]);

  const handleVerify = async () => {
    try {
      const res = await axios.post('/api/verify-otp', {
        userId: otpUserId,
        enteredOtp: otp.join(''),
      });
      if (res.data.success) {
        toast.success('OTP verified');
        router.push('/user');
      } else {
        toast.error('Invalid or expired OTP');
      }
    } catch {
      toast.error('Verification failed');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/\D/, ''); // Only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  if (status === 'loading') {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center gap-6 p-10 min-h-screen justify-center bg-gradient-to-tr from-[#1a1338] to-[#2c254d] text-white">
      <h2 className="text-xl font-semibold">Verify OTP sent to {email}</h2>

      {/* OTP Input Boxes */}
      <div className="flex gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              if (el) inputRefs.current[index] = el;
            }}
            type="text"
            maxLength={1}
            value={otp[index] || ''}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-14 text-center text-xl border border-purple-400 rounded bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        ))}
      </div>

      <button
        onClick={handleVerify}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded shadow"
      >
        Verify
      </button>

      <button
        onClick={() => axios.post('/api/send-otp', { email, userId: otpUserId })}
        className="text-sm text-purple-300 underline hover:text-purple-400 mt-2"
      >
        Resend OTP
      </button>
    </div>
  );
}
