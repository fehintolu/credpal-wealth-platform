(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    navLinks.classList.toggle('open', !open);
  });
  navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    reveals.forEach(el => observer.observe(el));
  } else reveals.forEach(el => el.classList.add('visible'));

  const atomTabs = document.querySelectorAll('.atom-tab');
  atomTabs.forEach(tab => tab.addEventListener('click', () => {
    atomTabs.forEach(item => { item.classList.remove('active'); item.setAttribute('aria-selected', 'false'); });
    document.querySelectorAll('.atom-panel').forEach(panel => { panel.classList.remove('active'); panel.hidden = true; });
    tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
    const panel = document.getElementById(tab.dataset.panel); panel.hidden = false; panel.classList.add('active');
  }));

  const infraCopy = {
    build: ['BUILD WITH ATOM', 'You own the experience.<br>Atom connects the infrastructure.', 'Use APIs or white-label capabilities to add market access and eligible asset-backed liquidity to your product.', 'Speak with the team'],
    lend: ['PARTNER AS A LENDER', 'Put capital to work.<br>Open a new channel.', 'Connect institutional funding capacity with eligible investment-backed liquidity opportunities, within a risk-managed framework.', 'Discuss a capital partnership'],
    trade: ['TRADE WITH ATOM', 'More markets.<br>One business account.', 'Explore local and global investment opportunities for eligible company capital through the Atom ecosystem.', 'Explore business trading']
  };
  document.querySelectorAll('.infra-tab').forEach(tab => tab.addEventListener('click', () => {
    document.querySelectorAll('.infra-tab').forEach(item => item.classList.remove('active')); tab.classList.add('active');
    const [label, title, text, link] = infraCopy[tab.dataset.infra];
    document.getElementById('infra-content').innerHTML = `<span>${label}</span><h3>${title}</h3><p>${text}</p><a href="#start" class="card-link">${link} <b>→</b></a>`;
  }));

  const range = document.getElementById('portfolio-range');
  const portfolioValue = document.getElementById('portfolio-value');
  const liquidityValue = document.getElementById('liquidity-value');
  const money = value => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(value);
  range?.addEventListener('input', () => { portfolioValue.textContent = money(+range.value); liquidityValue.textContent = money(+range.value * .4); });

  const fxFrom = document.getElementById('fx-from');
  const fxTo = document.getElementById('fx-to');
  fxFrom?.addEventListener('input', () => { fxTo.value = ((+fxFrom.value || 0) / 1499.25).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); });

  const toast = document.getElementById('toast');
  let toastTimer;
  const showToast = message => { toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2800); };
  document.getElementById('fx-demo')?.addEventListener('click', () => showToast('Atom FX is shown as a concept preview in this prototype.'));

  document.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', () => {
    if (detail.open) document.querySelectorAll('details').forEach(other => { if (other !== detail) other.open = false; });
  }));
})();
