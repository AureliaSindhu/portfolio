function showAlert() {
    alert ("Hi There! Please open this web using desktop size or larger device since I am still trying to make it more responsive. Thanks you so much!");
}

// funzies
document.addEventListener('DOMContentLoaded', () => {
    let progress = 50;
    let startX = 0;
    let active = 0;
    let isDown = false;

    const speedWheel = 0.02;
    const speedDrag = -0.1;

    //getZindex function 
    const getZindex = (array, index) => array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i));

    const $items = document.querySelectorAll('.funItem');
    const $cursors = document.querySelectorAll('.cursor');

    const displayItems = (item, index, active) => {
        const zIndex = getZindex([...$items], active)[index];
        item.style.setProperty('--zIndex', zIndex);
        item.style.setProperty('--active', (index - active) / $items.length);
    };

    const animate = () => {
        progress = Math.max(0, Math.min(progress, 100));
        active = Math.floor(progress / 100 * ($items.length - 1));
        $items.forEach((item, index) => displayItems(item, index, active));
    };
    animate();

    $items.forEach((item, i) => {
        item.addEventListener('click', () => {
            progress = (i / $items.length) * 100 + 10;
            animate();
        });
    });

    const handleWheel = e => {
        const wheelProgress = e.deltaY * speedWheel;
        progress += wheelProgress;
        animate();
    };

    const handleMouseMove = e => {
        if (!isDown) return;
        const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        const mouseProgress = (x - startX) * speedDrag;
        progress += mouseProgress;
        startX = x;
        animate();
    };

    const handleMouseDown = e => {
        isDown = true;
        startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    };

    const handleMouseUp = () => {
        isDown = false;
    };

    document.addEventListener('mousewheel', handleWheel);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchstart', handleMouseDown);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('touchend', handleMouseUp);
});

// Project -- filter
function filterSelection(category) {
    var columns = document.querySelectorAll('.column');
    columns.forEach(function (column) {
        if (category === '' || category === 'all' || column.classList.contains(category)) {
            column.style.display = 'block';
        } else {
            column.style.display = 'none';
        }
    });
}

// Call filterSelection('') to show all items by default
document.addEventListener('DOMContentLoaded', () => {
    filterSelection(''); // Show all items by default
});

// Event listener for category filter
document.getElementById('categoryFilter').addEventListener('change', function() {
    filterSelection(this.value);
});

// Toggle the dropdown menu
function toggleDropdown() {
    document.getElementById("categoryDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.querySelectorAll(".dropdown-content");
        dropdowns.forEach(function(dropdown) {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        });
    }
};

// sooth scroll
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            // Calculate offset position
            const offsetPosition = targetElement.offsetTop - document.querySelector('.navbar').offsetHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
});
