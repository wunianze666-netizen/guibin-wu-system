import { AdminShell } from "@/components/admin-shell";
import { AdminInternships } from "@/components/admin-pages";

export default function AdminInternshipsPage() {
  return (
    <AdminShell title="实习经历管理" description="维护公司、岗位、时间、职责与成果。">
      <AdminInternships />
    </AdminShell>
  );
}
