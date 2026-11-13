export type UserRole = "passenger" | "student" | "driver" | "administrator";

export interface User {
  id: string;
  role: UserRole;
  email: string;
  phoneNumber?: string;
  displayName?: string;
  avatarUrl?: string;
}

export interface Bus {
  id: string;
  busNumber: string;
  routeId: string;
  destination: string;
}

export interface Route {
  id: string;
  routeNumber: string;
  originStopId: string;
  destinationStopId: string;
  direction: string;
  busIds: string[];
}

export interface Stop {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export interface BusLocation {
  busId: string;
  latitude: number;
  longitude: number;
  updatedAt: string;
}

export interface Driver {
  id: string;
  displayName: string;
  assignedBusId?: string;
  assignedRouteId?: string;
  gpsDeviceId?: string;
  lastLocationUpdate?: string;
}

export interface StudentPass {
  id: string;
  studentId: string;
  status: "pending" | "verified" | "rejected" | "expired";
  validFrom?: string;
  validUntil?: string;
  qrCodeValue?: string;
}

export interface CrowdStatus {
  busId: string;
  level: "low" | "medium" | "high";
  source: "verified" | "passenger-reported";
  updatedAt: string;
}

export interface ServiceNotification {
  id: string;
  title: string;
  message: string;
  publishedAt: string;
}

export interface TransitDataSource {
  listBuses(): Promise<Bus[]>;
  listRoutes(): Promise<Route[]>;
  listStops(): Promise<Stop[]>;
  listBusLocations(): Promise<BusLocation[]>;
  listCrowdStatuses(): Promise<CrowdStatus[]>;
  listNotifications(): Promise<ServiceNotification[]>;
}