<template>
	<div>
		<el-container>
			<el-header style="background-color: white;">
				<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
					<el-menu-item index="/registForm">挂号</el-menu-item>
					<el-menu-item index="/patientPay">收费</el-menu-item>
					<el-menu-item index="/refundRegist">退号</el-menu-item>
					<el-menu-item index="/listMedicine">药房发药</el-menu-item>
					<el-menu-item index="/login">退出登录</el-menu-item>
				</el-menu>
			</el-header>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {
				activeIndex:''
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
				// 选择事件触发之后，切换路由
				this.$router.push(key);
			}
		}
	}
</script>

<style>
</style>
