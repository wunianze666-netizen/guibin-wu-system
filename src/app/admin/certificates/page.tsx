import { AdminShell } from "@/components/admin-shell";
import { AdminCertificates } from "@/components/admin-pages";

export default function AdminCertificatesPage() {
  return (
    <AdminShell title="证书/奖项管理" description="添加证书、奖项，上传图片并维护公开信息。">
      <AdminCertificates />
    </AdminShell>
  );
}
