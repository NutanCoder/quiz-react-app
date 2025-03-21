import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded-md cursor-pointer ${
          i18n.language === 'en' ? 'bg-gray-800 text-white' : 'text-white hover:bg-black'
        }`}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage('hi')}
        className={`px-3 py-1 rounded-md cursor-pointer ${
          i18n.language === 'hi' ? 'bg-gray-800 text-white' : 'text-white hover:bg-black'
        }`}
      >
        हिंदी
      </button>
    </div>
  );
};

export { LanguageSwitcher }; 