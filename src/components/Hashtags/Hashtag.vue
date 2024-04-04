<template>
    <span class="card__content--hashtag">
        {{ props.text }}
    </span>
</template>

<script setup>
const props = defineProps({
    src: {
        type: String,
        reqiured: true
    },
    text: {
        type: String,
        reqiured: true
    },
    alt: {
        type: String,
        reqiured: true
    }
})
</script>

<style lang="scss" scoped>
.card__content--hashtag {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 10px;
    font-size: 12px;
    line-height: 16px;
    font-weight: bold;
    border-radius: 100px;
    color: var(--grey-darker);
    background-color: var(--grey-lightest);
    margin-right: 8px;
}
</style>