<template>
    <div class="taste-list">
        <h2>{{title}}</h2>
        <transition-group name="taste-list" tag="ul">
            <li v-for="item in filteredItems" :key="item">{{ item }}</li>
            <button v-if="hasTooManyItems" key="showMoreItemsButton" @click.prevent="showMoreOrLess">
                {{showMoreOrLessLabel}}
            </button>
        </transition-group>
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
        maxItems: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            showMoreItems: false,
        }
    },
    computed: {
        showMoreOrLessLabel() {
            return this.showMoreItems ? 'less' : 'more'
        },
        hasTooManyItems() {
            return this.maxItems > 0 && this.items.length > this.maxItems
        },
        filteredItems() {
            if (this.hasTooManyItems && this.showMoreItems == false) {
                return this.sortedItems.slice(0, this.maxItems)
            }
            return this.sortedItems
        },
        sortedItems() {
            if (!this.sorted) {
                return this.items.slice()
            }
            return this.items.slice().sort((a, b) => a.localeCompare(b))
        },
    },
    methods: {
        showMoreOrLess() {
            this.showMoreItems = !this.showMoreItems
        },
    }
}
</script>

<style lang="scss" scoped>
.taste-list {

    h2 {
        font-size: 18px;
        margin-bottom: 5px;
    }

    button {
        background-color: lightgray;
        color: gray;
        padding: 0px 10px;
        line-height: 30px;
        border-radius: 3px;
        text-transform: capitalize;
        text-decoration: none;
        border: 0;
        margin-top: 5px;
        transition: all 300ms;
        cursor: pointer;
        outline: none;

        &:hover {
            background-color: darkgray;
            color: white;
        }
    }

    ul {
        padding: 0;
        padding-left: 17px;
        margin: 0;

        li {
            margin-bottom: 3px;
        }
    }

    .taste-list-enter-active, .taste-list-leave-active {
        transition: all 1s;
    }

    .taste-list-enter, .taste-list-leave-to {
        opacity: 0;
    }

}
</style>
