// src/features/user-management/mock/mockData.ts
// ─────────────────────────────────────────────────────────────────────────────
// Static mock data for UI development.
// Replace with real RTK Query hooks when APIs are ready.
// Pattern: export the same shape your API will return { items, total }
// ─────────────────────────────────────────────────────────────────────────────

// ── Users ─────────────────────────────────────────────────────────────────────

export interface MockUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "admin" | "manager" | "operator" | "viewer";
  status: "active" | "inactive" | "banned" | "pending";
  createdAt: string;
}

export const MOCK_USERS: MockUser[] = [
  { id: "u1",  firstName: "Niraj",    lastName: "Joshi",    email: "niraj.joshi@asnd.com",    phone: "+91 98765 43210", role: "admin",    status: "active",   createdAt: "2024-01-15T09:00:00Z" },
  { id: "u2",  firstName: "Priya",    lastName: "Sharma",   email: "priya.sharma@asnd.com",   phone: "+91 91234 56789", role: "manager",  status: "active",   createdAt: "2024-02-10T10:30:00Z" },
  { id: "u3",  firstName: "Rahul",    lastName: "Verma",    email: "rahul.verma@asnd.com",    phone: "+91 99887 76655", role: "operator", status: "pending",  createdAt: "2024-03-05T08:15:00Z" },
  { id: "u4",  firstName: "Sneha",    lastName: "Patil",    email: "sneha.patil@asnd.com",    phone: "+91 87654 32109", role: "viewer",   status: "inactive", createdAt: "2024-03-18T14:00:00Z" },
  { id: "u5",  firstName: "Amit",     lastName: "Kulkarni", email: "amit.kulkarni@asnd.com",  phone: "+91 76543 21098", role: "operator", status: "active",   createdAt: "2024-04-01T11:45:00Z" },
  { id: "u6",  firstName: "Deepika",  lastName: "Nair",     email: "deepika.nair@asnd.com",   phone: "+91 65432 10987", role: "manager",  status: "active",   createdAt: "2024-04-22T09:20:00Z" },
  { id: "u7",  firstName: "Vikram",   lastName: "Singh",    email: "vikram.singh@asnd.com",   phone: "+91 54321 09876", role: "viewer",   status: "banned",   createdAt: "2024-05-03T16:00:00Z" },
  { id: "u8",  firstName: "Ananya",   lastName: "Mehta",    email: "ananya.mehta@asnd.com",   phone: "+91 43210 98765", role: "operator", status: "active",   createdAt: "2024-05-19T13:30:00Z" },
  { id: "u9",  firstName: "Suresh",   lastName: "Kumar",    email: "suresh.kumar@asnd.com",   phone: "+91 32109 87654", role: "admin",    status: "active",   createdAt: "2024-06-07T10:00:00Z" },
  { id: "u10", firstName: "Kavitha",  lastName: "Reddy",    email: "kavitha.reddy@asnd.com",  phone: "+91 21098 76543", role: "viewer",   status: "pending",  createdAt: "2024-06-25T15:45:00Z" },
  { id: "u11", firstName: "Arjun",    lastName: "Patel",    email: "arjun.patel@asnd.com",    phone: "+91 10987 65432", role: "operator", status: "active",   createdAt: "2024-07-11T08:00:00Z" },
  { id: "u12", firstName: "Meena",    lastName: "Iyer",     email: "meena.iyer@asnd.com",     phone: "+91 09876 54321", role: "manager",  status: "inactive", createdAt: "2024-07-30T12:15:00Z" },
];

export const MOCK_USERS_RESPONSE = {
  items: MOCK_USERS,
  total: MOCK_USERS.length,
  page: 1,
  pageSize: 20,
};

// ── Orders ────────────────────────────────────────────────────────────────────

export interface MockOrder {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  product: string;
  quantity: number;
  amount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "paid" | "unpaid" | "refunded" | "partial";
  createdAt: string;
  deliveryDate: string | null;
}

