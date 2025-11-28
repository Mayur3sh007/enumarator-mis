'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useEnumerator } from '@/contexts/EnumeratorContext';
import { EnumeratorLayout } from '@/components/enumerator/EnumeratorLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { Facility } from '@/types/enumerator';

export default function FacilityDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { enumerator, getFacility, updateFacility } = useEnumerator();
  const [facility, setFacility] = useState<Facility | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!enumerator) {
      router.push('/enumerator/login');
      return;
    }

    const id = params.id as string;
    const f = getFacility(id);
    if (f) {
      setFacility(f);
    } else {
      router.push('/enumerator/facilities');
    }
  }, [enumerator, params.id, getFacility, router]);

  if (!facility) {
    return null;
  }

  const handleSave = () => {
    updateFacility(facility.id, facility);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <EnumeratorLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-xl font-bold text-gray-900 mb-6">
            Facility Details
          </h1>

          <div className="space-y-4">
            <div>
              <Label htmlFor="type">Type</Label>
              <select
                id="type"
                value={facility.type}
                onChange={(e) =>
                  setFacility({ ...facility, type: e.target.value as any })
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="Primary School">Primary School</option>
                <option value="PHC">PHC</option>
                <option value="Road">Road</option>
                <option value="Community Center">Community Center</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <Label htmlFor="name">Name / Description</Label>
              <Input
                id="name"
                value={facility.name}
                onChange={(e) =>
                  setFacility({ ...facility, name: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="village">Village</Label>
              <Input
                id="village"
                value={facility.village}
                onChange={(e) =>
                  setFacility({ ...facility, village: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="location">Location Description</Label>
              <Textarea
                id="location"
                value={facility.locationDescription || ''}
                onChange={(e) =>
                  setFacility({
                    ...facility,
                    locationDescription: e.target.value,
                  })
                }
                rows={3}
              />
            </div>

            <div>
              <Label className="mb-3 block">Condition</Label>
              <div className="space-y-2">
                {['Good', 'Average', 'Poor'].map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={condition}
                      name="condition"
                      value={condition}
                      checked={facility.condition === condition}
                      onChange={(e) =>
                        setFacility({
                          ...facility,
                          condition: e.target.value as any,
                        })
                      }
                      className="w-4 h-4"
                    />
                    <Label htmlFor={condition} className="cursor-pointer">
                      {condition}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="photos">Photos</Label>
              <Input id="photos" type="file" accept="image/*" multiple />
              <p className="text-xs text-gray-500 mt-1">
                No actual upload - simulation only
              </p>
              {facility.photos && facility.photos.length > 0 && (
                <div className="mt-2 space-y-1">
                  <p className="text-sm font-medium text-gray-700">
                    Existing photos:
                  </p>
                  {facility.photos.map((photo, idx) => (
                    <p key={idx} className="text-sm text-gray-600">
                      • {photo}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <Button onClick={handleSave} className="w-full">
              {saved ? 'Saved!' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </EnumeratorLayout>
  );
}
