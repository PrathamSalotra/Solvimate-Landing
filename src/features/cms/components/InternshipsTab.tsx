"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  SectionCard,
  SectionHeaderRow,
  SectionTitleGroup,
  SectionTitle,
  SectionSubtitle,
  PrimaryButton,
  TableWrap,
  Table,
  StatusBadgeButton,
  DeleteButton,
  EmptyState,
} from "../CmsDashboard.styles";

interface InternshipsTabProps {
  onCountChange?: (count: number) => void;
}

export default function InternshipsTab({ onCountChange }: InternshipsTabProps) {
  const [internships, setInternships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cms/internships")
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) {
          setInternships(data.data.internships);
          onCountChange?.(data.data.internships.length);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleToggle = async (item: any) => {
    const newStatus = !item.isActive;
    try {
      const res = await fetch(`/api/cms/internships/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newStatus }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setInternships((prev) =>
          prev.map((j) => (j.id === item.id ? { ...j, isActive: newStatus } : j))
        );
        toast.success(`Internship ${newStatus ? "active" : "closed"}.`);
      }
    } catch (err) {
      toast.error("Failed to update.");
    }
  };

  const handleAdd = async () => {
    const title = prompt("Enter Internship Title:");
    if (!title) return;
    const department = prompt("Enter Department:");
    const description = prompt("Enter Description:");

    try {
      const res = await fetch("/api/cms/internships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, department, description, mode: "remote", isActive: true }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        const updated = [json.data.internship, ...internships];
        setInternships(updated);
        onCountChange?.(updated.length);
        toast.success("Internship added.");
      }
    } catch (err) {
      toast.error("Failed to add.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`/api/cms/internships/${id}`, { method: "DELETE" });
      const updated = internships.filter((j) => j.id !== id);
      setInternships(updated);
      onCountChange?.(updated.length);
      toast.success("Deleted.");
    } catch (err) {
      toast.error("Failed to delete.");
    }
  };

  return (
    <SectionCard>
      <SectionHeaderRow>
        <SectionTitleGroup>
          <div className="dot" />
          <div>
            <SectionTitle>Internship Openings</SectionTitle>
            <SectionSubtitle>LIVE PRODUCTION REGISTRY</SectionSubtitle>
          </div>
        </SectionTitleGroup>
        <PrimaryButton onClick={handleAdd}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Internship
        </PrimaryButton>
      </SectionHeaderRow>

      <TableWrap>
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Department</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <EmptyState colSpan={4}>Loading...</EmptyState>
              </tr>
            ) : internships.length === 0 ? (
              <tr>
                <EmptyState colSpan={4}>No internships found.</EmptyState>
              </tr>
            ) : (
              internships.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    {item.department}
                  </td>
                  <td>
                    <StatusBadgeButton
                      $isActive={item.isActive}
                      onClick={() => handleToggle(item)}
                    >
                      <div className="dot" />
                      {item.isActive ? "ACTIVE" : "CLOSED"}
                    </StatusBadgeButton>
                  </td>
                  <td>
                    <DeleteButton onClick={() => handleDelete(item.id)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                      Delete
                    </DeleteButton>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </TableWrap>
    </SectionCard>
  );
}
