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
// const ActivitySchema = {
//   name: 'Activity',
//   primaryKey: 'name',
//   properties: {
//     id: 'int',
//     name: 'string',
//     taskName: 'string',
//     // start: Date,
//     // end: Date,
//   },
// };

const dbOptions = {
  path: 'Asena.realm',
  schema: [TaskSchema],
  schemaVersion: 1,
};

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

export default new Realm(dbOptions);
