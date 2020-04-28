const initialState = {
  tasks: [
    {id: 1, name: 'test1', color: 'red'},
    {id: 2, name: 'test2', color: 'green'},
    {id: 3, name: 'test3', color: 'blue'},
    {id: 4, name: 'test4', color: 'black'},
    {id: 5, name: 'test5', color: 'orange'},
  ],
  id: 5,
};

const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TASK_ADD':
      state.id += 1;
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {id: state.id, name: action.name, color: action.color},
        ],
      };
    case 'TASK_DEL':
      console.log('ID=' + action.id);
      console.log('Before: ');
      console.log(state.tasks);
      const updatedTasks = state.tasks.filter(item => item.id != action.id);
      console.log('After: ');
      console.log(state.tasks);
      return {
        ...state,
        tasks: updatedTasks,
      };
    default:
      return state;
  }
};
export default TaskReducer;
