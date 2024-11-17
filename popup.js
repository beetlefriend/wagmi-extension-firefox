document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggleButton");

    // Fetch the current state from storage and update the button text
    browser.storage.local.get("isHidden").then((data) => {
        const isHidden = data.isHidden ?? false;
        updateButtonText(isHidden);
    });

    // Add a click event listener to the button
    toggleButton.addEventListener("click", () => {
        browser.storage.local.get("isHidden").then((data) => {
            const isHidden = !data.isHidden;
            browser.storage.local.set({ isHidden }).then(() => {
                updateButtonText(isHidden);

                // Send a message to the content script to update the visibility
                browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
                    if (tabs[0]) {
                        browser.tabs.sendMessage(tabs[0].id, { action: "toggleVisibility" });
                    }
                });
            });
        });
    });

    // Function to update button text based on the current state
    function updateButtonText(isHidden) {
        toggleButton.textContent = isHidden ? "Disable Hiding" : "Enable Hiding";
    }
});
