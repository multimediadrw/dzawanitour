import AdminEditFAQ from "@/components/admin/AdminEditFAQ";
export default function EditFAQPage({ params }: { params: { id: string } }) {
  return <AdminEditFAQ id={params.id} />;
}
