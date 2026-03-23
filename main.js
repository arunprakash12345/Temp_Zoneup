const header = document.getElementById('header');
const spacer = document.getElementById('headerSpacer');
const hamburger = document.getElementById('hamburger');
const mobileExpand = document.getElementById('mobileExpand');

// Spacer holds the header's space since it's always fixed
spacer.style.height = header.offsetHeight + 'px';

// Shrink header on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > spacer.offsetHeight) {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
});

// Toggle mobile menu expand
hamburger.addEventListener('click', () => {
  const isOpen = mobileExpand.classList.toggle('open');
  hamburger.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close on link click
mobileExpand.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileExpand.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Steps horizontal scroll on desktop
const stepsSection = document.getElementById('benefits');
const stepsTrack = document.getElementById('stepsTrack');

if (stepsSection && stepsTrack) {
  function updateStepsScroll() {
    if (window.innerWidth <= 768) {
      stepsTrack.style.transform = 'none';
      return;
    }

    const sectionRect = stepsSection.getBoundingClientRect();
    const sectionHeight = stepsSection.offsetHeight;
    const vh = window.innerHeight;

    // scrolled = how many px we've scrolled past the top of the section
    const scrolled = -sectionRect.top;
    // total scrollable distance within the section
    const scrollRange = sectionHeight - vh;

    if (scrollRange <= 0) return;

    const progress = Math.max(0, Math.min(1, scrolled / scrollRange));

    // total width of all cards + gaps
    const cards = stepsTrack.children;
    let totalWidth = 0;
    for (let i = 0; i < cards.length; i++) {
      totalWidth += cards[i].offsetWidth;
    }
    totalWidth += 28 * (cards.length - 1); // gap

    const containerWidth = stepsTrack.parentElement.clientWidth;
    const maxShift = Math.max(0, totalWidth - containerWidth);

    stepsTrack.style.transform = 'translateX(' + (-progress * maxShift) + 'px)';
  }

  window.addEventListener('scroll', function() {
    requestAnimationFrame(updateStepsScroll);
  }, { passive: true });
  window.addEventListener('resize', updateStepsScroll);

  // Run on load
  updateStepsScroll();
}

// FAQ accordion from JSON
const faqList = document.getElementById('faqList');

if (faqList) {
  fetch('./faq.json')
    .then(res => res.json())
    .then(faqs => {
      faqs.forEach(faq => {
        const item = document.createElement('div');
        item.className = 'faq-item';
        item.innerHTML =
          '<button class="faq-question">' +
            '<span>' + faq.question + '</span>' +
            '<span class="faq-icon">+</span>' +
          '</button>' +
          '<div class="faq-answer">' +
            '<div class="faq-answer-inner">' +
              '<p>' + faq.answer + '</p>' +
            '</div>' +
          '</div>';

        item.querySelector('.faq-question').addEventListener('click', function() {
          const wasOpen = item.classList.contains('open');
          // Close all others
          faqList.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
          // Toggle current
          if (!wasOpen) item.classList.add('open');
        });

        faqList.appendChild(item);
      });
    });
}


// Footer watermark glow on hover (desktop only)
const footerWatermark = document.getElementById('footerWatermark');
const watermarkText = footerWatermark ? footerWatermark.querySelector('.watermark-text') : null;

if (footerWatermark && watermarkText) {
  footerWatermark.addEventListener('mouseenter', function() {
    if (window.innerWidth > 768) {
      // glow will be set on mousemove
    }
  });

  footerWatermark.addEventListener('mousemove', function(e) {
    if (window.innerWidth > 768) {
      var rect = footerWatermark.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      watermarkText.style.background = 'radial-gradient(circle 400px at ' + x + 'px ' + y + 'px, rgba(67, 206, 162, 0.55) 0%, rgba(24, 90, 157, 0.3) 25%, rgba(67, 206, 162, 0.1) 50%, rgba(255, 255, 255, 0.06) 70%)';      watermarkText.style.webkitBackgroundClip = 'text';
      watermarkText.style.backgroundClip = 'text';
    }
  });

  footerWatermark.addEventListener('mouseleave', function() {
    if (window.innerWidth > 768) {
      watermarkText.style.background = 'rgba(255, 255, 255, 0.06)';
      watermarkText.style.webkitBackgroundClip = 'text';
      watermarkText.style.backgroundClip = 'text';
    }
  });
}
