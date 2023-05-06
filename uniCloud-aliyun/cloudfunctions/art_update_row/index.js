const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		detail,
		picUrls
	} = event;
	return await db.collection("article").doc(detail._id).update({
		title: detail.title,
		author: detail.author,
		content: detail.content,
		picUrls
	})
};