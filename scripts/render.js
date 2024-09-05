
const inputProjectName = document.getElementById("inputProjectName")
const datalistProjectNames = document.getElementById("datalistProjectNames")

inputProjectName.addEventListener("focusin", () => {
	cancelAnimationFrame(myReq)
})
inputProjectName.addEventListener("focusout", () => {
	myReq = requestAnimationFrame(refreshSlate)
	syncProject()
})
const paragraphCurrentDate = document.getElementById("paragraphCurrentDate")

const paragraphTakeCount = document.getElementById("paragraphTakeCount")
const paragraphTakeDuration = document.getElementById("paragraphTakeDuration")
// const btnTakeNew = document.getElementById("btnTakeNew")
// const btnTakeStart = document.getElementById("btnTakeStart")
// btnTakeNew.addEventListener("click", clickedBtnTakeNew)
// btnTakeStart.addEventListener("click", clickedBtnTakeStart)

const paragraphSceneCount = document.getElementById("paragraphSceneCount")
const btnSceneCountDec = document.getElementById("btnSceneCountDec")
btnSceneCountDec.addEventListener("click", sceneCountDec)
const btnSceneCountInc = document.getElementById("btnSceneCountInc")
btnSceneCountInc.addEventListener("click", sceneCountInc)



const paragraphReelCount = document.getElementById("paragraphReelCount")
const paragraphReelDuration = document.getElementById("paragraphReelDuration")
// const btnReelNew = document.getElementById("btnReelNew")
// const btnReelStart = document.getElementById("btnReelStart")
// btnReelNew.addEventListener("click", clickedBtnReelNew)
// btnReelStart.addEventListener("click", clickedBtnReelStart)

const linkToOverview = document.getElementById("linkToOverview")
linkToOverview.addEventListener("click", () => {
	const project = loadProject(inputProjectName.value)
	project.createRecording()
	saveProjectsToLocalStorage(projects)
	
})

function updateCurrentTime() {
	const currentTime = DateTime.now().toFormat("yyyy'-'LL'-'dd' 'hh':'mm':'ss")
	paragraphCurrentDate.innerText = currentTime	
}

function updateTakeDuration() {
	const project = loadProject(inputProjectName.value)
	const recording = project.recordings[project.recordings.length - 1]
	const take = recording.takes[recording.takes.length - 1]
	paragraphTakeDuration.innerText = take.getDuration()
}

function updateReelDuration() {
	const activeProject = loadProject(inputProjectName.value)
	const lastRecordingDuration = activeProject.recordings[activeProject.recordings.length - 1].getDuration()
	// console.log(lastRecordingDuration)
	paragraphReelDuration.innerText = lastRecordingDuration
}




// TEST
function testStuff() {
	const myProj = loadProject(inputProjectName.value)
	const scene = myProj.getScene(1)
	myProj.recordings[myProj.recordings.length - 1].start(scene)
}

function loadProject(projectName) {
	const foundProject = projects.find(({ name }) => name == projectName)

	if(foundProject) {
		return foundProject
	} else {
		// if(projects.length == 0 && projectName == '') {
		// 	projectName = "Sample Slayed Project Name"
		// } 
		const newProject = new Project(projectName)
		projects.push(newProject)
		addProjectsToDataset()
		return newProject
	}
}


function refreshSlate(){
	updateCurrentTime()
	updateTakeDuration()
	updateReelDuration()
	myReq = requestAnimationFrame(refreshSlate)
}


function syncProject(){
	const project = loadProject(inputProjectName.value)
	paragraphReelCount.innerText = project.recordings.length

	paragraphTakeCount.innerText = project.getTakesCountForScene(paragraphSceneCount.innerText * 1)
	addProjectsToDataset()
	renderButtons()
	saveProjectsToLocalStorage(projects)
}

function clickedBtnTakeNew(){
	const project = loadProject(inputProjectName.value)
	project.recordings[project.recordings.length - 1].createTake()
	syncProject()

}

function clickedBtnTakeStart(){
	const project = loadProject(inputProjectName.value)
	const scene = project.getScene(paragraphSceneCount.innerText * 1)

	project.recordings[project.recordings.length - 1].startTake(scene)
	syncProject()
}

function clickedBtnReelNew(){
	const project = loadProject(inputProjectName.value)
	project.createRecording()
	syncProject()
}

function clickedBtnReelStart(){
	const project = loadProject(inputProjectName.value)
	const scene = project.getScene(paragraphSceneCount.innerText * 1)

	project.recordings[project.recordings.length - 1].start(scene)
	syncProject()
}

function clickedGoodClipLastTake() {
	const project = loadProject(inputProjectName.value)
	const recording = (project.recordings[project.recordings.length - 1].startTime == undefined) ? project.recordings[project.recordings.length - 2] : project.recordings[project.recordings.length - 1]
	const take = (recording.takes[recording.takes.length - 1].startTime == undefined) ? recording.takes[recording.takes.length - 2] : recording.takes[recording.takes.length - 1]

	take.isGood = true
	syncProject()
}

function sceneCountInc() {
	const current = paragraphSceneCount.innerText * 1
	paragraphSceneCount.innerText = current + 1
	syncProject()

}

function sceneCountDec() {
	const current = paragraphSceneCount.innerText * 1
	paragraphSceneCount.innerText = Math.max(current - 1, 1)
	syncProject()

}

function addProjectsToDataset() {
	while (datalistProjectNames.lastElementChild) {
		datalistProjectNames.removeChild(datalistProjectNames.lastElementChild);
  	}
	for (let i = projects.length - 1; i >= 0; i--) {
		const datasetOption = document.createElement("option")
		datasetOption.value = projects[i].name
		datalistProjectNames.append(datasetOption)
	}
}