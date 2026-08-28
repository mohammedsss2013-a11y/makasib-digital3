import { CategoryArticles } from "@/components/articles/CategoryArticles";
import { SectionInteractiveTools } from "@/components/articles/SectionInteractiveTools";

export const revalidate = 60;

export default function DigitalLifestylePage() {
  return (
    <CategoryArticles 
      category="رقميون - أسلوب الحياة" 
      categoryLabel="رقميون - أسلوب الحياة" 
      accent="amber"
      description="رؤى وأدلة لبناء علاقة أكثر توازنًا وإنتاجية ووعيًا مع العالم الرقمي." 
      subcategorySection="lifestyle" 
      interactiveTools={<SectionInteractiveTools section="lifestyle" />} 
    />
  );
}