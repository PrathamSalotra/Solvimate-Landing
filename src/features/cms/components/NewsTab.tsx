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

export default function NewsTab() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cms/news")
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) setNews(data.data.news);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleToggle = async (item: any) => {
    const newStatus = !item.isPublished;
    try {
      const res = await fetch(`/api/cms/news/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: newStatus }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setNews((prev) =>
          prev.map((j) => (j.id === item.id ? { ...j, isPublished: newStatus } : j))
        );
        toast.success(`News ${newStatus ? "published" : "drafted"}.`);
      }
    } catch (err) {
      toast.error("Failed to update.");
    }
  };

  const handleAdd = async () => {
    const title = prompt("Enter News Title:");
    if (!title) return;
    const slug = prompt("Enter URL slug (e.g., new-feature-launch):");
    const content = prompt("Enter Content:");

    try {
      const res = await fetch("/api/cms/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, content, isPublished: true }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setNews([json.data.news, ...news]);
        toast.success("News added.");
      } else {
         toast.error(json.message || "Failed to add.");
      }
    } catch (err) {
      toast.error("Failed to add.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`/api/cms/news/${id}`, { method: "DELETE" });
      setNews(news.filter((j) => j.id !== id));
      toast.success("Deleted.");
    } catch (err) {
      toast.error("Failed to delete.");
    }
  };

  return (
    <SectionCard>
      <SectionHeaderRow>
        <h2>News Articles</h2>
        <PrimaryButton onClick={handleAdd}>Add News</PrimaryButton>
      </SectionHeaderRow>

      <TableWrap>
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4}>Loading...</td>
              </tr>
            ) : news.length === 0 ? (
              <tr>
                <td colSpan={4}>No news found.</td>
              </tr>
            ) : (
              news.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.slug}</td>
                  <td>
                    <StatusBadgeButton
                      $isActive={item.isPublished}
                      onClick={() => handleToggle(item)}
                    >
                      {item.isPublished ? "Published" : "Draft"}
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
