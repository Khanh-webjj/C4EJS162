export default class CallBox {
    constructor(callBoxSelector) {
        this.callBox = document.querySelector(callBoxSelector);
        if (!this.callBox) return;

        this.searchInput = this.callBox.querySelector("input[type='text']");
        this.rows = [...this.callBox.querySelectorAll("tbody tr")];
        this.filterButtons = this.callBox.querySelectorAll("[data-filter]");

        this.activeFilter = "all";

        this.bindEvents();
    }

    bindEvents() {
        // search theo từng ký tự
        this.searchInput?.addEventListener("input", () => {
            this.applyFilters();
        });

        // click filter button
        this.filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                this.activeFilter = btn.dataset.filter;
                this.updateFilterUI(btn);
                this.applyFilters();
            });
        });
    }

    applyFilters() {
        const keyword = this.searchInput.value.trim().toLowerCase();

        this.rows.forEach(row => {
            const rowText = row.innerText.toLowerCase();

            // lấy account status từ cột thứ 3
            const statusCell = row.querySelector("td:nth-child(3) span");
            const accountStatus = statusCell
                ? statusCell.innerText.toLowerCase()
                : "";

            const matchKeyword = rowText.includes(keyword);
            const matchStatus =
                this.activeFilter === "all" ||
                accountStatus === this.activeFilter;

            row.classList.toggle("hidden", !(matchKeyword && matchStatus));
        });
    }

    updateFilterUI(activeBtn) {
        this.filterButtons.forEach(btn => {
            btn.classList.remove(
                "bg-blue-200",
                "text-blue-800",
                "border-blue-800"
            );
            btn.classList.add("border", "text-gray-600");
        });

        activeBtn.classList.add(
            "bg-blue-200",
            "text-blue-800",
            "border-blue-800"
        );
    }

    reset() {
        this.searchInput.value = "";
        this.activeFilter = "all";
        this.applyFilters();
    }
}


