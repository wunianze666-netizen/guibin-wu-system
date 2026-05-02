import { AdminShell } from "@/components/admin-shell";
import { AdminAbout } from "@/components/admin-pages";

export default function AdminAboutPage() {
  return (
    <AdminShell
      title="关于我管理"
      description="编辑个人介绍、兴趣标签、二维码与联系信息。"
    >
      <AdminAbout />
    </AdminShell>
  );
}
