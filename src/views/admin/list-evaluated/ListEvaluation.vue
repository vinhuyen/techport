<template>
  <div class="mt-6">
    <div class="filter-wapper">
      <div class="intro-y box p-3 mt-3">
        <div class="flex flex-col">
          <form
            @keyup.enter="handleSearch"
            @submit.prevent="handleSearch"
            id="tabulator-html-filter-form class"
          >
            <div class="flex justify-evenly">
              <div class="flex search__name">
                <label class="label__width flex items-center font-medium mr-8"
                  >Tên nhân viên:</label
                >
                <input
                  id="tabulator-html-filter-value"
                  type="text"
                  class="form-control width-placeholder"
                  placeholder="Tìm kiếm tên nhân viên"
                  v-model.trim="userName"
                />
              </div>
              <div class="flex search__width">
                <label class="label__width flex items-center font-medium mr-4"
                  >Trạng thái:</label
                >
                <div
                  v-for="(displayName, statusValue) in ReportStatus"
                  :key="statusValue"
                  :value="statusValue"
                  @click="filterByStatus(statusValue)"
                  :class="{
                    'shadow shadow-gray-400 hover:shadow-black-500/60 cursor-pointer':
                      statusValue === 'WAITING' && selectedStatus !== 'WAITING',
                    'bg-yellow-500 text-white cursor-pointer':
                      statusValue === 'WAITING' && selectedStatus === 'WAITING',
                    'shadow shadow-gray-400 hover:shadow-black-500/70 cursor-pointer':
                      statusValue === 'ACCEPTED' &&
                      selectedStatus !== 'ACCEPTED',
                    'bg-sky-500 text-white cursor-pointer':
                      statusValue === 'ACCEPTED' &&
                      selectedStatus === 'ACCEPTED',
                    'shadow shadow-gray-400 hover:shadow-black-500/80 cursor-pointer':
                      statusValue === 'SELF_EVALUATED' &&
                      selectedStatus !== 'SELF_EVALUATED',
                    'bg-orange-500 text-white cursor-pointer':
                      statusValue === 'SELF_EVALUATED' &&
                      selectedStatus === 'SELF_EVALUATED',
                    'shadow shadow-gray-400 hover:shadow-black-500/50 cursor-pointer':
                      statusValue === 'MANAGER_EVALUATED' &&
                      selectedStatus !== 'MANAGER_EVALUATED',
                    'bg-emerald-500 text-white cursor-pointer':
                      statusValue === 'MANAGER_EVALUATED' &&
                      selectedStatus === 'MANAGER_EVALUATED',
                  }"
                  class="flex justify-center items-center h-8 p-2 m-2 rounded-xl"
                >
                  {{ $t(displayName) }}
                </div>
              </div>
              <div class="flex mb-2 input__time">
                <label class="label__width flex items-center font-medium mr-4"
                  >Quý:</label
                >
                <select
                  v-model="selectedQuarter"
                  id="tabulator-html-filter-field"
                  class="form-select ml-3"
                >
                  <!-- <option value=""></option> -->
                  <option
                    v-for="(displayName, quarterValue) in Quarter"
                    :key="quarterValue"
                    :value="quarterValue"
                  >
                    {{ $t(displayName) }}
                  </option>
                </select>
              </div>
              <div class="flex items-center mb-2 input__time">
                <label class="flex items-center font-medium mr-4">Năm:</label>
                <div class="flex">
                  <VueDatePicker
                    v-model="theMonthFilter.year"
                    auto-apply
                    class="w-28 text-center"
                    @update:model-value="handleChangeYear"
                    year-picker
                  >
                  </VueDatePicker>
                </div>
              </div>
              <div class="mt-2 xl:mt-0">
                <button
                  type="submit"
                  id="tabulator-html-filter-go"
                  class="btn btn-primary w-full sm:w-16"
                >
                  Tìm
                </button>
                <button
                  id="tabulator-html-filter-reset"
                  type="button"
                  class="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 sm:ml-1"
                  @click="resetFilters"
                >
                  Xóa
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div>
      <div class="scroll-list">
        <table class="table table-report">
          <thead class="text-white sticky top-0 z-20">
            <tr class="bg-cyan-800">
              <th
                class="whitespace-nowrap border border-slate-300 text-center request-id"
              >
                STT
              </th>
              <th
                class="whitespace-nowrap border border-slate-300 request_userName"
                @click="sortTable('user_name')"
              >
                Nhân viên
                <span
                  v-if="sort === 'USER_NAME' && sortDirection === 'DESC'"
                  class="fa fa-caret-up ml-3"
                ></span>
                <span v-else class="fa fa-caret-down ml-3"></span>
              </th>
              <th
                class="whitespace-nowrap border border-slate-300 text-center request_status"
                @click="sortTable('status')"
              >
                Trạng thái
                <span
                  v-if="sort === 'STATUS' && sortDirection === 'DESC'"
                  class="fa fa-caret-up ml-3"
                ></span>
                <span v-else class="fa fa-caret-down ml-3"></span>
              </th>
              <th
                class="whitespace-nowrap border border-slate-300 text-center request_quarter"
                @click="sortTable('quarter')"
              >
                Quý
                <span
                  v-if="sort === 'QUARTER' && sortDirection === 'DESC'"
                  class="fa fa-caret-up ml-3"
                ></span>
                <span v-else class="fa fa-caret-down ml-3"></span>
              </th>
              <th
                class="whitespace-nowrap border border-slate-300 text-center request_year"
                @click="sortTable('year')"
              >
                Năm
                <span
                  v-if="sort === 'YEAR' && sortDirection === 'DESC'"
                  class="fa fa-caret-up ml-3"
                ></span>
                <span v-else class="fa fa-caret-down ml-3"></span>
              </th>
              <th
                class="whitespace-nowrap border border-slate-300 text-center request_receiveDate"
                @click="sortTable('receive_date')"
              >
                Ngày gửi
                <span
                  v-if="sort === 'RECEIVE_DATE' && sortDirection === 'DESC'"
                  class="fa fa-caret-up ml-3"
                ></span>
                <span v-else class="fa fa-caret-down ml-3"></span>
              </th>
              <th
                class="whitespace-nowrap border border-slate-300 text-center request_managerName"
                @click="sortTable('manager_name')"
              >
                Người đánh giá
                <span
                  v-if="sort === 'MANAGER_NAME' && sortDirection === 'DESC'"
                  class="fa fa-caret-up ml-3"
                ></span>
                <span v-else class="fa fa-caret-down ml-3"></span>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody class="font-medium">
              <tr
                v-for="(item, index) in theResult"
                :key="index"
                class="cursor-pointer"
              >
                <td class="text-center" >{{ stt + index }}</td>
                <td>
                  <div class="">{{ item.userName }}</div>
                </td>
                <td>
                  <div
                    :class="{
                      'bg-yellow-500': item.status === 'WAITING',
                      'bg-sky-500': item.status === 'ACCEPTED',
                      'bg-orange-500': item.status === 'SELF_EVALUATED',
                      'bg-emerald-500': item.status === 'MANAGER_EVALUATED',
                    }"
                    class="text-center m-auto text-white w-36 p-1.5 rounded-xl"
                  >
                    {{ $t(`${statusDisplayName[item.status]}`) }}
                  </div>
                </td>
                <td>
                  <div class="text-center">
                    {{ $t(`${quarterDisplay[item.quarter]}`) }}
                  </div>
                </td>
                <td>
                  <div class="text-center">{{ item.year }}</div>
                </td>
                <td>
                  <div class="text-center">
                    {{ item.createAt }}
                  </div>
                </td>
                <td>
                  <div class="text-center">
                    <AdminTagForRequest
                      :admin="{
                        managerId: item.managerId,
                        managerName: item.managerName,
                        managerAvatarUrl: item.managerAvatarUrl,
                      }"
                      class="h-9"
                    />
                  </div>
                </td>
                <td class="text-center">
                  <router-link :to="{name: 'detail-evaluate-admin', query: {id: item.id}}">
                    <i class="fa-solid fa-circle-info text-center"></i>
                  </router-link>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap justify-between mt-3"
      v-if="theResult.length > 0"
    >
      <pagination
        :totalPages="totalPages"
        :perPage="perPage"
        :currentPage="currentPage + 1"
        @pagechanged="onPageChange"
      />
      <select
        v-model="perPage"
        class="lg:col-span-4 w-20 form-select box mt-3 sm:mt-0"
        @change="updateStatusFilter"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="100">100</option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VueDatePicker from "@vuepic/vue-datepicker";
