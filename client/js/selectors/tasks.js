export function getTaskById(tasks, taskId) {
    return tasks.filter(
        (task) => task.id === parseInt(taskId)
    ).pop() || {};
}