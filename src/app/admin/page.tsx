import { AdminShell } from "@/components/admin-shell";
import { AdminDashboard } from "@/components/admin-pages";

export default function AdminPage() {
  return (
    <AdminShell
      title="后台首页"
      description="集中查看内容概览。当前版本支持本机浏览器编辑和自动保存。"
    >
      <AdminDashboard />
    </AdminShell>
  );
}
