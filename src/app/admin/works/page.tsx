import { AdminShell } from "@/components/admin-shell";
import { AdminWorks } from "@/components/admin-pages";

export default function AdminWorksPage() {
  return (
    <AdminShell title="作品管理" description="维护作品信息、标签、链接和配图。">
      <AdminWorks />
    </AdminShell>
  );
}
