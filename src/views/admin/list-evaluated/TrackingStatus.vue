<template>
    <Loading :show-loading="loadingAction"/>
    <div class="flex justify-between">
        <div class="tabs mt-6">
            <div @click="selectStatus('all')" :class="{ active: selectedStatus === 'all' }">
                {{ $t('lang.REWARD.RW4') }}
            </div>
            <div
                    v-for="(status, index) in StatusForTracking"
                    :key="index"
                    @click="selectStatus(index)"
                    :class="{ active: selectedStatus === index }"
            >
                {{ status }}
            </div>
        </div>
        <div class="flex col-span-3 gap-5 px-6 mt-6">
            <div class="flex mb-2 input__time">
                <label class="label__width flex items-center font-medium mr-1">Quý:</label>
                <select
                        v-model="selectedQuarter"
                        id="tabulator-html-filter-field"
                        class="form-select ml-3"
                >
                    <option
                            v-for="(displayName, quarterValue) in QuarterForCreate"
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
                            @update:model-value="handleChangeYear"
                    />
                </div>
            </div>
        </div>
    </div>
    <div class="list-attendance h-[600px]">
        <ul class="ul-checked intro-x">
            <li v-for="(emp, ind) in selectedEmployees" :key="ind">
                <div class="li-checked bg-white">
                    <img
                            :src="emp.avtUrl"
                            alt=""
                            class="image-checked"

                    />
                    <div class="info-user w-full text-left mt-2 font-medium">
                        <p class="checked-name inline">{{ emp.name }}</p>
                        <div v-if="emp.status !== 'NOT_YET_CREATE'"
                             class="flex justify-flex-start whitespace-nowrap items-center">
                            <CheckSquareIcon class="w-4 h-4 mr-2 text-success"/>
                            <span class="text-success">{{ StatusForTracking[emp.status] }}</span>
                        </div>
                        <div v-else class="flex justify-flex-start whitespace-nowrap items-center">
                            <AlertTriangleIcon class="w-4 h-4 mr-2 text-danger"/>
                            <span class="text-danger">{{ StatusForTracking[emp.status] }}</span>
                        </div>
                        <div v-if="emp.status === 'CREATED'" class="flex justify-flex-start whitespace-nowrap items-center">
                            <ClockIcon class="w-4 h-4 mr-2"/>
                        <p>{{ dateFormatted(emp.createAt) }}</p>
                        </div>
                        <div v-if="emp.status === 'SELF_EVALUATED'" class="flex justify-flex-start whitespace-nowrap items-center">
                            <ClockIcon class="w-4 h-4 mr-2"/>
                            <p>{{ dateFormatted(emp.updateAt) }}</p>
                        </div>
                        <div v-if="emp.status === 'MANAGER_EVALUATED'" class="flex justify-flex-start whitespace-nowrap items-center">
                            <ClockIcon class="w-4 h-4 mr-2"/>
                            <p>{{ dateFormatted(emp.managerEvaluateAt) }}</p>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import {StatusForTracking} from "@/common/StatusForTrackingEnum";
import VueDatePicker from "@vuepic/vue-datepicker";
import {QuarterForCreate} from "@/common/QuarterForCreateEnum";
import ReportApi from "@/api/ReportApi";
import Loading from "@/components/loading/Loading.vue";
import {mapGetters} from "vuex";
import dayjs from "dayjs";

export default {
	name: "TrackingStatus",
	components: {Loading, VueDatePicker},
	data() {
		return {
			selectedStatus: "all",
			selectedQuarter: '',
			selectedYear: (new Date()).getFullYear(),
			listEmployee: []
		}
	},
	computed: {
		...mapGetters({
			loadingAction: 'general/getLoadingStatus'
		})
		,
		QuarterForCreate() {
			return QuarterForCreate
		},
		StatusForTracking() {
			return StatusForTracking
		},
		selectedEmployees() {
			if (this.selectedStatus === 'all') {
				return this.listEmployee
			}
			return this.listEmployee.filter(
				employee => employee.status === this.selectedStatus
			);
		}
	},
	created() {
		this.init()
		this.getCurrQuarter()
	},
	methods: {
		async init() {
			let params = {
				quarter: this.selectedQuarter,
				year: this.selectedYear
			}

			this.getQuarter()
			this.$store.dispatch("general/activeLoading")

			const res = await ReportApi.trackingStatusJudgement(params)
			this.listEmployee = res.data

			this.$store.dispatch("general/deactivateLoading")
		},
		getQuarter() {
			const date = new Date();
			const result = Math.floor(date.getMonth() / 3)
			return this.QuarterForCreate[result]
		},
		getCurrQuarter() {
			const today = new Date();
			const quarter = Math.floor(today.getMonth() / 3);
			const quarterList = Object.keys(QuarterForCreate);
			this.selectedQuarter = quarterList[quarter] || this.getQuarter()
		},
		selectStatus(status) {
			this.selectedStatus = status;
		},
		handleChangeYear(newYear) {
			this.selectedYear = newYear
			this.init()
		},
      dateFormatted(date) {
        return dayjs(date).format('DD-MM-YYYY')
      }

	},
	watch: {
		selectedQuarter() {
			this.init()
		},
		selectedYear() {
			this.init()
		}
	}
}
</script>

<style scoped>

</style>
