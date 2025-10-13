document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const viewButtons = document.querySelectorAll('.view-btn');
    const popup = document.getElementById('document-popup');
    const closeBtn = document.querySelector('.close-btn');
    const documentFrame = document.getElementById('document-frame');
    const downloadLink = document.getElementById('download-link');
    const popupTitle = document.getElementById('popup-title');

    // Add click event to all document view buttons
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get document data
            const documentUrl = this.getAttribute('data-document');
            const documentTitle = this.parentElement.querySelector('h2').textContent;
            
            // Set the document URL in the iframe using Google Docs Viewer
            documentFrame.src = `https://docs.google.com/viewer?url=${encodeURIComponent(documentUrl)}&embedded=true`;
            
            // Set download link
            downloadLink.href = documentUrl;
            
            // Set popup title
            popupTitle.textContent = documentTitle;
            
            // Show popup
            popup.style.display = 'block';
            
            // Prevent scrolling on the body when popup is open
            document.body.style.overflow = 'hidden';
        });
    });

    // Close popup when clicking the close button
    closeBtn.addEventListener('click', closePopup);

    // Close popup when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === popup) {
            closePopup();
        }
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && popup.style.display === 'block') {
            closePopup();
        }
    });
    
    // Function to close popup
    function closePopup() {
        popup.style.display = 'none';
        documentFrame.src = '';
        document.body.style.overflow = 'auto';
    }
});
