'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useEnumerator } from '@/contexts/EnumeratorContext';
import { EnumeratorLayout } from '@/components/enumerator/EnumeratorLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload } from 'lucide-react';

export default function PaperUploadPage() {
  const router = useRouter();
  const { enumerator, addHousehold } = useEnumerator();
  const [formType, setFormType] = useState('Household');
  const [village, setVillage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Ramesh Singh',
    age: 40,
    gender: 'Male',
    phone: '9876543213',
    householdSize: 4,
    hasSCCertificate: true,
    occupation: 'Farmer',
    remarks: 'Data entered from paper form',
  });

  useEffect(() => {
    if (!enumerator) {
      router.push('/enumerator/login');
    }
  }, [enumerator, router]);

  if (!enumerator) {
    return null;
  }

  const handlePrefill = () => {
    setShowForm(true);
  };

  const handleSave = () => {
    if (formType === 'Household') {
      const newHousehold = {
        id: Date.now().toString(),
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
        phone: formData.phone,
        village,
        householdSize: formData.householdSize,
        source: 'Paper' as const,
        status: 'Draft' as const,
        hasSCCertificate: formData.hasSCCertificate,
        occupation: formData.occupation,
        remarks: formData.remarks,
      };
      addHousehold(newHousehold);
      router.push('/enumerator/dashboard');
    }
  };

  return (
    <EnumeratorLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-xl font-bold text-gray-900 mb-6">
            Paper Form Entry
          </h1>

          <div className="space-y-4">
            <div>
              <Label htmlFor="formType">Form Type</Label>
              <select
                id="formType"
                value={formType}
                onChange={(e) => setFormType(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="Household">Household</option>
                <option value="Facility">Facility</option>
              </select>
            </div>

            <div>
              <Label htmlFor="village">Village</Label>
              <Input
                id="village"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                placeholder="Enter village name"
              />
            </div>

            <div>
              <Label htmlFor="paperPhoto">Upload Photo of Paper Form</Label>
              <Input id="paperPhoto" type="file" accept="image/*" />
              <p className="text-xs text-gray-500 mt-1">
                No actual upload - simulation only
              </p>
            </div>

            <Button onClick={handlePrefill} className="w-full gap-2">
              <Upload className="w-4 h-4" />
              Prefill From Paper
            </Button>
          </div>

          {showForm && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Prefilled Data (Edit as needed)
              </h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: parseInt(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <select
                      id="gender"
                      value={formData.gender}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="householdSize">Household Size</Label>
                  <Input
                    id="householdSize"
                    type="number"
                    value={formData.householdSize}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        householdSize: parseInt(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="scCert"
                    checked={formData.hasSCCertificate}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        hasSCCertificate: checked === true,
                      })
                    }
                  />
                  <Label htmlFor="scCert" className="cursor-pointer">
                    Has SC Certificate
                  </Label>
                </div>

                <div>
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    value={formData.occupation}
                    onChange={(e) =>
                      setFormData({ ...formData, occupation: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="remarks">Remarks</Label>
                  <Textarea
                    id="remarks"
                    value={formData.remarks}
                    onChange={(e) =>
                      setFormData({ ...formData, remarks: e.target.value })
                    }
                    rows={3}
                  />
                </div>

                <Button onClick={handleSave} className="w-full">
                  Save Paper Entry
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </EnumeratorLayout>
  );
}
