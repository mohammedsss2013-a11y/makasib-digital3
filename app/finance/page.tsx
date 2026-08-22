import { CategoryArticles } from "@/components/articles/CategoryArticles";

export const dynamic = "force-dynamic";

export default function FinanceSectorPage() {
  return (
    <CategoryArticles 
      category="المال والأعمال" 
      categoryLabel="المال والأعمال" 
      accent="emerald" 
      subcategorySection="finance"
      description="مقالات عملية عن العمل الحر والتجارة الإلكترونية والتسويق ونماذج الدخل الرقمي." 
    />
  );
}