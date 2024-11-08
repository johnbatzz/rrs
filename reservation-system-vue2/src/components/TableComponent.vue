<template>
    <div>
        <div class="flex justify-end items-center my-4">
            <Button text="Add Branches" :callback="addBranch"
                class="bg-gray-150 text-black text-lg hover:bg-gray-100 py-2 px-4 rounded-lg border-2 border-gray-300 mr-4" />
        </div>
        <table border="1" class="w-full">
            <thead class="text-lg font-bold border-t-2 border-b-2 border-gray-300 py-4">
                <tr>
                    <th  class="py-4" v-for="(header, index) in headers" :key="index">{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    v-for="(row) in pRows" 
                    :key="row.id" 
                    class="[&:hover > td:nth(5)]:bg-gray-100"
                >
                    <td class="p-4 text-left">
                        <button text="Edit" @click.stop="handleEdit(row)" class=" text-[12px] py-1 px-2 ">
                            {{ row.name }}
                        </button>
                    </td>
                    <td class="p-4">{{ row.reference }}</td>
                    <td class="p-4">{{ getTables(row.sections) }}</td>
                    <td class="p-4">{{ formatReservationTime(row.reservation_duration) }}</td>
                   
                </tr>
            </tbody>
        </table>
        <add-dialog :callback="handleOpenAdd" :branches="rows" class="fixed z-10 inset-0 overflow-y-auto"/>
        <edit-dialog :callback="handleCloseEdit" class="fixed z-10 inset-0 overflow-y-auto"/>
    </div>
</template>

<script>
import Button from './Button.vue';
import AddDialog from './AddDialog.vue'
import EditDialog from './EditDialog.vue';
import { SET_SELECTED_BRANCH_TO_EDIT } from '../store/reservations';
export default {
    name: 'CustomTable',
    components: {
        Button,
        AddDialog,
        EditDialog
    },
    data() {
        return {
            openAddBranch: false,
            openEditBranch: false
        }
    },
    props: {
        headers: {
            type: Array,
            required: true
        },
        rows: {
            type: Array,
            required: true
        }
    },

    computed: {
        pRows() {
            return this.rows.filter(row => row.accepts_reservations) || []
        }
    },  

    methods: {
        addBranch: function() {
            document.getElementById('addDialog').showModal();
        },
        handleOpenAdd: function() {
            document.getElementById('addDialog').close();
        },
        getTables: function(sections) {
            if (sections.length === 0) return 0
            return sections.reduce((acc, curr) => acc + curr.tables.reduce((ac, cur) => ac + (cur.accepts_reservations ? 1 : 0), 0), 0)
        },
        formatReservationTime: function(minutes) {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;

            if (hours && remainingMinutes) return `${hours}hour ${remainingMinutes} munites`;
            if (hours) return `${hours} hour`;
            return `${remainingMinutes} minutes`;
        },
        handleEdit: function(row) {
            if (!row.reservation_times) {
                row.reservation_times = {
                    friday: [],
                    monday: [],
                    saturday: [],
                    sunday: [],
                    thursday: [],
                    tuesday: [],
                    wednesday: [],
                };
            }
            console.log("row : ", row)
            this.$store.dispatch(SET_SELECTED_BRANCH_TO_EDIT, row);
            document.getElementById('editDialog').showModal();
        },
        handleCloseEdit: function() {
            document.getElementById('editDialog').close();
        }
    }
};
</script>