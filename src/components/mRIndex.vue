<template>
	<div>
		<el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
			<el-form-item label="主诉:">
				<el-input v-model="sizeForm.readme" @change="check"></el-input>
			</el-form-item>
			<el-form-item label="现病史:">
				<el-input v-model="sizeForm.present"></el-input>
			</el-form-item>
			<el-form-item label="现病治疗情况">
				<el-input v-model="sizeForm.presentTreat"></el-input>
			</el-form-item>
			<el-form-item label="既往史">
				<el-input v-model="sizeForm.history"></el-input>
			</el-form-item>
			<el-form-item label="过敏史">
				<el-input v-model="sizeForm.allergy"></el-input>
			</el-form-item>
			<el-form-item label="体格检查">
				<el-input v-model="sizeForm.physique"></el-input>
			</el-form-item>
			<el-form-item size="large" style="float: right;">
				<el-button type="primary" @click="onSubmit">提交</el-button>
				<el-button @click="reset">清空</el-button>
			</el-form-item>
		</el-form>
	</div>


</template>

<script>
	export default {
		data() {
			return {
				sizeForm: {
					readme: '',
					present: '',
					presentTreat: '',
					history: '',
					allergy: '',
					physique: ''
				},
				// 获取页面传参
				registID:''
			};
		},
		methods: {
			onSubmit() {
				// 根据registID修改 
				this.registID = window.sessionStorage.getItem('registID');
				this.$http.post("http://localhost:8989/medicalRecord/updateMR", {
					registID: this.registID,
					readme: this.sizeForm.readme,
					present: this.sizeForm.present,
					presentTreat: this.sizeForm.presentTreat,
					history: this.sizeForm.history,
					allergy: this.sizeForm.allergy,
					physique: this.sizeForm.physique
				});
				this.$http.get("http://localhost:8989/registerForm/updateRegister?registID="+this.registID);
				this.$message.success("提交信息成功");
			},
			reset(){
				this.sizeForm.readme = "";
				this.sizeForm.present = "";
				this.sizeForm.presentTreat = "";
				this.sizeForm.history = "";
				this.sizeForm.allergy = "";
				this.sizeForm.physique = "";
				// window.sessionStorage.removeItem('registID');
			},
			check(){
				if(window.sessionStorage.getItem('registID') == null){
					this.$message.error("请选中新的患者，再填写信息");
				}
			}
		},
		created() {
			
		}
	};
</script>

<style>
</style>
