import { CategoryArticles } from "@/components/articles/CategoryArticles";
import { SectionInteractiveTools } from "@/components/articles/SectionInteractiveTools";

export const revalidate = 60;

export default function FinanceSectorPage() {
  return (
    <CategoryArticles 
      category="المال والأعمال" 
      categoryLabel="المال والأعمال" 
      accent="emerald" 
      subcategorySection="finance"
      description="مقالات عملية عن العمل الحر والتجارة الإلكترونية والتسويق ونماذج الدخل الرقمي."
      interactiveTools={<SectionInteractiveTools section="finance" />}
    />
  );
}