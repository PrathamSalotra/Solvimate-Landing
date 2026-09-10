import dbConnect from "@/lib/mongodb";
import Certificate from "@/models/Certificate";

export interface DashboardStats {
  totalCertificates: number;
  verifiedCertificates: number;
  revokedCertificates: number;
  totalVerificationCount: number;
}

export interface DashboardCertificate {
  verificationId: string;
  candidateName: string;
  status: string;
  verificationCount: number;
  createdAt?: string;
  lastVerifiedAt?: string;
}

export interface DashboardVerification {
  verificationId: string;
  candidateName: string;
  verificationCount: number;
  verifiedAt: string;
}

export interface DashboardTopCertificate {
  verificationId: string;
  candidateName: string;
  status: string;
  verificationCount: number;
}

export interface DashboardOverview {
  stats: DashboardStats;
  recentCertificates: DashboardCertificate[];
  recentVerifications: DashboardVerification[];
  topVerifiedCertificates: DashboardTopCertificate[];
}

function toIso(value?: Date | null): string | undefined {
  if (!value) return undefined;
  return value.toISOString();
}

export async function getDashboardOverview(): Promise<DashboardOverview> {
  await dbConnect();

  const [
    totalCertificates,
    verifiedCertificates,
    revokedCertificates,
    verificationTotal,
    recentCertificateDocs,
    recentVerificationDocs,
    topVerifiedDocs,
  ] = await Promise.all([
    Certificate.countDocuments({}),
    Certificate.countDocuments({ status: "active" }),
    Certificate.countDocuments({ status: "revoked" }),
    Certificate.aggregate([
      {
        $group: {
          _id: null,
          totalVerificationCount: { $sum: "$verificationCount" },
        },
      },
    ]),
    Certificate.find({})
      .sort({ createdAt: -1 })
      .limit(6)
      .select("verificationId candidateName status verificationCount createdAt lastVerifiedAt")
      .lean(),
    Certificate.find({
      lastVerifiedAt: {
        $exists: true,
        $ne: null,
      },
    })
      .sort({ lastVerifiedAt: -1 })
      .limit(6)
      .select("verificationId candidateName verificationCount lastVerifiedAt")
      .lean(),
    Certificate.find({})
      .sort({ verificationCount: -1, lastVerifiedAt: -1 })
      .limit(5)
      .select("verificationId candidateName status verificationCount")
      .lean(),
  ]);

  const recentCertificates = recentCertificateDocs.map((item: any) => ({
    verificationId: item.verificationId,
    candidateName: item.candidateName,
    status: item.status,
    verificationCount: item.verificationCount ?? 0,
    createdAt: toIso(item.createdAt),
    lastVerifiedAt: toIso(item.lastVerifiedAt),
  }));

  const recentVerifications = recentVerificationDocs
    .filter((item: any) => item.lastVerifiedAt)
    .map((item: any) => ({
      verificationId: item.verificationId,
      candidateName: item.candidateName,
      verificationCount: item.verificationCount ?? 0,
      verifiedAt: toIso(item.lastVerifiedAt) as string,
    }));

  const topVerifiedCertificates = topVerifiedDocs.map((item: any) => ({
    verificationId: item.verificationId,
    candidateName: item.candidateName,
    status: item.status,
    verificationCount: item.verificationCount ?? 0,
  }));

  return {
    stats: {
      totalCertificates,
      verifiedCertificates,
      revokedCertificates,
      totalVerificationCount: verificationTotal[0]?.totalVerificationCount ?? 0,
    },
    recentCertificates,
    recentVerifications,
    topVerifiedCertificates,
  };
}
