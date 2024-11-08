<template>
    <dialog id="editDialog" class="w-2/3 shadow-xl bg-white rounded-md border border-gray-300 px-0">
        <h1 class="w-full h-[50px] text-left text-gray-800 font-bold text-2xl px-4" v-if="branchToEdit">Edit {{ branchToEdit.name }} branch reservation settings</h1>
        <div v-if="branchToEdit" class="bg-[#eff3f6] max-h-[600px] py-4 overflow-y-auto">
            <div class="flex flex-col mx-5 gap-4">
                <div  class="h-40px bg-blue-200 p-4 text-blue-800 border-b-2 border-t-2 border-blue-800 text-center">
                    Branch working hours are {{  branchToEdit.opening_from }} - {{ branchToEdit.opening_to }}
                </div>
                <div class="text-left">
                    <label>
                        Reservation Duration (minutes)<span class="text-red-900">*</span>
                    </label>
                    <input type="text" class="w-full p-2 border border-gray-300 rounded-md" v-model="branchToEdit.reservation_duration">
                </div>
                <div  class="text-left">
                    <label>
                        Tables
                    </label>
                    <div class="bg-white w-full flex flex-wrap gap-4 min-h-[40px] border border-gray-300 rounded-md p-4">
                        <span v-for="table in reservedTables" :key="table.id" class="w-[fit-content] p-2 bg-white text-gray-800 rounded-md border border-blue-500">
                            {{ table.displayName }}
                        </span>
                    </div>
                </div>
                <div v-if="branchToEdit.reservation_times" class="text-left">
                    <Button :callback="handleApplyAll" text="Apply on all days" class="text-purple-800 float-right mb-1" />
                    <div v-for="day in pDays" :key="day" >
                        <label class="capitalize">{{ day }}</label>
                        <div v-if="branchToEdit.reservation_times[day]" class="bg-white min-h-[50px] w-full flex flex-wrap gap-4 border border-gray-300 rounded-md p-4 relative">
                            <div 
                                v-for=" (time, index) in branchToEdit.reservation_times[day]" 
                                :key="index.toString()" 
                                class="w-[fit-content] p-2 bg-white text-gray-800 rounded-md border border-blue-500 relative"

                            >
                                <input 
                                    v-model="time[0]" 
                                    class="w-[50px] border-0 ring-0 focus:ring-0 focus:border-0 focus:outline-none"
                                /> 
                                - 
                                <input 
                                    v-model="time[1]" 
                                    class="w-[50px] border-0 ring-0 focus:ring-0 focus:border-0 focus:outline-none"
                                /> 
                                <a 
                                    @click="handleRemove(day, index)" 
                                    class="cursor-pointer bg-white border border-gray-500 rounded-full w-[20px] h-[20px] absolute text-center -top-2 -right-2 align-middle flex justify-center items-center"
                                >
                                    x
                                </a>
                            </div>
                            <span v-if="branchToEdit.reservation_times[day].length === 0"> Add Available Reservation Times </span>
                            <span
                                @click="addTime(day)" 
                                class="cursor-pointer text-purple-800 float-right py-[3px] px-2 border border-gray-300 rounded-md absolute right-4 w-30px h-[30px]"
                            >
                                +
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-between">
            <Button text="Disable Reservations" :callback="handleDisableReservations"
                class="text-red-300 hover:text-red-700 rounded-md px-4 py-2 m-2"></Button>
            <div>
                <Button text="Close" :callback="callback"
                    class="text-gray-500 border border-gray-300 rounded-md px-4 py-2 m-2"></Button>
                <Button text="Save" :callback="handleSave"
                    class="text-white bg-purple-800 border border-gray-300 rounded-md px-4 py-2 m-2"></Button>
            </div>
        </div>
    </dialog>
</template>

<script>
    import { mapGetters } from "vuex/dist/vuex.common.js";
    import Button from "./Button.vue"
    import { DISABLE_BRANCH_RESERVATIONS, SAVE_BRANCH } from "../store/reservations";

    export default {
        name: 'EditDialog',
        components: {
            Button
        },
        props: {
            open: () => {
                return false;
            },
            callback: Function
        },
        data() {
            return {
                branchName: '',
                brachToEditCopy: null
            }
        },
        computed: {
            ...mapGetters(['branchToEdit']),
            reservedTables() {
                let tables = [];
                if (this.branchToEdit) {
                    this.branchToEdit?.sections.forEach(section => {
                        section.tables.filter(table => {
                            table.displayName = `${section.name} - ${table.name}`;
                            tables.push(table)
                            return table.accepts_reservations
                        })
                    })
                }
                return tables;
            },
            pDays() {
                return Object.keys(this.branchToEdit.reservation_times)
            }
        },
        methods: {
            addTime(day) {
                if (this.branchToEdit.reservation_times[day].length < 3) {
                    this.branchToEdit.reservation_times[day].push(['00:00', '00:00'])
                }
            },
            handleRemove(day, index) {
                this.branchToEdit.reservation_times[day].splice(index, 1);
            },
            handleSave() {
                this.$store.dispatch(SAVE_BRANCH, this.branchToEdit)
                this.callback();
            },
            handleDisableReservations() {
                this.$store.dispatch(DISABLE_BRANCH_RESERVATIONS, this.branchToEdit);
                this.callback();
            },
            handleApplyAll() {
                let isToApply = true;
                let counter = 0;
                let timeToApply = []
                console.log("this.branchToEdit.reservation_times: ", this.branchToEdit.reservation_times)
                Object.keys(this.branchToEdit.reservation_times).forEach(key => {
                    if (this.branchToEdit.reservation_times[key].length > 0) {
                        counter ++;
                        timeToApply = this.branchToEdit.reservation_times[key];
                    }
                    if (isToApply && counter > 2) {
                        isToApply = false;
                    }
                    
                })
                console.log("timeToApply: ", timeToApply)
                if (counter === 1 && isToApply) {
                    let obj = Object.assign({}, JSON.parse(JSON.stringify(this.branchToEdit.reservation_times)));
                    let keys = Object.keys(obj)
            
                    keys.forEach((key) => {
                        obj[key] = timeToApply;
                    })
                  
                    this.branchToEdit.reservation_times = { ...this.branchToEdit.reservation_times, ...JSON.parse(JSON.stringify(obj))};
                    console.log("obj: ", this.branchToEdit.reservation_times)
                }
            }
        }
    }
</script>