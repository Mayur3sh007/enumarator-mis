'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useEnumerator } from '@/contexts/EnumeratorContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function EnumeratorLoginPage() {
  const router = useRouter();
  const { enumerator, setEnumerator } = useEnumerator();
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    block: '',
    district: '',
  });

  useEffect(() => {
    if (enumerator) {
      router.push('/enumerator/dashboard');
    }
  }, [enumerator, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.id && formData.name) {
      setEnumerator({
        id: formData.id,
        name: formData.name,
        block: formData.block || undefined,
        district: formData.district || undefined,
      });
      router.push('/enumerator/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            PM-AJAY Enumerator App
          </h1>
          <p className="text-sm text-gray-600">Enter your details to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="id">Enumerator ID *</Label>
            <Input
              id="id"
              type="text"
              placeholder="ENM001"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="block">Block</Label>
            <Input
              id="block"
              type="text"
              placeholder="Block name"
              value={formData.block}
              onChange={(e) => setFormData({ ...formData, block: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="district">District</Label>
            <Input
              id="district"
              type="text"
              placeholder="District name"
              value={formData.district}
              onChange={(e) =>
                setFormData({ ...formData, district: e.target.value })
              }
            />
          </div>

          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}
