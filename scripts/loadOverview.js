document.addEventListener("DOMContentLoaded", (event) => {
	if(hasProjectsInLocalStorage()) {
		const slayedProjects = JSON.parse(localStorage.getItem("slayedProjects"))
		const slayedState = JSON.parse(localStorage.getItem("slayedState"))
		console.log(slayedState)
		setSelectProjects(slayedProjects, slayedState.project)
		projects.push(...slayedProjects)
	} else {
		console.log("Has no Slayed Projects in localStorage");
	}
});