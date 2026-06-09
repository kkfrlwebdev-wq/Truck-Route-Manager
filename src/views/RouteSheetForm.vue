<script setup>
import { useMachineWorkStore } from "../stores/machineWork";
import { ref, onMounted } from 'vue'




const machineWorkStore = useMachineWorkStore();


const departureMileage = ref('11111111112sfdgredjyh')
const departureFuel = ref('222')
const mileage = ref('333')
const fuelConsumptionPer100km = ref('444')
const workedEngineHours = ref('555')
const fuelConsumptionPerEngineHour = ref('666')





async function add() {
    await machineWorkStore.addItem({
        date: new Date(),
        departureMileage: departureMileage.value,
        departureFuel: departureFuel.value,
        mileage: mileage.value,
        fuelConsumptionPer100km: fuelConsumptionPer100km.value,
        workedEngineHours: workedEngineHours.value,
        fuelConsumptionPerEngineHour: fuelConsumptionPerEngineHour.value
    })

    await machineWorkStore.loadItemsList()
}

onMounted(() => {
    machineWorkStore.loadItemsList()
})


function showDate(dateValue) {
    if (!dateValue) return ''

    const date = dateValue.toDate ? dateValue.toDate() : new Date(dateValue)

    return date.toLocaleDateString('uk-UA')
}

</script>

<template>
    <main-master-page>
        <form class="form">
            <input type="text" placeholder="пробіг авто при виїзді" class="input" v-model="departureMileage">
            <input type="text" placeholder="кількість палива при виїзді" class="input" v-model="departureFuel">
            <div class="row">
                <input type="text" placeholder="пробіг" class="input" v-model="mileage">
                <input type="text" placeholder="розхід на 100" class="input" v-model="fuelConsumptionPer100km">
            </div>
            <div class="row">
                <input type="text" placeholder="відпрацьовано м.г" class="input" v-model="workedEngineHours">
                <input type="text" placeholder="розхід на 1м.г" class="input" v-model="fuelConsumptionPerEngineHour">
            </div>
            <button type="button" class="button" @click="add">{{ $t('pages.sheet.buttons.calculate') }}</button>
        </form>

        <ol>
            <li v-for="item in machineWorkStore.getItemsList" :key="item.id">
                {{ showDate(item.date) }}
            </li>
        </ol>

        {{ }}
    </main-master-page>

</template>



<style scoped>
.form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    flex: 1 1 100%;

    & button {
        justify-self: stretch;
    }

    & .row {
        display: flex;
        gap: 10px;
    }
}
</style>