<template>
    <article class="flex items-center w-full">
        <div :class="{ 'border-[1px] border-gray-700': isFocus, 'bg-gray-200': !isFocus }" class="w-full flex items-center rounded-lg">
            <textarea
                ref="inputRef"
                :value="modelValue"
                @input="handleInputChange($event.target.value)"
                @blur="handleInputBlur"
                class="w-full pl-3 py-3 bg-transparent text-sm form-control"
                rows="1"
                placeholder="Nhập nội dung..."
            />
        </div>
        <button @click="onClose" class="p-3"><XIcon class="w-4 h-4" /></button>
    </article>
    <p class="error-message">{{data?.error}}</p>

</template>

<script>
export default {
    name: "Goal",
    props: {
        modelValue: String, // the name have to be modelValue
        isFocus: Boolean,
        onClose: Function,
        onSave: Function,
        error: String,
        data: Array
    },
    data() {
        return {
            value: this.modelValue ?? "",
            inputRef: null
        };
    },
    mounted() {
        if (this.isFocus) {
            this.$refs.inputRef.focus()
            this.$refs.inputRef.select()
        }
    },
    methods: {
        handleInputChange(newValue) {
            this.value = newValue;
            this.$emit("update:modelValue", newValue)
        },
        handleInputBlur() {
            this.onSave && this.onSave(this.value)
        }
    },
}
</script>

<style scoped>
textarea::placeholder {
    font-size: 12px;
}
textarea {
    outline: none;
    border: 0;
}
</style>