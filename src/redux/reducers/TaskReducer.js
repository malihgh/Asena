import {colors} from '../../global/colors';

const initialState = {
  tasks: [
    {id: 1, name: 'Work out', color: colors[0]},
    {id: 2, name: 'Youtube', color: colors[1]},
    {id: 3, name: 'Reading Novel', color: colors[5]},
    {id: 4, name: 'Coding', color: colors[12]},
    {id: 5, name: 'Homework', color: colors[9]},
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
