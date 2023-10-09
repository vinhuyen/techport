<template>
    <Loading :show-loading="loadingAction"/>
    <div class="flex justify-between mb-4">
        <div class="tabs mt-6">
            <div @click="selectStatus('all')" :class="{ active: selectedStatus === 'all' }">
                Tất cả
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
                            :value="quarterValue">{{ displayName }}
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
    <div v-if="selectedEmployees.length <= 0"
         class="text-primary flex flex-col items-center justify-center p-6 font-medium text-2xl  h-[600px]">
        <img class="w-20 h-20 mb-4" src="/src/assets/images/icons8-empty-box-64.png" alt="">
        <span>Không có bản đánh giá nào!</span>
    </div>
    <div v-else class="list-attendance h-[600px]">
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

<style>
.tabs {
    padding-top: 5px;
    display: flex;
    gap: 5px;
}

.tabs > div {
    padding: 8px 16px;
    cursor: pointer;
    border: 1px solid rgb(226 232 240);
    background-color: white;
    position: relative;
    font-weight: bold;
    top: 0;
    transition: all 0.25s;
    border-radius: 15px;
}
.tabs > div:hover {
    top: -0.25rem;
    transition: top 0.25s;
}
.tabs > div.active {
    background-color: green;
    font-weight: bold;
    color: white;
}

.employee-list {
    margin-top: 16px;
}
.intro-y:nth-child(3) {
    height: 100%;
}

.text-danger,
.text-success {
    width: 85px;
}

.text-warning {
    color: #f7b217;
}

.list-attendance {
    height: 70vh;
    padding: 10px 0 30px 0;
    overflow-y: scroll;
    overflow-x: hidden;
}

.checked,
.unchecked {
    display: flex;
    align-items: center;
}

.checked-empty {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.2rem;
    color: #ff7675;
}

.unchecked-empty {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.2rem;
    color: #69f470;
}

.unchecked {
    justify-content: flex-start;
    transition: all 0.5s ease;
}

.li-checked {
    width: 280px;
    height: 100px;
    display: flex;
    border-radius: 10px;
    text-align: center;
    margin: 5px 7px 5px 7px;
    transition: all 0.5s ease;
    box-shadow: 0 3px 20px #0000000b;
    align-items: center;
    gap: 15px;
}

.ul-checked {
    width: 100%;
    padding: 10px 4px 10px 15px;
    display: flex;
    flex-wrap: wrap;
    /*column-gap: 20px;*/
    row-gap: 5px;
}

.image-checked {
    max-width: 70px;
    min-width: 70px;
    max-height: 70px;
    min-height: 70px;
    object-fit: cover;
    margin-left: 15px;
    display: block;
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.2s ease;
}

.image-checked:hover {
    transform: scale(2);
    z-index: 9999;
    cursor: pointer;
}

.checked-200 {
    height: 200px;
}

.ul-checked-3 {
    width: 100%;
}

.li-checked-5 {
    margin: 10px 10px 0 5px !important;
    width: 18% !important;
}

.li-checked-6 {
    width: 15% !important;
    margin: 0 10px 0 5px !important;
}

.li-checked-3 {
    width: 380px;
}

ul > .li-checked-5 {
    margin: auto;
}

ul > .li-checked-6 {
    margin: auto;
}

.animate-zoom {
    animation: zoom 0.5s ease-in-out;
}

.animate-remove {
    animation: zoomOut 1s ease-out;
}

@keyframes zoom {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}

@keyframes zoomOut {
    from {
        opacity: 1;
        transform: scale(1);
    }
    to {
        opacity: 0;
        transform: scale(0);
    }
}
</style>
