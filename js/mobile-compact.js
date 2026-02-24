/* ============================================================
   MOBILE COMPACT — Feature Card Collapse (index.html only)
   Adds a "Show All Features" / "Show Less" toggle button
   on mobile. Does nothing on desktop.
   ============================================================ */

(function () {
    'use strict';

    // Only run on mobile-sized screens
    if (window.innerWidth >= 768) return;

    // Wait for the page to load
    document.addEventListener('DOMContentLoaded', function () {
        // Find the features row (the .row.g-4 inside #features)
        var featuresSection = document.getElementById('features');
        if (!featuresSection) return;

        var featuresRow = featuresSection.querySelector('.row.g-4');
        if (!featuresRow) return;

        // Count how many feature cards there are
        var cards = featuresRow.querySelectorAll('.col-md-6');
        if (cards.length <= 4) return; // No need for a button if 4 or fewer

        // Create the "Show All Features" button
        var btn = document.createElement('button');
        btn.className = 'show-all-features-btn';
        btn.type = 'button';
        btn.innerHTML = '<span>Show All Features (' + cards.length + ')</span> <i class="bi bi-chevron-down"></i>';

        // Insert the button right after the features row
        featuresRow.parentNode.insertBefore(btn, featuresRow.nextSibling);

        // Toggle on click
        var expanded = false;
        btn.addEventListener('click', function () {
            expanded = !expanded;

            if (expanded) {
                featuresRow.classList.add('features-expanded');
                btn.classList.add('expanded');
                btn.innerHTML = '<span>Show Less</span> <i class="bi bi-chevron-down"></i>';
            } else {
                featuresRow.classList.remove('features-expanded');
                btn.classList.remove('expanded');
                btn.innerHTML = '<span>Show All Features (' + cards.length + ')</span> <i class="bi bi-chevron-down"></i>';

                // Scroll back up to the features section so they're not lost
                featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();