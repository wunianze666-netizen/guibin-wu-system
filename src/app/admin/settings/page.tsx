import { AdminShell } from "@/components/admin-shell";
import { AdminSettings } from "@/components/admin-pages";

export default function AdminSettingsPage() {
  return (
    <AdminShell title="系统设置" description="维护网站标题、首页文案、管理员邮箱与访问码。">
      <AdminSettings />
    </AdminShell>
  );
}
