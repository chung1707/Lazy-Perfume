<template>
    <button
        type="button"
        class="btn btn-primary float-right"
        @click.prevent="print()"
    >
        <i class="fas fa-download"></i> In hóa đơn
    </button>
</template>

<script>
export default {
    methods: {
        print() {
            window.print();
        }
    }
};
</script>

<style scoped>
button {
  padding: 15px;
  font-size: 14px;
}
</style>

