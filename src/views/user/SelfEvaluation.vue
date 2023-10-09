<template>
    <Loading :show-loading="loadingAction"/>
    <div
            id="success-notification-content"
            class="toastify-content toastify-content-update hidden flex"
    >
        <CheckCircleIcon class="text-success"/>
        <div class="ml-1 mr-2 message-toast">
            <div class="text-slate-500">Cập nhập tự đánh giá chi tiết thành công</div>
        </div>
    </div>
    <div class="mt-5">
        <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Đánh giá tổng quát <span class="error-message">*</span></label
        >
        <textarea
                id="message"
                rows="4"
                class="block p-2.5 w-[1240px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                v-model="generalEvaluation"
                @change="hideMessage()"
        ></textarea>
        <div v-if="errors.showValidGeneral" class="error-message font-bold">
            Đánh giá tổng quát không được để trống
        </div>
    </div>
    <div class="grid grid-cols-2">
        <div class="col-span-1 mt-5">
            <label
                    for="message"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Điểm yếu <span class="error-message">*</span></label
            >
            <textarea
                    id="message"
                    rows="4"
                    class="mr-4 p-2.5 w-[620px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    v-model="weakness"
                    @change="hideMessage()"
            ></textarea>
            <div v-if="errors.showValidWeakness" class="error-message font-bold">
                Điểm yếu không được để trống
            </div>
        </div>
        <div class="col-span-1 mt-5">
            <label
                    for="message"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Cách khắc phục <span class="error-message">*</span></label
            >
            <textarea
                    id="message"
                    rows="4"
                    class="w-[620px] p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    v-model="resolveSolution"
                    @change="hideMessage()"
            ></textarea>
            <div v-if="errors.showValidResolveSolution" class="error-message font-bold">
                Cách khắc phục không được để trống
            </div>
        </div>
    </div>
    <div class="mt-5">
        <Form @submit="handleSubmit" enctype="multipart/form-data">
            <table class="table-auto table">
                <thead class="bg-gray-200">
                <tr>
                    <th class="font-bold">PHẨM CHẤT</th>
                    <th class="font-bold">ĐÁNH GIÁ</th>
                </tr>
                </thead>
                <tbody>
                <tr
                        v-for="(evaluate, index) in evaluateList"
                        :key="index"
                        @change="hideMessage()"
                >
                    <td>{{ evaluate.quality }} <span class="error-message">*</span></td>
                    <td>
                        <div class="grid grid-cols-5">
                            <div class="col-span-1">
                                <input
                                        type="radio"
                                        v-model="evaluate.selected"
                                        value='1'
                                        class="cursor-pointer mr-2"
                                />Thất vọng
                            </div>
                            <div class="col-span-1">
                                <input
                                        class="mr-2 cursor-pointer"
                                        type="radio"
                                        v-model="evaluate.selected"
                                        value='2'
                                />Không hài lòng
                            </div>
                            <div class="col-span-1">
                                <input
                                        type="radio"
                                        v-model="evaluate.selected"
                                        value='3'
                                        class="mr-2 cursor-pointer"
                                />Hài lòng
                            </div>
                            <div class="col-span-1">
                                <input
                                        type="radio"
                                        v-model="evaluate.selected"
                                        value='4'
                                        class="cursor-pointer mr-2"
                                />Tốt
                            </div>
                            <div class="col-span-1">
                                <input
                                        type="radio"
                                        v-model="evaluate.selected"
                                        value='5'
                                        class="cursor-pointer mr-2"
                                />Rất tốt
                            </div>
                        </div>

                        <div v-if="evaluate.messageValid" class="error-message font-bold">
                            Đây là một trường bắt buộc
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="flex justify-end mt-6">
                <button
                        type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    Gửi
                </button>
            </div>
            <br/>
        </Form>
    </div>
</template>
<script>
import {Form} from "vee-validate";
import ReportApi from "@/api/ReportApi";
import Toastify from "toastify-js";
import Loading from "@/components/loading/Loading.vue";
import {mapGetters} from "vuex";