export const MOCK_ORDERS: MockOrder[] = [
  { id: "o1",  orderId: "ORD-0001", customerName: "Ravi Shankar",    customerEmail: "ravi@example.com",   product: "Industrial Pump A",  quantity: 2,  amount: 48500,  status: "delivered",  paymentStatus: "paid",     createdAt: "2024-06-01T09:00:00Z", deliveryDate: "2024-06-10T00:00:00Z" },
  { id: "o2",  orderId: "ORD-0002", customerName: "Lakshmi Devi",    customerEmail: "laksh@example.com",  product: "Control Panel X2",   quantity: 1,  amount: 125000, status: "shipped",    paymentStatus: "paid",     createdAt: "2024-06-05T10:00:00Z", deliveryDate: null },
  { id: "o3",  orderId: "ORD-0003", customerName: "Mohan Das",       customerEmail: "mohan@example.com",  product: "Sensor Kit Pro",     quantity: 5,  amount: 22750,  status: "confirmed",  paymentStatus: "partial",  createdAt: "2024-06-08T11:30:00Z", deliveryDate: null },
  { id: "o4",  orderId: "ORD-0004", customerName: "Sunita Roy",      customerEmail: "sunita@example.com", product: "Valve Set B",        quantity: 10, amount: 8900,   status: "pending",    paymentStatus: "unpaid",   createdAt: "2024-06-12T14:00:00Z", deliveryDate: null },
  { id: "o5",  orderId: "ORD-0005", customerName: "Gopal Krishnan",  customerEmail: "gopal@example.com",  product: "Motor Drive Unit",   quantity: 1,  amount: 320000, status: "cancelled",  paymentStatus: "refunded", createdAt: "2024-06-15T09:15:00Z", deliveryDate: null },
  { id: "o6",  orderId: "ORD-0006", customerName: "Fatima Sheikh",   customerEmail: "fatima@example.com", product: "Bearing Assembly",   quantity: 20, amount: 15600,  status: "delivered",  paymentStatus: "paid",     createdAt: "2024-06-18T16:00:00Z", deliveryDate: "2024-06-28T00:00:00Z" },
  { id: "o7",  orderId: "ORD-0007", customerName: "Arun Pillai",     customerEmail: "arun@example.com",   product: "Industrial Pump A",  quantity: 3,  amount: 72750,  status: "shipped",    paymentStatus: "paid",     createdAt: "2024-06-20T10:45:00Z", deliveryDate: null },
  { id: "o8",  orderId: "ORD-0008", customerName: "Preethi Nair",    customerEmail: "preethi@example.com",product: "Sensor Kit Pro",     quantity: 2,  amount: 9100,   status: "confirmed",  paymentStatus: "unpaid",   createdAt: "2024-06-22T13:00:00Z", deliveryDate: null },
];

export const MOCK_ORDERS_RESPONSE = {
  items: MOCK_ORDERS,
  total: MOCK_ORDERS.length,
  page: 1,
  pageSize: 20,
};

// ── Vehicles / Fleet ──────────────────────────────────────────────────────────

export interface MockVehicle {
  id: string;
  regNumber: string;
  driver: string;
  vehicleType: "truck" | "van" | "bike" | "car";
  route: string;
  status: "active" | "idle" | "maintenance" | "offline";
  fuelLevel: number;        // 0–100
  lastLocation: string;
  lastUpdated: string;
  totalKm: number;
}

export const MOCK_VEHICLES: MockVehicle[] = [
  { id: "v1", regNumber: "MH-12-AB-1234", driver: "Ramesh Pawar",   vehicleType: "truck", route: "Mumbai → Pune",    status: "active",      fuelLevel: 72, lastLocation: "Khopoli",      lastUpdated: "2024-07-01T08:30:00Z", totalKm: 124560 },
  { id: "v2", regNumber: "MH-04-CD-5678", driver: "Sunil More",     vehicleType: "van",   route: "Pune → Nashik",    status: "idle",        fuelLevel: 45, lastLocation: "Pune Depot",   lastUpdated: "2024-07-01T07:00:00Z", totalKm: 88230  },
  { id: "v3", regNumber: "KA-05-EF-9012", driver: "Baskar Rao",     vehicleType: "truck", route: "Bangalore → Mysore",status: "maintenance", fuelLevel: 10, lastLocation: "Workshop",     lastUpdated: "2024-06-30T18:00:00Z", totalKm: 203410 },
  { id: "v4", regNumber: "DL-01-GH-3456", driver: "Harish Gupta",   vehicleType: "car",   route: "Delhi → Gurgaon",  status: "active",      fuelLevel: 88, lastLocation: "NH-48",        lastUpdated: "2024-07-01T09:15:00Z", totalKm: 56780  },
  { id: "v5", regNumber: "TN-07-IJ-7890", driver: "Murugan S",      vehicleType: "bike",  route: "Chennai Local",    status: "active",      fuelLevel: 55, lastLocation: "Anna Nagar",   lastUpdated: "2024-07-01T09:00:00Z", totalKm: 34210  },
  { id: "v6", regNumber: "GJ-01-KL-2345", driver: "Bharat Patel",   vehicleType: "van",   route: "Ahmedabad → Surat",status: "offline",     fuelLevel: 0,  lastLocation: "Unknown",      lastUpdated: "2024-06-29T20:00:00Z", totalKm: 178900 },
  { id: "v7", regNumber: "MH-14-MN-6789", driver: "Santosh Kale",   vehicleType: "truck", route: "Pune → Mumbai",    status: "active",      fuelLevel: 60, lastLocation: "Expressway",   lastUpdated: "2024-07-01T08:45:00Z", totalKm: 312000 },
];

export const MOCK_VEHICLES_RESPONSE = {
  items: MOCK_VEHICLES,
  total: MOCK_VEHICLES.length,
  page: 1,
  pageSize: 20,
};