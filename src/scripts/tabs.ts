/**
 * Вкладки по образцу WAI-ARIA (комитеты на главной, критерии оценки).
 *
 * Разметка: [data-tabs] → [role=tablist] с кнопками [role=tab] (aria-controls → id панели)
 * и панели [role=tabpanel]. Список вкладок изначально скрыт атрибутом hidden: без JavaScript
 * посетитель видит все панели подряд, а элементы [data-tabs-fallback] (например, заголовки панелей)
 * нужны только в этом режиме и прячутся, когда вкладки заработали.
 */

function initTabs(root: HTMLElement) {
  const tablist = root.querySelector<HTMLElement>('[role="tablist"]');
  const tabs = Array.from(root.querySelectorAll<HTMLElement>('[role="tab"]'));
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls') ?? ''));
  if (!tablist || tabs.length === 0 || panels.some((panel) => !panel)) return;

  tablist.hidden = false;
  root.querySelectorAll<HTMLElement>('[data-tabs-fallback]').forEach((element) => {
    element.hidden = true;
  });

  const select = (index: number, { focus = false, reveal = false } = {}) => {
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[i]!.hidden = !selected;
    });
    if (focus) tabs[index].focus();

    // На телефоне панель может оказаться ниже края экрана — подкручиваем к ней.
    const panel = panels[index]!;
    if (reveal && panel.getBoundingClientRect().top > window.innerHeight * 0.75) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    root.dispatchEvent(new CustomEvent('tabchange', { detail: { index, panel } }));
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(i, { reveal: root.hasAttribute('data-tabs-scroll') }));
    tab.addEventListener('keydown', (event) => {
      const last = tabs.length - 1;
      const next =
        event.key === 'ArrowRight' || event.key === 'ArrowDown'
          ? (i + 1) % tabs.length
          : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
            ? (i - 1 + tabs.length) % tabs.length
            : event.key === 'Home'
              ? 0
              : event.key === 'End'
                ? last
                : null;
      if (next === null) return;
      event.preventDefault();
      select(next, { focus: true });
    });
  });

  const initial = tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true');
  select(Math.max(0, initial));
}

document.querySelectorAll<HTMLElement>('[data-tabs]').forEach(initTabs);

export {};
