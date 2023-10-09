<template>
    <section class="flex flex-col items-center">
        <section class="flex flex-col gap-2 w-full">
            <Goal v-for="(item, index) in data.value" :key="index"
                  v-model.trim="item.value"
                  :data="item"
                  :onClose="() => handleRemoveItem(index)"
            />
            <Goal :onSave="handleCompleteAddNewItem" v-if="isAddNew" :isFocus="true"/>
            <p class="error-message">{{ data?.error }}</p>
        </section>
        <div class="flex justify-end w-5/6">
            <button @click="handleTriggerAddNewItem" class="btn w-16 bg-gray-600 text-white mt-3 justify-end">Thêm
            </button>
        </div>
    </section>
</template>

<script>
import Goal from "@/components/judgement/Goal.vue";

export default {
    name: "GoalsContainer",
    components: {Goal},
    props: {
        title: String,
        data: Array,
        class: String
    },
    data() {
        return {
            isAddNew: false
        };
    },
    methods: {
        handleTriggerAddNewItem() {
            this.isAddNew = true
        },

        handleRemoveItem(index) {
            this.data.value.splice(index, 1)
        },

        handleCompleteAddNewItem(newVal) {
            if (newVal) this.data.value.push({
                validationRuleList:
                    [{
                        behavior: "on-change",
                        condition: (value) => value.length === 0,
                        error: "Mục tiêu không được để trống"
                    }]
                , error: "", value: newVal.trim()
            })
            this.isAddNew = false
        }
    },
    watch: {
        ["data.value"]: {
            deep: true,
            handler(newVal, oldVal) {
                for (const rule of this.data.validationRuleList) {
                    this.data.error = rule.behavior === "on-change" && rule.condition(newVal) ? rule.error : ""
                }
            }
        }
    },

}
</script>

<style scoped>

</style>