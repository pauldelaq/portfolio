document.addEventListener('DOMContentLoaded', () => {
  const langButton = document.getElementById('languageButton');
  const langMenu = document.getElementById('languageMenu');
  const langList = document.querySelector('.language-list');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'zh-TW', name: '中文 (繁體)' },
    { code: 'zh-CN', name: '中文 (简体)' }
  ];

  let translations = {};
  let currentLang = localStorage.getItem('portfoliolang') || 'en';

  langButton.addEventListener('click', () => {
    langMenu.classList.toggle('hidden');
  });

  function applyLanguage(code) {
    localStorage.setItem('portfoliolang', code);
    currentLang = code;
    langMenu.classList.add('hidden');
    updateLanguageHighlight();
    applyTranslations();
  }

  function updateLanguageHighlight() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.remove('selected');
      if (btn.textContent === languages.find(l => l.code === currentLang)?.name) {
        btn.classList.add('selected');
      }
    });
  }

  function populateLanguageMenu() {
    langList.innerHTML = '';
    languages.forEach(lang => {
      const btn = document.createElement('button');
      btn.className = 'lang-btn';
      btn.textContent = lang.name;
      if (lang.code === currentLang) btn.classList.add('selected');
      btn.addEventListener('click', () => applyLanguage(lang.code));
      langList.appendChild(btn);
    });
  }

  function applyTranslations() {
    const t = translations[currentLang] || translations['en'];

    // Navbar links
    document.querySelector('a[href="#info-section"]').textContent = t.about;
    document.querySelector('a[href="#projects"]').textContent = t.projects;
    document.querySelector('a[href="#contact"]').textContent = t.contact;

    // Header subtitle
    const subtitle = document.querySelector('#welcome-section p');
    if (subtitle) subtitle.textContent = t.subtitle;

    // Bio paragraphs
    const bioParagraphs = document.querySelectorAll('.info-text');
    t.bio.forEach((line, i) => {
      if (bioParagraphs[i]) bioParagraphs[i].textContent = line;
    });

    // Section headers
    const contactHeader = document.querySelector('#contact h2');
    if (contactHeader) contactHeader.textContent = t.keepInTouch;

    const projectsHeader = document.querySelector('.projects-comment');
    if (projectsHeader) projectsHeader.textContent = t.projectTitle;

    // Project descriptions
    const comments = document.querySelectorAll('.project-tile comment');
    if (comments[0]) comments[0].textContent = t.tremojiDesc;
    if (comments[1]) comments[1].textContent = t.dualDesc;
    if (comments[2]) comments[2].textContent = t.cueDesc;
    if (comments[3]) comments[3].textContent = t.worksheetDesc;
  }

  function loadTranslations() {
    return fetch('translations.json')
      .then(res => res.json())
      .then(data => {
        translations = data;
        applyTranslations();
      });
  }

  populateLanguageMenu();
  updateLanguageHighlight();
  loadTranslations();
});
