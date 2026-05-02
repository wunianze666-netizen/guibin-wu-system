import { AdminShell } from "@/components/admin-shell";
import { AdminProjects } from "@/components/admin-pages";

export default function AdminProjectsPage() {
  return (
    <AdminShell title="项目管理" description="添加、编辑、删除项目内容与封面。">
      <AdminProjects />
    </AdminShell>
  );
}
