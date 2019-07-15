<template>
    <div class="taste-list">
        <h2>{{title}}</h2>
        <ul>
            <li v-for="item in sortedItems" :key="item">{{ item }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        items: Array,
        sorted: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        sortedItems() {
            if (!this.sorted) return this.items.slice()
            return this.items.slice().sort((a, b) => a.localeCompare(b))
        },
    }
}
</script>
