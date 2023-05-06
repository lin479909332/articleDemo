<template>
	<view class="edit">
		<view v-if="loadState">
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
		<view v-else>
			<uni-load-more status="loading"></uni-load-more>
		</view>
	</view>
</template>

<script>
	let id
	export default {
		data() {
			return {
				imageValue: [],
				picUrls: [],
				formValue: {
					title: '',
					author: '',
					content: ''
				},
				// 加载状态
				loadState: false
			};
		},
		onLoad(e) {
			id = e.id
			this.getDetail()
		},
		methods: {
			// 获取数据
			getDetail() {
				uniCloud.callFunction({
					name: "art_get_row",
					data: {
						id
					}
				}).then(res => {
					this.formValue = res.result.data[0]
					this.loadState = true
					// 如果文章不存在图片就不执行后续的代码
					if (!this.formValue.picUrls) {
						return;
					}
					// 整理参数为对象数据，不然图片不显示
					let urls = this.formValue.picUrls.map(item => {
						return {
							url: item
						}
					})
					this.imageValue = urls
				})
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
				let _picUrls = this.imageValue.map(item => {
					return item.url
				})
				uniCloud.callFunction({
					name: "art_update_row",
					data: {
						detail: this.formValue,
						picUrls: _picUrls
					}
				}).then(res => {
					uni.showToast({
						icon: 'success',
						title: "修改成功"
					})
					setTimeout(() => {
						// 返回上一页
						uni.navigateBack()
					}, 800)
				})
			},
			// 图片上传成功
			uploadSuccess(e) {
				this.picUrls = e.tempFilePaths
			}
		},
	}
</script>

<style lang="scss" scoped>
	.edit {
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