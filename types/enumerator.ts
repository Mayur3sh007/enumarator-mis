export interface Enumerator {
  id: string;
  name: string;
  block?: string;
  district?: string;
}

export type HouseholdSource = 'AI' | 'Manual' | 'Paper';
export type HouseholdStatus = 'Draft' | 'Verified' | 'Pending Docs' | 'Not Eligible';
export type RiskLevel = 'Green' | 'Yellow' | 'Red';

export interface Household {
  id: string;
  name: string;
  age?: number;
  gender?: string;
  phone?: string;
  village: string;
  householdSize?: number;
  source: HouseholdSource;
  status: HouseholdStatus;
  riskLevel?: RiskLevel;
  hasSCCertificate?: boolean;
  aadhaarLast4?: string;
  rationCard?: string;
  occupation?: string;
  incomeBracket?: string;
  housingType?: string;
  hasToilet?: boolean;
  hasElectricity?: boolean;
  needsTraining?: boolean;
  needsLivelihoodSupport?: boolean;
  remarks?: string;
  beneficiaryPhoto?: string;
  housePhoto?: string;
  verificationDecision?: 'Draft' | 'Verified Eligible' | 'Verified Not Eligible';
  notEligibleReason?: string;
}

export type FacilityType = 'Primary School' | 'PHC' | 'Road' | 'Community Center' | 'Other';
export type FacilityCondition = 'Good' | 'Average' | 'Poor';

export interface Facility {
  id: string;
  type: FacilityType;
  name: string;
  village: string;
  locationDescription?: string;
  condition: FacilityCondition;
  photos?: string[];
}

export type FollowUpType = 'Docs Pending' | 'Asset Follow-up' | 'Training Follow-up';

export interface FollowUp {
  id: string;
  householdId: string;
  name: string;
  village: string;
  type: FollowUpType;
  resolved: boolean;
}
