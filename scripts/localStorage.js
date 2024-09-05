function saveProjectsToLocalStorage(data) {
	const newProjects = JSON.stringify(data)
	const currentState = JSON.stringify({
		project: inputProjectName.value,
		sceneId: paragraphSceneCount.innerText * 1
	})
	localStorage.removeItem("slayedProjects")
	localStorage.removeItem("slayedState")
	localStorage.setItem("slayedProjects", newProjects)
	localStorage.setItem("slayedState", currentState)
}

function hasProjectsInLocalStorage() {
	const myProjects = localStorage.getItem("slayedProjects")

	return (myProjects != undefined)
}

function getProjectsFromLocalStorage() {
	if(hasProjectsInLocalStorage()) {
		const myProjects = JSON.parse(localStorage.getItem("slayedProjects"))
		return myProjects
	} else {
		console.log("No SLAYED data found in Local Storage")
	}
}

function convertLocalStorageToSlayed(){
	while (projects.length != 0) {
		projects.pop()
  	}

	const myProjects = getProjectsFromLocalStorage()

	myProjects.forEach(project => {
		const newProject = new Project(project.name)
		newProject.creationTime = DateTime.fromISO(project.creationTime)
		newProject.recordings = []
		newProject.scenes = []
		

		project.scenes.forEach(scene => {
			const newScene = new Scene(scene.id)
			newScene.creationTime = DateTime.fromISO(scene.creationTime)
			newProject.scenes.push(newScene)
		})

		project.recordings.forEach(recording => {
			const newRecording = new Recording(recording.id)
			newRecording.creationTime = DateTime.fromISO(recording.creationTime)
			if(recording.startTime != undefined) {
				newRecording.startTime = DateTime.fromISO(recording.startTime)
			}

			newRecording.takes = []

			newProject.recordings.push(newRecording)

			recording.takes.forEach(take => {
				const newTake = new Take(take.id)
				newTake.recordingId = take.recordingId
				newTake.creationTime = DateTime.fromISO(take.creationTime)

				if(take.sceneId != undefined) {
					newTake.sceneId = take.sceneId
					const takeForScene = newProject.getScene(take.sceneId)
					takeForScene.takes.push(newTake)
				}

				if(take.startTime != undefined) {
					newTake.startTime = DateTime.fromISO(take.startTime)
				}

				newTake.isGood = take.isGood

				newRecording.takes.push(newTake)
			})

			
		})

		const lastRec = project.recordings[project.recordings.length - 1]
		if(lastRec.startTime != undefined) {
			newProject.createRecording()
		}
		projects.push(newProject)
	});

}