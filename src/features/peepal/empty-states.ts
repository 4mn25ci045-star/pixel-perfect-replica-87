export type EmptyStateKey =
  | "routes"
  | "gps"
  | "liveData"
  | "crowd"
  | "records"
  | "notifications";

const emptyMessages: Record<EmptyStateKey, string> = {
  routes: "No verified route information available.",
  gps: "Waiting for real GPS signal.",
  liveData: "Live data unavailable.",
  crowd: "Crowd information unavailable.",
  records: "No records available.",
  notifications: "No service notifications available.",
};

export function getEmptyStateMessage(key: EmptyStateKey): string {
  return emptyMessages[key];
}