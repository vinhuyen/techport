<template>
<section>
    <section>
        <Target
            v-for="(target, index) in data.value"
            v-model.trim="target.targetName.value"
            :index="index+1"
            :data="target"
            :stepList="target.stepList"
            :onClickDelete="() => handleDeleteTarget(index)"
        />
        <p class="error-message font-medium ml-6">{{data.error}}</p>
    </section>
</section>
</template>

<script>
import Target from "@/components/judgement/Target.vue";

export default {
    name: "TargetContainer",
    components: {Target},
    props: {
        data: Array,
        isAddNewFormPerform: Boolean,
        error: String
    },
    methods: {
        handleDeleteTarget(index) {
            this.data.value.splice(index, 1)
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
    }
}
</script>

<style scoped>

</style>