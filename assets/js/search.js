// Navegação rápida entre guias. O valor do select contém sempre uma rota
// interna já gerada, por isso a mudança pode navegar directamente para ela.
const selector = document.getElementById('dg-guide');
selector?.addEventListener('change', () => location.assign(selector.value));

// A pesquisa é partilhável: o estado vem do parâmetro ?q= em vez de ficar
// apenas na memória da página.
const query = new URL(location.href).searchParams.get('q')?.trim();

if (query) {
  const main = document.getElementById('conteudo');
  document.getElementById('dg-query').value = query;

  // Pesquisa simples e determinística no cliente. A normalização remove
  // diacríticos para que, por exemplo, "organizacao" encontre "organização".
  const normal = (value) =>
    value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  try {
    // O índice é gerado a partir da mesma fonte editorial dos guias e é
    // validado pelo guardrail de consistência antes da publicação.
    const response = await fetch(new URL('./search-index.json', import.meta.url));
    if (!response.ok) throw Error('Search unavailable');

    const hits = (await response.json()).filter((item) =>
      normal(item.text).includes(normal(query)),
    );

    main.querySelector('h1').textContent = 'Resultados da pesquisa';
    document.title = 'Pesquisa: ' + query + ' | Guias do utilizador | dados.gov.pt';

    // Manter estas propriedades no próprio status garante anúncio das
    // alterações por tecnologias de apoio sem deslocar o foco do utilizador.
    const status = main.querySelector('.dg-lead');
    status.setAttribute('role','status');
    status.setAttribute('aria-live','polite');
    status.textContent = `${hits.length} resultados para “${query}”.`;

    const grid = main.querySelector('.dg-grid');
    grid.replaceChildren();

    // Usar textContent evita interpretar conteúdo editorial como HTML.
    for (const hit of hits) {
      const link = document.createElement('a');
      link.className = 'dg-choice';
      link.href = hit.url;

      const wrapper = document.createElement('span');
      const title = document.createElement('strong');
      const intro = document.createElement('small');

      title.textContent = hit.title;
      intro.textContent = hit.intro;
      wrapper.append(title, intro);
      link.append(wrapper);
      grid.append(link);
    }

    if (!hits.length) {
      grid.textContent = 'Experimente menos palavras ou outra expressão.';
    }
  } catch {
    // Falhas de rede/índice não bloqueiam a navegação pelos temas.
    const status = main.querySelector('.dg-lead');
    status.setAttribute('role','status');
    status.setAttribute('aria-live','polite');
    status.textContent =
      'Não foi possível efectuar a pesquisa. Consulte os temas ou tente novamente.';
  }
}
