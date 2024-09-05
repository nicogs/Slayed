if("serviceWorker" in navigator) {
	navigator.serviceWorker.register("./service-worker.js")
	.then((reg) => console.log("Service worker registered", reg))
	.catch((err) => console.log("Service worker not registered", err))
}

document.addEventListener("DOMContentLoaded", (event) => {
	if(hasProjectsInLocalStorage()) {
		console.log("Has Slayed Projects in localStorage");
		convertLocalStorageToSlayed()
		const slayedState = JSON.parse(localStorage.getItem("slayedState"))
		inputProjectName.value = slayedState.project
		paragraphSceneCount.innerText = slayedState.sceneId * 1
	} else {
		console.log("Has no Slayed Projects in localStorage");
		inputProjectName.value = "Sample Slayed Project Name"
	}
	myReq = requestAnimationFrame(refreshSlate)
	syncProject()
});