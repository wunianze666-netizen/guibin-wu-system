import { AdminShell } from "@/components/admin-shell";
import { AdminPosts } from "@/components/admin-pages";

export default function AdminPostsPage() {
  return (
    <AdminShell title="动态管理" description="发布和编辑近期记录。">
      <AdminPosts />
    </AdminShell>
  );
}
