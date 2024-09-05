const DateTime = luxon.DateTime;
const countDownDuration = luxon.Duration.fromObject({ seconds: 3 });

const projects = []
let isEditingProject = false

let myReq