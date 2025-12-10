'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import Card from '@/components/ui/Card';
import DirectusImage from '@/components/DirectusImage';
import type { MenuItem, MenuCategory } from '@/types/directus';

interface MenuGridProps {
  items: MenuItem[];
  categories: MenuCategory[];
}

export default function MenuGrid({ items, categories }: MenuGridProps) {
  const t = useTranslations('menu');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    let filtered = items;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((item) => {
        const categoryId = typeof item.category === 'string' 
          ? item.category 
          : item.category.id;
        return categoryId === selectedCategory;
      });
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(query) ||
        (item.description?.toLowerCase().includes(query) ?? false)
      );
    }

    return filtered;
  }, [items, selectedCategory, searchQuery]);

  return (
    <div>
      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-nhero-green/50" size={20} />
          <input
            type="text"
            placeholder={t('search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-nhero-cream text-nhero-green placeholder:text-nhero-green/50 focus:outline-none focus:ring-2 focus:ring-nhero-gold"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-nhero-gold text-white'
                : 'bg-nhero-cream text-nhero-green hover:bg-nhero-gold/20'
            }`}
          >
            {t('all')}
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-nhero-gold text-white'
                  : 'bg-nhero-cream text-nhero-green hover:bg-nhero-gold/20'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 text-nhero-green/60">
          Nessun piatto trovato
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => {
            const badges = [];
            if (item.is_vegetarian) badges.push({ label: t('vegetarian'), color: 'bg-green-500' });
            if (item.is_vegan) badges.push({ label: t('vegan'), color: 'bg-green-600' });
            if (item.is_gluten_free) badges.push({ label: t('glutenFree'), color: 'bg-blue-500' });

            return (
              <Card
                key={item.id}
                variant="hover"
                imageHeight="h-48"
                image={
                  item.image
                    ? typeof item.image === 'string'
                      ? item.image
                      : item.image.id
                    : null
                }
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-nhero-green">{item.name}</h3>
                    {item.price && (
                      <span className="text-lg font-bold text-nhero-gold">
                        €{item.price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {item.description && (
                    <p className="text-sm text-nhero-green/80 mb-3">
                      {item.description}
                    </p>
                  )}

                  {/* Badges */}
                  {badges.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {badges.map((badge, index) => (
                        <span
                          key={index}
                          className={`${badge.color} text-white text-xs px-2 py-1 rounded-full`}
                        >
                          {badge.label}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Allergens */}
                  {item.allergens && item.allergens.length > 0 && (
                    <div className="text-xs text-nhero-green/60 mt-2">
                      <span className="font-medium">{t('allergens')}:</span>{' '}
                      {item.allergens.join(', ')}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
