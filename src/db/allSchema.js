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
        // console.log(realm.objects('Task'));
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
          if (
            (activityStart.getFullYear() === activityEnd.getFullYear(),
            (activityStart.getMonth() === activityEnd.getMonth(),
            activityStart.getDate() === activityEnd.getDate()))
          ) {
            const lastRow = realm.objects('Activity').sorted('id', true)[0];
            const highestId = lastRow == null ? 0 : lastRow.id;
            let activityId = highestId == null ? 1 : highestId + 1;
            realm.create('Activity', {
              taskId: taskId,
              start: activityStart,
              end: activityEnd,
              id: activityId,
            });
          } else if (
            (activityStart.getFullYear() === activityEnd.getFullYear(),
            activityStart.getMonth() === activityEnd.getMonth(),
            activityEnd.getDay() - activityStart.getDay() === 1 ||
              activityEnd.getDay() - activityStart.getDay() === -6)
          ) {
            console.log('Adding Activity with 1 day diff');
            console.log(activityStart, ' --> ', activityEnd);
            const lastRow = realm.objects('Activity').sorted('id', true)[0];
            const highestId = lastRow == null ? 0 : lastRow.id;
            let activityId = highestId + 1;
            console.log('New activity ID will be ', activityId);
            let newEnd = new Date(
              new Date(activityStart).getTime() +
                60 * 60 * (23 - new Date(activityStart).getHours()) * 1000 +
                (59 - new Date(activityStart).getMinutes()) * 60 * 1000,
            );
            // console.log('1/2: ', activityStart, '-->', newEnd);
            realm.create('Activity', {
              taskId: taskId,
              start: activityStart,
              end: newEnd,
              id: activityId,
            });

            // let newStart = new Date(
            //   new Date(activityEnd).getTime() +
            //     60 * 60 * (23 - new Date(activityEnd).getHours()) * 1000 +
            //     (61 - new Date(activityEnd).getMinutes()) * 60 * 1000,
            // );

            let newStart = new Date(
              activityEnd.getFullYear(),
              activityEnd.getMonth(),
              activityEnd.getDate(),
            );
            // console.log('2/2: ', newStart, '-->', activityEnd);
            realm.create('Activity', {
              taskId: taskId,
              start: newStart,
              end: activityEnd,
              id: activityId + 1,
            });
          }
          // console.log('All activities sorted:', realm.objects('Activity'));
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
        // console.log('START = ', startRange, '  END: ', endRange);
        let allActivitis = realm.objects('Activity').sorted('start', false);
        let activityByDay = allActivitis.filtered(
          'start >= $0 && end< $1',
          startRange,
          endRange,
        );
        //console.log('Activities By day LENGTH: ', activityByDay.length);
        //console.log('Activities By day: ', activityByDay);

        // let color = realm.objectForPrimaryKey('Activity', taskId);
        // console.log('bbbbbbbbb:', color);
        resolve(activityByDay);
      })
      .catch(error => reject(error));
  });

export const CheckActivityConflict = (
  yearStart,
  monthIndexStart,
  dateStart,
  hoursStart,
  minStart,
  yearEnd,
  monthIndexEnd,
  dateEnd,
  hoursEnd,
  minEnd,
) =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        let startRange = new Date(
          yearStart,
          monthIndexStart,
          dateStart,
          hoursStart,
          minStart,
        );
        let endRange = new Date(
          yearEnd,
          monthIndexEnd,
          dateEnd,
          hoursEnd,
          minEnd,
        );
        // console.log('START = ', startRange, '  END: ', endRange);
        let allActivitis = realm.objects('Activity').sorted('start', false);
        let activityConflict = allActivitis.filtered(
          '(start =< $0 && end>= $0)||(start =< $1 && end>= $1)||(start >= $0 && end=< $1)',
          startRange,
          endRange,
        );
        //console.log('activityConflict LENGTH: ', activityConflict.length);
        //console.log('activityConflict: ', activityConflict);

        // let color = realm.objectForPrimaryKey('Activity', taskId);
        // console.log('bbbbbbbbb:', color);
        let isConflict = activityConflict.length != 0 ? true : false;
        resolve(isConflict);
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

export const DeleteActivityByDay = (year, monthIndex, date) =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          let startRange = new Date(year, monthIndex, date);
          let endRange = new Date(
            new Date(startRange).getTime() + 60 * 60 * 24 * 1000,
          );
          // console.log('START = ', startRange, '  END: ', endRange);
          let allActivitis = realm.objects('Activity').sorted('start', false);
          let activityByDay = allActivitis.filtered(
            'start >= $0 && end< $1',
            startRange,
            endRange,
          );
          // console.log('Activities By day LENGTH: ', activityByDay.length);
          // console.log('Activities By day: ', activityByDay);

          // let color = realm.objectForPrimaryKey('Activity', taskId);
          // console.log('bbbbbbbbb:', color);
          realm.delete(activityByDay);
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const DeleteActivityByTaskId = taskId =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          // let deleteByTaskId = realm.objectForPrimaryKey('Activity', taskId);
          let allActivitis = realm.objects('Activity');
          let deleteByTaskId = allActivitis.filtered('taskId==$0', taskId);
          console.log('taskId', taskId, 'deleteByTaskId', deleteByTaskId);
          realm.delete(deleteByTaskId);
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const DeleteActivity = activityId =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          let deleteActivity = realm.objectForPrimaryKey(
            'Activity',
            activityId,
          );

          realm.delete(deleteActivity);
          resolve();
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
