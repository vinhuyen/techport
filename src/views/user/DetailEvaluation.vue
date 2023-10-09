<template>
  <div>
      <div class="text-2xl font-bold text-center mb-2 text-blue-900 ">
        ĐÁNH GIÁ GIÁ TRỊ VÀ NĂNG LỰC NHÂN SỰ QUÝ 1 NĂM 2024
      </div>
      <div class="flex justify-around">
        <div class="text-lg flex flex-col">
          <div class="truncate sm:whitespace-normal flex items-center leading-8">
            <b class="">Tên nhân viên: &nbsp; </b> {{ dataDetail?.userName }}
          </div>
          <span> <b class="">Level: </b> S4</span>
        </div>

        <div class="text-lg flex flex-col">
          <span> <b class="">Bộ phận: </b> {{ dataDetail?.userOrganizationName }}</span>
          <span> <b class="">Ngày đánh giá: </b> {{ dataDetail?.createAt }}</span>
        </div>
      </div>
    </div>
  <div class="w-full gap-5 bg-white px-6 mt-2 pt-2 scrollable__left"> 
    <div class="bg-gray-50 shadow">
      <div class="m-auto text-center pt-3.5">
        <span class="text-xl font-medium">MỤC TIÊU CHUNG</span>
      </div>
      <div class="pb-10 flex-grow rounded-lg  p-4 mb-4 mb-10">
        <div class="flex justify-around gap-5">
          <div class="bg-gray-200 rounded-3xl h-52 w-1/2">
            <h2 class="text-xl font-medium mb-2 font-medium m-6 text-center">Mục tiêu của Techzen</h2>
            <div class="flex flex-col gap-3 mx-6 pl-4 overflow-auto h-32" >
              <ul class="target-ul">
                <li class="list-none">
                  <div v-for="(item, index) in dataDetail?.companyTargets" :key="index" class="text-base">
                    <i class="fa-solid fa-check mr-3"></i>
                    {{ item }}
                  </div >
                </li>
              </ul>
            </div>
          </div>
          <div class="bg-gray-200 rounded-3xl h-52 w-6/12">
            <h2 class="text-xl font-medium mb-2 font-medium m-6 text-center">Mục tiêu của bộ phận</h2>
            <div class="flex flex-col gap-3 mx-6 pl-4 overflow-auto h-32" >
              <ul class="target-ul">
                <li class="list-none">
                  <div v-for="(item, index) in dataDetail?.departmentTargets" :key="index" class="text-base">
                    <i class="fa-solid fa-check mr-3"></i>
                    {{ item }}
                  </div >
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="">
          <h3 class="text-xl font-medium mb-2 font-medium m-6 text-center">MỤC TIÊU CÁ NHÂN</h3>
          <div class="grid grid-cols-8 gap-4 w-full mb-2">
            <div class="bg-gray-400 h-12 text-lg font-medium pl-2 pt-2.5 col-span-2 text-center">Mục tiêu đạt được</div>
            <div class="bg-gray-400 h-12 text-lg font-medium pl-2 pt-2.5 col-span-2 text-center">Các bước tiến hành</div>
            <div class="bg-gray-400 h-12 text-lg font-medium pl-2 pt-2.5 col-span-2 text-center">Kết quả thực tế</div>
            <div class="bg-gray-400 h-12 text-lg font-medium pl-2 pt-2.5 text-center">Tiến trình</div>
            <div class="bg-gray-400 h-12 text-lg font-medium pl-2 pt-2.5 text-center">Kết quả</div>
          </div>
          <div v-for="(selfTarget, index) in dataDetail.selfTargetDTOList" :key="index" class="grid grid-cols-8 gap-4 w-full mb-2">
              <div class="bg-gray-200 p-3.5 text-base col-span-2">{{ selfTarget.targetName }}</div>
              <div class="bg-gray-200 p-3.5 text-base col-span-2">
                <ul>
                    <li v-for="(targetStep, index) in selfTarget.targetSteps" :key="index">
                      - {{ targetStep }}
                    </li>
                </ul>
              </div>
              <div class="bg-gray-200 p-3.5 text-base col-span-2">{{ selfTarget.actualResult }}</div>
              <div class="bg-gray-200 p-3.5 text-base">{{ selfTarget.progress }}</div>
              <div class="bg-gray-200 p-3.5 text-base">{{ selfTarget.result }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <app-tabs class="w-full mb-16" :tabList="tabList">
        <template v-slot:tabPanel-1>
          <!-- if not null display detail -->
          <div
            v-if="
              dataDetail.selfEvaluation?.generalEvaluation &&
              dataDetail.selfEvaluation?.weaknesses &&
              dataDetail.selfEvaluation?.resolveSolutions &&
              dataDetail.selfEvaluation?.detailEvaluation
            "
          >
            <div>
              <div class="font-bold text-lg">ĐÁNH GIÁ TỔNG QUÁT <span class="font-medium text-md">(Trong vòng 3 tháng qua bạn đánh giá mình đã học hỏi được thêm những kỹ thuật gì để nâng cao giá trị bản thân)</span></div>
              <div class="selfEvaluate-frame">
                <div class="selfEvaluate-part bg-gray-200">
                  <div class="selfEvaluate-text">
                    <p class="mt-1.5">{{ dataDetail?.selfEvaluation?.generalEvaluation }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="font-bold text-lg">NHẬN THỨC VẤN ĐỀ</div>
              <div class="selfEvaluate-frame">
                <div class="selfEvaluate-part bg-gray-200">
                  <div class="selfEvaluate-text">
                    <h4 class="tracking-wide font-bold">ĐIỂM YẾU:</h4>
                    <div class="mt-1.5">
                      <ul>
                          <li v-for="(item, index) in dataDetail.selfEvaluation?.weaknesses" :key="index">
                            - {{ item }}
                          </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="selfEvaluate-part bg-gray-200">
                  <div class="selfEvaluate-text">
                    <h4 class="tracking-wide font-bold">PHƯƠNG PHÁP GIẢI QUYẾT:</h4>
                    <div class="mt-1.5">
                      <ul>
                          <li v-for="(item, index) in dataDetail.selfEvaluation?.resolveSolutions" :key="index">
                            - {{ item }}
                          </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- cái bảng -->
            <div>
              <div class="font-bold text-lg">TỰ ĐÁNH GIÁ CHI TIẾT</div>
              <div>
                <table class="table-auto table">
                  <thead class="bg-gray-200">
                    <tr>
                      <th>
                        <h4 class="font-bold">PHẨM CHẤT</h4>
                      </th>
                      <th>
                        <h4 class="font-bold">ĐÁNH GIÁ</h4>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(evaluate, index) in evaluateList" :key="index">
                      <td>{{ evaluate.quality }}</td>
                      <td>
                          <div class="grid grid-cols-5">
                            <div class="col-span-1">
                              <input
                                type="radio"
                                v-model="evaluate.selected"
                                :value="'1'"
                                :checked= "checked"
                              />
                              Thất vọng
                            </div>
                            <div class="col-span-1">
                              <input
                                class="mr-2"
                                type="radio"
                                v-model="evaluate.selected"
                                :value="'2'"
                              />
                              Không hài lòng
                            </div>
                            <div class="col-span-1">
                              <input
                                type="radio"
                                v-model="evaluate.selected"
                                :value="'3'"
                              />
                              Hài lòng
                            </div>
                            <div class="col-span-1">
                              <input
                                type="radio"
                                v-model="evaluate.selected"
                                :value="'4'"
                              />
                              Tốt
                            </div>
                            <div class="col-span-1">
                              <input
                                type="radio"
                                v-model="evaluate.selected"
                                :value="'5'"
                              />
                              Rất tốt
                            </div>
                          </div>

                        <div
                          v-if="evaluate.messageValid"
                          class="invalid-feedback"
                        >
                          Hãy chọn đánh giá
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- if null display form tự đánh giá chi tiết -->
          <div v-else>
            <div v-if="evaluateBtn" class="flex justify-center items-center gap-5">
              <p class="text-green-800 font-bold text-lg">Bạn chưa có bản chi tiết tự đánh giá</p>
                <span> --></span>
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                @click="evaluate"
              >
                Thực hiện đánh giá
              </button>
            </div>

            <SelfEvaluation
              v-if="showFormSelfEvaluation"
              :id="id"
            ></SelfEvaluation>

          </div>
        </template>

        <template v-slot:tabPanel-2>
          <div v-for="(item, index) in dataDetail.managerEvaluationDTOList" :key="index">
            <div class="managerEvaluate">
              <div class="managerEvaluate-name">
                <h3 class="text-xl font-medium">Tên quản lý: {{ item.managerName }}</h3>
                <h4 class="text-lg">Bộ phận: QC</h4>
              </div>
            </div>
            <div class="managerEvaluate-shape bg-gray-400"></div>
            <div class="managerEvaluate-frame">
              <div class="w-72 bg-gray-200 text-black">
                <div class="p-5 max-w-full">
                  <h4 class="tracking-wide font-bold">ĐÁNH GIÁ VỀ VIỆC THỰC HIỆN CÁC MỤC TIÊU ĐẶT RA</h4>
                  <div>
                    <h5 class="mt-1.5 font-bold">Điểm tốt:</h5>
                    <p class="mt-1.5"> - 
                      {{ item.goodPoint }} 
                    </p>
                  </div>
                  <div class="mt-1.5">
                    <h5 class="font-bold">Điểm cần cải thiện:</h5>
                    <p class="mt-1.5"> - 
                      {{ item.notGoodPoint }} 
                    </p>
                  </div>
                </div>
              </div>

              <div class="w-72 bg-gray-200 text-black">
                <div class="p-5 max-w-full">
                  <h4 class="tracking-wide font-bold">ĐÁNH GIÁ VỀ NHẬN THỨC VẤN ĐỀ VÀ PHƯƠNG HƯỚNG GIẢI QUYẾT</h4>
                  <p class="mt-1.5"> - 
                    {{ item.awarenessAndResolvePlan }} 
                  </p>
                </div>
              </div>

              <div class="w-72 bg-gray-200 text-black">
                <div class="p-5 max-w-full">
                  <h4 class="tracking-wide font-bold">GÓP Ý VỀ MỤC TIÊU SẮP TỚI CHO NHÂN SỰ</h4>
                  <p class="mt-1.5"> -
                    {{ item.feedback }} 
                  </p>
                </div>
              </div>

              <div class="w-72 bg-gray-200 text-black">
                <div class="p-5 max-w-full">
                  <h4 class="tracking-wide font-bold">ĐÁNH GIÁ CHUNG</h4>
                  <p> -
                    {{ item.managerGeneralEvaluation }} 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </app-tabs>
    </div>
  </div>
</template>

<script>
import SelfEvaluation from "@/views/user/SelfEvaluation.vue";
import AppTabs from "@/components/app-tabs/Main.vue";
import EvaluateAdminApi from "@/api/EvaluateAdminApi";

export default {
  name: "DetailEvaluation",
  props: ["id"],
  components: { AppTabs, SelfEvaluation },
  data() {
    return {
      evaluateList: [
        {
          quality: "Phát huy hết khả năng",
          selected: null,
          messageValid: false,
          checked: false,
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
        { quality: "Giao tiếp", selected: null, messageValid: false },
        { quality: "Làm việc độc lập", selected: null, messageValid: false },
        { quality: "Chủ động", selected: null, messageValid: false },
        { quality: "Năng suất", selected: null, messageValid: false },
        { quality: "Sáng tạo", selected: null, messageValid: false },
        { quality: "Trung thực", selected: null, messageValid: false },
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
        { quality: "Kỹ năng chuyên môn", selected: null, messageValid: false },
        { quality: "Độ tin cậy", selected: null, messageValid: false },
        { quality: "Đúng giờ", selected: null, messageValid: false },
        { quality: "Đi làm đầy đủ", selected: null, messageValid: false },
      ],
      evaluateBtn: true,
      showFormSelfEvaluation: false,
      tabList: ["NHÂN VIÊN ĐÁNH GIÁ", "QUẢN LÝ ĐÁNH GIÁ"],
      dataDetail: {},
      valueList: ""
    };
  },
  created() {
      this.handleDetail()
  },
  watch: {
    id: async function (id) {
      const res = await EvaluateAdminApi.getDetailsEvaluate(id);
      this.dataDetail = { ...res };
    },
  },
  computed: {
    selectedValues() {
      return this.evaluateList
        .filter((evaluate) => evaluate.selected !== null)
        .map((evaluate) => `${evaluate.selected}`)
        .join(",");
    }
  },

  methods: {
    getDetailsEvaluate() {
      for (let i = 0; i < this.valueList.length; i++) {
        // split tring

        // gán checked
        if (this.getValueList[i] == evaluateList.value) {
          this.evaluateList.checked == true;
        }
      }
    },

    evaluate() {
      this.evaluateBtn = false;
      this.showFormSelfEvaluation = true;
    },
    async handleDetail() {
        try {
            const res = await EvaluateAdminApi.getDetailsEvaluate(this.id);
            this.dataDetail = {...res};
        } catch (e) {
            console.log(e)
        }
    }
  },
};
</script>

<style scoped>
.shadow {
  box-shadow: 0px 3px 3px 5px rgb(0 0 0 / 0.25)
}
.target-ul {
  margin-bottom: 0;
  margin-top: 0;
  padding-left: 8px;
  list-style-type: none;
  word-wrap: break-word;
}
.target-icon {
  display: inline-block;
  position: absolute;
  width: 1em;
  min-height: 1em;
  height: auto;
  left: -1.2em;
  fill: currentColor;
  text-align: center;
}
.scrollable__left {
    height: 56vh;
    max-height: 56vh;
    overflow-y: scroll;
    background-color: rgb(var(--color-slate-100) / var(--tw-bg-opacity));
}
.textarea-width {
    width: 150%;
}

.selfEvaluate-frame {
  border-radius: 20px;
  display: flex;
  gap: 50px;
  margin: 10px 0 20px 0;
}
.selfEvaluate-part {
  padding: 20px;
  width: 100%;
  border-radius: 10px;
}
.managerEvaluate {
  color: #111111;
  background-color: #b9c1cc;
  border-radius: 10px;
  max-width: 40%;
  height: 70px;
  text-align: center;
  margin: auto;
  margin-bottom: 20px;
}
.managerEvaluate-name {
  padding-top: 8px;
}
.managerEvaluate-shape {
  width: 1200px;
  height: 350px;
  margin: 0px 0 0 auto;
  color: #111111;
}

.managerEvaluate-frame {
  grid-template-columns: repeat(4, calc(25% - 18.75px));
  min-height: 22rem;
  grid-gap: 25px;
  display: flex;
  flex-direction: row;
  margin-top: -320px;
  margin-bottom: 50px; 
}
</style>
<style>
.content {
    background-color: white;
}
</style>
