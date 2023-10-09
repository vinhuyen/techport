<template>
    <div>
        <div class="text-2xl font-bold text-center mb-2 text-blue-900 mt-5">
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
      <div class="target shadow ">
        <div class="m-auto text-center pt-3.5">
          <span class="text-xl font-medium ">MỤC TIÊU CHUNG</span>
        </div>
        <div class="pb-10 flex-grow rounded-lg  p-4 mb-4 mb-10">
          <div class="flex justify-around gap-5">
            <div class="bg-white rounded-3xl h-72 w-6/12 shadow-company">
              <h2 class="text-xl font-medium mb-2 font-medium m-6 text-center text-purple-800">Mục tiêu của Techzen</h2>
              <div class="flex flex-col gap-3 mx-6 pl-4 overflow-auto h-48" >
                <ul class="target-ul">
                  <li class="list-none flex flex-col gap-3.5">
                    <div v-for="(item, index) in dataDetail?.companyTargets" :key="index" class="text-base flex items-center gap-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
                            <circle cx="18.5" cy="18.5" r="18.5" fill="#85DB43" fill-opacity="0.1"/>
                            <svg data-v-508c4d80="" xmlns="http://www.w3.org/2000/svg" width="35" height="25" viewBox="0 -8 22 25" fill="none">
                                <path data-v-508c4d80="" d="M4.55757 10.8363L9.04242 15.3212L18.0121 6.3515" stroke="#75A253" stroke-width="2.69091" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </svg>
                        <span style="max-width: 88%;">{{ item }}</span>
                    </div >
                  </li>
                </ul>
              </div>
            </div>
            <div class="bg-white rounded-3xl h-72 w-6/12 shadow-department">
              <h2 class="text-xl font-medium mb-2 font-medium m-6 text-center text-pink-700">Mục tiêu của bộ phận</h2>
              <div class="flex flex-col gap-3 mx-6 pl-4 overflow-auto h-48" >
                <ul class="target-ul">
                  <li class="list-none flex flex-col gap-3.5">
                    <div v-for="(item, index) in dataDetail?.departmentTargets" :key="index" class="text-base flex items-center gap-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none">
                            <circle cx="18.5" cy="18.5" r="18.5" fill="#85DB43" fill-opacity="0.1"/>
                            <svg data-v-508c4d80="" xmlns="http://www.w3.org/2000/svg" width="35" height="25" viewBox="0 -8 22 25" fill="none">
                                <path data-v-508c4d80="" d="M4.55757 10.8363L9.04242 15.3212L18.0121 6.3515" stroke="#75A253" stroke-width="2.69091" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </svg>
                        <span style="max-width: 88%;">{{ item }}</span>
                    </div >
                  </li>
                </ul>
              </div>
            </div>
          </div>
  
          <div class="">
            <h3 class="text-xl font-medium mb-2 font-medium m-6 text-center">MỤC TIÊU CÁ NHÂN</h3>
            <div class="grid grid-cols-8 gap-4 w-full mb-2">
              <div class="text-white h-12 text-lg font-medium pl-2 pt-2.5 text-center col-color">Hạng mục</div>
              <div class="text-white h-12 text-lg font-medium pl-2 pt-2.5 col-span-2 text-center col-color">Mục tiêu đạt được</div>
              <div class="text-white h-12 text-lg font-medium pl-2 pt-2.5 col-span-2 text-center col-color">Các bước tiến hành</div>
              <div class="text-white h-12 text-lg font-medium pl-2 pt-2.5 col-span-2 text-center col-color">Kết quả thực tế</div>
              <div class="text-white h-12 text-lg font-medium pl-2 pt-2.5 text-center col-color">Kết quả</div>
            </div>
            <div v-for="(selfTarget, index) in dataDetail.selfTargetDTOList" :key="index" class="grid grid-cols-8 gap-4 w-full mb-2">
                <div class="bg-white p-3.5 text-base">Mục tiêu công ty</div>
                <div class="bg-white p-3.5 text-base col-span-2">{{ selfTarget.targetName }}</div>
                <div class="bg-white p-3.5 text-base col-span-2">
                  <ul>
                      <li v-for="(targetStep, index) in selfTarget.targetSteps" :key="index">
                        -   {{ targetStep }}
                      </li>
                  </ul>
                </div>
                <div class="p-3.5 text-base col-span-2 row-color">{{ selfTarget.actualResult }}</div>
                <div class="p-3.5 text-base row-color">{{ selfTarget.result }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="">
        <app-tabs class="w-full mb-16" :tabList="tabList">
          <template v-slot:tabPanel-1>
            <div>
              <div class="selfEvaluate">
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
            </div>
          </template>
  
          <template v-slot:tabPanel-2>
            <div v-for="(item, index) in dataDetail.managerEvaluationDTOList" :key="index" class="border-b-2">
              <div class="managerEvaluate">
                <div class="managerEvaluate-name">
                  <h3 class="text-xl font-medium">Tên quản lý: {{ item.managerName }}</h3>
                  <h4 class="text-lg">Bộ phận: QC</h4>
                </div>
              </div>
              <div class="managerEvaluate-frame grid-rows-4">
                <div class="w-3/12 managerEvaluate-detail-odd text-black">
                  <div class="p-5 max-w-full">
                    <div class="managerEvaluate-icon items-center flex justify-center mb-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 107 106" fill="none">
                            <ellipse cx="53.5" cy="53.25" rx="52.5" ry="52.75" transform="rotate(37 53.5 53.25)" fill="#F3F7FF"/>
                            <svg height="80px" width="80px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-200 -200 700 700" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#509FE8;" d="M427.023,59.858H84.977c-13.851,0-25.119,11.268-25.119,25.119v401.904 c0,13.851,11.268,25.119,25.119,25.119h342.046c13.851,0,25.119-11.268,25.119-25.119V84.977 C452.142,71.126,440.874,59.858,427.023,59.858z"></path> <g> <path style="fill:#4D8CCF;" d="M93.528,470.313c0,4.427,3.589,8.017,8.017,8.017h290.739c4.427,0,8.017-3.589,8.017-8.017V77.934 c0-4.965-4.025-8.99-8.99-8.99H102.519c-4.965,0-8.99,4.025-8.99,8.99V470.313z"></path> <path style="fill:#4D8CCF;" d="M436.109,503.983H94.063c-13.851,0-25.119-11.268-25.119-25.119V76.96 c0-5.296,1.651-10.211,4.46-14.267c-8.04,4.193-13.546,12.604-13.546,22.283v401.904c0,13.851,11.268,25.119,25.119,25.119h342.046 c8.554,0,16.12-4.301,20.659-10.852C444.215,502.955,440.28,503.983,436.109,503.983z"></path> </g> <path style="fill:#F6F6F7;" d="M102.079,461.228c0,4.427,3.589,8.017,8.017,8.017h290.739c4.427,0,8.017-3.589,8.017-8.017V77.934 c0-4.965-4.025-8.99-8.99-8.99H111.07c-4.965,0-8.99,4.025-8.99,8.99V461.228z"></path> <path style="fill:#D9DCDF;" d="M163.541,110.63h188.125c10.314,0,18.706-8.392,18.706-18.706V68.944H144.835v22.981 C144.835,102.239,153.227,110.63,163.541,110.63z"></path> <path style="fill:#FFC44F;" d="M332.96,34.205h-35.502C293.703,14.743,276.542,0,256,0c-20.541,0-37.703,14.743-41.458,34.205 H179.04c-13.851,0-25.119,11.268-25.119,25.119v34.205c0,4.427,3.589,8.017,8.017,8.017h188.125c4.428,0,8.017-3.589,8.017-8.017 V59.324C358.079,45.473,346.811,34.205,332.96,34.205z"></path> <g> <path style="fill:#F7B14D;" d="M260.008,0.192C258.688,0.067,257.352,0,256,0c-20.541,0-37.703,14.743-41.458,34.205h8.017 C226.067,16.024,241.275,1.966,260.008,0.192z"></path> <path style="fill:#F7B14D;" d="M161.937,93.528V59.324c0-13.851,11.268-25.119,25.119-25.119h-8.017 c-13.851,0-25.119,11.268-25.119,25.119v34.205c0,4.427,3.589,8.017,8.017,8.017h8.017 C165.527,101.545,161.937,97.956,161.937,93.528z"></path> </g> <path style="fill:#BF722A;" d="M256,50.238c-4.427,0-8.017-3.589-8.017-8.017V33.67c0-4.427,3.589-8.017,8.017-8.017 c4.428,0,8.017,3.589,8.017,8.017v8.551C264.017,46.649,260.428,50.238,256,50.238z"></path> <path style="fill:#DF7A6E;" d="M356.808,316.761l-85.512-171.023c-2.897-5.794-8.818-9.454-15.297-9.454 c-6.479,0-12.4,3.66-15.297,9.454l-85.511,171.023c-4.224,8.447-0.8,18.721,7.649,22.945c8.445,4.223,18.721,0.799,22.945-7.649 l33.754-67.506h72.923l33.754,67.506c2.996,5.993,9.035,9.459,15.31,9.458c2.57,0,5.18-0.581,7.635-1.809 C357.608,335.482,361.033,325.209,356.808,316.761z M236.64,230.347L256,191.628l19.36,38.719H236.64z"></path> <path style="fill:#FF8C78;" d="M350.063,145.37h-9.086v-9.086c0-4.427-3.588-8.017-8.017-8.017c-4.428,0-8.017,3.589-8.017,8.017 v9.086h-9.086c-4.428,0-8.017,3.589-8.017,8.017c0,4.427,3.588,8.017,8.017,8.017h9.086v9.086c0,4.427,3.588,8.017,8.017,8.017 c4.428,0,8.017-3.589,8.017-8.017v-9.086h9.086c4.428,0,8.017-3.589,8.017-8.017C358.079,148.959,354.491,145.37,350.063,145.37z"></path> <g> <path style="fill:#B3B9BF;" d="M324.409,392.284H187.591c-4.427,0-8.017-3.589-8.017-8.017c0-4.427,3.589-8.017,8.017-8.017 h136.818c4.428,0,8.017,3.589,8.017,8.017C332.426,388.695,328.838,392.284,324.409,392.284z"></path> <path style="fill:#B3B9BF;" d="M264.551,426.489h-76.96c-4.427,0-8.017-3.589-8.017-8.017c0-4.427,3.589-8.017,8.017-8.017h76.96 c4.428,0,8.017,3.589,8.017,8.017C272.568,422.899,268.98,426.489,264.551,426.489z"></path> </g> </g></svg>
                        </svg>
                    </div>
                    <h4 class="tracking-wide font-bold text-center">ĐÁNH GIÁ VỀ VIỆC THỰC HIỆN CÁC MỤC TIÊU ĐẶT RA</h4>
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
  
                <div class="w-3/12 managerEvaluate-detail-even text-black">
                  <div class="p-5 max-w-full">
                    <div class="managerEvaluate-icon items-center flex justify-center mb-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 107 106" fill="none">
                            <ellipse cx="56.25" cy="50" rx="55.75" ry="50" fill="#F9F3FF"/>
                            <svg width="80" height="90" viewBox="-350 -80 1300 900" class="icon items-center" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M153.9 105.9h715.4v812.8H153.9z" fill="#55B7A8"></path><path d="M877.3 926.8H145.9V97.9h731.4v828.9z m-715.4-16h699.4V113.9H161.9v796.9z" fill="#0A0408"></path><path d="M221.3 182.9h580.5v658.8H221.3z" fill="#FFFFFF"></path><path d="M793.8 833.8h16v16h-16zM777.7 849.8h-16.1v-16h16.1v16z m-32.3 0h-16.1v-16h16.1v16z m-32.2 0h-16.1v-16h16.1v16z m-32.3 0h-16.1v-16h16.1v16z m-32.2 0h-16.1v-16h16.1v16z m-32.3 0h-16.1v-16h16.1v16z m-32.2 0H568v-16h16.1v16z m-32.3 0h-16.1v-16h16.1v16z m-32.3 0h-16.1v-16h16.1v16z m-32.2 0h-16.1v-16h16.1v16z m-32.3 0H439v-16h16.1v16z m-32.2 0h-16.1v-16h16.1v16z m-32.3 0h-16.1v-16h16.1v16z m-32.2 0h-16.1v-16h16.1v16z m-32.3 0H310v-16h16.1v16z m-32.3 0h-16.1v-16h16.1v16z m-32.2 0h-16.1v-16h16.1v16zM213.3 833.8h16v16h-16zM229.3 818.1h-16v-15.7h16v15.7z m0-31.4h-16V771h16v15.7z m0-31.3h-16v-15.7h16v15.7z m0-31.4h-16v-15.7h16V724z m0-31.3h-16V677h16v15.7z m0-31.4h-16v-15.7h16v15.7z m0-31.4h-16v-15.7h16v15.7z m0-31.3h-16v-15.7h16v15.7z m0-31.4h-16v-15.7h16v15.7z m0-31.3h-16v-15.7h16v15.7z m0-31.4h-16v-15.7h16v15.7z m0-31.4h-16v-15.7h16v15.7z m0-31.3h-16v-15.7h16v15.7z m0-31.4h-16v-15.7h16v15.7z m0-31.3h-16v-15.7h16v15.7z m0-31.4h-16V332h16v15.7z m0-31.3h-16v-15.7h16v15.7z m0-31.4h-16v-15.7h16V285z m0-31.4h-16V238h16v15.6z m0-31.3h-16v-15.7h16v15.7zM213.3 174.9h16v16h-16zM777.7 190.9h-16.1v-16h16.1v16z m-32.3 0h-16.1v-16h16.1v16z m-32.2 0h-16.1v-16h16.1v16z m-32.3 0h-16.1v-16h16.1v16z m-32.2 0h-16.1v-16h16.1v16z m-32.3 0h-16.1v-16h16.1v16z m-32.2 0H568v-16h16.1v16z m-32.3 0h-16.1v-16h16.1v16z m-32.3 0h-16.1v-16h16.1v16z m-32.2 0h-16.1v-16h16.1v16z m-32.3 0H439v-16h16.1v16z m-32.2 0h-16.1v-16h16.1v16z m-32.3 0h-16.1v-16h16.1v16z m-32.2 0h-16.1v-16h16.1v16z m-32.3 0H310v-16h16.1v16z m-32.3 0h-16.1v-16h16.1v16z m-32.2 0h-16.1v-16h16.1v16zM793.8 174.9h16v16h-16zM809.8 818.1h-16v-15.7h16v15.7z m0-31.4h-16V771h16v15.7z m0-31.3h-16v-15.7h16v15.7z m0-31.4h-16v-15.7h16V724z m0-31.3h-16V677h16v15.7z m0-31.4h-16v-15.7h16v15.7z m0-31.4h-16v-15.7h16v15.7z m0-31.3h-16v-15.7h16v15.7z m0-31.4h-16v-15.7h16v15.7z m0-31.3h-16v-15.7h16v15.7z m0-31.4h-16v-15.7h16v15.7z m0-31.4h-16v-15.7h16v15.7z m0-31.3h-16v-15.7h16v15.7z m0-31.4h-16v-15.7h16v15.7z m0-31.3h-16v-15.7h16v15.7z m0-31.4h-16V332h16v15.7z m0-31.3h-16v-15.7h16v15.7z m0-31.4h-16v-15.7h16V285z m0-31.4h-16V238h16v15.6z m0-31.3h-16v-15.7h16v15.7z" fill="#0A0408"></path><path d="M364.5 306.6m-44.8 0a44.8 44.8 0 1 0 89.6 0 44.8 44.8 0 1 0-89.6 0Z" fill="#DC444A"></path><path d="M364.5 359.4c-29.1 0-52.8-23.7-52.8-52.8s23.7-52.8 52.8-52.8 52.8 23.7 52.8 52.8-23.7 52.8-52.8 52.8z m0-89.6c-20.3 0-36.8 16.5-36.8 36.8s16.5 36.8 36.8 36.8 36.8-16.5 36.8-36.8-16.5-36.8-36.8-36.8zM459.3 262.6h144.1v16H459.3zM459.3 332.2h244.1v16H459.3z" fill="#0A0408"></path><path d="M364.5 516.3m-44.8 0a44.8 44.8 0 1 0 89.6 0 44.8 44.8 0 1 0-89.6 0Z" fill="#DC444A"></path><path d="M364.5 569.1c-29.1 0-52.8-23.7-52.8-52.8s23.7-52.8 52.8-52.8 52.8 23.7 52.8 52.8-23.7 52.8-52.8 52.8z m0-89.6c-20.3 0-36.8 16.5-36.8 36.8 0 20.3 16.5 36.8 36.8 36.8s36.8-16.5 36.8-36.8c0-20.3-16.5-36.8-36.8-36.8zM459.3 472.3h144.1v16H459.3zM459.3 541.9h244.1v16H459.3z" fill="#0A0408"></path><path d="M364.5 726m-44.8 0a44.8 44.8 0 1 0 89.6 0 44.8 44.8 0 1 0-89.6 0Z" fill="#DC444A"></path><path d="M364.5 778.8c-29.1 0-52.8-23.7-52.8-52.8s23.7-52.8 52.8-52.8 52.8 23.7 52.8 52.8-23.7 52.8-52.8 52.8z m0-89.6c-20.3 0-36.8 16.5-36.8 36.8 0 20.3 16.5 36.8 36.8 36.8s36.8-16.5 36.8-36.8c0-20.3-16.5-36.8-36.8-36.8zM459.3 682h144.1v16H459.3zM459.3 751.6h244.1v16H459.3z" fill="#0A0408"></path><path d="M359 72.4h305.2v75.9H359z" fill="#EBB866"></path><path d="M672.2 156.2H351V64.4h321.2v91.8z m-305.2-16h289.2V80.4H367v59.8z" fill="#0A0408"></path><path d="M808.3 807.9m-141.7 0a141.7 141.7 0 1 0 283.4 0 141.7 141.7 0 1 0-283.4 0Z" fill="#EBB866"></path><path d="M808.3 957.6c-82.5 0-149.7-67.1-149.7-149.7s67.1-149.7 149.7-149.7S958 725.4 958 807.9s-67.2 149.7-149.7 149.7z m0-283.4c-73.7 0-133.7 60-133.7 133.7s60 133.7 133.7 133.7S942 881.6 942 807.9s-60-133.7-133.7-133.7z" fill="#0A0408"></path><path d="M810.3 727.1l26 52.5 58 8.5-42 40.9 9.9 57.8-51.9-27.3-51.9 27.3 9.9-57.8-41.9-40.9 58-8.5z" fill="#FFFFFF"></path><path d="M872.8 901.4l-62.5-32.9-62.5 32.9 11.9-69.6-50.6-49.3 69.9-10.2 31.3-63.3 31.3 63.3 69.9 10.2-50.6 49.3 11.9 69.6z m-62.5-51l41.3 21.7-7.9-45.9 33.4-32.5L831 787l-20.6-41.8-20.7 41.8-46.1 6.7 33.4 32.5-7.9 45.9 41.2-21.7z" fill="#0A0408"></path></g></svg>
                        </svg>
                    </div>
                    <h4 class="tracking-wide font-bold text-center">ĐÁNH GIÁ VỀ NHẬN THỨC VẤN ĐỀ VÀ PHƯƠNG HƯỚNG GIẢI QUYẾT</h4>
                    <p class="mt-1.5"> - 
                      {{ item.awarenessAndResolvePlan }} 
                    </p>
                  </div>
                </div>
  
                <div class="w-3/12 managerEvaluate-detail-odd text-black">
                  <div class="p-5 max-w-full">
                    <div class="managerEvaluate-icon items-center flex justify-center mb-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 107 106" fill="none">
                            <ellipse cx="53.5" cy="55.25" rx="52.5" ry="55.25" transform="rotate(-27 53.5 55.25)" fill="#FFF2F2"/>
                            <svg width="80" height="90" viewBox="-150 -100 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M813.09 238.24H200.855s-35.86 11.324-35.86 79.27 35.86 81.157 35.86 81.157H813.09s-30.833-13.212-30.833-80.214 30.833-80.213 30.833-80.213z" fill="#FCE3C3"></path><path d="M836.11 411.167H198.626l-2.092-0.771c-1.798-0.662-44.039-17.096-44.039-92.887 0-76.229 42.775-90.614 44.597-91.189l1.837-0.58H836.11v25H203.434c-5.723 2.987-25.938 17.064-25.938 66.77 0 49.62 20.176 65.117 26.251 68.657H836.11v25z" fill="#300604"></path><path d="M256.75 275.988h231.233v18.873H256.75zM390.334 310.933h344.649v23.043H390.334zM262.52 349.398h150.736v23.043H262.52z" fill="#ED8F27"></path><path d="M907.017 433.246H294.782s-35.86 11.324-35.86 79.27 35.86 81.157 35.86 81.157h612.235s-30.833-13.212-30.833-80.214 30.833-80.213 30.833-80.213z" fill="#FCE3C3"></path><path d="M930.037 606.173H292.553l-2.092-0.771c-1.798-0.662-44.039-17.096-44.039-92.887 0-76.229 42.775-90.614 44.597-91.189l1.837-0.58h637.182v25H297.36c-5.723 2.987-25.938 17.064-25.938 66.77 0 49.62 20.176 65.117 26.251 68.657h632.364v25z" fill="#300604"></path><path d="M354.857 541.566h431.325v23.043H354.857z" fill="#ED8F27"></path><path d="M792.055 627.604H179.82s-35.86 11.324-35.86 79.27 35.86 81.157 35.86 81.157h612.235s-30.833-13.212-30.833-80.214 30.833-80.213 30.833-80.213z" fill="#FCE3C3"></path><path d="M815.075 800.531H177.59l-2.092-0.771c-1.799-0.663-44.038-17.097-44.038-92.887 0-76.229 42.774-90.614 44.595-91.189l1.838-0.58h637.183v25H182.397c-5.723 2.987-25.938 17.064-25.938 66.77 0 49.619 20.175 65.117 26.25 68.657h632.365v25z" fill="#300604"></path><path d="M265.709 708.718l-50.263 147.29 153.236-57.634z" fill="#FCE3C3"></path><path d="M314.22 744.184l54.462 54.19L697.02 470.635l-51.623-47.93z" fill="#B12800"></path><path d="M268.266 699.017l54.461 54.19 328.339-327.739-51.623-47.93z" fill="#ED8F27"></path><path d="M645.397 329.934l58.74-57.215 41.085-3.024 52.717 53.485 3.061 42-66.183 67.658z" fill="#228E9D"></path><path d="M362.732 805.746l-97.023-97.028a8.645 8.645 0 0 1 0-12.226l422.24-422.237c11.268-11.271 26.55-17.075 42.624-16.073 13.979 0.871 26.973 7.542 36.878 17.445l29.748 29.746c21.576 21.574 21.578 56.555 0.002 78.131L374.957 805.746a8.644 8.644 0 0 1-12.225 0z m-77.039-103.141l83.152 83.158 415.308-415.308c14.343-14.341 14.34-37.686-0.003-52.032l-31.123-31.12c-6.948-6.951-16.187-10.778-26.013-10.778s-19.065 3.827-26.016 10.778L285.693 702.605z" fill="#300604"></path><path d="M697.02 470.642l-96.201-96.201 40.744-40.745 96.201 96.201z" fill="#300604"></path><path d="M697.02 483.681L587.766 374.432l53.798-53.793 109.249 109.249-53.793 53.793z m-83.151-109.249l83.152 83.152 27.695-27.695-83.152-83.152-27.695 27.695z" fill="#300604"></path><path d="M745.703 381.239l-13.049-13.049 18.11-18.107c3.265-3.268 3.265-8.585-0.003-11.853l-8.768-8.771 13.049-13.049 8.771 8.771c10.459 10.465 10.459 27.485 0.003 37.951l-18.113 18.107zM638.998 419.4l13.05 13.048L327.27 757.224l-13.049-13.049z" fill="#300604"></path><path d="M199.742 871.713L264 699.379l17.289 6.452-50.139 134.475 134.471-50.14 6.447 17.29z" fill="#300604"></path><path d="M215.446 856.008l57.278-25.908-31.37-31.371z" fill="#300604"></path><path d="M196.954 874.501l41.489-91.736 50.242 50.241-91.731 41.495z m47.311-59.812l-10.328 22.829 22.829-10.327-12.501-12.502z" fill="#300604"></path></g></svg>
                        </svg>
                    </div>
                    <h4 class="tracking-wide font-bold text-center">GÓP Ý VỀ MỤC TIÊU SẮP TỚI CHO NHÂN SỰ</h4>
                    <p class="mt-1.5"> -
                      {{ item.feedback }} 
                    </p>
                  </div>
                </div>
  
                <div class=" w-3/12 managerEvaluate-detail-even text-black">
                  <div class="p-5 max-w-full">
                    <div class="managerEvaluate-icon items-center flex justify-center mb-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 107 106" fill="none">
                            <ellipse cx="56.5" cy="56.25" rx="55.5" ry="55.75" transform="rotate(31 56.5 56.25)" fill="#E9FBF2"/>
                            <svg width="80" height="90" viewBox="-220 -200 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M548.1 455.7h-72l-36 39.8 36 39.9h72l36-39.9z" fill="#DC444A"></path><path d="M551.7 543.4h-79.1l-43.2-47.9 43.2-47.9h79.1l43.2 47.9-43.2 47.9z m-72-16h64.9l28.8-31.9-28.8-31.9h-64.9l-28.8 31.9 28.8 31.9z" fill="#0A0408"></path><path d="M512.1 899.4l102.5-110.5-64.4-253.6h-76.1l-64.5 253.6z" fill="#FFFFFF"></path><path d="M512.1 911.2l-111.3-120 67.1-263.8h88.5l67.1 263.8-111.4 120z m-93.7-124.6l93.7 101 93.7-101-61.9-243.4h-63.6l-61.9 243.4z" fill="#0A0408"></path><path d="M512.1 843.5l72.4-78L539 586.6h-53.7l-45.5 178.9z" fill="#DC444A"></path><path d="M512.1 240.3m-167.3 0a167.3 167.3 0 1 0 334.6 0 167.3 167.3 0 1 0-334.6 0Z" fill="#EBB866"></path><path d="M512.1 415.5c-96.6 0-175.3-78.6-175.3-175.3S415.5 65 512.1 65c96.6 0 175.3 78.6 175.3 175.3s-78.6 175.2-175.3 175.2z m0-334.5c-87.8 0-159.3 71.4-159.3 159.3s71.4 159.3 159.3 159.3c87.8 0 159.3-71.4 159.3-159.3S599.9 81 512.1 81z" fill="#0A0408"></path><path d="M880.3 950H143.9V645.6c0-61.2 116.2-144.2 177.4-144.2L512 774.7l190.7-273.3c61.2 0 177.4 82.9 177.4 144.2V950z" fill="#FFFFFF"></path><path d="M888.3 958H135.9V645.6c0-43.4 48.2-85.4 68.9-101.4 39.9-30.9 85.7-50.8 116.6-50.8h4.2l186.6 267.3 186.6-267.3h4.2c30.9 0 76.7 19.9 116.6 50.8 20.7 16 68.9 57.9 68.9 101.4V958z m-736.4-16h720.4V645.6c0-25.2-23.4-58.4-62.6-88.7-35.5-27.4-75.2-45.6-102.7-47.3L512.1 788.8 317.3 509.6c-27.5 1.7-67.2 19.9-102.7 47.3-39.2 30.3-62.6 63.5-62.6 88.7V942z" fill="#0A0408"></path><path d="M441.2 896.3H209.6V704.8c0-38.5 31.2-90.7 69.8-90.7h45.3l116.6 172v110.2zM574.6 896.3h231.7V704.8c0-38.5-31.2-90.7-69.8-90.7h-45.3L574.6 786v110.3z" fill="#55B7A8"></path><path d="M520.1 930.4h-16v-15.2h16v15.2z m0-31.2h-16v-16h16v16z m0-32h-16v-16h16v16z m0-32h-16v-16h16v16z m0-32h-16v-16h16v16z m0-32h-16v-16h16v16z" fill="#0A0408"></path></g></svg>
                        </svg>
                    </div>
                    <h4 class="tracking-wide font-bold text-center">ĐÁNH GIÁ CHUNG</h4>
                    <p class="mt-1.5"> -
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
  import AppTabs from "@/components/app-tabs/Main.vue";
  import EvaluateAdminApi from "@/api/EvaluateAdminApi";
  
  export default {
      name: "DetailEvaluationAdmin",
      props: ['id'],
      components: { AppTabs },
      created() {
          this.handleDetail()
      },
      data() {
          return {
              tabList: ["NHÂN VIÊN ĐÁNH GIÁ", "QUẢN LÝ ĐÁNH GIÁ"],
              dataDetail: {},
              reportId: this.$route.query.id
          };
      },
      methods: {
      async handleDetail() {
          const res = await EvaluateAdminApi.getDetailsEvaluate(this.reportId);
          this.dataDetail = {...res};
      }
  }

  };
  </script>
  
  <style scoped>
  .shadow {
    box-shadow: 0px 3px 3px 5px rgb(0 0 0 / 0.25)
  }
  .shadow-company {
    box-shadow: 5px 5px #839494;
    border-radius: 15px;
    background: #FFF;
  }
  .shadow-department {
    border-radius: 15px;
    box-shadow: 5px 5px #C39589;
    background: #FFF;
  }
  .target {
    background: #F9F9F9;
  }
  .col-color {
    background: #849994;
  }
  .row-color {
    background-color: #F4F3EF;
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
    background-color: rgb(212 212 216);
    border-radius: 10px;
    max-width: 40%;
    height: 70px;
    text-align: center;
    margin: auto;
    margin-bottom: 20px;
    margin-top: 20px;
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
    margin-bottom: 20px; 
  }
    .managerEvaluate-detail-odd {
        border-radius: 5px;
        background: linear-gradient(120deg, #F8F2FA 1.41%, #F9FAF2 100%);
    }

    .managerEvaluate-detail-even {
        border-radius: 5px;
        background: linear-gradient(120deg, #FAF2F4 1.41%, #F2F4FA 100%);
    }

  </style>
  <style>
  .content {
      background-color: white;
  }
  </style>
  