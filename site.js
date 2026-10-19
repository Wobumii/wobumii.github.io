// Keep old index.html bookmarks working while showing the clean homepage URL.
if (window.location.pathname === '/index.html') {
  window.history.replaceState(window.history.state, '', '/' + window.location.search + window.location.hash);
}

const search = document.querySelector('#spell-search');
if (search) {
  const cards = [...document.querySelectorAll('.spell-card')];
  const filter = () => {
    const words = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let count = 0;
    cards.forEach(card => { card.hidden = !words.every(word => card.dataset.search.includes(word)); if (!card.hidden) count++; });
    document.querySelector('#spell-count').textContent = `${count} of ${cards.length} spells`;
    document.querySelector('#no-spells').hidden = count !== 0;
  };
  search.addEventListener('input', filter);
  document.querySelector('#clear-search').addEventListener('click', () => { search.value = ''; filter(); search.focus(); });
}

// Native details preserve the full symbol guide without JavaScript.
const symbolSearch = document.querySelector('#symbol-search');
if (symbolSearch) {
  const symbols = [...document.querySelectorAll('.symbol-card')];
  const filterSymbols = () => {
    const words = symbolSearch.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let count = 0;
    symbols.forEach(card => {
      card.hidden = !words.every(word => card.dataset.search.includes(word));
      if (!card.hidden) count++;
    });
    document.querySelector('#symbol-count').textContent = `${count} of ${symbols.length} symbols`;
    document.querySelector('#no-symbols').hidden = count !== 0;
  };
  symbolSearch.addEventListener('input', filterSymbols);
  document.querySelector('#clear-symbol-search').addEventListener('click', () => {
    symbolSearch.value = '';
    filterSymbols();
    symbolSearch.focus();
  });
}
