class Recording {
	constructor(id) {
		this.id = id
		this.creationTime = DateTime.now().toString()
		this.startTime = undefined
		this.takes = []

		this.createTake()
	}

	start(scene) {
		if(this.startTime == undefined) {
			const activeTake = this.startTake(scene)
			this.startTime = activeTake.startTime
		} else {
			console.error("This reel/recording already started")
		}
	}

	getDuration(){
		if(this.startTime != undefined) {
			const currentTime = DateTime.now()
			const diff = currentTime.diff(this.startTime)
			return diff.toFormat("hh':'mm':'ss':'SSS")
		} else {
			return "--:--:--:--"
		}
		
	} 

	createTake() {
		if(this.takes.length > 0) {
			const activeTake = this.takes[this.takes.length - 1]
			if(activeTake.startTime != undefined) {
				const newTake = new Take(this.takes.length + 1)
				newTake.recordingId = this.id

				this.takes.push(newTake)
				return newTake
			} else {
				console.error("There is already a take created that was not started yet")
			}
		} else {
			const newTake = new Take(this.takes.length + 1)
			newTake.recordingId = this.id
			this.takes.push(newTake)
			return newTake	
		}
		
	}

	startTake(scene) {
		const activeTake = this.takes[this.takes.length - 1]
		if(activeTake.startTime == undefined) {
			scene.takes.push(activeTake)
			activeTake.sceneId = scene.id
			activeTake.start()
			return activeTake
		} else {
			console.error("This take already startd")
		}
	}
}
