'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useEnumerator } from '@/contexts/EnumeratorContext';
import { EnumeratorLayout } from '@/components/enumerator/EnumeratorLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { StatusBadge } from '@/components/enumerator/StatusBadge';
import { SourceBadge } from '@/components/enumerator/SourceBadge';
import { ArrowLeft } from 'lucide-react';
import { Household } from '@/types/enumerator';

export default function HouseholdDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { enumerator, getHousehold, updateHousehold } = useEnumerator();
  const [household, setHousehold] = useState<Household | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!enumerator) {
      router.push('/enumerator/login');
      return;
    }

    const id = params.id as string;
    const h = getHousehold(id);
    if (h) {
      setHousehold(h);
    } else {
      router.push('/enumerator/dashboard');
    }
  }, [enumerator, params.id, getHousehold, router]);

  if (!household) {
    return null;
  }

  const handleSave = () => {
    updateHousehold(household.id, household);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <EnumeratorLayout>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{household.name}</h1>
              <p className="text-gray-600">{household.village}</p>
            </div>
            <div className="flex gap-2">
              <SourceBadge source={household.source} />
              <StatusBadge status={household.status} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={household.name}
                  onChange={(e) =>
                    setHousehold({ ...household, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={household.age || ''}
                  onChange={(e) =>
                    setHousehold({ ...household, age: parseInt(e.target.value) })
                  }
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <select
                  id="gender"
                  value={household.gender || ''}
                  onChange={(e) =>
                    setHousehold({ ...household, gender: e.target.value })
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={household.phone || ''}
                  onChange={(e) =>
                    setHousehold({ ...household, phone: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="village">Village</Label>
                <Input
                  id="village"
                  value={household.village}
                  onChange={(e) =>
                    setHousehold({ ...household, village: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="householdSize">Household Size</Label>
                <Input
                  id="householdSize"
                  type="number"
                  value={household.householdSize || ''}
                  onChange={(e) =>
                    setHousehold({
                      ...household,
                      householdSize: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Eligibility & IDs
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="scCert"
                  checked={household.hasSCCertificate || false}
                  onCheckedChange={(checked) =>
                    setHousehold({
                      ...household,
                      hasSCCertificate: checked === true,
                    })
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
                  value={household.aadhaarLast4 || ''}
                  onChange={(e) =>
                    setHousehold({ ...household, aadhaarLast4: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="rationCard">Ration Card Number</Label>
                <Input
                  id="rationCard"
                  value={household.rationCard || ''}
                  onChange={(e) =>
                    setHousehold({ ...household, rationCard: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Economic & Social
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  value={household.occupation || ''}
                  onChange={(e) =>
                    setHousehold({ ...household, occupation: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="income">Income Bracket</Label>
                <select
                  id="income"
                  value={household.incomeBracket || ''}
                  onChange={(e) =>
                    setHousehold({ ...household, incomeBracket: e.target.value })
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
                  value={household.housingType || ''}
                  onChange={(e) =>
                    setHousehold({ ...household, housingType: e.target.value })
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
                  checked={household.hasToilet || false}
                  onCheckedChange={(checked) =>
                    setHousehold({ ...household, hasToilet: checked === true })
                  }
                />
                <Label htmlFor="toilet" className="cursor-pointer">
                  Has Toilet
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="electricity"
                  checked={household.hasElectricity || false}
                  onCheckedChange={(checked) =>
                    setHousehold({ ...household, hasElectricity: checked === true })
                  }
                />
                <Label htmlFor="electricity" className="cursor-pointer">
                  Has Electricity
                </Label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Verification</h2>
            <div className="space-y-4">
              <div>
                <Label className="mb-3 block">Verification Decision</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="draft"
                      name="decision"
                      value="Draft"
                      checked={household.verificationDecision === 'Draft'}
                      onChange={(e) =>
                        setHousehold({
                          ...household,
                          verificationDecision: e.target.value as any,
                          status: 'Draft',
                        })
                      }
                      className="w-4 h-4"
                    />
                    <Label htmlFor="draft" className="cursor-pointer">
                      Keep as Draft
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="eligible"
                      name="decision"
                      value="Verified Eligible"
                      checked={household.verificationDecision === 'Verified Eligible'}
                      onChange={(e) =>
                        setHousehold({
                          ...household,
                          verificationDecision: e.target.value as any,
                          status: 'Verified',
                        })
                      }
                      className="w-4 h-4"
                    />
                    <Label htmlFor="eligible" className="cursor-pointer">
                      Mark as Verified Eligible
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="notEligible"
                      name="decision"
                      value="Verified Not Eligible"
                      checked={
                        household.verificationDecision === 'Verified Not Eligible'
                      }
                      onChange={(e) =>
                        setHousehold({
                          ...household,
                          verificationDecision: e.target.value as any,
                          status: 'Not Eligible',
                        })
                      }
                      className="w-4 h-4"
                    />
                    <Label htmlFor="notEligible" className="cursor-pointer">
                      Mark as Verified Not Eligible
                    </Label>
                  </div>
                </div>
              </div>

              {household.verificationDecision === 'Verified Not Eligible' && (
                <div>
                  <Label htmlFor="notEligibleReason">Reason for Not Eligible</Label>
                  <Textarea
                    id="notEligibleReason"
                    value={household.notEligibleReason || ''}
                    onChange={(e) =>
                      setHousehold({
                        ...household,
                        notEligibleReason: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea
                  id="remarks"
                  value={household.remarks || ''}
                  onChange={(e) =>
                    setHousehold({ ...household, remarks: e.target.value })
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
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSave} className="flex-1">
              {saved ? 'Saved!' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </EnumeratorLayout>
  );
}
