type StatusesKeys = "OPEN" | "DISPATCHED" | "RESOLVED";

export interface Geocode {
  lat: number;
  lng: number;
}

export type CallData = {
  total_price: any;
  coordinates: { lat: any; lng: any };
  items: any;
  key: string;
  callSid: string;
  streamSid: string;
  name: string;
  location?: string;
  geocode?: Geocode;
  phone: string;
  live: boolean;
  status: StatusesKeys;
  transcript?: string;
  dateCreated: string;
  dateDisconnected?: string;
};
