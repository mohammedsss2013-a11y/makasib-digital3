import { CategoryArticles } from "@/components/articles/CategoryArticles";
import { SectionInteractiveTools } from "@/components/articles/SectionInteractiveTools";

export const revalidate = 60;

export default function TechSectorPage() {
  return (
    <CategoryArticles 
      category="التكنولوجيا والابتكار" 
      categoryLabel="التكنولوجيا والابتكار" 
      accent="blue"
      description="تحليلات وأدلة حول الذكاء الاصطناعي والأمن السيبراني والسحابة وتقنيات المستقبل." 
      subcategorySection="tech" 
      interactiveTools={<SectionInteractiveTools section="tech" />} 
    />
  );
}