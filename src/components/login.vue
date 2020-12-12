<template>
	<div id="app">
		<div>
			<h1 align="center">
				<font size="35">东软云医院系统</font>
			</h1>
		</div>
		<div>
			<el-card class="box-card">
				<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="float: left;">
					<el-form-item label="用户名" prop="username">
						<el-input v-model="ruleForm.username" @change="getName" placeholder="请输入用户名"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="pass">
						<el-input type="password" v-model="ruleForm.pass" autocomplete="off" @change="getPass" placeholder="请输入密码"></el-input>
					</el-form-item>
					<el-form-item label="权限选择:" prop="authority">
						<el-select v-model="ruleForm.authority" clearable placeholder="请选择权限" @change="optionGet">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
						<el-button @click="resetForm('ruleForm')">重置</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass');
					}
					callback();
				}
			};
			return {
				ruleForm: {
					pass: '',
					username: '',
					authority: ''
				},
				rules: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					authority: [{
						required: true,
						message: '请选择权限',
						trigger: 'change'
					}],
				},
				options: [{
					value: 'registor',
					label: '挂号员'
				}, {
					value: 'doctor',
					label: '医生',
				}]
			};
		},
		methods: {
			submitForm(formName) {
				const self = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						// 选中的选项绑定到了V-model
						//先获取选择的权限
						//值在选中之后，通过@change事件，将他保存到了authority上
						if (this.authority == 'registor') {
							//挂号员，再判断用户名密码是否正确
							if (this.ruleForm.username == '123' & this.ruleForm.pass == '123') {
								self.$router.push({
									path: '/registFormIndex'
								});
							} else {
								self.$message.error('用户名或密码错误');
								// self.$router.push({
								// 	path: 'docVisiting'
								// });
							}
						} else {
							//权限为医生
							if (this.ruleForm.username == 'zhangchen' & this.ruleForm.pass == '123') {
								self.$router.push({
									path: '/docVisiting'
								});
							} else {
								self.$message.error('用户名或密码错误');
							}
						}
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			optionGet(value) {
				this.authority = value;
				// alert(value);
			},
			getName(value) {
				this.ruleForm.username = value;
			},
			getPass(value) {
				this.ruleForm.pass = value;
			},
		},
		mounted() {
			this.path = this.$route.path;
			// console.log(this.$route.path)
		},
		watch: {
			$route(to) {
				this.path = to.path
			}
		}
	}
</script>

<style scoped>
	body {
		margin: 0;
		padding: 0;
	}

	.el-image {
		height: 590px;
		width: 100%;
	}

	.text {
		font-size: 14px;
	}

	.item {
		padding: 18px 0;
	}

	.box-card {
		margin: 0 auto;
		margin-top: 90px;
		width: 400px;
	}
</style>
