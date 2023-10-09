<template>
    <Loading :show-loading="loadingAction"/>
    <div id="success-notification-content" class="toastify-content toastify-content-update hidden flex">
        <CheckCircleIcon class="text-success"/>
        <div class="ml-1 mr-2 message-toast">
            <div class="text-slate-500">
                Gửi đánh giá thành công
            </div>
        </div>
    </div>
    <div id="fail-notification-content" class="toastify-content toastify-content-update hidden flex">
        <XCircleIcon class="text-danger"/>
        <div class="ml-1 mr-2 message-toast">
            <div class="text-slate-500">
                Có lỗi trong quá trình gửi đánh giá
            </div>
        </div>
    </div>
    <div id="exist-notification-content" class="toastify-content toastify-content-update hidden flex">
        <XCircleIcon class="text-danger"/>
        <div class="ml-1 mr-2 message-toast">
            <div class="text-slate-500">
                Đã tồn tại bảng đánh giá trong {{ this.Quarter[selectedQuarter] }}/{{ this.selectedYear }}
            </div>
        </div>
    </div>
    <div class="flex col-span-3 gap-5 bg-white px-6 mt-2 pt-2 border-b">
        <div class="flex mb-2 input__time">
            <label class="label__width flex items-center font-medium mr-1">Quý:</label>
            <select
                    v-model="selectedQuarter"
                    id="tabulator-html-filter-field"
                    class="form-select ml-3"
            >
                <option
                        v-for="(displayName, quarterValue) in Quarter"
                        :key="quarterValue"
                        :value="quarterValue">{{ $t(displayName) }}
                </option>
            </select>
        </div>
        <div class="flex items-center mb-2 input__time">
            <label class="flex items-center font-medium mr-4">Năm:</label>
            <div class="flex">
                <VueDatePicker
                        v-model="selectedYear"
                        auto-apply class="w-28 text-center"
                        year-picker
                />
            </div>
        </div>
    </div>
    <div class="grid grid-cols-12 gap-6 bg-white">
        <div class="col-span-3">
            <div class="border-r pb-10 scrollable__left">
                <div class="">
                    <h2 class="font-medium m-6 uppercase text__title--big">MỤC TIÊU CỦA TECHZEN</h2>
                    <div class="flex flex-col gap-3 justify-center mx-6 font-medium">
                        <ItemContainer :data="techZenGoalList"/>
                    </div>

                </div>
                <div class="">
                    <h2 class="font-medium m-6 uppercase text__title--big">MỤC TIÊU CỦA BỘ PHẬN</h2>
                    <div class="flex flex-col gap-3 justify-center mx-6 font-medium">
                        <ItemContainer :data="departmentGoalList"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-9">
            <h2 class="font-medium mx-6 mt-6 border-b text__title--big"> MỤC TIÊU CÁ NHÂN </h2>
            <div class="scrollable">
                <div>
                    <TargetContainer :data="targetList"/>
                </div>
            </div>
            <div class="flex justify-end gap-4 my-4">
                <button class="btn w-32 bg-gray-600 text-white" @click="handleTriggerAddNew">Thêm mục tiêu</button>
                <button class="btn w-28 bg-primary text-white" @click="handleSubmit">Lưu đánh giá</button>
                <button class="btn w-28">Hủy</button>
            </div>
        </div>
    </div>
</template>

<script>
import ItemContainer from "@/components/judgement/GoalsContainer.vue";
import TargetContainer from "@/components/judgement/TargetContainer.vue";
import VueDatePicker from '@vuepic/vue-datepicker'
import {QuarterForCreate} from "@/common/QuarterForCreateEnum";
import ReportApi from "@/api/ReportApi";
import Toastify from "toastify-js";
import Loading from "@/components/loading/Loading.vue";
import {mapGetters} from "vuex";
import cloneDeep from "lodash.clonedeep";

