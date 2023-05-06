<template>
	<view class="add">
		<form @submit="onSubmit">
			<view class="item">
				<input v-model="formValue.title" type="text" name="title" placeholder="请输入标题" />
			</view>
			<view class="item">
				<input v-model="formValue.author" type="text" name="author" placeholder="请输入作者" />
			</view>
			<view class="item">
				<textarea v-model="formValue.content" name="content" placeholder="请输入详细内容" />
			</view>
			<view class="item">
				<uni-file-picker v-model="imageValue" fileMediatype="image" mode="grid" @success="uploadSuccess" />
			</view>
			<view class="item">
				<button form-type="reset">重置</button>
				<button form-type="submit" type="primary" :disabled="isDisabled(formValue)">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageValue: [],
				formValue: {
					title: '',
					author: '',
					content: ''
				},
				picUrls: []
			};
		},
		methods: {
			// 图片上传成
			uploadSuccess(e) {
				this.picUrls = e.tempFilePaths
			},
			// 判断提交按钮的禁用状态
			isDisabled(obj) {
				// 有些平台不兼容
				/* for (let key in obj) {
					if (!obj[key]) {
						return true
					}
				} */
				// 全平台兼容的
				const bool = Object.keys(obj).some((key, value) => {
					// 循环判断，如果有一个为空就返回true(禁用按钮)，有数据就不禁用
					return obj[key] == ''
				})
				return bool
			},
			// 点击提交按钮
			onSubmit(e) {
				let detail = e.detail.value
				uniCloud.callFunction({
					name: "art_add_row",
					data: {
						detail,
						picUrls:this.picUrls
					}
				}).then(res => {
					uni.showToast({
						title: "发布成功"
					})
					setTimeout(() => {
						uni.reLaunch({
							url: "/pages/index/index"
						})
					}, 800)
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.add {
		padding: 30rpx;

		.item {
			padding-bottom: 20rpx;

			input,
			textarea {
				border: 1px solid #eee;
				height: 80rpx;
				padding: 0 20rpx;
			}

			textarea {
				height: 200rpx;
				width: 100%;
				box-sizing: border-box;
			}

			button {
				margin-bottom: 20rpx;
			}
		}
	}
</style>