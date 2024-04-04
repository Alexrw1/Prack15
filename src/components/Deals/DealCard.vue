<template>
    <div class="deal__card">
        <div class="deal__card-img">
            <img :src="props.src" alt="ice-cream">
        </div>
        <div class="deal__card--content">
            <div class="deal-title">{{ props.title }}</div>
            <div class="deal-percentage deal-primary">{{ props.deal }}</div>
            <div class="deal-text">{{ props.text }}</div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    src: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    deal: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})
</script>

<style lang="scss" scoped>
.deal__card {
    margin: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #F3F4FF;
    border-radius: 16px;
    padding-right: 24px;
}

.deal__card-img > img {
    width: 100%;
    background-size: cover;
}

.deal-title {
    font-family: 'Nunito', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    letter-spacing: 0.1px;
    color: #2B2B43;
}

.deal-text {
    font-family: 'Nunito', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.1px;
    color: #83859C;
}

.deal-percentage {
    font-family: 'Nunito', sans-serif;
    font-style: normal;
    font-weight: 800;
    font-size: 40px;
    line-height: 56px;
    letter-spacing: 0.1px;
    padding-bottom: 36px;
}

.deal-primary {
    color: var(--primary);
}

.deal-orange {
    color: var(--orange);
}

@media screen and (max-width: 1026px) {
    .container {
        padding: 0 15px;
    }

    .deals {
        display: block;
    }

    .deal__right {
        display: flex;
        flex-direction: column-reverse;
        margin-bottom: 30px;

    }

    .deal__left {
        display: flex;
        flex-direction: column-reverse;
    }

    .deal-title {
        padding-top: 16px;
        text-align: center;
    }

    .deal-percentage {
        padding-bottom: 0;
    }

    .deal-text {
        text-align: center;
    }
}
</style>