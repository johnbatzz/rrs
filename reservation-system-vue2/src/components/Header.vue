<template>
    <div class="flex justify-between items-center w-full py-4 px-8 bg-white mb-8">
        <h1 class="text-3xl">
            {{title}}
        </h1>
        <Button text="Disable Reservations" :callback="callback" class ="bg-purple-800 text-white text-lghover:bg-purple-500 p-4 rounded-lg" />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Button from './Button.vue';
import { SET_DISABLED_RESERVATIONS } from '../store/reservations';

export default{
    components: {
        Button
    },
    data() {
        return {
            title: 'Reservations'
        }
    },
    computed: {
        ...mapGetters(['disabledReservations']),
        pDisabledReservations() {
            return this.disabledReservations || false;
        }
    },
    methods: {
        callback() {
            this.$store.dispatch(SET_DISABLED_RESERVATIONS);
        }
    }
}
</script>
