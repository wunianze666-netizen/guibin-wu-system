import { AdminShell } from "@/components/admin-shell";
import { AdminResume } from "@/components/admin-pages";

export default function AdminResumePage() {
  return (
    <AdminShell title="简历管理" description="上传简历图片、PDF，并设置访问码。">
      <AdminResume />
    </AdminShell>
  );
}
