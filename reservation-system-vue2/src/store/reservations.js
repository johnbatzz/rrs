import ApiService from "../services/api.service";

export const GET_BRANCHES = "getBranches";
export const SET_BRANCHES = "setBranches";
export const SET_DISABLED_RESERVATIONS = "setDisabledReservations";
export const SET_ISDISABLED_RESERVATIONS = "setIsDisabledReservations";
export const ADD_BRANCH = "addBranch";
export const SET_SELECTED_BRANCHES = "setSelectedBranches";
export const SET_SELECTED_BRANCH_TO_EDIT = "setSelectedBranchesToEdit";
export const SAVE_BRANCH = "saveBranch";
export const DISABLE_BRANCH_RESERVATIONS = "disableBranchesReservations";

const state = {
    isDisabledReservations: false,
    branchesData: [],
    reservations: [],
    selectedBranches: [],
    selectedBranchToEdit: null
};

const getters = {
    branches: (state) => {
        return state.branchesData
    },
    disabledReservations: (state) => {
        return state.isDisabledReservations
    },
    branchesToAdd: (state) => {
        return state.selectedBranches
    },
    branchToEdit: (state) => {
        return state.selectedBranchToEdit;
    }
};

const actions = {
    [GET_BRANCHES](context, payload) {
        ApiService.init();
        return new Promise(resolve => {
            ApiService.get('/branches', payload)
            .then((response) => {
                context.commit(SET_BRANCHES, response.data)
                resolve(true)
            }).catch((error) => {
                console.log("error : ", error)
            });
        })
    },

    [SET_DISABLED_RESERVATIONS](context) {
        const tempData = context.state.branchesData;
        tempData.data.forEach((data) => {
            data.accepts_reservations = false;
            ApiService.post(`/branches/${data.id}`, { accepts_reservations: false })
        })
        context.commit(SET_ISDISABLED_RESERVATIONS, !context.state.isDisabled);
        context.commit(SET_BRANCHES, tempData);
    },

    [ADD_BRANCH](context, payload) {
        const tempData = context.state.branchesData;
        tempData.data.forEach((data) => {
            payload.forEach(p => {
              if ( data.id === p.id ) {
                data.accepts_reservations = true;
                ApiService.init();
                return new Promise(resolve => {
                    ApiService.post(`/branches/${data.id}`, { accepts_reservations: true })
                    .then((response) => {
                        console.log("response: ", response);
                        resolve(true)
                    }).catch((error) => {
                        console.log("error : ", error)
                    });
                })
              }  
            })
        });
        context.commit(SET_BRANCHES, tempData);
    },
    [SET_SELECTED_BRANCHES](context, payload) {
        context.commit(SET_SELECTED_BRANCHES, payload);
    },

    [SET_SELECTED_BRANCH_TO_EDIT](context, payload) {
        context.commit(SET_SELECTED_BRANCH_TO_EDIT, payload);
    },
    
    [SAVE_BRANCH](context, payload) {
        ApiService.init();
        return new Promise(resolve => {
            ApiService.post(`/branches/${payload.id}`, {
                reservation_duration: payload.reservation_duration,
                reservation_times: payload.reservation_times
            })
            .then((response) => {
                console.log("response: ", response);
                const tempData = context.state.branchesData;
                tempData.data.forEach((data) => {
                    if (data.id === payload.id) {
                        data.reservation_duration = payload.reservation_duration;
                        data.reservation_times = payload.reservation_times;
                    }
                })
                context.commit(SET_BRANCHES, tempData);
                context.commit(SET_SELECTED_BRANCH_TO_EDIT, null);
                resolve(true)
            }).catch((error) => {
                console.log("error : ", error)
            });
        })
    },
    [DISABLE_BRANCH_RESERVATIONS](context, payload) {
        const tempData = context.state.branchesData;
        tempData.data.forEach((data) => {
            if ( data.id === payload.id ) {
                console.log("data : ", data)
                data.accepts_reservations = false;
                ApiService.init();
                return new Promise(resolve => {
                    ApiService.post(`/branches/${payload.id}`, { accepts_reservations: false })
                    .then((response) => {
                        console.log("response: ", response);
                        resolve(true)
                    }).catch((error) => {
                        console.log("error : ", error)
                    });
                })
            }  
        });
        context.commit(SET_BRANCHES, tempData);
    }

};

const mutations = {
    [SET_BRANCHES](state, branches) {
        state.branchesData = branches;
    },
    [SET_ISDISABLED_RESERVATIONS](state, isDisabled) {
        state.isDisabledReservations = isDisabled;  
    },
    [SET_SELECTED_BRANCHES](state, branches) {
        state.selectedBranches = branches;
    },
    [SET_SELECTED_BRANCH_TO_EDIT](state, branch) {
        state.selectedBranchToEdit = branch;
    }
};

export default {
  state,
  actions,
  mutations,
  getters
};