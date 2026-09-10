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

interface JobsTabProps {
  onCountChange?: (count: number) => void;
}

export default function JobsTab({ onCountChange }: JobsTabProps) {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cms/jobs")
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) {
          setJobs(data.data.jobs);
          onCountChange?.(data.data.jobs.length);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleToggle = async (job: any) => {
    const newStatus = !job.isActive;
    try {
      const res = await fetch(`/api/cms/jobs/${job.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: newStatus }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setJobs((prev) =>
          prev.map((j) => (j.id === job.id ? { ...j, isActive: newStatus } : j))
        );
        toast.success(`Job ${newStatus ? "published" : "drafted"}.`);
      }
    } catch (err) {
      toast.error("Failed to update.");
    }
  };

  const handleAdd = async () => {
    const title = prompt("Enter Job Title:");
    if (!title) return;
    const department = prompt("Enter Department:");
    const description = prompt("Enter Description:");

    try {
      const res = await fetch("/api/cms/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, department, description, mode: "remote", isActive: true }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        const updated = [json.data.job, ...jobs];
        setJobs(updated);
        onCountChange?.(updated.length);
        toast.success("Job added.");
      }
    } catch (err) {
      toast.error("Failed to add.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`/api/cms/jobs/${id}`, { method: "DELETE" });
      const updated = jobs.filter((j) => j.id !== id);
      setJobs(updated);
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
            <SectionTitle>Careers Listings</SectionTitle>
            <SectionSubtitle>LIVE PRODUCTION REGISTRY</SectionSubtitle>
          </div>
        </SectionTitleGroup>
        <PrimaryButton onClick={handleAdd}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Job
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
            ) : jobs.length === 0 ? (
              <tr>
                <EmptyState colSpan={4}>No jobs found.</EmptyState>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    {job.department}
                  </td>
                  <td>
                    <StatusBadgeButton
                      $isActive={job.isActive}
                      onClick={() => handleToggle(job)}
                    >
                      <div className="dot" />
                      {job.isActive ? "ACTIVE" : "DRAFT"}
                    </StatusBadgeButton>
                  </td>
                  <td>
                    <DeleteButton onClick={() => handleDelete(job.id)}>
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
