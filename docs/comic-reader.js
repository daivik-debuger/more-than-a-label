const reader = document.getElementById('reader');

if (reader) {
  const image = document.getElementById('reader-image');
  const caption = document.getElementById('reader-caption');
  const count = document.getElementById('reader-count');
  const fullImage = document.getElementById('reader-full-image');
  const previousButtons = [...reader.querySelectorAll('[data-reader-prev]')];
  const nextButtons = [...reader.querySelectorAll('[data-reader-next]')];
  const pages = [
    {
      src: image.src,
      width: 940,
      height: 1674,
      alt: image.alt,
      caption: 'Cover: More Than a Label',
      count: 'Cover · Page 1 of 2',
    },
    {
      src: document.getElementById('reader-strip-source').href,
      width: 542,
      height: 964,
      alt: 'Color comic showing a young person facing a judge and limited choices, contrasted with a white boy offered the American Dream. The final panel says: I see you.',
      caption: 'The comic strip',
      count: 'Comic strip · Page 2 of 2',
    },
  ];
  let page = window.location.hash === '#strip' ? 1 : 0;

  function showPage() {
    const selected = pages[page];
    image.src = selected.src;
    image.width = selected.width;
    image.height = selected.height;
    image.alt = selected.alt;
    caption.textContent = selected.caption;
    count.textContent = selected.count;
    fullImage.href = selected.src;
    previousButtons.forEach((button) => { button.disabled = page === 0; });
    nextButtons.forEach((button) => { button.disabled = page === pages.length - 1; });
  }

  previousButtons.forEach((button) => button.addEventListener('click', () => {
    if (page > 0) { page -= 1; showPage(); }
  }));
  nextButtons.forEach((button) => button.addEventListener('click', () => {
    if (page < pages.length - 1) { page += 1; showPage(); }
  }));

  reader.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' && page < pages.length - 1) {
      page += 1;
      showPage();
      event.preventDefault();
    } else if (event.key === 'ArrowLeft' && page > 0) {
      page -= 1;
      showPage();
      event.preventDefault();
    }
  });

  showPage();
}
