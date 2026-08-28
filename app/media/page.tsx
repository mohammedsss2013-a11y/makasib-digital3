import { CategoryArticles } from "@/components/articles/CategoryArticles";
import { SectionInteractiveTools } from "@/components/articles/SectionInteractiveTools";

export const revalidate = 60;

export default function MediaSectorPage() {
  return (
    <CategoryArticles 
      category="قطاع الإعلام" 
      categoryLabel="قطاع الإعلام" 
      accent="rose"
      description="تحليلات، استراتيجيات، وأدلة حول تحولات صحافة الذكاء الاصطناعي وصناعة المحتوى الرقمي." 
      subcategorySection="media" 
      interactiveTools={<SectionInteractiveTools section="media" />} 
    />
  );
}