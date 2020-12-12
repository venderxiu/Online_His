<template>
	<div id="app">
		<router-view></router-view>
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
