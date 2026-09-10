"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  SectionCard,
  SectionHeaderRow,
  PrimaryButton,
  TableWrap,
  Table,
  StatusBadgeButton,
} from "../CmsDashboard.styles";

export default function JobsTab() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cms/jobs")
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) setJobs(data.data.jobs);
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
        setJobs([json.data.job, ...jobs]);
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
      setJobs(jobs.filter((j) => j.id !== id));
      toast.success("Deleted.");
    } catch (err) {
      toast.error("Failed to delete.");
    }
  };

  return (
    <SectionCard>
      <SectionHeaderRow>
        <h2>Careers Listings</h2>
        <PrimaryButton onClick={handleAdd}>Add Job</PrimaryButton>
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
                <td colSpan={4}>Loading...</td>
              </tr>
            ) : jobs.length === 0 ? (
              <tr>
                <td colSpan={4}>No jobs found.</td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.department}</td>
                  <td>
                    <StatusBadgeButton
                      $isActive={job.isActive}
                      onClick={() => handleToggle(job)}
                    >
                      {job.isActive ? "Active" : "Draft"}
                    </StatusBadgeButton>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(job.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ff7070",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
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
