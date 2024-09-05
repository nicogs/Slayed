const currentProject = {
	name: undefined,
	recordings: [],
	scenes: []
}
const selectProject = document.getElementById("selectProject")
selectProject.addEventListener("change", renderOverview)
const selectOrder = document.getElementById("selectOrder")
selectOrder.addEventListener("change", renderOverview)

const switchGoodTakesOnly = document.getElementById("switchGoodTakesOnly")
switchGoodTakesOnly.addEventListener("change", renderOverview)


const accordionOverview = document.getElementById("accordionOverview")
function createAccordionItem(title, content){
	const id = title.replace(/\s/g, '')

	const item = document.createElement("div")
	item.setAttribute("class", "accordion-item")

	const header = document.createElement("h2")
	header.setAttribute("class", "accordion-header")
	item.append(header)

	const button = document.createElement("button")
	button.setAttribute("class", "accordion-button collapsed")
	button.setAttribute("type", "button")
	button.setAttribute("data-bs-toggle", "collapse")
	button.setAttribute("data-bs-target", "#" + id)
	button.setAttribute("aria-expanded", "false")
	button.setAttribute("aria-controls", id)
	button.innerText = title
	header.append(button)


	const collapse = document.createElement("div")
	collapse.setAttribute("class", "accordion-collapse collapse")
	collapse.setAttribute("data-bs-parent", "#accordionOverview")
	collapse.setAttribute("id", id)
	item.append(collapse)
	
	const body = document.createElement("div")
	body.setAttribute("class", "accordion-body")
	body.append(content)
	collapse.append(body)

	return item
}

function createTableHeading(headersArray) {
	const table = document.createElement("table")
	table.classList.add("table")
	
	const thead = document.createElement("thead")
	table.append(thead)
	const tr = document.createElement("tr")
	thead.append(tr)
	headersArray.forEach(header => {
		const th = document.createElement("th")
		th.setAttribute("scope", "col")
		th.innerText = header
		tr.append(th)
	});

	return table
}

function renderTakes(takes, orderBy) {
	const tbody = document.createElement("tbody")
	let takeIndex = 0
	for (const take of takes) {
		if(take.startTime != undefined) {
			const recording = currentProject.recordings.find(r => r.id == take.recordingId)

			const recordingStart = DateTime.fromISO(recording.startTime)
			const takeStart = DateTime.fromISO(take.startTime)
			const diff = takeStart.diff(recordingStart)
			const timecode =  diff.toFormat("hh':'mm':'ss':'SSS")


			const tr = document.createElement("tr")
			tbody.append(tr)
			const th = document.createElement("th")
			th.setAttribute("scope", "row")
			th.innerText = takeIndex + 1
			tr.append(th)
			if(orderBy == "recording") {
				const tdTimecode = document.createElement("td")
				tdTimecode.innerText = timecode
				tr.append(tdTimecode)

				const tdScene = document.createElement("td")
				tdScene.innerText = "Scene #" + take.sceneId
				tr.append(tdScene)
			}
			if(orderBy == "scene") {
				const tdRecording = document.createElement("td")
				tdRecording.innerText = "Recording #" + take.recordingId
				tr.append(tdRecording)

				const tdTimecode = document.createElement("td")
				tdTimecode.innerText = timecode
				tr.append(tdTimecode)
			}
			const tdGood = document.createElement("td")
			tdGood.innerText = take.isGood ? "✅" : "❌"
			tr.append(tdGood)
			takeIndex++
		}
	}

	return tbody

}

function renderScenes(scenes, goodTakesOnly) {
	while (accordionOverview.lastElementChild) {
		accordionOverview.removeChild(accordionOverview.lastElementChild);
  	}
	for (let s = 0; s < scenes.length; s++) {
		const table = createTableHeading(["#", "Recording", "Timecode", "Good"])
		const takes = goodTakesOnly ? scenes[s].takes.filter(t => t.isGood) : scenes[s].takes
		const tbody = renderTakes(takes, "scene")
		table.append(tbody)

		const item = createAccordionItem("Scene " + scenes[s].id, table)
		accordionOverview.append(item)
	}
}

function renderRecordings(recordings, goodTakesOnly) {
	while (accordionOverview.lastElementChild) {
		accordionOverview.removeChild(accordionOverview.lastElementChild);
  	}
	for (let r = 0; r < recordings.length; r++) {
		const table = createTableHeading(["#", "Timecode", "For Scene", "Good"])
		const takes = goodTakesOnly ? recordings[r].takes.filter(t => t.isGood) : recordings[r].takes
		const tbody = renderTakes(takes, "recording")
		table.append(tbody)

		const item = createAccordionItem("Recording " + recordings[r].id, table)
		accordionOverview.append(item)
	}
}

function testRender() {

	for (let i = 0; i < 3; i++) {
		const header = document.createElement("h2")

		header.innerText = "Testing Content" + i

		const item = createAccordionItem("Testing Title " + i, header)
		accordionOverview.append(item)
		
	}
}

function setSelectProjects(projectsArray, activeProject){
	projectsArray.forEach(project => {
		const option = document.createElement("option")
		option.setAttribute("value", project.name)
		option.innerText = project.name
		if(project.name == activeProject) {
			option.setAttribute("selected", "")
			currentProject.name = project.name
			currentProject.recordings = project.recordings
			currentProject.scenes = project.scenes
		}
		selectProject.append(option)
	})
	renderOverview()
}

function renderOverview() {
	const myProjects = JSON.parse(localStorage.getItem("slayedProjects"))
	const project = myProjects.find(p => p.name == selectProject.value)
	currentProject.name = project.name
	currentProject.recordings = project.recordings
	currentProject.scenes = project.scenes

	if(selectOrder.value == "scene") {
		renderScenes(project.scenes, switchGoodTakesOnly.checked)
	} else if(selectOrder.value == "recording") {
		renderRecordings(project.recordings, switchGoodTakesOnly.checked)
	}
}