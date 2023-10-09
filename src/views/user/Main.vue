<template>
    <div class="grid grid-cols-4 mt-6 mx-4">
        <div class="col-span-1 pr-4 border-r-2">
            <div class="flex justify-between">
                <h1 class="text-lg font-medium">Bản đánh giá của bạn</h1>
                <div class="flex justify-between gap-2">
                    <div class="relative inline-flex daterange-picker">
                        <VueDatePicker
                                v-model="theYearFilter.year"
                                auto-apply
                                class="w-28 text-center rounded-2xl"
                                @update:model-value="handleChangeYear"
                                year-picker
                        >
                        </VueDatePicker>
                    </div>
                </div>
            </div>
            <div
                    v-for="(report, index) in reportUserList"
                    :key="index"
                    class="mt-4 rounded-2xl w-150"
            >
                <a
                        href="#"
                        @click="handleTransferId(report.id)"
                        :class="{ 'bg-gray-300': id === report.id, 'bg-white': id !== report.id }"
                        class="block max-w-md p-5 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition"
                >
                    <div class="flex flex-row">
                        <div class="flex justify-start basis-3/4">
                            <div class="flex items-center">
                                <img
                                        alt=""
                                        class="w-8 h-8 mr-4"
                                        src="@/assets/images/word.png"
                                />
                            </div>
                            <div>
                                <h6
                                        class="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white"
                                >
                                    {{ limitFileName(report.name) }}
                                </h6>

                                <button
                                        type="button"
                                        :class="{
                    'bg-yellow-500': report.status === 'WAITING',
                    'bg-sky-500': report.status === 'ACCEPTED',
                    'bg-orange-500': report.status === 'SELF_EVALUATED',
                    'bg-emerald-500': report.status === 'MANAGER_EVALUATED',
                  }"
                                        class="bg-transparent text-center text-white rounded-2xl px-2 text-xs py-1 font-medium"
                                >
                                    {{ $t(`${statusDisplayName[report.status]}`) }}
                                </button>
                            </div>
                        </div>

                        <div class="flex justify-end items-center basis-1/4">
                            <div class="">
                                <p class="font-normal text-gray-700 dark:text-gray-400">
                                    {{ formatDate(report.createAt) }}
                                </p>
                                <div
                                        class="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full cursor-pointer relative"
                                >
                                    <img
                                            :src="report?.managerAvatarUrl"
                                            alt="Rounded avatar"
                                            class="w-8 h-8 rounded-full border-2 border-white object-cover"
                                    />
                                    <Tippy
                                            :key="report?.id"
                                            tag="div"
                                            :content="report?.managerName"
                                            class="w-10 z-10 h-10 flex items-center justify-center absolute rounded-full text-white bg-transparent right-0 top-0"
                                    />
                                </div>
                            </div>
                            <ChevronRightIcon></ChevronRightIcon>
                        </div>
                    </div>
                </a>
            </div>
            <!-- ko có record -->
            <div v-if="reportUserList.length <= 0"
                 class="text-sky-700 flex flex-col items-center justify-center p-6 font-medium text-2xl mt-[40%]">
                <img class="w-12 h-12 mb-4" src="/src/assets/images/icons8-empty-box-64.png" alt="">
                <span>Không có bản đánh giá nào!</span>
            </div>
            <div class="mt-4 mb-8" @click="gotoCreateJudgement">
                <button
                        type="button"
                        class="fixed left-0 ml-10 bottom-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    <FilePlusIcon></FilePlusIcon>
                </button>
            </div>
        </div>

        <div class="col-span-3">
            <DetailEvaluation v-if="id" :id="id"></DetailEvaluation>
            <div v-else><p class="font-medium text-xl text-center mt-[15%]">Chọn một bản đánh giá để xem chi tiết</p></div>
        </div>
    </div>
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import moment from "moment";
import ReportUserApi from "@/api/ReportUserApi";
import DetailEvaluation from "./DetailEvaluation.vue";
import {ReportStatus} from "@/common/StatusEnum";

export default {
    name: "Main",
    components: {VueDatePicker, DetailEvaluation},
    data() {
        return {
            id: '',
            reportUserList: [],
            theYearFilter: {
                year: new Date().getFullYear(),
            },
        };
    },
    created() {
        this.sortReportByYear();
    },
    computed: {
        statusDisplayName() {
            return {
                "": "Tất cả",
                ...ReportStatus,
            };
        },
    },
    methods: {
        handleTransferId(id) {
            this.id = id;
        },
        limitFileName(fileName) {
            const limit = 29;
            if (fileName.length > limit) {
                return fileName.substring(0, limit - 3) + "...";
            } else {
                return fileName;
            }
        },

        formatDate(date) {
            if (!date) {
                return "";
            }
            return moment(date).format("DD-MM-YYYY");
        },

        async sortReportByYear() {
            let params = {
                sort: "YEAR",
                direction: "ASC",
                page: 0,
                size: 10,
                year: this.theYearFilter.year,
                isAdmin: false,
            };
            try {
                const response = await ReportUserApi.getQuarterReportList(params);
                this.reportUserList = response.content;
            } catch (error) {
                console.log(error)
            }
        },
        async handleChangeYear(selectedYear) {
            this.theYearFilter.year = selectedYear.toString();
            await this.sortReportByYear();
        },
        gotoCreateJudgement() {
            this.$router.push("techport/create")
        }
    },
};
</script>

<style scoped>
.dp__input {
    border-radius: 10px !important;
}
</style>
