<template>
<div class="tooltip-content">
    <div>{{title}}</div>
    <div>
        <slot v-bind:test="user"></slot>
    </div>
</div>
  
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            user: 'sgfdg'
        }
    },
}
</script>

<style lang="scss" scoped>
</style>