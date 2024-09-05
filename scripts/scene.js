class Scene {
	constructor(id) {
		this.id = id
		this.creationTime = DateTime.now().toString()
		this.takes = []
	}

	getTakesCount() {
		return this.takes.length
	}

	getGoodTakes() {
		const goodTakes = this.takes.filter(t => t.isGood == true)
		return goodTakes
	}

	getTakes() {
		return this.takes
	}

}