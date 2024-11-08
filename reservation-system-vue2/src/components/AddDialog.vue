<template>
    <dialog id="addDialog" class="w-1/2 shadow-xl bg-white rounded-md border border-gray-300">
        <h1 class="w-full h-[50px] text-left text-gray-800 font-bold text-2xl">Add Branches</h1>
        <form class="bg-[#eff3f6] min-h-[200px] p-4 flex flex-start w-full">
           <MultiSelect :options="branches" :reset="reset"/>
        </form>
        <div class="flex justify-end">
            <Button text="Close" :callback="callback"
                class="text-gray-500 border border-gray-300 rounded-md px-4 py-2 m-2"></Button>
            <Button text="Save" :callback="addBranch"
                class="text-white bg-purple-800 border border-gray-300 rounded-md px-4 py-2 m-2"></Button>
        </div>
    </dialog>
</template>

<script>
    import { mapGetters } from "vuex/dist/vuex.common.js";
    import Button from "./Button.vue"
    import MultiSelect from "./MultiSelect.vue";
    import { ADD_BRANCH, SET_SELECTED_BRANCHES } from "../store/reservations";

    export default {
        name: 'AddDialog',
        components: {
            Button,
            MultiSelect
        },
        props: {
            open: () => {
                return false;
            },
            callback: Function,
            branches: [],
        },
        data() {
            return {
                branchName: '',
                reset: false
            }
        },
        computed: {
            ...mapGetters(['branchesToAdd'])
        },
        methods: {
            addBranch() {
                this.$store.dispatch(ADD_BRANCH, this.branchesToAdd);
                this.$store.dispatch(SET_SELECTED_BRANCHES, []);
                this.reset = true;
                this.callback();
                setTimeout(() => {
                    this.reset = false;
                }, 500)
            }
        }
    }
</script>