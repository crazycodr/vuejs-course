<template>
    <div class="form-field">
        <div class="field">
            <label>{{label}}</label>
            <slot></slot>
            <span class="error-icon" v-if="errorMessage">
                <font-awesome-icon icon="exclamation-triangle" />
            </span>
        </div>
        <p v-if="errorMessage" class="errorMessage">{{errorMessage}}</p>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            required: true,
            type: String
        },
        errorMessage: {
            type: String,
            default: ""
        }
    },
    data(){
        return {
            number: Math.random()
        }
    }
}
</script>

<style lang="scss" scoped>
.form-field {

    .errorMessage {
        text-align: right;
        margin-top: 0;
        color: red;
        margin-right: 32px;
        font-size: 14px;
    }

    .field {
        padding: 10px 0px;
        display: flex;
        align-items: center;

        label {
            font-weight: bold;
            margin-right: 10px;
        }

        input {
            flex-grow: 1;
            font-size: 18px;
            padding: 5px;
            outline: none;

            &.hasError {
                border-color: red;
            }
        }

        .error-icon {
            margin-left: 10px;
            color: red;
        }

    }
}
</style>
