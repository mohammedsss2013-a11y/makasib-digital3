import { getCanonicalArticlePath } from "@/lib/articlePaths";
import { articlesService, type Article } from "@/services/articles.service";
import { RelatedArticleCard } from "@/components/articles/RelatedArticleCard";

interface RelatedArticlesProps {
  currentArticle: Article;
}

export function selectRelatedArticles(
  currentArticle: Pick<Article, "id" | "categorySlug" | "subcategorySlug">,
  articles: readonly Article[],
  limit = 3,
) {
  if (limit <= 0) return [];

  return articles
    .filter((article) => article.id !== currentArticle.id)
    .map((article, index) => ({
      article,
      index,
      relevance:
        article.categorySlug === currentArticle.categorySlug
          && article.subcategorySlug === currentArticle.subcategorySlug
          ? 0
          : article.categorySlug === currentArticle.categorySlug
            || article.subcategorySlug === currentArticle.subcategorySlug
            ? 1
            : 2,
      publishedAt: Date.parse(article.publishedAt) || 0,
    }))
    .sort((a, b) => a.relevance - b.relevance || b.publishedAt - a.publishedAt || a.index - b.index)
    .slice(0, limit)
    .map(({ article }) => article);
}

export async function RelatedArticles({ currentArticle }: RelatedArticlesProps) {
  const articles = await articlesService.getAllArticles();
  const relatedArticles = selectRelatedArticles(currentArticle, articles);

  if (relatedArticles.length === 0) return null;

  return (
    <section
      aria-labelledby="related-articles-heading"
      className="not-prose space-y-6 border-t border-[var(--border-main)]/70 pt-8"
      dir="rtl"
    >
      <header className="space-y-2">
        <p className="text-xs font-bold tracking-wide text-[var(--accent-primary)]">اكتشف المزيد</p>
        <h2
          id="related-articles-heading"
          className="text-2xl font-black text-[var(--text-main)] sm:text-3xl"
        >
          مقالات قد تهمك أيضاً
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {relatedArticles.map((article) => (
          <RelatedArticleCard
            key={article.id}
            href={getCanonicalArticlePath(article)}
            title={article.title}
            categoryLabel={article.categoryLabel}
            coverImage={article.coverImage}
            coverImageAlt={article.coverImageAlt}
            readTime={article.readTime}
            viewsCount={article.viewsCount}
          />
        ))}
      </div>
    </section>
  );
}
