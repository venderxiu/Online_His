<template>
	<el-container>
		<div style="height: 100%; width: 100%;">
			<el-header>
				<i class="el-icon-edit"></i>现场挂号
			</el-header>
			<el-main>
				<el-row>
					<el-form :model="formInline" class="demo-form-inline" size="mini">
						<el-col :span="5" style="float: left;">
							<el-form-item label="发票号:" label-width="70px" style="margin-top: 0;margin-left: 10px;">
								<el-input v-model="formInline.fpNum" style="width: 150px; float: left;"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="5">
							<el-form-item>
								<el-button type="primary" @click="onRegist()">挂号</el-button>
								<el-button type="primary" @click="resetForm">重置</el-button>
							</el-form-item>
						</el-col>
					</el-form>
				</el-row>
				<el-form :rules="rules" ref="ruleForm" :model="form" label-width="80px" size="mini" class="demo-ruleForm">
					<el-row>
						<el-col :span="4">
							<el-form-item label="病历号:">
								<el-input v-model="form.caseNumber">a</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="2">
							<el-button icon="el-icon-search" circle size="mini" style="margin-left: 10px;" @click="searchMR"></el-button>
						</el-col>
						<el-col :span="6">
							<el-form-item label="姓名:">
								<el-input v-model="form.realName" placeholder="请输入姓名"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="性别:">
								<el-input v-model="form.gender"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="出生日期:">
								<el-col :span="11">
									<el-date-picker type="date" placeholder="选择日期" v-model="form.birthDate" style="width: 200px;" format="yyyy-MM-dd" value-format="yyyy-MM-dd" @change="getAge()">
									</el-date-picker>
								</el-col>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="7">
							<el-form-item label="年龄:" style="float: left;">
								<el-input v-model="form.age" placeholder="请输入年龄" style="width: 100px;"></el-input>
								<label style="color: darkred;">*</label>
								<el-input v-model="form.ageType" style="width: 45px;" placeholder="岁"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="身份证号:">
								<el-input v-model="form.idNumber" placeholder="请输入身份证号"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="5">
							<el-form-item label="家庭住址:">
								<el-input v-model="form.homeAddress" placeholder="请输入家庭住址" style="width: 150px;"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="结算类别:">
								<!-- 结算类别 -->
								<el-select v-model="form.settleID" placeholder="请选择">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="6">
							<el-form-item label="看诊日期:">
								<el-col :span="11">
									<el-date-picker type="date" placeholder="选择日期" v-model="form.visitDate" style="width: 200px;">
									</el-date-picker>
								</el-col>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="午别:">
								<!-- 午别 -->
								<el-select v-model="form.noon" placeholder="请选择">
									<el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="挂号科室:">
								<!-- 挂号科室 -->
								<el-select v-model="form.deptID" placeholder="请选择" @change="getSelectDept">
									<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="号别:">
								<!-- 挂号级别 -->
								<el-select v-model="form.registLeID" placeholder="请选择" @change="getLel">
									<el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="6">
							<el-form-item label="看诊医生:">
								<!-- 需要根据挂号科室和午别进行变化 -->
								<!-- 看诊医生ID -->
								<el-select v-model="form.userID" placeholder="请选择">
									<el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="病历本:">
								<!-- <el-checkbox v-model="form.isBook" style="float: left;"></el-checkbox> -->
								<input type="checkbox" id="1" value="1" v-model="form.isBook">
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="应收金额:">
								<!-- 根据前面的选择自动响应 -->
								<el-input v-model="form.payment"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="收费方式:">
								<el-select v-model="form.payWay" placeholder="请选择">
									<el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-main>
		</div>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				formInline: {
					fpNum: '',
				},
				form: {
					//系统每次要自动生成不重复的病历号，所以需要读取数据库
					caseNumber: '',
					realName: '',
					gender: '',
					birthDate: '',
					age: '',
					idNumber: '',
					homeAddress: '',
					settleID: '',
					visitdate: '',
					noon: '',
					deptID: '',
					registLeID: '',
					// 看诊医生ID
					userID: '',
					isBook: '',
					// 根据号别切换诊费，普通号别和专家号别的费用从数据库中读取
					payment: '',
					payWay: ''
				},
				options: [{
					value: 1,
					label: '自费'
				}, {
					value: 2,
					label: '医保'
				}],
				invoiceClass: '',
				options1: [{
					value: '上午',
					label: '上午'
				}, {
					value: '下午',
					label: '下午'
				}],
				workTime: '',
				// 科室到时候需要从数据库导出
				options2: [{
					value: 1,
					label: '心血管内科'
				}, {
					value: 2,
					label: '神经内科'
				}, {
					value: 3,
					label: '普通内科'
				}, {
					value: 4,
					label: '消化内科'
				}, {
					value: 5,
					label: '呼吸内科'
				}],
				department: '',
				options3: [{
					value: "1",
					label: '普通号'
				}, {
					value: "2",
					label: '专家号'
				}],
				registlevel: '',
				// 根据科室的不同，动态绑定选项
				options4: [],
				registDoctor: '',
				checked: false,
				options5: [{
					value: '现金',
					label: '现金'
				}, {
					value: '支付宝',
					label: '支付宝'
				}, {
					value: '微信',
					label: '微信'
				}],
				payWay: '',
				rules: {
					name: [{
						required: true,
						message: '请输入患者姓名',
						trigger: 'blur'
					}],
					sex: [{
						required: true,
						message: '请输入患者性别',
						trigger: 'blur'
					}],
					idNum: [{
						required: true,
						message: '请输入患者身份证号',
						trigger: 'blur'
					}],
					invoiceClass: [{
						required: true,
						message: '请选择结算类别',
						trigger: 'change'
					}],
					department: [{
						required: true,
						message: '请选择挂号科室',
						trigger: 'change'
					}],
					payWay: [{
						required: true,
						message: '请选择收费方式',
						trigger: 'change'
					}]
				}
			}
		},
		methods: {
			onRegist() {
				Date.prototype.Format = function(fmt) { // author: meizz
					var o = {
						"M+": this.getMonth() + 1, // 月份
						"d+": this.getDate(), // 日
						"h+": this.getHours(), // 小时
						"m+": this.getMinutes(), // 分
						"s+": this.getSeconds(), // 秒
						"q+": Math.floor((this.getMonth() + 3) / 3), // 季度
						"S": this.getMilliseconds() // 毫秒
					};
					if (/(y+)/.test(fmt))
						fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
					for (var k in o)
						if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" +
							o[k]).substr(("" + o[k]).length)));
					return fmt;
				}
						//发送一个ajax请求
						var registTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
						var visitState = 0;
						var registerID = 1;
						if (this.form.isBook == "") {
							this.form.isBook.value = "0";
						}
						this.$http.post("http://localhost:8989/registerForm/regist", {
							caseNumber: this.form.caseNumber,
							realName: this.form.realName,
							gender: this.form.gender,
							idNumber: this.form.idNumber,
							birthDate: this.form.birthDate,
							age: this.form.age,
							ageType: this.form.ageType,
							homeAddress: this.form.homeAddress,
							visitDate: this.form.visitDate,
							noon: this.form.noon,
							deptID: this.form.deptID,
							userID: this.form.userID,
							registLeID: this.form.registLeID,
							settleID: this.form.settleID,
							isBook: this.form.isBook,
							registTime: registTime,
							registerID: registerID,
							visitState: visitState
						});
						this.$http.post("http://localhost:8989/medicalRecord/insertMR", {
							caseNumber: this.form.caseNumber
						});
						this.$message.success("挂号成功！");
			},
			resetForm() {
				this.form = {
					caseNumber: '',
					realName: '',
					gender: '',
					birthDate: '',
					age: '',
					idNumber: '',
					homeAddress: '',
					settleID: '',
					visitDate: '',
					noon: '',
					deptID: '',
					registLeID: '',
					userID: '',
					isBook: '',
					payment: '',
					payWay: ''
				};
				// 更新发票号
				// 更新刷新病历号
				this.$http.get("http://localhost:8989/medicalRecord/indexMR").then(res => {
					this.form.caseNumber = res.data;
					var temp = "123";
					var temp1 = res.data;
					temp1 = temp + temp1;
					this.formInline.fpNum = temp1;
				});
			},
			// 病历号搜索
			searchMR() {
				this.$http.get("http://localhost:8989/medicalRecord/findByRecID?mRNum=" + this.form.caseNumber).then(res => {
					if (res.data == "") {
						this.$message.error("该患者不存在");
					} else {
						const temp = res.data;
						this.$http.get("http://localhost:8989/registerForm/findById?id=" + temp.registID).then(res => {
							this.form.realName = res.data.realName,
								this.form.gender = res.data.gender,
								this.form.idNumber = res.data.idNumber,
								this.form.birthDate = res.data.birthDate,
								this.form.age = res.data.age,
								this.form.ageType = res.data.ageType,
								this.form.homeAddress = res.data.homeAddress,
								this.form.isBook.checked = false
						});
					}
				});
			},
			// 选定出生日期后，自动获取年龄
			getAge() {
				let birthdays = new Date(this.form.birthDate.replace(/-/g, "/"));
				let d = new Date();
				let age1 =
					d.getFullYear() -
					birthdays.getFullYear() -
					(d.getMonth() < birthdays.getMonth() ||
						(d.getMonth() == birthdays.getMonth() &&
							d.getDate() < birthdays.getDate()) ? 1 : 0);
				this.form.age = age1;
			},
			getLel(vValue) {
				//根据挂号级别，响应挂号金额
				if (vValue == "1") {
					this.form.payment = "20";
				} else {
					this.form.payment = "40";
				}
			},
			getSelectDept(index) {
				if (index == 1) {
					this.options4 = [{
						value: 1,
						label: '张晨'
					}, {
						value: 2,
						label: '华佗'
					}];
				} else if (index == 2) {
					this.options4 = [{
						value: 3,
						label: '李四'
					}, {
						value: 4,
						label: '扁鹊'
					}];
				} else if (index == 3) {
					this.options4 = [{
						value: 5,
						label: '王五'
					}, {
						value: 6,
						label: '刘年'
					}];
				} else if (index == 4) {
					this.options4 = [{
						value: 7,
						label: '西施'
					}, {
						value: 8,
						label: '周瑶'
					}];
				} else {
					this.options4 = [{
						value: 9,
						label: 'Rosie'
					}, {
						value: 10,
						label: 'Lisa'
					}];
				}
			}
		},
		created() {
			this.$http.get("http://localhost:8989/medicalRecord/indexMR").then(res => {
				this.form.caseNumber = res.data;
				var temp = "123";
				var temp1 = res.data;
				temp1 = temp + temp1;
				this.formInline.fpNum = temp1;
			});
		}

	}
</script>

<style>
	body {
		display: block;
		margin: 0;
	}

	.el-header {
		background-color: white;
		color: #333;
		text-align: center;
		line-height: 60px;
	}
</style>
