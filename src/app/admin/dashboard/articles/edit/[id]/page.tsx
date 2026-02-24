import AdminEditArticle from "@/components/admin/AdminEditArticle";
export default function EditArticlePage({ params }: { params: { id: string } }) {
  return <AdminEditArticle id={params.id} />;
}
