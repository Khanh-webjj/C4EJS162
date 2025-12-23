export default class CallBox {
    constructor(callBoxSelector) {
        this.callBox = document.querySelector(callBoxSelector);
        if (!this.callBox) return;

        this.searchInput = this.callBox.querySelector("input[type='text']");
        this.rows = [...this.callBox.querySelectorAll("tbody tr")];
        this.filterButtons = [...this.callBox.querySelectorAll("[data-filter]")];

        this.activeFilter = "all";

        this.bindEvents();
        this.updateFilterUI(); // render trạng thái ban đầu
    }

    bindEvents() {
        this.searchInput?.addEventListener("input", () => {
            this.applyFilters();
        });

        this.filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                this.activeFilter = btn.dataset.filter;
                this.updateFilterUI();   //  render theo state
                this.applyFilters();
            });
        });
    }

    applyFilters() {
        const keyword = this.searchInput.value.trim().toLowerCase();

        this.rows.forEach(row => {
            const phone = row.querySelector("a")?.innerText.toLowerCase() || "";
            const name = row.querySelector("p")?.innerText.toLowerCase() || "";

            const matchSearch =
                phone.includes(keyword) ||
                name.includes(keyword);

            const statusCell = row.querySelector("td:nth-child(3) span");
            const accountStatus = statusCell
                ? statusCell.innerText.toLowerCase()
                : "";

            const matchStatus =
                this.activeFilter === "all" ||
                accountStatus === this.activeFilter;

            row.classList.toggle("hidden", !(matchSearch && matchStatus));
        });
    }

    updateFilterUI() {
        this.filterButtons.forEach(btn => {
            const isActive = btn.dataset.filter === this.activeFilter;

            btn.classList.toggle("bg-blue-200", isActive);
            btn.classList.toggle("text-blue-800", isActive);
            btn.classList.toggle("border-blue-800", isActive);

            btn.classList.toggle("text-gray-600", !isActive);
        });
    }

    reset() {
        this.searchInput.value = "";
        this.activeFilter = "all";
        this.updateFilterUI();
        this.applyFilters();
    }
}



