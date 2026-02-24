import AdminEditFeature from "@/components/admin/AdminEditFeature";
export default function EditFeaturePage({ params }: { params: { id: string } }) {
  return <AdminEditFeature id={params.id} />;
}
