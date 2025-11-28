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
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Household } from '@/types/enumerator';

export default function NewHouseholdPage() {
  const router = useRouter();
  const { enumerator, addHousehold } = useEnumerator();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Household>>({
    source: 'Manual',
    status: 'Draft',
  });

  useEffect(() => {
    if (!enumerator) {
      router.push('/enumerator/login');
    }
  }, [enumerator, router]);

  if (!enumerator) {
    return null;
  }

  const handleSave = (status: 'Draft' | 'Verified') => {
    const newHousehold: Household = {
      id: Date.now().toString(),
      name: formData.name || '',
      age: formData.age,
      gender: formData.gender,
      phone: formData.phone,
      village: formData.village || '',
      householdSize: formData.householdSize,
      source: 'Manual',
      status: status === 'Draft' ? 'Draft' : 'Verified',
      hasSCCertificate: formData.hasSCCertificate,
      aadhaarLast4: formData.aadhaarLast4,
      rationCard: formData.rationCard,
      occupation: formData.occupation,
      incomeBracket: formData.incomeBracket,
      housingType: formData.housingType,
      hasToilet: formData.hasToilet,
      hasElectricity: formData.hasElectricity,
      needsTraining: formData.needsTraining,
      needsLivelihoodSupport: formData.needsLivelihoodSupport,
      remarks: formData.remarks,
      verificationDecision: status === 'Draft' ? 'Draft' : 'Verified Eligible',
    };

    addHousehold(newHousehold);
    router.push('/enumerator/dashboard');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Basic Information
            </h2>
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, age: parseInt(e.target.value) })
                  }
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <select
                  id="gender"
                  value={formData.gender || ''}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="village">Village *</Label>
              <Input
                id="village"
                value={formData.village || ''}
                onChange={(e) =>
                  setFormData({ ...formData, village: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="householdSize">Household Size</Label>
              <Input
                id="householdSize"
                type="number"
                value={formData.householdSize || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    householdSize: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Eligibility & IDs
            </h2>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="scCert"
                checked={formData.hasSCCertificate || false}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, hasSCCertificate: checked === true })
                }
              />
              <Label htmlFor="scCert" className="cursor-pointer">
                Has SC Certificate
              </Label>
            </div>
            <div>
              <Label htmlFor="aadhaar">Aadhaar Last 4 Digits</Label>
              <Input
                id="aadhaar"
                maxLength={4}
                value={formData.aadhaarLast4 || ''}
                onChange={(e) =>
                  setFormData({ ...formData, aadhaarLast4: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="rationCard">Ration Card Number</Label>
              <Input
                id="rationCard"
                value={formData.rationCard || ''}
                onChange={(e) =>
                  setFormData({ ...formData, rationCard: e.target.value })
                }
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Economic & Social
            </h2>
            <div>
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                value={formData.occupation || ''}
                onChange={(e) =>
                  setFormData({ ...formData, occupation: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="income">Income Bracket</Label>
              <select
                id="income"
                value={formData.incomeBracket || ''}
                onChange={(e) =>
                  setFormData({ ...formData, incomeBracket: e.target.value })
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="">Select</option>
                <option value="< 50,000">Less than 50,000</option>
                <option value="50,000 - 1,00,000">50,000 - 1,00,000</option>
                <option value="1,00,000 - 2,00,000">1,00,000 - 2,00,000</option>
                <option value="> 2,00,000">Above 2,00,000</option>
              </select>
            </div>
            <div>
              <Label htmlFor="housing">Housing Type</Label>
              <select
                id="housing"
                value={formData.housingType || ''}
                onChange={(e) =>
                  setFormData({ ...formData, housingType: e.target.value })
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="">Select</option>
                <option value="Pucca">Pucca</option>
                <option value="Semi-Pucca">Semi-Pucca</option>
                <option value="Kaccha">Kaccha</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="toilet"
                checked={formData.hasToilet || false}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, hasToilet: checked === true })
                }
              />
              <Label htmlFor="toilet" className="cursor-pointer">
                Has Toilet
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="electricity"
                checked={formData.hasElectricity || false}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, hasElectricity: checked === true })
                }
              />
              <Label htmlFor="electricity" className="cursor-pointer">
                Has Electricity
              </Label>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Needs & Verification
            </h2>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="training"
                checked={formData.needsTraining || false}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, needsTraining: checked === true })
                }
              />
              <Label htmlFor="training" className="cursor-pointer">
                Needs Training
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="livelihood"
                checked={formData.needsLivelihoodSupport || false}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    needsLivelihoodSupport: checked === true,
                  })
                }
              />
              <Label htmlFor="livelihood" className="cursor-pointer">
                Needs Livelihood Support
              </Label>
            </div>
            <div>
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                value={formData.remarks || ''}
                onChange={(e) =>
                  setFormData({ ...formData, remarks: e.target.value })
                }
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="beneficiaryPhoto">Beneficiary Photo</Label>
              <Input id="beneficiaryPhoto" type="file" accept="image/*" />
              <p className="text-xs text-gray-500 mt-1">No actual upload</p>
            </div>
            <div>
              <Label htmlFor="housePhoto">House Photo</Label>
              <Input id="housePhoto" type="file" accept="image/*" />
              <p className="text-xs text-gray-500 mt-1">No actual upload</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <EnumeratorLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-gray-900">New Household</h1>
            <div className="text-sm text-gray-600">
              Step {step} of 4
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full ${
                  s <= step ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {renderStep()}

          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}

            {step < 4 ? (
              <Button onClick={() => setStep(step + 1)} className="flex-1 gap-2">
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <div className="flex gap-3 flex-1">
                <Button
                  variant="outline"
                  onClick={() => handleSave('Draft')}
                  className="flex-1"
                >
                  Save as Draft
                </Button>
                <Button onClick={() => handleSave('Verified')} className="flex-1">
                  Save as Verified
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </EnumeratorLayout>
  );
}
