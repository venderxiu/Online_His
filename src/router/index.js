import Vue from 'vue'
import VueRouter from 'vue-router'
import RegistForm from '../components/registForm.vue'
import DocVisiting from '../components/docVisiting.vue'
import Pay from '../components/pay.vue'
import ListMedicine from '../components/listMedicine.vue'
import MRIndex from '../components/mRIndex.vue'
import OpenMedicine from '../components/openMedicine.vue'
import RefundRegist from '../components/refundRegist.vue'
import RegistFormIndex from '../components/registFormIndex.vue'
import Login from '../components/login.vue'
import DocIndex from '../components/docIndex.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}


const routes = [{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/openMedicine1',
		component: OpenMedicine
	},
	{
		path: '/registFormIndex',
		component: RegistFormIndex,
		children: [{
				path: '/registForm',
				component: RegistForm
			},
			{
				path: '/refundRegist',
				component: RefundRegist
			},
			{
				path: '/patientPay',
				component: Pay
			},
			{
				path: '/listMedicine',
				component: ListMedicine
			}
		]
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/docIndex',
		component: DocIndex,
		children: [
			{
			path: '/docVisiting',
			name: 'docvisiting',
			component: DocVisiting,
			children: [
				{
					path: '/mRIndex',
					name: 'mRIndex',
					component: MRIndex
				},
				{
					path: '/openMedicine',
					component: OpenMedicine
				}
			]
		}]
	}

]

const router = new VueRouter({
	routes
})

export default router
