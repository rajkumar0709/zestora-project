import type { Diet, Goal } from "@/data/meals";

export interface Profile {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  diet: Diet;
  goal: Goal;
}

const KEY = "zestora_profile";

export function getProfile(): Profile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Profile) : null;
  } catch {
    return null;
  }
}

export function saveProfile(p: Profile) {
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function clearProfile() {
  localStorage.removeItem(KEY);
}
