class Take {
	constructor(id) {
		this.id = id
		this.sceneId = undefined
		this.recordingId = undefined
		
		this.creationTime = DateTime.now().toString()
		this.startTime = undefined
		
		this.isGood = false
	}

	start() {
		const currentTime = DateTime.now()
		this.startTime = currentTime.plus(countDownDuration)
		




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
	

}