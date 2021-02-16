import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLoggedIn: false,
        consultations: [],
        escalations: [],
        appointmentData:[],
        consultData:{},
        timeData:{id:1, consultation: 0, escalation: 0, home: 0},
        timeout: null
    },
    mutations: {
        newAppointmentData (state, payload) {
            state.appointmentData = payload
        },
        newConsultData (state, payload) {
            state.consultData = payload
        },
        loggUser (state) {
            state.isLoggedIn = true
        },
        logoutUser (state) {
            state.isLoggedIn = false
        },
        setTimeScreen (state, payload) {
            state.timeData[payload.screen] += payload.time;
        }
    },
    getters: {
        appointments: (state) => {
            return state.appointmentData;
        },
        consultations: (state) => {
            return state.appointmentData.filter(item => !item.isEscalated);
        },
        escalations: (state) => {
            return state.appointmentData.filter(item => item.isEscalated);
        },
        consult: (state) => {
            return state.consultData;
        },
        isLoggedIn: (state) => {
            return state.isLoggedIn;
        },
        getTimeData: (state) => {
            return state.timeData;
        }
    },
    actions: {
        setConsultations (context, payload) {
            context.commit('newAppointmentData', payload.data)
        },
        setConsultationData (context, payload) {
            context.commit('newConsultData', payload.data)
        },
        loginUser (context) {
            context.commit('loggUser')
        },
        logout (context) {
            localStorage.removeItem('isLoggedIn');
            context.commit('logoutUser');
            router.push({ name : 'Login'});
        },
        setTime (context, payload) {
            context.commit('setTimeScreen', payload.data);
        }
    }
})

