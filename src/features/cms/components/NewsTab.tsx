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

interface NewsTabProps {
  onCountChange?: (count: number) => void;
}

export default function NewsTab({ onCountChange }: NewsTabProps) {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cms/news")
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) {
          setNews(data.data.news);
          onCountChange?.(data.data.news.length);
        }
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
        const updated = [json.data.news, ...news];
        setNews(updated);
        onCountChange?.(updated.length);
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
      const updated = news.filter((j) => j.id !== id);
      setNews(updated);
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
            <SectionTitle>News Articles</SectionTitle>
            <SectionSubtitle>CONTENT FEED</SectionSubtitle>
          </div>
        </SectionTitleGroup>
        <PrimaryButton onClick={handleAdd}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add News
        </PrimaryButton>
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
                <EmptyState colSpan={4}>Loading...</EmptyState>
              </tr>
            ) : news.length === 0 ? (
              <tr>
                <EmptyState colSpan={4}>No news found.</EmptyState>
              </tr>
            ) : (
              news.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--mist)" }}>
                    /{item.slug}
                  </td>
                  <td>
                    <StatusBadgeButton
                      $isActive={item.isPublished}
                      onClick={() => handleToggle(item)}
                    >
                      <div className="dot" />
                      {item.isPublished ? "PUBLISHED" : "DRAFT"}
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