import { ReportStatus } from "@/common/StatusEnum";
import { Quarter } from "@/common/QuarterEnum";
import Pagination from "@/components/pagination/pagination_master.vue";
import AdminTagForRequest from "@/components/avatar-bubble/Main.vue";

export default {
  name: "ListEvaluation",
  components: {
    VueDatePicker,
    Pagination,
    AdminTagForRequest,
  },
  data() {
    return {
      id: '',
      selectedQuarter: "",
      selectedStatus: "",
      status: "",
      name: "",
      sort: "",
      stt: 0,
      sortDirection: "",
      theMonthFilter: {
        year: new Date().getFullYear(),
      },
      startYear: 1990,
      endYear: new Date().getFullYear(),
      currentYear: new Date().getFullYear(),
      flagYear: 0,
      currentPage: 0,
      perPage: 5,
      dataPage: {},
      totalPages: 0,
      totalReviewGroup: 0,
      isAdmin: true,
    };
  },
  created() {
    this.getCurrQuarter();
    this.list();
  },
  computed: {
    ReportStatus() {
      return ReportStatus;
    },
    Quarter() {
      return Quarter;
    },
    statusDisplayName() {
      return {
        "": "Tất cả",
        ...ReportStatus,
      };
    },
    quarterDisplay() {
      return {
        "": "Tất cả",
        ...Quarter,
      };
    },
    ...mapGetters({
      theResult: "evaluateList/getResultsDisplay",
      listEvaluate: "evaluateList/getListEvaluateAdmin",
    }),
  },
  watch: {
    perPage: function () {
      this.dataPage = this.paginate(
        this.theResult,
        this.perPage,
        this.currentPage
      );
    },
  },
  methods: {
    getCurrQuarter() {
      const today = new Date();
      const quarter = Math.floor((today.getMonth() + 3) / 3);
      const quarterList = Object.keys(Quarter)
      switch (quarter) {
        case 1:
          this.selectedQuarter = quarterList[0];
          break;
        case 2:
          this.selectedQuarter = quarterList[1];
          break;
        case 3:
          this.selectedQuarter = quarterList[2];
          break;
        case 4:
          this.selectedQuarter = quarterList[3];
          break;
        default:
          this.selectedQuarter = "";
          break;
      }
    },
    dateResultFormat(date) {
      return new Date(date);
    },
    async handleSearch() {
      this.list();
    },
    updateSearch() {
      this.list();
    },
    updateStatusFilter() {
      this.list();
    },
    async handleChangeYear(newYear) {
      this.theMonthFilter.year = newYear.toString();
      await this.leaveDaysList();
    },
    resetFilters() {
      this.selectedQuarter = "";
      this.selectedStatus = "";
      this.theYearFilter = "";
      this.userName = "";
      this.list();
    },
    sortTable(column) {
      if (column === "user_name") {
        this.sort = "USER_NAME";
        this.sortDirection = this.sortDirection === "ASC" ? "DESC" : "ASC";
        this.list();
      } else if (column === "status") {
        this.sort = "STATUS";
        this.sortDirection = this.sortDirection === "ASC" ? "DESC" : "ASC";
        this.list();
      } else if (column === "quarter") {
        this.sort = "QUARTER";
        this.sortDirection = this.sortDirection === "ASC" ? "DESC" : "ASC";
        this.list();
      } else if (column === "year") {
        this.sort = "YEAR";
        this.sortDirection = this.sortDirection === "ASC" ? "DESC" : "ASC";
        this.list();
      } else if (column === "receive_date") {
        this.sort = "RECEIVE_DATE";
        this.sortDirection = this.sortDirection === "ASC" ? "DESC" : "ASC";
        this.list();
      } else if (column === "manager_name") {
        this.sort = "MANAGER_NAME";
        this.sortDirection = this.sortDirection === "ASC" ? "DESC" : "ASC";
        this.list();
      }
    },
    onPageChange(page) {
      this.currentPage = page - 1;
      this.list(page - 1);
      this.$store.dispatch("evaluateList/fetchListEvaluateAdmin");
    },
    paginate(array, page_size, page_number) {
      return array.slice(
        (page_number - 1) * page_size,
        page_number * page_size
      );
    },
    onClickFirstPage() {
      this.$emit("pagechanged", 1);
    },
    filterByStatus(statusValue) {
      if (this.selectedStatus === statusValue) {
        this.selectedStatus = "";
      } else {
        this.selectedStatus = statusValue;
      }
    },

    async list(pageNumber = 0) {
      this.currentPage = Math.max(pageNumber);
      const params = {
        size: this.perPage,
        sort: this.sort,
        page: this.currentPage,
        direction: this.sortDirection,
        quarter: this.selectedQuarter,
        year: this.theMonthFilter.year,
        userName: this.userName,
        status: this.selectedStatus,
        isAdmin: true,
      };
      this.$store.dispatch("evaluateList/setParamsForAdmin", params);
      await this.$store.dispatch("evaluateList/fetchListEvaluateAdmin");
      this.$store.dispatch(
        "evaluateList/setResultDisplay",
        this.listEvaluate?.content
      );
      const size = this.listEvaluate?.size;
      this.stt = size * this.currentPage + 1;
      this.totalPages = this.listEvaluate?.totalPages;
      this.totalReviewGroup = this.theResult?.length;
      this.dataPage = this.paginate(this.theResult, this.perPage, 1);
    },
  },
};
</script>

<style scoped>
.width-placeholder {
  width: 68.5%;
}
.search__width {
  width: 550px;
}
.search__name {
  width: 450px;
}
.input__time {
  width: 10%;
}
.request-id {
  width: 5%;
}
.request_userName {
  width: 18%;
}
.request_status {
  width: 18%;
}
</style>
