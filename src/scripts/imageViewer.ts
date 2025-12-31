// Image viewer functionality for prose images
// Handles modal open/close, keyboard navigation, focus management

let previousFocus: HTMLElement | null = null;

function openViewer(imageSrc: string, imageAlt: string) {
  const viewer = document.getElementById('image-viewer');
  const viewerImage = document.getElementById('viewer-image') as HTMLImageElement;

  if (!viewer || !viewerImage) return;

  // Save current focus for restoration
  previousFocus = document.activeElement as HTMLElement;

  // Set image
  viewerImage.src = imageSrc;
  viewerImage.alt = imageAlt;

  // Show viewer
  viewer.classList.add('active');
  viewer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('viewer-open');

  // Set focus to close button
  const closeButton = viewer.querySelector('.viewer-close') as HTMLElement;
  if (closeButton) {
    closeButton.focus();
  }

  // Announce to screen readers
  announceToScreenReader('Image viewer opened');
}

function closeViewer() {
  const viewer = document.getElementById('image-viewer');

  if (!viewer) return;

  // Hide viewer
  viewer.classList.remove('active');
  viewer.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('viewer-open');

  // Restore focus
  if (previousFocus) {
    previousFocus.focus();
    previousFocus = null;
  }

  // Announce to screen readers
  announceToScreenReader('Image viewer closed');
}

function announceToScreenReader(message: string) {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

function trapFocus(event: KeyboardEvent) {
  const viewer = document.getElementById('image-viewer');
  if (!viewer || !viewer.classList.contains('active')) return;

  const focusableElements = viewer.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.key === 'Tab') {
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Add click listeners to all prose images
  const proseImages = document.querySelectorAll<HTMLImageElement>('.prose img');

  proseImages.forEach((img) => {
    img.addEventListener('click', () => {
      openViewer(img.src, img.alt || '');
    });
  });

  // Close button
  const closeButton = document.querySelector('.viewer-close');
  if (closeButton) {
    closeButton.addEventListener('click', closeViewer);
  }

  // Click outside image to close
  const overlay = document.querySelector('.viewer-overlay');
  if (overlay) {
    overlay.addEventListener('click', closeViewer);
  }

  // Click on image to close
  const viewerImage = document.getElementById('viewer-image');
  if (viewerImage) {
    viewerImage.addEventListener('click', closeViewer);
  }

  // ESC key to close
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const viewer = document.getElementById('image-viewer');
      if (viewer?.classList.contains('active')) {
        closeViewer();
      }
    }
  });

  // Focus trap
  document.addEventListener('keydown', trapFocus);
});
