"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  SectionCard,
  HeaderRow,
  TitleBlock,
  SearchWrap,
  TableWrap,
  Table,
  EmptyState,
  MetricBadge,
  StatusBadge,
  ToggleButton,
  PaginationContainer,
  PageButton,
} from "./CertificateManagementTable.styles";

export interface DashboardCertificate {
  _id?: string;
  verificationId: string;
  candidateName: string;
  internshipRole: string;
  status: string;
  verificationCount: number;
  createdAt: string;
}

interface CertificateManagementTableProps {
  initialCertificates: DashboardCertificate[];
  totalInitial: number;
}

export default function CertificateManagementTable({
  initialCertificates,
  totalInitial,
}: CertificateManagementTableProps) {
  const [certificates, setCertificates] = useState<DashboardCertificate[]>(initialCertificates);
  const [total, setTotal] = useState(totalInitial);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isToggling, setIsToggling] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch if we're not on the initial render with no query
    if (page === 1 && query === "" && certificates === initialCertificates) return;

    const fetchCerts = async () => {
      setIsLoading(true);
      try {
        const url = new URL("/api/certificates", window.location.origin);
        url.searchParams.set("page", page.toString());
        url.searchParams.set("limit", "10");
        if (query) url.searchParams.set("query", query);

        const res = await fetch(url.toString());
        const json = await res.json();
        if (json.ok) {
          setCertificates(json.data.items);
          setTotal(json.data.total);
        }
      } catch (err) {
        toast.error("Failed to fetch certificates");
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchCerts, 300); // debounce search
    return () => clearTimeout(timer);
  }, [page, query, initialCertificates]);

  const handleToggleStatus = async (certId: string, currentStatus: string) => {
    setIsToggling(certId);
    const newStatus = currentStatus === "active" ? "revoked" : "active";
    
    try {
      const res = await fetch(`/api/certificates/${certId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      
      if (res.ok && json.ok) {
        setCertificates((prev) =>
          prev.map((c) =>
            c.verificationId === certId ? { ...c, status: newStatus } : c
          )
        );
        toast.success(`Certificate ${newStatus} successfully.`);
      } else {
        toast.error(json.message || "Failed to update status.");
      }
    } catch (err) {
      toast.error("Unable to connect to the server.");
    } finally {
      setIsToggling(null);
    }
  };

  const totalPages = Math.ceil(total / 10);

  return (
    <SectionCard>
      <HeaderRow>
        <TitleBlock>
          <h2>Certificate Management</h2>
          <p>Search credentials, monitor verifier resonance, and enforce instant revoking authority.</p>
        </TitleBlock>
        <SearchWrap>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            placeholder="Search ID, name, email, role..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
        </SearchWrap>
      </HeaderRow>

      <TableWrap>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Candidate</th>
              <th>Role</th>
              <th>Views</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && certificates.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <EmptyState>Loading certificates...</EmptyState>
                </td>
              </tr>
            ) : certificates.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <EmptyState>No certificates found.</EmptyState>
                </td>
              </tr>
            ) : (
              certificates.map((cert) => (
                <tr key={cert.verificationId}>
                  <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
                    {cert.verificationId}
                  </td>
                  <td>{cert.candidateName}</td>
                  <td>{cert.internshipRole}</td>
                  <td>
                    <MetricBadge>{cert.verificationCount}x</MetricBadge>
                  </td>
                  <td>
                    <StatusBadge $variant={cert.status === "active" ? "active" : "revoked"}>
                      <div className="dot" />
                      {cert.status === "active" ? "ACTIVE" : "REVOKED"}
                    </StatusBadge>
                  </td>
                  <td>
                    <ToggleButton
                      $isRevoked={cert.status === "revoked"}
                      onClick={() => handleToggleStatus(cert.verificationId, cert.status)}
                      disabled={isToggling === cert.verificationId}
                    >
                      {isToggling === cert.verificationId
                        ? "Wait..."
                        : cert.status === "active"
                        ? "Revoke"
                        : "Reactivate"}
                    </ToggleButton>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </TableWrap>

      {totalPages > 1 && (
        <PaginationContainer>
          <p>
            Showing <strong>{(page - 1) * 10 + 1}</strong> to <strong>{Math.min(page * 10, total)}</strong> of <strong>{total}</strong> items
          </p>
          <div>
            <PageButton disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              Prev
            </PageButton>
            <PageButton disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
              Next
            </PageButton>
          </div>
        </PaginationContainer>
      )}
    </SectionCard>
  );
}
