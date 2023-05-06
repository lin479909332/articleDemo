const db = uniCloud.database();
exports.main = async (event, context) => {
	const {
		skip = 0
	} = event
	return await db.collection("article").limit(8).skip(skip).orderBy("posttime", "desc").get();
};