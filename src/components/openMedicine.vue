<template>
	<el-container>
		<el-dialog title="添加处方" :visible.sync="dialogVisible1" width="30%">
			<span>
				<el-input v-model="preName" placeholder="请输入处方名称"></el-input>
				<!-- 选择处方范围 -->
				<el-select v-model="preScope" placeholder="请选择处方范围" style="width: 100%;">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible1 = false">取 消</el-button>
				<el-button @click="addToTable">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 添加药品用量 -->
		<el-dialog title="详细用法" :visible.sync="dialogVisible2" width="50%">
			<!-- 
				1、添加数量
				2、添加其他属性
				3、写入数据库
				-->
			<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
				<el-form-item label="药品名称">
					<el-input v-model="formLabelAlign.drugsName"></el-input>
				</el-form-item>
				<el-form-item label="规格">
					<el-input v-model="formLabelAlign.drugsFormat"></el-input>
				</el-form-item>
				<el-form-item label="单价">
					<el-input v-model="formLabelAlign.drugsPrice"></el-input>
				</el-form-item>
				<el-form-item label="用法">
					<el-input v-model="formLabelAlign.drugsUsage"></el-input>
				</el-form-item>
				<el-form-item label="用量">
					<el-input v-model="formLabelAlign.dosage"></el-input>
				</el-form-item>
				<el-form-item label="频次">
					<el-input v-model="formLabelAlign.frequency"></el-input>
				</el-form-item>
				<el-form-item label="数量">
					<el-input v-model="formLabelAlign.amount"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible2 = false">取 消</el-button>
				<el-button @click="addToTable2">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 增药 -->
		<el-dialog title="添加药品" :visible.sync="dialogVisible" width="80%">
			<span>
				<template>
					<el-table :data="tableMedicine" style="width: 90%">
						<el-table-column label="药品编码" width="200" style="margin-left: 100px;">
							<template slot-scope="scope">
								<span style="margin-left: 10px">{{ scope.row.drugsCode }}</span>
							</template>
						</el-table-column>
						<el-table-column label="药品名称" width="150">
							<template slot-scope="scope">
								<span style="margin-left: 10px">{{ scope.row.drugsName }}</span>
							</template>
						</el-table-column>
						<el-table-column label="药品规格" width="120">
							<template slot-scope="scope">
								<span style="margin-left: 10px">{{ scope.row.drugsFormat }}</span>
							</template>
						</el-table-column>
						<el-table-column label="药品单位" width="120">
							<template slot-scope="scope">
								<span style="margin-left: 10px">{{ scope.row.drugsUnit }}</span>
							</template>
						</el-table-column>
						<el-table-column label="药品单价" width="120">
							<template slot-scope="scope">
								<span style="margin-left: 10px">{{ scope.row.drugsPrice }}</span>
							</template>
						</el-table-column>
						<el-table-column label="添加">
							<template slot-scope="scope">
								<el-button size="mini" @click="handleAdd(scope.$index, scope.row)">编辑</el-button>
							</template>
						</el-table-column>
					</el-table>
				</template>
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
		<el-header>
			<el-row>
				<el-col :span="4">
					<el-button type="primary" round size=mini style="margin-left: 5%;" @click="dialogVisible1 = true">增方</el-button>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" round size=mini style="margin-left: 10%;">删方</el-button>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" round size=mini style="margin-left: 15%;" @click="addDrug">增药</el-button>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" round size=mini style="margin-left: 20%;">删药</el-button>
				</el-col>
				<el-col :span="4">
					<!-- 将用户花费明细写入数据库，通过sessionStrorage获取registID和病历号 -->
					<el-button type="primary" round size=mini style="margin-left: 20%;" @click="save">保存</el-button>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" round size=mini style="margin-left: 20%;" @click="open">开立</el-button>
				</el-col>
			</el-row>
		</el-header>
		<el-main>
			<el-row style="margin-top: 0;">
				<el-col :span="4" style="float: left;">
					<el-card class="box-card" style="width: 200%; height: 100%;">
						<div slot="header" class="clearfix">
							<el-tag size=mini style="margin-top: 3px; float: left;">门诊处方：</el-tag>
						</div>
						<div>
							<template>
								<el-table ref="multipleTable" :data="tableData0" style="width: 100%;font-size: xx-small" max-height="60%" size=mini @select="handleSelect">
									<el-table-column type="selection" width="55">
									</el-table-column>
									<el-table-column prop="Tname" label="名称" width="70">
									</el-table-column>
									<el-table-column prop="status" label="状态" width="70">
									</el-table-column>
									<el-table-column prop="preID" width="20" v-if="show = false">
									</el-table-column>
								</el-table>
							</template>
						</div>
					</el-card>
				</el-col>
				<el-col :span="20">
					<el-card class="box-card" style="width: 70%;float: right;height: 100%;">
						<div slot="header" class="clearfix">
							<el-row>
								<el-col :span="4">
									<el-tag size=mini style="margin-top: 3px;">本处方合计金额：</el-tag>
								</el-col>
								<el-col :span="4">
									<!-- 表格响应输出到此处 -->
									<el-input v-model="sumPay" size=mini style="margin-left: 60%; height: 20%;width: 100%;"></el-input>
								</el-col>
							</el-row>
						</div>
						<div>
							<template>
								<el-table ref="multipleTable" :data="tableData3" style="width: 130%;font-size: xx-small;" max-height="200px" size=mini @selection-change="handleSelectionChange">
									<el-table-column type="selection" width="55">
									</el-table-column>
									<el-table-column prop="drugsName" label="药品名称" width="70">
									</el-table-column>
									<el-table-column prop="drugsFormat" label="规格" width="70">
									</el-table-column>
									<el-table-column prop="drugsUnit" label="单位" width="30">
									</el-table-column>
									<el-table-column prop="drugsUsage" label="用法" width="50">
									</el-table-column>
									<el-table-column prop="dosage" label="用量" width="50">
									</el-table-column>
									<el-table-column prop="frequency" label="频次" width="70">
									</el-table-column>
									<el-table-column prop="amount" label="数量" width="40">
									</el-table-column>
								</el-table>
							</template>
						</div>
					</el-card>
				</el-col>
			</el-row>
			<br />
			<el-row>
				<el-col :span="7">
					<el-card class="box-card" style="width: 140%;height: 450px;">
						<div slot="header" class="clearfix">
							<el-tag size=mini style="margin-top: 3px; float: left;">处方模板：</el-tag>
							<el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini" style="font-size: xx-small;">
								<el-form-item label="名称" style="font-size: xx-small;">
									<el-input v-model="formInline.name" style="width: 100px;"></el-input>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="onSubmit" style="font-size: xx-small;margin-right: 0;">查询</el-button>
								</el-form-item>
							</el-form>
						</div>
						<div>
							<template>
								<el-table :data="tableData" style="width: 100%;font-size: xx-small;" max-height="300px" @row-click="getPresTemplate">
									<el-table-column prop="prescriptionName" label="模板名称" width="140">
									</el-table-column>
									<el-table-column prop="scope" label="范围" width="130">
									</el-table-column>
								</el-table>
							</template>
						</div>
					</el-card>
				</el-col>
				<el-col :span="16" style="float: right;">
					<el-card class="box-card" style="width: 88%; float: right;height: 100%;">
						<div slot="header" class="clearfix">
							<el-tag size=mini style="margin-top: 3px; float: left;">模板明细：</el-tag>
							<!-- 表格响应输出到此处 -->
							<el-button style="float: right; padding: 3px 0" type="text" @click="userTemplate">使用该模板</el-button>
						</div>
						<div>
							<template>
								<el-table :data="tableData1" style="width: 100%;font-size: xx-small;" max-height="200px">
									<el-table-column prop="drugsName" label="药品名称" width="72">
									</el-table-column>
									<el-table-column prop="drugsFormat" label="规格" width="72">
									</el-table-column>
									<el-table-column prop="drugsUnit" label="单位" width="72">
									</el-table-column>
									<el-table-column prop="drugsUsage" label="用法" width="72">
									</el-table-column>
									<el-table-column prop="dosage" label="用量" width="72">
									</el-table-column>
									<el-table-column prop="frequency" label="频次" width="72">
									</el-table-column>
								</el-table>
							</template>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				formInline: {
					name: ''
				},
				tableData: [],
				tableData1: [],
				tableData0: [],
				sumPay: '',
				preName: '',
				tableData3: [],
				options: [{
					value: "全院",
					label: '全院'
				}, {
					value: "科室",
					label: '科室'
				}, {
					value: "个人",
					label: "个人"
				}],
				preScope: '',
				dialogVisible: false,
				dialogVisible1: false,
				dialogVisible2: false,
				tableMedicine: [],
				// 定义一个变量，获取选中的模板
				tempTemplate: '',
				tempPreID: '',
				labelPosition: 'right',
				formLabelAlign: {
					drugsName: '',
					drugsFormat: '',
					drugsPrice: '',
					drugsUsage: '',
					dosage: '',
					frequency: '',
					amount: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			onChoose() {
				alert("添加成功！");
			},
			handleAdd(index, row) {
				console.log(index, row);
				this.dialogVisible2 = true;
				this.formLabelAlign.drugsName = row.drugsName;
				this.formLabelAlign.drugsFormat = row.drugsFormat;
				this.formLabelAlign.drugsPrice = row.drugsPrice;
			},
			handleSelect(row) {
				//处理选中的行
				console.log(row);
				var drugsPrice = 0;
				for (let i = 0; i < row.length; i++) {
					this.$http.get("http://localhost:8989/prescriptionDetailed/findByPreId?preId=" + row[i].preID).then(res => {
						this.tableData3 = res.data;
						// console.log(res.data);
						for (let j = 0; j < res.data.length; j++) {
							// alert(res.data[j].drugsPrice);
							drugsPrice += res.data[j].drugsPrice;
						}
						// 选中多个处方时，出现问题
						this.sumPay = drugsPrice;
						window.sessionStorage.setItem("preName", row[i].Tname);
						window.sessionStorage.setItem("preId", row[i].preID);
					});
				}


			},
			addToTable() {
				// 把处方存进数据库
				this.$http.post("http://localhost:8989/prescription/addPres", {
					userID: '1',
					prescriptionName: this.preName,
					scope: this.preScope
				});
				// 获取处方ID
				this.$http.get("http://localhost:8989/prescription/getLast").then(res => {
					this.tempPreID = res.data;
				});
				console.log(this.tempPreID);
				var list = {
					Tname: this.preName,
					status: '暂存',
					preID: this.tempPreID
				};
				this.tableData0.push(list);
				this.preName = '';
				this.preScope = '';
				this.dialogVisible1 = false;
			},
			addDrug() {
				this.dialogVisible = true;
				this.$http.get("http://localhost:8989/drug/findAll").then(res => {
					this.tableMedicine = res.data;
				});
			},
			getPresTemplate(row) {
				this.tempTemplate = row;
				// 从这里获取数据，添加明细到右边
				this.$http.get("http://localhost:8989/prescriptionDetailed/findByPreId?preId=" + row.id).then(res => {
					this.tableData1 = res.data;
				});
				return row;
			},
			userTemplate() {
				console.log(this.tempTemplate);
				var list = {
					Tname: this.tempTemplate.prescriptionName,
					status: '暂存',
					preID: this.tempTemplate.id
				};
				this.tableData0.push(list);
			},
			open() {
				this.registID = window.sessionStorage.getItem('registID');
				//写进patientmedicinecost
				this.$http.post("http://localhost:8989/invoice/insert", {
					caseNumber: window.sessionStorage.getItem('caseNumber'),
					prescriptionID: window.sessionStorage.getItem('preId'),
					isOpen: "已开立"
				});
				this.$http.get("http://localhost:8989/registerForm/updateRegister?registID=" + this.registID);
				this.$message.success("提交成功");
			},
			save() {
				// 保存模板
				// this.$http.post("http://localhost:8989/prescriptionDetailed/addDetail", {
				// 	caseNumber: window.sessionStorage.getItem('caseNumber'),
				// 	prescriptionID: window.sessionStorage.getItem('preId'),
				// 	isOpen: "已开立"
				// });
			},
			addToTable2(){
				var list = {
					drugsName: this.formLabelAlign.drugsName,
					drugsFormat: this.formLabelAlign.drugsFormat,
					drugsPrice: this.formLabelAlign.drugsPrice,
					drugsUsage: this.formLabelAlign.drugsUsage,
					dosage: this.formLabelAlign.dosage,
					frequency: this.formLabelAlign.frequency,
					amount: this.formLabelAlign.amount
				};
				this.tableData3.push(list);
				this.dialogVisible2 = false;
				
			}
		},
		created() {
			this.$http.get("http://localhost:8989/prescription/findAll").then(res => {
				this.tableData = res.data;
			});

		}
	}
</script>

<style scoped>
	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 480px;
	}

	.el-header {
		margin: 0;
	}

	.el-button {
		margin-top: 0;
	}

	.el-row {
		margin-top: 0px;
	}

	.el-mian {
		background-color: chocolate;
	}
</style>
