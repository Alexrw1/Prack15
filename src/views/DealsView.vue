<template>
    <div class="deals">
        <DealCard
            v-for="(_, i) in 10"
            :key="i"
            src="src/assets/imgs/deals/burger.png" 
            title="Тайтл"
            deal="-50%"
            text="описание"/>
    </div>

</template>

<script setup>
import DealCard from '@/components/Deals/DealCard.vue';
</script>

<style lang="scss" scoped>
.deals {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-bottom: 32px;
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