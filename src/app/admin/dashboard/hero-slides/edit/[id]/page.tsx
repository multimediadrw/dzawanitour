import AdminEditHeroSlide from "@/components/admin/AdminEditHeroSlide";
export default function EditHeroSlidePage({ params }: { params: { id: string } }) {
  return <AdminEditHeroSlide id={params.id} />;
}
