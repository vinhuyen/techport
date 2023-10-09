<template>
    <nav class="w-full sm:w-auto ">
        <ul class="pagination">
  

            <li class="page-item">
                <button class="page-link" @click="onClickPreviousPage" :disabled="isInFirstPage">
                    <ChevronLeftIcon class="w-4 h-4" />
                </button>
            </li>

            <!-- Visible Buttons Start -->

            <li class="page-item" v-for="page in pages" :key="page.name" :class="{ 'active': page.isDisabled }">
                <button class="page-link" type="button" @click="onClickPage(page.name)">
                    {{ page.name }}
                </button>
            </li>

            <!-- Visible Buttons End -->

            <li class="page-item">
                <button class="page-link" type="button" @click="onClickNextPage" :disabled="isInLastPage">
                    <ChevronRightIcon class="w-4 h-4" />
                </button>
            </li>

        </ul>
    </nav>
</template>

<script>
export default {
    props: {
        maxVisibleButtons: {
            type: Number,
            required: false,
            default: 3,
        },
        totalPages: {
            type: Number,
            required: true,
        },
        perPage: {
            type: Number,
            required: true,
        },
        currentPage: {
            type: Number,
            required: true,
        },
    },
    computed: {
        startPage() {
            // When on the first page

            if (this.currentPage === 1) {
                return 1;
            }
            // When on the last page
            // if (this.currentPage === this.totalPages) {
            //     return this.totalPages - this.maxVisibleButtons;
            // }
            // When inbetween
            return this.currentPage - 1;
        },
        pages() {
            const range = [];

            for (
                let i = this.startPage;
                i <=
                Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
                i++
            ) {
                range.push({
                    name: i,
                    isDisabled: i === this.currentPage,
                });
            }

            return range;
        },
        isInFirstPage() {
            return this.currentPage === 1;
        },
        isInLastPage() {
            return this.currentPage === Number(this.totalPages);
        },
    },
    methods: {
        onClickFirstPage() {
            this.$emit('pagechanged', 1);
        },
        onClickPreviousPage() {
            this.$emit('pagechanged', this.currentPage - 1);
        },
        onClickPage(page) {
            this.$emit('pagechanged', page);
        },
        onClickNextPage() {
            this.$emit('pagechanged', this.currentPage + 1);
        },
        onClickLastPage() {
            this.$emit('pagechanged', this.totalPages);
        }
    }
};
</script>