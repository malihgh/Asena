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

          // console.log(
          //   'All activities sorted:',
          //   realm.objects('Activity').sorted('start', false),
          // );
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const GetActivityByDay = (year, monthIndex, date) =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        let startRange = new Date(year, monthIndex, date);
        let endRange = new Date(
          new Date(startRange).getTime() + 60 * 60 * 24 * 1000,
        );
        console.log('START = ', startRange, '  END: ', endRange);
        let allActivitis = realm.objects('Activity').sorted('start', false);
        let activityByDay = allActivitis.filtered(
          'start >= $0 && end< $1',
          startRange,
          endRange,
        );
        console.log('Activities By day LENGTH: ', activityByDay.length);
        console.log('Activities By day: ', activityByDay);

        // let color = realm.objectForPrimaryKey('Activity', taskId);
        // console.log('bbbbbbbbb:', color);
        resolve(activityByDay);
      })
      .catch(error => reject(error));
  });

export const GetActivityByTask = myTaskId =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        let allActivitis = realm.objects('Activity');
        let activityByTask = allActivitis.filtered('taskId==$0', myTaskId);

        //console.log('Activities By task: ', activityByTask);
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
export const DeleteAllActivities = () =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          let allActivity = realm.objects('Activity');
          realm.delete(allActivity);
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export default new Realm(dbOptions);