export default {
    name: "CreateJudgement",
    components: {Loading, TargetContainer, ItemContainer, VueDatePicker},
    data() {
        return {
            techZenGoalList: {
                validationRuleList: [
                    {
                        behavior: "on-change",
                        condition: (value) => value.length === 0,
                        error: "Có ít nhất một mục tiêu"
                    }
                ],
                error: "",
                value: [
                    {
                        validationRuleList: [
                            {
                                behavior: "on-submit",
                                condition: (value) => value.length === 0,
                                error: "Mục tiêu Techzen không được để trống"
                            }
                        ],
                        error: "",
                        value: "".trim()
                    },
                ]
            },

            departmentGoalList: {
                validationRuleList: [
                    {
                        behavior: "on-change",
                        condition: (value) => value.length === 0,
                        error: "Có ít nhất một mục tiêu"
                    }
                ],
                error: "",
                value: [
                    {
                        validationRuleList: [
                            {
                                behavior: "on-submit",
                                condition: (value) => value.length === 0,
                                error: "Mục tiêu bộ phận không được để trống"
                            }
                        ],
                        error: "",
                        value: "".trim()
                    },
                ]
            },

            defaultTarget: {
                targetName: {
                    validationRuleList: [

                        {
                            behavior: "on-submit",
                            condition: (value) => value.length === 0,
                            error: "Mục tiêu không được để trống"
                        }
                    ],
                    error: "",
                    value: "".trim()
                },
                stepList:
                    {
                        validationRuleList: [
                            {
                                behavior: "on-change",
                                condition: (value) => value.length === 0,
                                error: "Có ít nhất một bước tiến hành"
                            }
                        ],
                        error: "",
                        value: [{
                            validationRuleList: [
                                {
                                    behavior: "on-submit",
                                    condition: (value) => value.length === 0,
                                    error: "Mục tiêu không được để trống"
                                }
                            ],
                            error: "",
                            value: "".trim()
                        }],
                    },
                error: ""
            },

            targetList:
                {
                    validationRuleList: [
                        {
                            behavior: "on-change",
                            condition: (value) => value.length === 0,
                            error: "Có ít nhất một mục tiêu"
                        }
                    ],
                    error: "",
                    value: [
                        {
                            targetName: {
                                validationRuleList: [
                                    {
                                        behavior: "on-change",
                                        condition: (value) => value.length === 0,
                                        error: "Mục tiêu không được để trống"
                                    }
                                ],
                                error: "",
                                value: "".trim()
                            },
                            stepList:
                                {
                                    validationRuleList: [
                                        {
                                            behavior: "on-change",
                                            condition: (value) => value.length === 0,
                                            error: "Có ít nhất một bước tiến hành"
                                        }
                                    ],
                                    error: "",
                                    value: [{
                                        validationRuleList: [
                                            {
                                                behavior: "on-submit",
                                                condition: (value) => value.length === 0,
                                                error: "Bước tiến hành không được để trống"
                                            }
                                        ],
                                        error: "",
                                        value: "".trim()
                                    }],
                                },
                            error: ""
                        },
                        {
                            targetName: {
                                validationRuleList: [
                                    {
                                        behavior: "on-change",
                                        condition: (value) => value.length === 0,
                                        error: "Mục tiêu không được để trống"
                                    }
                                ],
                                error: "",
                                value: "".trim()
                            },
                            stepList:
                                {
                                    validationRuleList: [
                                        {
                                            behavior: "on-change",
                                            condition: (value) => value.length === 0,
                                            error: "Có ít nhất một bước tiến hành"
                                        }
                                    ],
                                    error: "",
                                    value: [{
                                        validationRuleList: [
                                            {
                                                behavior: "on-submit",
                                                condition: (value) => value.length === 0,
                                                error: "Bước tiến hành không được để trống"
                                            }
                                        ],
                                        error: "",
                                        value: "".trim()
                                    }],
                                },
                            error: ""
                        },
                    ]
                },
            selectedQuarter: '',
            selectedYear: (new Date()).getFullYear(),
            isModalSelfOverviewOpen: false,
            isHasError: false
        }
    },
    computed: {
        Quarter() {
            return QuarterForCreate
        },
        showErrorMessageOnTarget() {
            if (!this.targetList.error) {
                for (const item of this.targetList.value) {
                    for (const ruleTarget of item.targetName.validationRuleList) {
                        if (ruleTarget.condition(item.targetName.value)) {
                            item.targetName.error = ruleTarget.error
                            return true
                        } else {
                            item.targetName.error = ""
                        }
                    }
                    for (const step of item.stepList.value) {
                        for (const rule of step.validationRuleList) {
                            if (rule.condition(step.value)) {
                                step.error = rule.error;
                                return true // Break the loop once a matching rule is found
                            } else {
                                step.error = ""
                            }
                        }
                    }
                }
            } else {
                return true
            }
            return false;
        },
        showErrorMessageOnTechzenGoal() {
            if (this.techZenGoalList.error) {
                return true
            } else {
                for (const item of this.techZenGoalList.value) {
                    if (!item.value) {
                        item.error = item.validationRuleList.map((ele) => ele.error)[0]
                        return true
                    } else {
                        item.error = ""
                    }
                }
            }
            return false
        },
        showErrorMessageOnDepartmentGoal() {
            if (this.departmentGoalList.error) {
                return true
            }
            for (const item of this.departmentGoalList.value) {
                if (!item.value) {
                    item.error = item.validationRuleList.map((ele) => ele.error)[0]
                    return true
                } else {
                    item.error = ""
                }
            }
            return false
        },
        ...mapGetters({
            loadingAction: "general/getLoadingStatus"
        })
    },
    created() {
        this.getCurrQuarter()
    },
    methods: {
        getQuarter() {
            const date = new Date();
            const result = Math.floor(date.getMonth() / 3);
            return this.Quarter[result] || '';
        },
        getCurrQuarter() {
            const today = new Date();
            const quarter = Math.floor(today.getMonth() / 3);
            const quarterList = Object.keys(QuarterForCreate);
            this.selectedQuarter = quarterList[quarter] || this.getQuarter();
        },
        handleTriggerAddNew() {
            this.targetList.value.push(cloneDeep(this.defaultTarget))
        },
        convertArrayToString(list) {
            // Use map to extract 'name' property and join with '|'
            return list?.map((goal) => goal.value.trim()).join(" | ");
        },
        transformedList(target) {
            return target.map((item) => ({
                targetName: item.targetName.value.trim(),
                targetStep: item.stepList.value.map((step) => step.value).join(" | "),
            }));
        },
        async handleSubmit() {
            this.isHasError = false
            // TODO call api here
            let params = {
                companyTarget: this.convertArrayToString(this.techZenGoalList.value),
                departmentTarget: this.convertArrayToString(this.departmentGoalList.value),
                quarter: this.selectedQuarter,
                resolveSolution: "string",
                selfTargetRequestDTOList: this.transformedList(this.targetList.value),
                selfTarget: "string",
                weakness: "string",
                year: this.selectedYear
            }
            this.handleValidate()
            if (this.isHasError) {
                return
            }
            this.$store.dispatch("general/activeLoading")

            try {
                const res = await ReportApi.createJudgement(JSON.stringify(params))
                if (res.status === 201) {
                    Toastify({
                        node: dom('#success-notification-content').clone().removeClass('hidden')[0],
                        duration: 3000,
                        newWindow: true,
                        close: true,
                        gravity: 'top',
                        position: 'right',
                        stopOnFocus: true
                    }).showToast()
                    this.$router.push("/techport")
                    this.resetData()
                }
            } catch (e) {
                if (e.response.status === 500) {
                    Toastify({
                        node: dom('#exist-notification-content').clone().removeClass('hidden')[0],
                        duration: 3000,
                        newWindow: true,
                        close: true,
                        gravity: 'top',
                        position: 'right',
                        stopOnFocus: true
                    }).showToast()
                } else {
                    Toastify({
                        node: dom('#fail-notification-content').clone().removeClass('hidden')[0],
                        duration: 3000,
                        newWindow: true,
                        close: true,
                        gravity: 'top',
                        position: 'right',
                        stopOnFocus: true
                    }).showToast()
                }

            } finally {
                this.$store.dispatch("general/deactivateLoading")
            }
        },
        handleValidate() {
            if (this.showErrorMessageOnTechzenGoal) {
                return this.isHasError = true
            }
            if (this.showErrorMessageOnDepartmentGoal) {
                return this.isHasError = true
            }
            if (this.showErrorMessageOnTarget) {
                return this.isHasError = true
            }
        },
        resetData() {
            this.targetList = {
                validationRuleList: [
                    {
                        behavior: "on-change",
                        condition: (value) => value.length === 0,
                        error: "Có ít nhất một mục tiêu"
                    }
                ],
                error: "",
                value: [
                    {
                        targetName: {
                            validationRuleList: [
                                {
                                    behavior: "on-change",
                                    condition: (value) => value.length === 0,
                                    error: "Mục tiêu không được để trống"
                                }
                            ],
                            error: "",
                            value: "".trim()
                        },
                        stepList:
                            {
                                validationRuleList: [
                                    {
                                        behavior: "on-change",
                                        condition: (value) => value.length === 0,
                                        error: "Có ít nhất một bước tiến hành"
                                    }
                                ],
                                error: "",
                                value: [{
                                    validationRuleList: [
                                        {
                                            behavior: "on-submit",
                                            condition: (value) => value.length === 0,
                                            error: "Bước tiến hành không được để trống"
                                        }
                                    ],
                                    error: "",
                                    value: "".trim()
                                }],
                            },
                        error: ""
                    },
                    {
                        targetName: {
                            validationRuleList: [
                                {
                                    behavior: "on-change",
                                    condition: (value) => value.length === 0,
                                    error: "Mục tiêu không được để trống"
                                }
                            ],
                            error: "",
                            value: "".trim()
                        },
                        stepList:
                            {
                                validationRuleList: [
                                    {
                                        behavior: "on-change",
                                        condition: (value) => value.length === 0,
                                        error: "Có ít nhất một bước tiến hành"
                                    }
                                ],
                                error: "",
                                value: [{
                                    validationRuleList: [
                                        {
                                            behavior: "on-submit",
                                            condition: (value) => value.length === 0,
                                            error: "Bước tiến hành không được để trống"
                                        }
                                    ],
                                    error: "",
                                    value: "".trim()
                                }],
                            },
                        error: ""
                    },
                ]
            }
            this.techZenGoalList = {
                validationRuleList: [
                    {
                        behavior: "on-change",
                        condition: (value) => value.length === 0,
                        error: "Có ít nhất một mục tiêu"
                    }
                ],
                error: "",
                value: [
                    {
                        validationRuleList: [
                            {
                                behavior: "on-submit",
                                condition: (value) => value.length === 0,
                                error: "Mục tiêu Techzen không được để trống"
                            }
                        ],
                        error: "",
                        value: "".trim()
                    },
                ]
            }

            this.departmentGoalList = {
                validationRuleList: [
                    {
                        behavior: "on-change",
                        condition: (value) => value.length === 0,
                        error: "Có ít nhất một mục tiêu"
                    }
                ],
                error: "",
                value: [
                    {
                        validationRuleList: [
                            {
                                behavior: "on-submit",
                                condition: (value) => value.length === 0,
                                error: "Mục tiêu bộ phận không được để trống"
                            }
                        ],
                        error: "",
                        value: "".trim()
                    },
                ]
            }
        },

    }
}
</script>

<style scoped>
.scrollable {
    height: 52vh;
    max-height: 58vh;
    overflow-y: scroll;
}

.scrollable__left {
    height: 62vh;
    max-height: 68vh;
    overflow-y: scroll;
}
</style>
<style>
.content {
    background-color: white;
}

.text__title--big {
    font-size: 16px
}

.text__title--medium {
    font-size: 16px
}

.error-message {
    font-size: 12px;
    color: red
}
</style>
