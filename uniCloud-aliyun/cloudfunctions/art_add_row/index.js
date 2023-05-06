const db = uniCloud.database()
exports.main = async (event, context) => {
	let {
		detail,
		picUrls
	} = event
	return await db.collection("article").add({
		posttime: Date.now(),
		...detail,
		picUrls
	})
};