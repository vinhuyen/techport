<template>
<article class="grid grid-cols-6 gap-6 bg-white ml-6 border-b-2  pt-6">
        <div class="col-span-2 font-medium pb-4">
            <h3 class="text__title--medium mb-1">Mục tiêu {{index}}:</h3>
            <textarea :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" name="" id="" class="w-full form-control" rows="6" placeholder="Mục tiêu của bạn..."></textarea>
            <br>
            <p class="error-message">{{data.targetName.error}}</p>
            <button @click="onClickDelete"  class="btn bg-red-700 text-white">Xóa mục tiêu</button>
        </div>
        <div class="col-span-4 font-medium">
            <h3 class="mb-1">Các bước tiến hành:</h3>
            <div class="flex flex-col gap-3 justify-center">
                <ItemContainer :data="stepList" title="Cac buoc Tien hanh"/>
            </div>
        </div>
</article>
</template>

<script>
import ItemContainer from "@/components/judgement/GoalsContainer.vue";

export default {
    name: "Target",
    components: {ItemContainer},
    props: {
        index: Number,
        stepList: Array,
        modelValue: String,
        onClickDelete: Function,
        data: Array
    }
}
</script>

<style scoped>
textarea::placeholder {
    font-size: 12px;
}
</style>