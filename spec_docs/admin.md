Here is a comprehensive technical implementation document tailored for your AI agent. You can feed this directly to your agent to guide the generation of the protected admin dashboard, complete with the specific authentication flow and UI layouts requested.

---

# Solvimate Admin Portal: Technical Implementation Guide

## 1. Architecture & Tech Stack

This document outlines the technical implementation for the Solvimate Admin Portal. This portal operates as a protected sub-route (`/admin`) within the existing Solvimate Next.js (App Router) application.

* **Framework:** Next.js (App Router).


* **Styling:** styled-components (matching the existing site) or Tailwind CSS, utilizing a dark emerald/green theme based on UI mockups.


* **Authentication:** NextAuth.js (`next-auth`) configured for custom Credentials and OTP verification.
* **Database:** MongoDB (for storing admin credentials, roles, and certificate metadata).
* **Storage:** Cloudinary (for handling PDF/PNG certificate uploads).
* **Email Service:** Resend (for dispatching OTPs to admins).



---

## 2. Authentication & Security (NextAuth + OTP)

The admin portal is strictly protected. Authentication requires a two-step verification process (Password + OTP) using the custom environment variables provided.

### 2.1. Environment Variables Map

The agent must utilize the following configuration constants:

* `NEXTAUTH_SECRET`: Used to sign JWTs.
* `NEXT_PUBLIC_ADMIN_AUTH_PROVIDER`: `credentials`.
* `ADMIN_AUTH_MODE`: `db`.
* `ADMIN_PASSWORD_MIN_LENGTH`: `8`.
* `ADMIN_OTP_LENGTH`: `6`.
* `ADMIN_OTP_EXPIRY_MINUTES`: `10`.
* `ADMIN_OTP_MAX_ATTEMPTS`: `5`.
* `ADMIN_OTP_RESEND_COOLDOWN_SECONDS`: `30`.
* `RESEND_API_KEY` & `RESEND_FROM_EMAIL`: Configured to send OTPs from `operations@solvimate.com`.

### 2.2. Authentication Flow

1. **Whitelist Check:** New admins are provisioned by adding their email to `ADMIN_WHITELISTED_EMAILS`. They default to the "manager" role.
2. **Step 1 - Login (`/admin/login`):**
* UI: A simple, centered card with "Admin Email" and "Password" fields.
* Logic: If it is a whitelisted user's first login, any password (min 8 chars) is accepted and permanently saved to the DB. Subsequent logins must match this password.


3. **Step 2 - OTP Verification (`/admin/verify`):**
* UI: Displays "Enter the 6-digit code sent to [Email]". Includes a 6-digit input field, a "Verify & Sign In" button, and a "Resend" cooldown timer (30s).
* Logic: The server generates a 6-digit OTP, stores it temporarily with a 10-minute expiry, and emails it via Resend. Upon successful validation, NextAuth issues a session JWT.


4. **Middleware:** A Next.js middleware file (`middleware.ts`) must protect all `/admin/*` routes. Unauthenticated users are redirected to `/admin/login`.

---

## 3. Global Admin Layout (`/admin/layout.tsx`)

Once authenticated, the user is directed to the protected application shell.

### 3.1. Sidebar Navigation

A fixed left-hand sidebar containing the following routing links:

* **Dashboard:** (`/admin/dashboard`)
* **Certificates:** (`/admin/certificates`)
* **Content CMS:** (`/admin/cms`) - For job listings, news, and internship updates.
* **Analytics:** (`/admin/analytics`)
* **Settings:** (`/admin/settings`)

### 3.2. Top Header

A persistent top bar displaying context about the current session:

* **Page Title & Subtitle:** Dynamically changes based on the active route.
* **User Info:** Displays the logged-in admin's email, role (e.g., `manager` or `super_admin`), and the current date.
* **Sign Out Button:** Triggers `signOut()` from NextAuth.

---

## 4. Core Pages & UI Specifications

### 4.1. Dashboard (`/admin/dashboard`)

The central command center tracking system health and recent actions.

* **Metrics Row:** Four summary cards:
* Total Certificates
* Verified
* Revoked
* Verification Count


* **Split Layout:**
* **Left Column (Verification Analytics):** Progress bars showing top certificates by successful verification volume (e.g., "Kundan Kumar - 23 checks").
* **Right Column (Activity Feed):** A list of "Recent Certificates" showing the candidate name, ID, status (ACTIVE), and creation timestamp.


* **Quick Actions Grid:** 4 large buttons for fast navigation: *Open Public Search*, *Upload Certificate*, *Manage CMS Content*, and *Manage Admins*.

### 4.2. Certificates Module (`/admin/certificates`)

A multi-step form to provision new certificates.

* **Step 1: Upload Certificate File:**
* Inputs: `Certificate ID`.
* Action: File input for PDF/PNG. Uploads directly to a specific Cloudinary folder.


* **Step 2: Save Certificate Metadata:**
* Displays the permanent Verification URL dynamically.
* Grid of fields: Candidate Name, Email, Phone, Internship Role (e.g., AI Intern), Department, Organization, Issue Date, Start/End Date, Duration, Description.
* Checkboxes for Badges (Best Performer, Fast Learner, Team Leader, Innovation Star) and a text input for Custom Badges.
* Action: Saves the metadata to the MongoDB `certificates` collection.


* **Recent Certificates Sidebar:** A live-updating table on the right showing recently minted certificates to confirm successful database writes.

### 4.3. Content CMS (`/admin/cms`)

*(Derived from specifications and system requirements)*

* Allows managers to CRUD (Create, Read, Update, Delete) job listings, vendor applications, and news articles. Data is written to MongoDB.

### 4.4. Settings (`/admin/settings`)

* Displays "Your Account" details (Email, Role, Last Login).
* If `role === 'super_admin'`, displays an additional table to manage existing admin access.

---

## 5. Database Schema (MongoDB Target)

While the previous iteration explored Supabase, this implementation requires MongoDB for the admin module.

**Collection: `admins**`

* `_id`: ObjectId
* `email`: String (Unique)
* `passwordHash`: String
* `role`: String (`super_admin` | `manager`)
* `lastLogin`: Date

**Collection: `certificates**`

* `certificateId`: String (Unique, e.g., SVM26-A8X9Q2)
* `cloudinaryUrl`: String
* `candidateName`: String
* `email`: String
* `phone`: String
* `internshipRole`: String
* `department`: String
* `organization`: String
* `issueDate`: Date
* `startDate`: Date
* `endDate`: Date
* `duration`: String
* `description`: String
* `badges`: Array of Strings
* `status`: String (ACTIVE | REVOKED)
* `verificationCount`: Number

---

Are there any specific Cloudinary upload presets or MongoDB connection configurations you'd like me to define further before you feed this to the agent?