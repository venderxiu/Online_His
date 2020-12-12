<template>
	<div>
		<!-- :before-close="handleClose" -->
		<el-dialog title="发票信息(交费)" :visible.sync="dialogVisible" width="45%">
			<span>
				<el-form inline="true" :model="formInline" class="demo-form-inline" size="mini">
					<el-form-item label="发票号(可修改)">
						<el-input v-model="formInline.invoiceNumber"></el-input>
					</el-form-item>
					<el-form-item label="病历号">
						<el-input v-model="formInline.caseNumber"></el-input>
					</el-form-item>
					<el-form-item label="患者姓名">
						<el-input v-model="formInline.name"></el-input>
					</el-form-item>
					<el-form-item label="支付方式">
						<el-select v-model="formInline.payWay" placeholder="请选择">
							<el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="应收金额">
						<el-input v-model="formInline.invoice"></el-input>
					</el-form-item>
					<el-form-item label="实收金额">
						<el-input v-model="formInline.factPay" @change="computeChange"></el-input>
					</el-form-item>
					<el-form-item label="找零金额">
						<el-input v-model="formInline.changes"></el-input>
					</el-form-item>
				</el-form>
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitCharge">收费</el-button>
			</span>
		</el-dialog>
		<el-row>
			<el-col :span="5">
				<el-tag size="mini" style="float: left;margin-left: 5px;align-content: center;">患者信息查询:</el-tag>
			</el-col>
		</el-row>
		<el-row>
			<el-form :model="formInline" class="demo-form-inline" size="mini">
				<el-col :span="5">
					<el-form-item label="病历号:" style="margin-top: 15px;">
						<el-input v-model="formInline.mRNum" style="width: 150px;float: left;"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="5" style="margin-top: 15px;">
					<el-form-item style="float: left;">
						<el-button type="primary" icon="el-icon-search" @click="searchPa">搜索</el-button>
					</el-form-item>
				</el-col>
			</el-form>
		</el-row>
		<el-row>
			<el-col :span="5">
				<el-tag size="mini" style="float: left;margin-left: 5px;align-content: center;">患者信息确认:</el-tag>
			</el-col>
		</el-row>
		<el-row style="margin-top: 10px;">
			<el-form :model="formInline" class="demo-form-inline" size="mini">
				<el-col :span="5" style="float: left;">
					<el-form-item label="姓名:">
						<el-input v-model="formInline.name" style="width: 150px;float: left;"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="5" style="float: left;">
					<el-form-item label="身份证号:">
						<el-input v-model="formInline.idNum" style="width: 150px;float: left;"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="5" style="float: left;">
					<el-form-item label="家庭住址:">
						<el-input v-model="formInline.address" style="width: 150px;float: left;"></el-input>
					</el-form-item>
				</el-col>
			</el-form>
		</el-row>
		<el-row>
			<el-col :span="5">
				<el-tag size="mini" style="float: left;margin-left: 5px;align-content: center;">患者消费信息:</el-tag>
			</el-col>
		</el-row>
		<el-row style="margin-top: 10px;">
			<el-col :span="24">
				<template>
					<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" max-height="500px" :border="true">
						<el-table-column type="selection" width="55">
						</el-table-column>
						<el-table-column label="病历号" width="120">
							<template slot-scope="scope">{{ scope.row.caseNumber }}</template>
						</el-table-column>
						<el-table-column prop="patientName" label="姓名" width="120">
						</el-table-column>
						<el-table-column prop="drugsName" label="项目名称" width="120">
						</el-table-column>
						<el-table-column prop="drugsPrice" label="单价" width="120">
						</el-table-column>
						<el-table-column prop="amount" label="数量" width="120">
						</el-table-column>
						<el-table-column prop="openTime" label="开立时间" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="status" label="状态" width="120">
						</el-table-column>
					</el-table>
					<div style="margin-top: 20px">
						<el-button @click="check" icon="el-icon-s-goods" style="color: #409EFF; float: right;">收费结算</el-button>
					</div>
				</template>
			</el-col>
		</el-row>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				formInline: {
					invoiceNumber: '',
					caseNumber: '',
					name: '',
					idNum: '',
					address: '',
					payWay: '',
					invoice: '',
					factPay: '',
					changes: '',
					mRNum:''
				},
				tableData: [],
				multipleSelection: [],
				dialogVisible: false,
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
				payment:''
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			// 更准确，应该用挂号单号搜索
			searchPa() {
				this.$http.get("http://localhost:8989/medicalRecord/findByRecID?mRNum=" + this.formInline.mRNum).then(res => {
					if (res.data == "") {
						this.$message.error("该患者不存在");
					} else {
						const temp = res.data;
						this.$http.get("http://localhost:8989/registerForm/findById?id=" + temp.registID).then(res => {
							this.formInline.name = res.data.realName,
							this.formInline.idNum = res.data.idNumber,
							this.formInline.address = res.data.homeAddress
						});
						this.$http.get("http://localhost:8989/invoice/searchByMRNum?caseNumber="+this.formInline.mRNum).then(res => {
							this.tableData = res.data;
						});
					}
				});
			},
			check(){
				this.dialogVisible = true;
				this.formInline.invoiceNumber = "123"+this.formInline.mRNum;
				this.formInline.caseNumber = this.formInline.mRNum;
				var sum = 0;
				this.$http.get("http://localhost:8989/invoice/searchByMRNum?caseNumber="+this.formInline.mRNum).then(res => {
					for(let i=0;i<res.data.length;i++){
						sum += res.data[i].drugsPrice;
					}
					this.payment = sum;
					this.formInline.invoice = this.payment;
				});
			},
			computeChange(){
				let change = 0;
				change = this.formInline.factPay - this.formInline.invoice;
				this.formInline.changes = change;
			},
			submitCharge(){
				this.$message.success("缴费成功");
				this.$http.post("http://localhost:8989/invoiceMe/insert",{
					invoiceNumber:this.formInline.invoiceNumber,
					caseNumber: this.formInline.caseNumber,
					payWay: this.formInline.payWay,
					invoice: this.formInline.invoice,
					isPay: '已收费'
				});
				//更新
				this.$http.get("http://localhost:8989/invoice/update?MRID="+this.formInline.mRNum);
				this.dialogVisible = false;
				this.$http.get("http://localhost:8989/invoice/searchByMRNum?caseNumber="+this.formInline.mRNum).then(res => {
					this.tableData = res.data;
				});
			}
		}
	}
</script>

<style>
	body .el-table th.gutter {
		display: table-cell !important;
	}

	.el-table__header tr,
	.el-table__header th {
		padding: 0;
		height: 20px;
	}

	.el-table__body tr,
	.el-table__body td {
		padding: 0;
		height: 20px;
	}

	.el-main {
		line-height: 20px !important;
	}
</style>
