import Realm from 'realm';

const TaskSchema = {
  name: 'Task',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    color: 'string',
  },
};
const ActivitySchema = {
  name: 'Activity',
  primaryKey: 'id',
  properties: {
    id: 'int',
    taskId: 'int',
    start: 'date',
    end: 'date',
  },
};

const dbOptions = {
  path: 'Asena.realm',
  schema: [TaskSchema, ActivitySchema],
  schemaVersion: 3,
};

// task table
export const InsertNewTask = (taskName, taskColor) =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          const lastRow = realm.objects('Task').sorted('id', true)[0];
          const highestId = lastRow == null ? 0 : lastRow.id;
          let taskId = highestId == null ? 1 : highestId + 1;
          realm.create('Task', {
            name: taskName,
            color: taskColor,
            id: taskId,
          });
          resolve(taskId);
        });
      })
      .catch(error => reject(error));
  });

export const GetAllTasks = () =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        resolve(realm.objects('Task'));
      })
      .catch(error => reject(error));
  });

export const DeleteTaskById = Id =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          let deleteById = realm.objectForPrimaryKey('Task', Id);
          realm.delete(deleteById);
          resolve(Id);
        });
      })
      .catch(error => reject(error));
  });

export const DeleteAllTasks = () =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          let allTasks = realm.objects('Task');
          realm.delete(allTasks);
          resolve();
        });
      })
      .catch(error => reject(error));
  });

// Activity table
export const InsertActivity = (taskId, activityStart, activityEnd) =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          const lastRow = realm.objects('Activity').sorted('id', true)[0];
          const highestId = lastRow == null ? 0 : lastRow.id;
          let activityId = highestId == null ? 1 : highestId + 1;
          realm.create('Activity', {
            taskId: taskId,
            start: activityStart,
            end: activityEnd,
            id: activityId,
          });

          console.log('All activities: ', realm.objects('Activity').length);
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const GetActivityByDay = day =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        let allActivitis = realm.objects('Activity');
        let activityByDay = allActivitis.filtered('start == $0', new Date(day));
        resolve(activityByDay);
      })
      .catch(error => reject(error));
  });

export const GetActivityByTask = taskId =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        let allActivitis = realm.objects('Activity');
        let activityByTask = allActivitis.filtered('taskId == $0', taskId);
        resolve(activityByTask);
      })
      .catch(error => reject(error));
  });

export const DeleteActivityByTaskId = taskId =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          let deleteByTaskId = realm.objectForPrimaryKey('Activity', taskId);
          realm.delete(deleteByTaskId);
          resolve(taskId);
        });
      })
      .catch(error => reject(error));
  });

export default new Realm(dbOptions);
