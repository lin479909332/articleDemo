<template>
	<view class="home">
		<view class="content">
			<view @click="goDeatil(item._id)" class="item" v-for="item in listArr" :key="item._id">
				<view class="text">
					<view class="title">{{item.title}}</view>
					<view class="info">
						<text>{{item.author}}</text>
						<text>
							<uni-dateformat :date="item.posttime" format="MM-dd" :threshold="[60000, 3600000]" />
						</text>
					</view>
				</view>
				<view class="pic">
					<image v-if="item.picUrls && item.picUrls.length" :src="item.picUrls[0]"></image>
					<image v-else src="../../static/images/nopic.jpg"></image>
				</view>
			</view>
		</view>
		<view class="goAdd" @click="goAdd">
			<uni-icons type="plusempty" size="30" color="#fff" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listArr: []
			}
		},
		onLoad() {
			this.getData()
		},
		// 触底刷新
		onReachBottom() {
			this.getData()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.listArr = []
			this.getData()
		},
		methods: {
			// 获取数据
			getData() {
				uniCloud.callFunction({
					name: "art_get_all",
					data: {
						skip: this.listArr.length
					}
				}).then(res => {
					// 拼接新数据到列表里
					let newList = [...this.listArr, ...res.result.data]
					// 新数据复制给列表渲染
					this.listArr = newList
					// 停止下拉刷新
					uni.stopPullDownRefresh()
				})
			},
			// 前往添加页面
			goAdd() {
				uni.navigateTo({
					url: "/pages/add/add"
				})
			},
			// 前往新闻详情页
			goDeatil(id) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home {
		.content {
			padding: 30rpx;

			.item {
				display: flex;
				justify-content: space-between;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #eee;

				.text {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding-right: 20rpx;

					.title {
						font-size: 44rpx;
						color: #333;
						// text-align: justify;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.info {
						font-size: 28rpx;
						color: #888;

						text {
							padding-right: 20rpx;
						}
					}
				}

				.pic {
					width: 260rpx;
					height: 180rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.goAdd {
			width: 120rpx;
			height: 120rpx;
			background: #2B9939;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			font-size: 50rpx;
			position: fixed;
			right: 60rpx;
			bottom: 100rpx;
			box-shadow: 0 0 20rpx rgba(43, 153, 57, 0.7);
		}
	}
</style>