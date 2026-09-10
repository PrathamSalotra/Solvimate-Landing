"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { AdminPayload } from "@/services/admin.service";
import {
  SectionCard,
  SectionHeaderRow,
  TitleBlock,
  InviteForm,
  InviteInput,
  InviteButton,
  TableWrap,
  Table,
  EmailCell,
  YouBadge,
  RoleSelect,
  StatusBadgeButton,
  MutedText,
  EmptyState,
} from "./AdminsTable.styles";

const ROLES = ["super_admin", "admin", "manager"];

function formatTimestamp(isoDate?: string | null) {
  if (!isoDate) return "Never";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(isoDate));
}

interface AdminsTableProps {
  initialAdmins: AdminPayload[];
  currentEmail: string;
}

export default function AdminsTable({ initialAdmins, currentEmail }: AdminsTableProps) {
  const [admins, setAdmins] = useState<AdminPayload[]>(initialAdmins);
  const [pendingId, setPendingId] = useState<string | null>(null);
  
  const [inviteEmail, setInviteEmail] = useState("");
  const [isInviting, setIsInviting] = useState(false);

  async function handleRoleChange(admin: AdminPayload, role: string) {
    if (role === admin.role) return;
    setPendingId(admin.id);
    try {
      const res = await fetch(`/api/admin/admins/${admin.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setAdmins((prev) =>
          prev.map((item) => (item.id === admin.id ? { ...item, role: role as any } : item))
        );
        toast.success(`${admin.email} is now ${role}.`);
      } else {
        toast.error(json.message || "Unable to update role.");
      }
    } catch (err) {
      toast.error("Network error.");
    } finally {
      setPendingId(null);
    }
  }

  async function handleToggleActive(admin: AdminPayload) {
    setPendingId(admin.id);
    const newStatus = !admin.isActive;
    try {
      const res = await fetch(`/api/admin/admins/${admin.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newStatus }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setAdmins((prev) =>
          prev.map((item) => (item.id === admin.id ? { ...item, isActive: newStatus } : item))
        );
        toast.success(`${admin.email} is now ${newStatus ? "active" : "inactive"}.`);
      } else {
        toast.error(json.message || "Unable to update status.");
      }
    } catch (err) {
      toast.error("Network error.");
    } finally {
      setPendingId(null);
    }
  }

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    setIsInviting(true);
    try {
      const res = await fetch(`/api/admin/admins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail, role: "manager" }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setAdmins((prev) => [json.data.admin, ...prev]);
        toast.success(`${inviteEmail} has been invited as manager.`);
        setInviteEmail("");
      } else {
        toast.error(json.message || "Failed to invite admin.");
      }
    } catch (err) {
      toast.error("Network error.");
    } finally {
      setIsInviting(false);
    }
  }

  return (
    <SectionCard>
      <SectionHeaderRow>
        <TitleBlock>
          <h2>Manage Admins</h2>
          <p>
            Change roles or deactivate access. You cannot change your own role or deactivate
            yourself.
          </p>
        </TitleBlock>
        <InviteForm onSubmit={handleInvite}>
          <InviteInput
            type="email"
            placeholder="Invite via email address..."
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            required
            disabled={isInviting}
          />
          <InviteButton type="submit" disabled={isInviting}>
            {isInviting ? "Inviting..." : "Invite Admin"}
          </InviteButton>
        </InviteForm>
      </SectionHeaderRow>

      {admins.length === 0 ? (
        <EmptyState>No admin accounts found.</EmptyState>
      ) : (
        <TableWrap>
          <Table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => {
                const isSelf = admin.email === currentEmail;
                const isPending = pendingId === admin.id;

                return (
                  <tr key={admin.id}>
                    <td>
                      <EmailCell>
                        <span>{admin.email}</span>
                        {isSelf && <YouBadge>You</YouBadge>}
                      </EmailCell>
                    </td>
                    <td>
                      <RoleSelect
                        value={admin.role}
                        disabled={isSelf || isPending}
                        onChange={(e) => handleRoleChange(admin, e.target.value)}
                      >
                        {ROLES.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </RoleSelect>
                    </td>
                    <td>
                      <StatusBadgeButton
                        type="button"
                        $isActive={admin.isActive}
                        disabled={isSelf || isPending}
                        onClick={() => handleToggleActive(admin)}
                      >
                        {admin.isActive ? "Active" : "Inactive"}
                      </StatusBadgeButton>
                    </td>
                    <td>
                      <MutedText>{formatTimestamp(admin.lastLoginAt)}</MutedText>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </TableWrap>
      )}
    </SectionCard>
  );
}
