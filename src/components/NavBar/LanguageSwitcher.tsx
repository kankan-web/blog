import { useState } from 'react'

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('zh')

  const languages = {
    zh: '中文',
    en: 'English',
  }

  const handleLanguageChange = (lang: keyof typeof languages) => {
    setCurrentLang(lang)
    setIsOpen(false)
    // 这里可以添加切换语言的逻辑
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center"
      >
        <span>{languages[currentLang as keyof typeof languages]}</span>
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          {Object.entries(languages).map(([code, name]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code as keyof typeof languages)}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
