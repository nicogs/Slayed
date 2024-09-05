class Project {
	constructor(name) {
		this.name = name
		this.creationTime = DateTime.now().toString()
		this.recordings = []
		this.scenes = []

		this.createRecording()
		this.createScene()
	}

	createRecording() {
		

		if(this.recordings.length > 0) {
			const activeRecording = this.recordings[this.recordings.length - 1]
			if(activeRecording.startTime != undefined) {
				const newRecording = new Recording(this.recordings.length + 1)
				this.recordings.push(newRecording)
				return newRecording
			} else {
				console.error("There is already a recording created that was not started yet")
			}
		} else {
			const newRecording = new Recording(this.recordings.length + 1)
			this.recordings.push(newRecording)
			return newRecording	
		}

	}

	createScene(id = this.scenes.length + 1) {
		const newScene = new Scene(id)
		this.scenes.push(newScene)
		return newScene
	}

	getScene(_id) {
		const foundScene = this.scenes.find(({ id }) => id == _id)

		if(foundScene) {
			return foundScene
		} else {
			const newScene = this.createScene(_id)
			return newScene
		}
	}

	getTakesCountForScene(_id) {
		const foundScene = this.scenes.find(({ id }) => id == _id)

		if(foundScene) {
			return foundScene.getTakesCount()
		} else {
			return 0
		}
	}

}