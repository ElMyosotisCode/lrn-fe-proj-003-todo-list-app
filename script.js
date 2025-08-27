console.log("JavaScript is connected! ✨");

// `const` practice (for constat values that won't change)
const projectName = "MyoNote - To Do List App";
const projectVersion = "0.1.0";

// `let` practice (for variables that can change in the future)
let activeTasks = 5;
let isProjectActive = true;
let projectDueDate;

// Variable calling and scanning practice
console.log("Project Name:", projectName);
console.log("The data-type is:", typeof projectName);

console.log("Project Version:", projectVersion);
console.log("The data-type is:", typeof projectVersion);

console.log("Active Tasks:", activeTasks);
console.log("The data-type is:", typeof activeTasks);

console.log("Is Project Active?", isProjectActive);
console.log("The data-type is:", typeof isProjectActive);

console.log("Project Due Date:", projectDueDate);
console.log("The data-type is:", typeof projectDueDate);

// ---

activeTasks = 3; // Updating the number of active tasks
console.log("Updated Active Tasks:", activeTasks);