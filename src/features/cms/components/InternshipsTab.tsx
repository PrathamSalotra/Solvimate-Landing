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

export default function InternshipsTab() {
  const [internships, setInternships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cms/internships")
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) setInternships(data.data.internships);
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
        setInternships([json.data.internship, ...internships]);
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
      setInternships(internships.filter((j) => j.id !== id));
      toast.success("Deleted.");
    } catch (err) {
      toast.error("Failed to delete.");
    }
  };

  return (
    <SectionCard>
      <SectionHeaderRow>
        <h2>Internship Openings</h2>
        <PrimaryButton onClick={handleAdd}>Add Internship</PrimaryButton>
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
            ) : internships.length === 0 ? (
              <tr>
                <td colSpan={4}>No internships found.</td>
              </tr>
            ) : (
              internships.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.department}</td>
                  <td>
                    <StatusBadgeButton
                      $isActive={item.isActive}
                      onClick={() => handleToggle(item)}
                    >
                      {item.isActive ? "Active" : "Closed"}
                    </StatusBadgeButton>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item.id)}
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
