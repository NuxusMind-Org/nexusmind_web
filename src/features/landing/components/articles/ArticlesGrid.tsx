import { ArticleCard } from './ArticleCard';
import type { ArticleItem } from '../../constants/articles';

interface ArticlesGridProps {
  items: ArticleItem[];
}

export const ArticlesGrid = ({ items }: ArticlesGridProps) => {
  if (items.length === 0) {
    return (
      <div className="w-full flex justify-center py-12">
        <div className="bg-ui-glass backdrop-blur-[18px] border border-ui-border rounded-lg p-10 text-center max-w-[450px] w-full shadow-lg">
          <p className="text-white/60 text-[15px] font-light">
            Axtarışa uyğun məqalə tapılmadı. Zəhmət olmasa digər axtarış sözlərindən istifadə edin.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
      {items.map((item) => (
        <ArticleCard key={item.id} item={item} />
      ))}
    </div>
  );
};
