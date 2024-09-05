const divButtons = document.getElementById("divButtons")

function removeButtons() {
 	while (divButtons.lastElementChild) {
		divButtons.removeChild(divButtons.lastElementChild);
  	}
}

function createSingleButton() {
	const btn = document.createElement("button")
	btn.setAttribute("type", "button")
	btn.setAttribute("class", "btn btn-dark rounded-0 w-100")
	return btn
}

function createGroupBtn() {
	const btn = createSingleButton()
	btn.classList.remove("btn-sm")
	btn.classList.remove("w-100")
	return btn
}

function createGroupDiv() {
	const div = document.createElement("div")
	div.setAttribute("class", "btn-group btn-group-sm py-3 w-100")
	return div
}

function renderButtons() {
	const project = loadProject(inputProjectName.value)
	const recording = project.recordings[project.recordings.length - 1]
	const take = recording.takes[recording.takes.length - 1]

	removeButtons()

	if(recording.startTime == undefined) {
		if(project.recordings.length > 1) {
			// TODO: Good clip last take btn
			const goodTakeBtn = createSingleButton()
			goodTakeBtn.setAttribute("id", "btnTakeGood")
			goodTakeBtn.addEventListener("click", clickedGoodClipLastTake)
			goodTakeBtn.innerText = "Good Clip Last Take"
			goodTakeBtn.classList.remove("btn-dark")
			if(checkIfLastTakeWasGood()) {
				goodTakeBtn.classList.add("btn-success")
			} else {
				goodTakeBtn.classList.add("btn-outline-success")

			}
			divButtons.append(goodTakeBtn)
		}

		const startReelBtn = createSingleButton()
		startReelBtn.innerText = "Start Reel"
		startReelBtn.addEventListener("click", clickedBtnReelStart)
		divButtons.append(startReelBtn)
	} else {
		// TODO: Button group: Good clip last take btn – New Reel
		const newReelBtn = createGroupBtn()
		newReelBtn.innerText = "New Reel"
		newReelBtn.addEventListener("click", clickedBtnReelNew)

		const goodTakeBtn = createGroupBtn()
		goodTakeBtn.setAttribute("id", "btnTakeGood")
		goodTakeBtn.addEventListener("click", clickedGoodClipLastTake)

		goodTakeBtn.innerText = "Good Clip Last Take"
		goodTakeBtn.classList.remove("btn-dark")
		if(checkIfLastTakeWasGood()) {
			goodTakeBtn.classList.add("btn-success")
		} else {
			goodTakeBtn.classList.add("btn-outline-success")

		}

		const btnGroup = createGroupDiv()
		btnGroup.append(goodTakeBtn)
		btnGroup.append(newReelBtn)

		divButtons.append(btnGroup)

		if(take.startTime == undefined) {
			

			const startTakeBtn = createSingleButton()
			startTakeBtn.innerText = "Start Take"
			startTakeBtn.addEventListener("click", clickedBtnTakeStart)
			divButtons.append(startTakeBtn)
		} else {
			goodTakeBtn.setAttribute("disabled", "")

			const newTakeBtn = createSingleButton()
			newTakeBtn.innerText = "New Take"
			newTakeBtn.addEventListener("click", clickedBtnTakeNew)
			divButtons.append(newTakeBtn)

		}
	}
}

function checkIfLastTakeWasGood() {
	const project = loadProject(inputProjectName.value)


	if(project.recordings.length != 1 || project.recordings[0].takes.length != 1) {
		// const recording = (project.recordings[project.recordings.length - 1].startTime == undefined) ? project.recordings[project.recordings.length - 2] : project.recordings[project.recordings.length - 1]
		// const take = (recording.takes[recording.takes.length - 1].startTime == undefined) ? recording.takes[recording.takes.length - 2] : recording.takes[recording.takes.length - 1]
		if(project.recordings[project.recordings.length - 1].startTime == undefined || project.recordings[project.recordings.length - 1].takes.length == 1) {
			const recording = project.recordings[project.recordings.length - 2] 
			const take = recording.takes[recording.takes.length - 1]
			return take.isGood
		} else {
			const recording = project.recordings[project.recordings.length - 1]
			const take = recording.takes[recording.takes.length - 2]
			return take.isGood
		}
		

	} else {
		return false
	}
}

// renderButtons()