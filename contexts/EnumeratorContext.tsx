'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Enumerator, Household, Facility, FollowUp } from '@/types/enumerator';
import { dummyHouseholds, dummyFacilities, dummyFollowUps } from '@/lib/dummy-data';

interface EnumeratorContextType {
  enumerator: Enumerator | null;
  setEnumerator: (enumerator: Enumerator | null) => void;
  households: Household[];
  addHousehold: (household: Household) => void;
  updateHousehold: (id: string, updates: Partial<Household>) => void;
  getHousehold: (id: string) => Household | undefined;
  facilities: Facility[];
  updateFacility: (id: string, updates: Partial<Facility>) => void;
  getFacility: (id: string) => Facility | undefined;
  followUps: FollowUp[];
  resolveFollowUp: (id: string) => void;
}

const EnumeratorContext = createContext<EnumeratorContextType | undefined>(undefined);

export function EnumeratorProvider({ children }: { children: ReactNode }) {
  const [enumerator, setEnumerator] = useState<Enumerator | null>(null);
  const [households, setHouseholds] = useState<Household[]>(dummyHouseholds);
  const [facilities, setFacilities] = useState<Facility[]>(dummyFacilities);
  const [followUps, setFollowUps] = useState<FollowUp[]>(dummyFollowUps);

  const addHousehold = (household: Household) => {
    setHouseholds((prev) => [...prev, household]);
  };

  const updateHousehold = (id: string, updates: Partial<Household>) => {
    setHouseholds((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...updates } : h))
    );
  };

  const getHousehold = (id: string) => {
    return households.find((h) => h.id === id);
  };

  const updateFacility = (id: string, updates: Partial<Facility>) => {
    setFacilities((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  };

  const getFacility = (id: string) => {
    return facilities.find((f) => f.id === id);
  };

  const resolveFollowUp = (id: string) => {
    setFollowUps((prev) =>
      prev.map((f) => (f.id === id ? { ...f, resolved: true } : f))
    );
  };

  return (
    <EnumeratorContext.Provider
      value={{
        enumerator,
        setEnumerator,
        households,
        addHousehold,
        updateHousehold,
        getHousehold,
        facilities,
        updateFacility,
        getFacility,
        followUps,
        resolveFollowUp,
      }}
    >
      {children}
    </EnumeratorContext.Provider>
  );
}

export function useEnumerator() {
  const context = useContext(EnumeratorContext);
  if (context === undefined) {
    throw new Error('useEnumerator must be used within an EnumeratorProvider');
  }
  return context;
}
