<template>
    <div class="w-full h-screen bg-[#eff3f6]">
        <Header />
        <div v-if="pBranches.length > 0">
         <table-component class="py-2 bg-[#fff] rounded-lg shadow-lg mx-8" :headers="headers" :rows="pBranches"/>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from '../Header.vue'
import TableComponent from '../TableComponent.vue'
import { GET_BRANCHES } from '../../store/reservations'
export default {
    name: 'home',
    components: {
        Header,
        TableComponent
    },
    data() {
        return {
            headers: [
                'Branch',
                'Reference',
                'Number of Tables',
                'Reservations Duration'
            ]
        }
    },

    mounted() {
        this.getBranches();
    },

    computed: {
        ...mapGetters(['branches']),
        pBranches() {
            return this.branches.data || []
        }
    },

    methods: {
        async getBranches() {
            let params = {
                'include[0]': 'sections',
                'include[1]': 'sections.tables'
            }
            await this.$store.dispatch(GET_BRANCHES, params);
        },
    }
}
</script>
