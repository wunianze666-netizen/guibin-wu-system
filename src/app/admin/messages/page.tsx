import { AdminShell } from "@/components/admin-shell";
import { AdminMessages } from "@/components/admin-pages";

export default function AdminMessagesPage() {
  return (
    <AdminShell title="留言管理" description="查看、回复、添加或删除留言。">
      <AdminMessages />
    </AdminShell>
  );
}