export default {
    name: "SelfEvaluation",
    components: {Loading, Form},
    props: ["id"],
    data() {
        return {
            errors: {
                showValidGeneral: false,
                showValidDetail: false,
                showValidWeakness: false,
                showValidResolveSolution: false,
            },
            generalEvaluation: "",
            weakness: "",
            resolveSolution: "",
            evaluateList: [
                {
                    quality: "Phát huy hết khả năng",
                    selected: null,
                    messageValid: false,

                },
                {
                    quality: "Chất lượng công việc",
                    selected: null,
                    messageValid: false,
                },
                {
                    quality: "Nhất quán trong công việc",
                    selected: null,
                    messageValid: false,
                },
                {quality: "Giao tiếp", selected: null, messageValid: false},
                {quality: "Làm việc độc lập", selected: null, messageValid: false},
                {quality: "Chủ động", selected: null, messageValid: false},
                {quality: "Năng suất", selected: null, messageValid: false},
                {quality: "Sáng tạo", selected: null, messageValid: false},
                {quality: "Trung thực", selected: null, messageValid: false},
                {
                    quality: "Quan hệ với đồng nghiệp",
                    selected: null,
                    messageValid: false,
                },
                {
                    quality: "Quan hệ với khách hàng",
                    selected: null,
                    messageValid: false,
                },
                {quality: "Kỹ năng chuyên môn", selected: null, messageValid: false},
                {quality: "Độ tin cậy", selected: null, messageValid: false},
                {quality: "Đúng giờ", selected: null, messageValid: false},
                {quality: "Đi làm đầy đủ", selected: null, messageValid: false},
            ],
        };
    },
    computed: {
        selectedValues() {
            return this.evaluateList
                .filter((evaluate) => evaluate.selected !== null)
                .map((evaluate) => `${evaluate.selected}`)
                .join(",");
        },
        allDetailEvaluationSelected() {
            return this.evaluateList.every((evaluate) => evaluate.selected !== null);
        },

        showErrMessDetailEvaluation() {
            if (this.allDetailEvaluationSelected) {
                return false;
            } else {
                for (let i = 0; i < this.evaluateList.length; i++) {
                    this.evaluateList[i].messageValid =
                        this.evaluateList[i].selected === null;
                }
            }
            return true;
        },
        showErrMessGeneralEvaluation() {
            if (this.generalEvaluation) {
                this.errors.showValidGeneral = false;
                return false;
            }

            this.errors.showValidGeneral = true;
            return true;
        },

        showErrMessWeakness() {
            if (this.weakness) {
                this.errors.showValidWeakness = false;
                return false;
            }

            this.errors.showValidWeakness = true;
            return true;
        },

        showErrMessResolveSolution() {
            if (this.resolveSolution) {
                this.errors.showValidResolveSolution = false;
                return false;
            }

            this.errors.showValidResolveSolution = true;
            return true;
        },
        ...mapGetters({
            loadingAction: "general/getLoadingStatus"
        })
    },

    methods: {
        hideMessage() {
            this.evaluateList.forEach(item => item.selected && (item.messageValid = false));
            this.errors.showValidGeneral = this.generalEvaluation ? false : this.errors.showValidGeneral;
            this.errors.showValidWeakness = this.weakness ? false : this.errors.showValidWeakness;
            this.errors.showValidResolveSolution = this.resolveSolution ? false : this.errors.showValidResolveSolution;
        },
        hasErrors() {
            return this.showErrMessDetailEvaluation || this.showErrMessGeneralEvaluation || this.showErrMessWeakness || this.showErrMessResolveSolution;
        },
        resetData() {
            if (
                !this.showErrMessDetailEvaluation &&
                !this.showErrMessGeneralEvaluation &&
                !this.showErrMessWeakness &&
                !this.showErrMessResolveSolution
            ) {
                this.evaluateList.forEach((evaluate) => (evaluate.selected = null));
                this.generalEvaluation = "";
                this.weakness = "";
                this.resolveSolution = "";
            }
        },
        async handleSubmit() {
            const reportId = this.id;
            let params = {
                generalEvaluation: this.generalEvaluation,
                detailEvaluation: this.selectedValues,
                resolveSolution: this.resolveSolution,
                weakness: this.weakness,
            };

            //this.hasErrors();

            if (this.hasErrors()) {
                return;
            }
            this.$store.dispatch("general/activeLoading")

            try {
                const response = await ReportApi.createSelfEvaluation(
                    reportId,
                    JSON.stringify(params)
                );
                if (response.status === 201) {
                    Toastify({
                        node: dom("#success-notification-content")
                            .clone()
                            .removeClass("hidden")[0],
                        duration: 3000,
                        newWindow: true,
                        close: true,
                        gravity: "top",
                        position: "right",
                        stopOnFocus: true,
                    }).showToast();
                }
                this.resetData();
            } catch (e) {
                console.log(e)
            } finally {
                this.$store.dispatch("general/deactivateLoading")
            }
        },
    },
};
</script>
<style scoped>
.invalid-feedback {
    color: #ff3e72;
}
</style>
