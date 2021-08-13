import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  projects: [],
  activeProject: {},
  activeBacklog: {},
  backlogItems: [],
  sprints: [],
  activeSprint: {},
  tasks: {},
  sprintTasks: {},
  notes: {},
  activeTask: {},
  projectTasks: {}
})
