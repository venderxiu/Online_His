<template>
	<el-container style="height: 480px; border: 1px solid #eee">
		<el-aside width="275px">
			<el-row>
				<el-col>
					<el-form :model="formInline" class="demo-form-inline" size="mini">
						<el-form-item>
							<br />
							<label style="float: left; margin-left: 10px;">患者名：</label>
							<el-input v-model="formInline.patientName" style="width: 150px; float: left;"></el-input>
							<el-button icon="el-icon-search" circle @click="onSubmit"></el-button>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="5">
					<el-tag size="mini" style="float: left;margin-left: 5px;">未诊患者:</el-tag>
				</el-col>
			</el-row>

			<el-row>
				<el-col>
					<el-table :data="tableData" max-height="170px" :show-header="false" size=mini style="width: 100%; font-size: xx-small;" @row-click="getRow">
						<el-table-column prop="caseNumber">
						</el-table-column>
						<el-table-column prop="realName">
						</el-table-column>
						<el-table-column prop="id">
						</el-table-column>
					</el-table>
				</el-col>
				<el-col :span="5">
					<el-tag size="mini" style="float: left;margin-left: 5px;margin-top: 20px;">已诊患者:</el-tag>
				</el-col>
				<el-col>
					<el-table :data="tableData1" max-height="170px" :show-header="false" size=mini style="width: 100%;font-size: xx-small;" @row-click="getRow1">
						<el-table-column prop="caseNumber">
						</el-table-column>
						<el-table-column prop="realName">
						</el-table-column>
						<el-table-column prop="id">
						</el-table-column>
					</el-table>
				</el-col>
			</el-row>
		</el-aside>
		<el-main>
			<el-container>
				<el-header style="background-color: white;">
					<div>
						<el-form :model="formPatient" class="demo-form-inline" size="mini">
							<el-form-item>
								<el-tag style="float: left; margin-top: 9px;">隐藏患者栏：</el-tag>
								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								<!-- 变量名需要更改 -->
								<el-input v-model="formPatient.patientName" style="width: 20%;float: left;margin-top: 10px; margin-left: 5px;"></el-input>
								<el-input v-model="formPatient.patientSex" style="width: 20%;float: left;margin-top: 10px; margin-left: 5px;"></el-input>
								<el-input v-model="formPatient.patientAge" style="width: 20%;float: left;margin-top: 10px; margin-left: 5px;"></el-input>
							</el-form-item>
						</el-form>
					</div>
				</el-header>
				<el-row>
					<el-col>
						<el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
							<el-menu-item index="mRIndex">病历首页</el-menu-item>
							<el-menu-item index="openMedicine">医生开药</el-menu-item>
						</el-menu>
					</el-col>
				</el-row>
				<el-row>
					<el-col>
						<el-main>
							<router-view></router-view>
						</el-main>
					</el-col>
				</el-row>
			</el-container>
		</el-main>
	</el-container>

</template>

<script>
	export default {
		data() {
			return {
				formInline: {
					user: '',
					region: ''
				},
				// 未诊患者
				tableData: [],
				// 已诊患者
				tableData1: [],
				formPatient:{
					patientName: '',
					patientAge: '',
					patientSex:''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
				this.$router.push(key);
			},
			getRow(row){
				window.sessionStorage.setItem("registID",row.id);
				window.sessionStorage.setItem("caseNumber",row.caseNumber);
				this.formPatient.patientName = row.realName;
				this.formPatient.patientAge = row.age+" 岁";
				this.formPatient.patientSex = row.gender;
			},
			getRow1(row1){
				window.sessionStorage.setItem("registID",row1.id);
				window.sessionStorage.setItem("caseNumber",row1.caseNumber);
				this.formPatient.patientName = row1.realName;
				this.formPatient.patientAge = row1.age+" 岁";
				this.formPatient.patientSex = row1.gender;
			}
		},
		created() {
			this.$http.get("http://localhost:8989/registerForm/findTreated?docId="+"1").then(res => {
				this.tableData1 = res.data;
			});
			this.$http.get("http://localhost:8989/registerForm/findUnTreated?docId="+"1").then(res => {
				this.tableData = res.data;
			});
		}
	}
</script>

<style scoped>
	.el-aside {
		background-color: white;
		color: #333;
		text-align: center;
		line-height: 200px;
	}

	.el-main {
		background-color: white;
		color: #333;
		text-align: center;
		line-height: 160px;
	}
	.el-table__header tr,
	.el-table__header th {
		padding: 0;
		height: 5px;
	}

	.el-table__body tr,
	.el-table__body td {
		padding: 0;
		height: 5px;
	}
	
</style>
