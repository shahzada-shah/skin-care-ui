/**
 * Language Context
 *
 * Provides language switching functionality throughout the application.
 * Supports English (EN) and Russian (RU) translations.
 *
 * Features:
 * - Global language state
 * - Translation function (t)
 * - LocalStorage persistence
 * - Type-safe translation keys
 *
 * Usage:
 * ```tsx
 * const { language, setLanguage, t } = useLanguage();
 * <div>{t('header.cart')}</div>
 * ```
 *
 * @module LanguageContext
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ru';

interface Translations {
  [key: string]: {
    en: string;
    ru: string;
  };
}

const translations: Translations = {
  // Header
  'header.catalog': { en: 'Catalog', ru: 'Каталог' },
  'header.new': { en: 'New', ru: 'Новинки' },
  'header.sales': { en: 'Sales', ru: 'Акции' },
  'header.contacts': { en: 'Contacts', ru: 'Контакты' },
  'header.search': { en: 'Search', ru: 'Поиск' },
  'header.profile': { en: 'Profile', ru: 'Профиль' },
  'header.wishlist': { en: 'Wishlist', ru: 'Избранное' },
  'header.cart': { en: 'Cart', ru: 'Корзина' },

  // Top Bar
  'topbar.certificates': { en: 'Gift Certificates', ru: 'Подарочные сертификаты' },
  'topbar.email': { en: 'INFO@CONTESHOP.BY', ru: 'INFO@CONTESHOP.BY' },
  'topbar.delivery': { en: 'Delivery & Payment', ru: 'Доставка и оплата' },

  // Promo Banner
  'promo.discount': { en: 'up to 50% off', ru: 'скидки до 50%' },
  'promo.shipping': { en: 'free shipping from 300 byn', ru: 'бесплатная доставка от 300 byn' },

  // Home Page
  'home.hero.title': { en: 'New Collection', ru: 'Новая коллекция' },
  'home.hero.subtitle': { en: 'Autumn-Winter 2024', ru: 'Осень-Зима 2024' },
  'home.hero.shop': { en: 'Shop Now', ru: 'Перейти в каталог' },
  'home.categories.title': { en: 'Shop by Category', ru: 'Категории' },
  'home.categories.new': { en: 'New Arrivals', ru: 'Новинки' },
  'home.categories.viewAll': { en: 'View All', ru: 'Смотреть все' },
  'home.promotions.title': { en: 'Special Offers', ru: 'Специальные предложения' },
  'home.featured.title': { en: 'Featured Collection', ru: 'Избранная коллекция' },
  'home.featured.desc': { en: 'Discover our handpicked selection', ru: 'Откройте для себя нашу подборку' },
  'home.instagram.title': { en: 'Follow Us', ru: 'Следите за нами' },
  'home.instagram.handle': { en: '@CONTE_FASHION', ru: '@CONTE_FASHION' },

  // Product
  'product.size': { en: 'Size', ru: 'Размер' },
  'product.color': { en: 'Color', ru: 'Цвет' },
  'product.quantity': { en: 'Quantity', ru: 'Количество' },
  'product.addToWishlist': { en: 'Add to Wishlist', ru: 'В избранное' },
  'product.sizeGuide': { en: 'Size Guide', ru: 'Таблица размеров' },
  'product.description': { en: 'Description', ru: 'Описание' },
  'product.details': { en: 'Details', ru: 'Детали' },
  'product.shipping': { en: 'Shipping & Returns', ru: 'Доставка и возврат' },
  'product.related': { en: 'You May Also Like', ru: 'Вам также может понравиться' },

  // Cart
  'cart.empty': { en: 'Your cart is empty', ru: 'Ваша корзина пуста' },
  'cart.total': { en: 'Total', ru: 'Итого' },
  'cart.checkout': { en: 'Checkout', ru: 'Оформить заказ' },
  'cart.viewCart': { en: 'View Cart', ru: 'Посмотреть корзину' },

  // Wishlist
  'wishlist.empty': { en: 'Your wishlist is empty', ru: 'Ваш список желаний пуст' },
  'wishlist.viewAll': { en: 'View All', ru: 'Посмотреть все' },

  // Filters
  'filter.category': { en: 'Category', ru: 'Категория' },
  'filter.color': { en: 'Color', ru: 'Цвет' },
  'filter.size': { en: 'Size', ru: 'Размер' },
  'filter.price': { en: 'Price', ru: 'Цена' },
  'filter.clear': { en: 'Clear Filters', ru: 'Очистить фильтры' },
  'filter.apply': { en: 'Apply', ru: 'Применить' },

  // Categories
  'category.women': { en: 'Women', ru: 'Женщины' },
  'category.men': { en: 'Men', ru: 'Мужчины' },
  'category.accessories': { en: 'Accessories', ru: 'Аксессуары' },
  'category.dresses': { en: 'Dresses', ru: 'Платья' },
  'category.tops': { en: 'Tops', ru: 'Топы' },
  'category.bottoms': { en: 'Bottoms', ru: 'Низ' },

  // Footer
  'footer.about': { en: 'About Us', ru: 'О нас' },
  'footer.contact': { en: 'Contact', ru: 'Контакты' },
  'footer.shipping': { en: 'Shipping', ru: 'Доставка' },
  'footer.returns': { en: 'Returns', ru: 'Возврат' },
  'footer.privacy': { en: 'Privacy Policy', ru: 'Политика конфиденциальности' },
  'footer.terms': { en: 'Terms of Service', ru: 'Условия использования' },

  // Common
  'common.loading': { en: 'Loading...', ru: 'Загрузка...' },
  'common.error': { en: 'Error', ru: 'Ошибка' },
  'common.success': { en: 'Success', ru: 'Успешно' },
  'common.cancel': { en: 'Cancel', ru: 'Отмена' },
  'common.confirm': { en: 'Confirm', ru: 'Подтвердить' },
  'common.save': { en: 'Save', ru: 'Сохранить' },
  'common.delete': { en: 'Delete', ru: 'Удалить' },
  'common.edit': { en: 'Edit', ru: 'Редактировать' },

  // Pages
  'page.new.title': { en: 'Women\'s Clothing / New', ru: 'Женская одежда / new' },
  'page.new.subtitle': {
    en: 'Conte doesn\'t chase fleeting trends — it creates clothing you\'ll wear with pleasure for more than one season.',
    ru: 'Conte не гонится за мимолетными трендами — он создает одежду, которую вы будете носить с удовольствием не один сезон.'
  },
  'page.catalog.title': { en: 'Catalog', ru: 'Каталог' },
  'page.catalog.subtitle': { en: 'Full product catalog coming soon', ru: 'Полный каталог товаров скоро будет доступен' },
  'page.sales.title': { en: 'Sales', ru: 'Акции' },
  'page.sales.subtitle': { en: 'Special offers and promotions coming soon', ru: 'Специальные предложения и акции скоро появятся' },
  'page.contacts.title': { en: 'Contacts', ru: 'Контакты' },
  'page.contacts.subtitle': { en: 'Contact us for more information', ru: 'Свяжитесь с нами для получения дополнительной информации' },

  // Search
  'search.placeholder': { en: 'Search for products...', ru: 'Поиск товаров...' },
  'search.trending': { en: 'Trending Searches', ru: 'Популярные запросы' },
  'search.recent': { en: 'Recent Searches', ru: 'Недавние поиски' },
  'search.noResults': { en: 'No results found', ru: 'Результаты не найдены' },

  // Product Listing
  'listing.noProducts': { en: 'No products found. Try adjusting your filters.', ru: 'Товары не найдены. Попробуйте изменить фильтры.' },
  'listing.showing': { en: 'Showing', ru: 'Показано' },
  'listing.products': { en: 'products', ru: 'товаров' },

  // Hero Section
  'hero.women': { en: 'Women', ru: 'женское' },
  'hero.men': { en: 'Men', ru: 'мужское' },
  'hero.women.subtitle': { en: 'NEW WOMEN\'S CLOTHING COLLECTIONS FROM CONTE', ru: 'НОВЫЕ КОЛЛЕКЦИИ ЖЕНСКОЙ ОДЕЖДЫ ОТ CONTE' },
  'hero.men.subtitle': { en: 'NEW MEN\'S CLOTHING COLLECTIONS FROM CONTE', ru: 'НОВЫЕ КОЛЛЕКЦИИ МУЖСКОЙ ОДЕЖДЫ ОТ CONTE' },
  'hero.catalog': { en: 'catalog', ru: 'каталог' },

  // Category Labels
  'category.clothing': { en: 'Clothing', ru: 'Одежда' },
  'category.jeans': { en: 'Jeans', ru: 'Джинсы' },
  'category.lingerie': { en: 'Lingerie', ru: 'Белье' },
  'category.sleepwear': { en: 'Sleepwear', ru: 'Для сна' },
  'category.tights': { en: 'Tights', ru: 'Колготки' },
  'category.swimwear': { en: 'Swimwear', ru: 'Купальники' },

  // Product Carousel
  'carousel.newArrivals': { en: 'New Arrivals', ru: 'Новинки' },
  'carousel.viewAll': { en: 'view all', ru: 'смотреть всё' },

  // Promotions
  'promo.title': { en: 'Special Offers', ru: 'Специальные предложения' },
  'promo.newSeason': { en: 'New Season', ru: 'Новый сезон' },
  'promo.exclusive': { en: 'Exclusive Collection', ru: 'Эксклюзивная коллекция' },

  // Featured
  'featured.title': { en: 'Featured', ru: 'Избранное' },
  'featured.desc1': { en: 'Timeless elegance', ru: 'Вне времени' },
  'featured.desc2': { en: 'Refined style', ru: 'Изысканный стиль' },
  'featured.shopNow': { en: 'Shop Now', ru: 'Перейти в каталог' },

  // Instagram
  'instagram.title': { en: 'Follow Us', ru: 'Следите за нами' },
  'instagram.handle': { en: '@CONTE_FASHION', ru: '@CONTE_FASHION' },

  // Profile Dropdown
  'profile.myAccount': { en: 'My Account', ru: 'Мой аккаунт' },
  'profile.orders': { en: 'Orders', ru: 'Заказы' },
  'profile.settings': { en: 'Settings', ru: 'Настройки' },
  'profile.signOut': { en: 'Sign Out', ru: 'Выйти' },
  'profile.signIn': { en: 'Sign In', ru: 'Войти' },

  // Catalog Dropdown
  'catalog.women': { en: 'Women', ru: 'Женщинам' },
  'catalog.men': { en: 'Men', ru: 'Мужчинам' },
  'catalog.new': { en: 'New', ru: 'Новинки' },
  'catalog.sale': { en: 'Sale', ru: 'Распродажа' },

  // Product Card
  'product.new': { en: 'NEW', ru: 'NEW' },
  'product.addToCart': { en: 'Add to Cart', ru: 'В корзину' },
  'product.delivery': { en: 'Free shipping over $75', ru: 'Бесплатная доставка от $75' },

  // Promotions Section
  'promotions.title': { en: 'promotions', ru: 'акции' },
  'promotions.viewAll': { en: 'view all', ru: 'смотреть всё' },
  'promotions.updateWardrobe': { en: 'Conte — update your wardrobe with benefits!', ru: 'Conte — обнови гардероб с выгодой!' },
  'promotions.updateDesc': { en: 'Don\'t miss the chance to refresh your style and save money. Conte is style, comfort, quality, proven over time.', ru: 'Не упусти шанс освежить свой стиль и сэкономить. Conte — стиль, комфорт, качество, проверенное временем.' },
  'promotions.kidsTitle': { en: '5 for the price of 4 kids tights', ru: '5 по цене 4 детские колготки' },
  'promotions.corsetTitle': { en: '-20% select corset lingerie', ru: '-20% выборочные модели корсетного белья' },
  'promotions.savageTitle': { en: '-40% on the entire Savage lingerie series', ru: '-40% на всю серию белья Savage' },
  'promotions.goToModels': { en: 'go to models', ru: 'перейти к моделям' },

  // Featured Section
  'featured.saleNew': { en: 'SALE / NEW', ru: 'СКИДКИ / НОВИНКИ' },
  'featured.jeansMen': { en: 'conte jeans for men', ru: 'джинсы conte for men' },
  'featured.jeansDesc': { en: 'Stylish and versatile models that will become the foundation of your image', ru: 'Стильные и универсальные модели, которые станут основой вашего образа' },
  'featured.shopNow': { en: 'shop now', ru: 'купить сейчас' },
  'featured.certificates': { en: 'gift certificates', ru: 'подарочные сертификаты' },
  'featured.certificatesDesc': { en: 'A convenient gift format. You can purchase a gift certificate on the website of the online store conteshop.by and in Conte brand stores', ru: 'Удобный формат подарка. Приобрести подарочный сертификат можно на сайте интернет-магазина conteshop.by и в фирменных магазинах Conte' },

  // Instagram Section
  'instagram.followTitle': { en: 'follow us on INSTAGRAM', ru: 'следи за нами в INSTAGRAM' },
  'instagram.uploadDesc': { en: 'Upload a photo in your favorite Conte outfit on Instagram with the tag #ConteXme and get a chance to be featured on the online store page.', ru: 'Загрузите фото в вашем любимом наряде Conte в Instagram с тегом #ConteXme и получите шанс попасть на страницу интернет-магазина.' },
  'instagram.handle2': { en: '@conteofficial', ru: '@conteofficial' },

  // Catalog Dropdown
  'catalog.womenClothing': { en: 'WOMEN\'S CLOTHING', ru: 'ЖЕНСКАЯ ОДЕЖДА' },
  'catalog.menClothing': { en: 'MEN\'S CLOTHING', ru: 'МУЖСКАЯ ОДЕЖДА' },
  'catalog.collections': { en: 'COLLECTIONS', ru: 'КОЛЛЕКЦИИ' },
  'catalog.dresses': { en: 'Dresses', ru: 'Платья' },
  'catalog.blouses': { en: 'Blouses', ru: 'Блузки' },
  'catalog.pants': { en: 'Pants', ru: 'Брюки' },
  'catalog.skirts': { en: 'Skirts', ru: 'Юбки' },
  'catalog.outerwear': { en: 'Outerwear', ru: 'Верхняя одежда' },
  'catalog.shirts': { en: 'Shirts', ru: 'Рубашки' },
  'catalog.sweaters': { en: 'Sweaters', ru: 'Свитера' },
  'catalog.accessories': { en: 'Accessories', ru: 'Аксессуары' },
  'catalog.newArrivals': { en: 'New Arrivals', ru: 'Новинки' },
  'catalog.bestsellers': { en: 'Bestsellers', ru: 'Bestsellers' },
  'catalog.sale': { en: 'Sale', ru: 'Sale' },
  'catalog.premium': { en: 'Premium', ru: 'Premium' },
  'catalog.casual': { en: 'Casual', ru: 'Casual' },

  // Footer
  'footer.service': { en: 'SERVICE', ru: 'СЕРВИС' },
  'footer.additional': { en: 'ADDITIONAL', ru: 'ДОП.' },
  'footer.shop': { en: 'CONTESHOP', ru: 'CONTESHOP' },
  'footer.information': { en: 'INFORMATION', ru: 'ИНФОРМАЦИЯ' },
  'footer.contacts': { en: 'CONTACTS', ru: 'КОНТАКТЫ' },
  'footer.salesRules': { en: 'Sales Rules', ru: 'Правила продажи' },
  'footer.loyalty': { en: 'Loyalty Program', ru: 'Программа лояльности' },
  'footer.cookies': { en: 'Cookie Settings', ru: 'Настройка Cookie' },
  'footer.promotions': { en: 'Promotions and Discounts', ru: 'Акции и скидки' },
  'footer.skincareTips': { en: 'Skincare Tips', ru: 'Советы по уходу' },
  'footer.sizeGuide': { en: 'Size Guide', ru: 'Подобрать размер' },
  'footer.faq': { en: 'FAQ', ru: 'FAQ' },
  'footer.certificate': { en: 'About Certificate', ru: 'О сертификате' },
  'footer.contact': { en: 'Contact Us', ru: 'Связаться с нами' },
  'footer.blog': { en: 'Blog', ru: 'Блог' },
  'footer.catalog': { en: 'Catalog', ru: 'Каталог' },
  'footer.about': { en: 'About Company', ru: 'О кампании' },
  'footer.privacy': { en: 'Privacy Policy', ru: 'Обработка персональных данных' },
  'footer.stores': { en: 'Store Locations', ru: 'Адреса магазинов' },
  'footer.partnership': { en: 'Partnership and Advertising', ru: 'Сотрудничество и реклама' },
  'footer.sitemap': { en: 'Sitemap', ru: 'Карта сайта' },
  'footer.search': { en: 'Advanced Search', ru: 'Расширенный поиск' },
  'footer.certificates': { en: 'Certificates', ru: 'Сертификаты' },
  'footer.careers': { en: 'Careers at Conte', ru: 'Работа в Conte' },
  'footer.franchise': { en: 'Franchise at Conte', ru: 'Франшиза в Conte' },
  'footer.republic': { en: 'Republic of Belarus', ru: 'Республика Беларусь' },
  'footer.designBy': { en: 'Website design by Korteleva', ru: 'Дизайн сайта Korteleva' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('conte_language');
    return (saved === 'en' || saved === 'ru') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('conte_language', language);
    window.dispatchEvent(new Event('language-changed'));
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
