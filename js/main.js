const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const siteHeader = document.getElementById('siteHeader');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  siteHeader.classList.toggle('is-scrolled', window.scrollY > 8);
}, { passive: true });

document.getElementById('year').textContent = new Date().getFullYear();

const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

const roiSpend = document.getElementById('roiSpend');
const roiPercent = document.getElementById('roiPercent');
const roiPercentLabel = document.getElementById('roiPercentLabel');
const roiMonthlySavings = document.getElementById('roiMonthlySavings');
const roiAnnualSavings = document.getElementById('roiAnnualSavings');

if (roiSpend && roiPercent) {
  const formatCurrency = (amount) =>
    amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  const updateRoi = () => {
    const spend = Math.max(0, Number(roiSpend.value) || 0);
    const percent = Number(roiPercent.value);
    const monthlySavings = spend * (percent / 100);
    roiPercentLabel.textContent = `${percent}%`;
    roiMonthlySavings.textContent = formatCurrency(monthlySavings);
    roiAnnualSavings.textContent = formatCurrency(monthlySavings * 12);
  };

  roiSpend.addEventListener('input', updateRoi);
  roiPercent.addEventListener('input', updateRoi);
  updateRoi();
}
