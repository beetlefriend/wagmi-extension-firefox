// Function to hide the target element
function hideElement() {
    const elements = document.querySelectorAll(
        '.p-show__widget__tab.js-tabs__tab[data-tab-id="sell"]'
    );
    elements.forEach(element => {
        element.style.display = 'none';
    });
}

// Function to show the target element
function showElement() {
    const elements = document.querySelectorAll(
        '.p-show__widget__tab.js-tabs__tab[data-tab-id="sell"]'
    );
    elements.forEach(element => {
        element.style.display = '';
    });
}

// Listen for messages from popup.js
browser.runtime.onMessage.addListener((message) => {
    if (message.action === "toggleVisibility") {
        browser.storage.local.get("isHidden").then((data) => {
            if (data.isHidden) {
                hideElement();
            } else {
                showElement();
            }
        });
    }
});

// Check the stored state on page load and hide/show elements accordingly
browser.storage.local.get("isHidden").then((data) => {
    if (data.isHidden) {
        hideElement();
    } else {
        showElement();
    }
});
