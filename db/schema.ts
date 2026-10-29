import { pgTable, serial, integer, text, doublePrecision, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core';



// Auth tables for better-auth
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => new Date(),
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => new Date(),
  ),
});

// Admin authentication tables
export const adminUsers = pgTable('admin_users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  createdAt: text('created_at').notNull(),
});

export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => adminUsers.id),
  token: text('token').notNull().unique(),
  expiresAt: text('expires_at').notNull(),
  createdAt: text('created_at').notNull(),
});

// Shop billing system tables
export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  phone: text('phone').notNull().unique(),
  address: text('address'),
  photoUrls: jsonb('photo_urls'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  rate: doublePrecision('rate').notNull(),
  category: text('category'),
  productType: text('product_type').notNull(),
  stockQuantity: integer('stock_quantity').notNull().default(0),
  minStockLevel: integer('min_stock_level').notNull().default(5),
  totalSales: integer('total_sales').notNull().default(0),
  totalRentals: integer('total_rentals').notNull().default(0),
  lastRestocked: text('last_restocked'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const salesBills = pgTable('sales_bills', {
  id: serial('id').primaryKey(),
  serialNo: integer('serial_no').notNull(),
  billDate: text('bill_date').notNull(),
  customerName: text('customer_name').notNull(),
  customerPhone: text('customer_phone').notNull(),
  customerAddress: text('customer_address'),
  items: jsonb('items').notNull(),
  subtotal: doublePrecision('subtotal').notNull(),
  taxPercentage: doublePrecision('tax_percentage').notNull().default(0),
  taxAmount: doublePrecision('tax_amount').notNull(),
  taxType: text('tax_type'),
  advanceAmount: doublePrecision('advance_amount').notNull(),
  totalAmount: doublePrecision('total_amount').notNull(),
  isPaid: boolean('is_paid').notNull(),
  customerFeedback: text('customer_feedback'),
  shopName: text('shop_name'),
  shopAddress: text('shop_address'),
  shopPhone1: text('shop_phone_1'),
  shopPhone2: text('shop_phone_2'),
  shopLogoUrl: text('shop_logo_url'),
  shopQrUrl: text('shop_qr_url'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const rentalBills = pgTable('rental_bills', {
  id: serial('id').primaryKey(),
  serialNo: integer('serial_no').notNull(),
  fromDate: text('from_date').notNull(),
  toDate: text('to_date'),
  customerName: text('customer_name').notNull(),
  customerPhone: text('customer_phone').notNull(),
  customerAddress: text('customer_address'),
  items: jsonb('items').notNull(),
  subtotal: doublePrecision('subtotal').notNull(),
  transportFees: doublePrecision('transport_fees').notNull(),
  taxPercentage: doublePrecision('tax_percentage').notNull().default(0),
  taxAmount: doublePrecision('tax_amount').notNull(),
  taxType: text('tax_type'),
  advanceAmount: doublePrecision('advance_amount').notNull(),
  totalAmount: doublePrecision('total_amount').notNull(),
  isPaid: boolean('is_paid').notNull(),
  customerFeedback: text('customer_feedback'),
  shopName: text('shop_name'),
  shopAddress: text('shop_address'),
  shopPhone1: text('shop_phone_1'),
  shopPhone2: text('shop_phone_2'),
  shopLogoUrl: text('shop_logo_url'),
  shopQrUrl: text('shop_qr_url'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  billType: text('bill_type').notNull(),
  billId: integer('bill_id').notNull(),
  customerName: text('customer_name').notNull(),
  customerPhone: text('customer_phone').notNull(),
  customerAddress: text('customer_address'),
  items: jsonb('items').notNull(),
  totalAmount: doublePrecision('total_amount').notNull(),
  bookingDate: text('booking_date').notNull(),
  notes: text('notes'),
  status: text('status').notNull().default('booked'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const calendarBookings = pgTable('calendar_bookings', {
  id: serial('id').primaryKey(),
  bookingDate: text('booking_date').notNull(),
  billType: text('bill_type').notNull(),
  customerName: text('customer_name').notNull(),
  customerPhone: text('customer_phone').notNull(),
  notes: text('notes'),
  createdAt: text('created_at').notNull(),
});

export const shopSettings = pgTable('shop_settings', {
  id: serial('id').primaryKey(),
  shopName: text('shop_name').notNull(),
  shopAddress: text('shop_address'),
  phoneNumber1: text('phone_number_1'),
  phoneNumber2: text('phone_number_2'),
  logoUrl: text('logo_url'),
  paymentQrUrl: text('payment_qr_url'),
  language: text('language').notNull().default('english'),
  theme: text('theme').notNull().default('light'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const stockHistory = pgTable('stock_history', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').notNull().references(() => products.id),
  changeType: text('change_type').notNull(),
  quantityChange: integer('quantity_change').notNull(),
  previousQuantity: integer('previous_quantity').notNull(),
  newQuantity: integer('new_quantity').notNull(),
  notes: text('notes'),
  createdAt: text('created_at').notNull(),
});