function showInfo(name) {
    alert("Sneaker Info: " + name);
}
// ---------- LIGHTBOX ----------
document.addEventListener("DOMContentLoaded", () => {
    const sneakers = document.querySelectorAll(".sneaker img");
    const lightbox = document.createElement("div");

    lightbox.id = "lightbox";
    document.body.appendChild(lightbox);

    lightbox.style.position = "fixed";
    lightbox.style.top = "0";
    lightbox.style.left = "0";
    lightbox.style.width = "100%";
    lightbox.style.height = "100%";
    lightbox.style.background = "rgba(0,0,0,0.9)";
    lightbox.style.display = "none";
    lightbox.style.justifyContent = "center";
    lightbox.style.alignItems = "center";
    lightbox.style.zIndex = "1000";

    const img = document.createElement("img");
    img.style.maxWidth = "90%";
    img.style.maxHeight = "90%";
    img.style.borderRadius = "12px";
    img.style.boxShadow = "0 5px 20px rgba(0,0,0,.5)";
    lightbox.appendChild(img);

    sneakers.forEach(sneaker => {
        sneaker.addEventListener("click", () => {
            img.src = sneaker.src;
            lightbox.style.display = "flex";
        });
    });

    lightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });
});

// ---------- SEARCH FILTER ----------
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector("#searchBar");
    if (!searchInput) return;

    searchInput.addEventListener("keyup", () => {
        const filter = searchInput.value.toLowerCase();
        const sneakers = document.querySelectorAll(".sneaker");

        sneakers.forEach(sneaker => {
            const text = sneaker.innerText.toLowerCase();
            if (text.includes(filter)) {
                sneaker.style.display = "";
            } else {
                sneaker.style.display = "none";
            }
        });
    });
});

// ---------- HOVER NAME REVEAL ----------
document.addEventListener("DOMContentLoaded", () => {
    const sneakers = document.querySelectorAll(".sneaker");

    sneakers.forEach(sneaker => {
        const name = sneaker.querySelector("p");
        name.style.opacity = "0";
        name.style.transition = "opacity 0.3s ease";

        sneaker.addEventListener("mouseenter", () => {
            name.style.opacity = "1";
        });
        sneaker.addEventListener("mouseleave", () => {
            name.style.opacity = "0";
        });
    });
});
// ---------- SNEAKER COMPARISON ----------
document.addEventListener("DOMContentLoaded", () => {
    const compareCheckboxes = document.querySelectorAll(".compare-checkbox");

    // Create comparison box dynamically
    const comparisonBox = document.createElement("div");
    comparisonBox.id = "comparisonBox";
    comparisonBox.innerHTML = `
        <h3>Comparison</h3>
        <div id="comparisonContent"></div>
        <button id="closeComparison">Close</button>
    `;
    document.body.appendChild(comparisonBox);

    const comparisonContent = document.getElementById("comparisonContent");
    const closeBtn = document.getElementById("closeComparison");

    let selectedSneakers = [];

    compareCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const sneaker = checkbox.closest(".sneaker");
            const name = sneaker.querySelector("p").innerText;
            const imgSrc = sneaker.querySelector("img").src;

            if (checkbox.checked) {
                if (selectedSneakers.length < 2) {
                    selectedSneakers.push({ name, imgSrc });
                } else {
                    checkbox.checked = false;
                    alert("You can only compare 2 sneakers at a time.");
                }
            } else {
                selectedSneakers = selectedSneakers.filter(item => item.name !== name);
            }

            updateComparison();
        });
    });

    function updateComparison() {
        if (selectedSneakers.length === 2) {
            comparisonContent.innerHTML = selectedSneakers.map(item => `
                <div class="compared-item">
                    <img src="${item.imgSrc}" alt="${item.name}">
                    <p><strong>${item.name}</strong></p>
                </div>
            `).join("");
            comparisonBox.style.display = "block";
        } else {
            comparisonBox.style.display = "none";
        }
    }

    closeBtn.addEventListener("click", () => {
        comparisonBox.style.display = "none";
        selectedSneakers = [];
        compareCheckboxes.forEach(cb => cb.checked = false);
    });
});
// ---------- FAVORITES ----------
document.addEventListener("DOMContentLoaded", () => {
    const favButtons = document.querySelectorAll(".fav-btn");

    // Load favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Update button icons based on saved favorites
    function updateFavIcons() {
        favButtons.forEach(btn => {
            const sneakerName = btn.parentElement.querySelector("p").innerText;
            if (favorites.includes(sneakerName)) {
                btn.textContent = "❤️"; // filled
            } else {
                btn.textContent = "🤍"; // blank
            }
        });
    }

    updateFavIcons();

    // Toggle favorites
    favButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const sneakerName = btn.parentElement.querySelector("p").innerText;

            if (favorites.includes(sneakerName)) {
                // Remove from favorites
                favorites = favorites.filter(item => item !== sneakerName);
            } else {
                // Add to favorites
                favorites.push(sneakerName);
            }

            // Save to localStorage
            localStorage.setItem("favorites", JSON.stringify(favorites));
            updateFavIcons();
        });
    });
});
// -------- Search Bar Functionality --------
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const sneakers = document.querySelectorAll('.sneaker');
    sneakers.forEach(sneaker => {
        const name = sneaker.querySelector('p').textContent.toLowerCase();
        sneaker.style.display = name.includes(query) ? 'flex' : 'none';
    });
});

// -------- Filter Buttons Functionality --------
function filterSneakers(category) {
    const sneakers = document.querySelectorAll('.sneaker');
    sneakers.forEach(sneaker => {
        const sneakerCategory = sneaker.getAttribute('data-category');
        if (category === '' || sneakerCategory === category) {
            sneaker.style.display = 'flex';
        } else {
            sneaker.style.display = 'none';
        }
    });
}

// Homepage search filter
document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("searchBar");
    const linkBoxes = document.querySelectorAll(".link-box");

    if (searchBar) {
        searchBar.addEventListener("input", () => {
            const query = searchBar.value.toLowerCase();

            linkBoxes.forEach(box => {
                const text = box.innerText.toLowerCase();
                if (text.includes(query)) {
                    box.style.display = "block";
                } else {
                    box.style.display = "none";
                }
            });
        });
    }
});
