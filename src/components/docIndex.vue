<template>
	<el-container>
		<el-header style="text-align: right; font-size: 12px">
			<h1 style="float: left; margin-top: 2px;">医生首页>></h1>
			<el-dropdown @command="handleCommand">
				<i class="el-icon-setting" style="margin-right: 15px"></i>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="exit">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<span>张晨</span>
		</el-header>
		<el-main>
			<router-view></router-view>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		data() {
			const item = {
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			};
			return {
				tableData: Array(20).fill(item)
			}
		},
		methods:{
				handleCommand(command){
					if(command == "exit"){
						this.$router.push(
						{
							path:'/login'
						}
						);
					}else{
						return;
					}
				}
		}
	};
</script>

<style scoped>
	.el-header {
		background-color: blanchedalmond;
		color: #333;
		line-height: 60px;
	}
</style>
