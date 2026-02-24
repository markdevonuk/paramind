/* ============================================================
   MOBILE COMPACT — index.html only
   Feature card collapse + Pricing list collapse on mobile.
   Does nothing on desktop.
   ============================================================ */

(function () {
    'use strict';

    // Only run on mobile-sized screens
    if (window.innerWidth >= 768) return;

    document.addEventListener('DOMContentLoaded', function () {

        /* ==================== FEATURE CARDS COLLAPSE ==================== */
        var featuresSection = document.getElementById('features');
        if (featuresSection) {
            var featuresRow = featuresSection.querySelector('.row.g-4');
            if (featuresRow) {
                var cards = featuresRow.querySelectorAll('.col-md-6');
                if (cards.length > 4) {
                    // Create the "Show All Features" button
                    var featBtn = document.createElement('button');
                    featBtn.className = 'show-all-features-btn';
                    featBtn.type = 'button';
                    featBtn.innerHTML = '<span>Show All Features (' + cards.length + ')</span> <i class="bi bi-chevron-down"></i>';

                    // Insert after the features row
                    featuresRow.parentNode.insertBefore(featBtn, featuresRow.nextSibling);

                    var featExpanded = false;
                    featBtn.addEventListener('click', function () {
                        featExpanded = !featExpanded;
                        if (featExpanded) {
                            featuresRow.classList.add('features-expanded');
                            featBtn.classList.add('expanded');
                            featBtn.innerHTML = '<span>Show Less</span> <i class="bi bi-chevron-down"></i>';
                        } else {
                            featuresRow.classList.remove('features-expanded');
                            featBtn.classList.remove('expanded');
                            featBtn.innerHTML = '<span>Show All Features (' + cards.length + ')</span> <i class="bi bi-chevron-down"></i>';
                            featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    });
                }
            }
        }

        /* ==================== PRICING LISTS COLLAPSE ==================== */
        var pricingCards = document.querySelectorAll('.pricing-card');
        pricingCards.forEach(function (card) {
            var featureList = card.querySelector('.pricing-features');
            if (!featureList) return;

            // Create the "See what's included" button
            var priceBtn = document.createElement('button');
            priceBtn.className = 'see-whats-included-btn';
            priceBtn.type = 'button';
            priceBtn.innerHTML = '<i class="bi bi-chevron-down"></i> <span>See what\'s included</span>';

            // Insert the button directly before the feature list
            featureList.parentNode.insertBefore(priceBtn, featureList);

            var priceExpanded = false;
            priceBtn.addEventListener('click', function () {
                priceExpanded = !priceExpanded;
                if (priceExpanded) {
                    featureList.classList.add('pricing-list-expanded');
                    priceBtn.classList.add('expanded');
                    priceBtn.innerHTML = '<i class="bi bi-chevron-down"></i> <span>Hide details</span>';
                } else {
                    featureList.classList.remove('pricing-list-expanded');
                    priceBtn.classList.remove('expanded');
                    priceBtn.innerHTML = '<i class="bi bi-chevron-down"></i> <span>See what\'s included</span>';
                }
            });
        });

    });
})();