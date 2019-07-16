<template>
    <div class="avatar-viewer">
        <img :src="avatar" />
    </div>
</template>

<script>
export default {
    props: {
        avatar: String,
    }
}
</script>