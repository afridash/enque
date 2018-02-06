
import Realm from 'realm';
export const PERSON_SCHEMA = "Person";
// Define your models and their properties
export const PersonSchema = {
    name: PERSON_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',    // primary key
        name: { type: 'string', indexed: true },
    }
};
const databaseOptions = {
    path: 'todoListApp.realm',
    schema: [PersonSchema],
    schemaVersion: 0, //optional
};
//functions for TodoLists
export const insertPerson = person => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(PERSON_SCHEMA, person);
            resolve(person);
        });
    }).catch((error) => reject(error));
});
export const updatePerson = person => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let updatingPerson = realm.objectForPrimaryKey(PERSON_SCHEMA, person.id);
            updatingPerson.name = person.name;
            resolve();
        });
    }).catch((error) => reject(error));;
});

export const deletePerson = personId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingPerson = realm.objectForPrimaryKey(PERSON_SCHEMA, personId);
            realm.delete(deletingPerson);
            resolve();
        });
    }).catch((error) => reject(error));;
});

export const deleteAll = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allPeople = realm.objects(PERSON_SCHEMA);
            realm.delete(allPeople);
            resolve();
        });
    }).catch((error) => reject(error));;
});

export const queryAll = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let people = realm.objects(PERSON_SCHEMA);
        resolve(people);
    }).catch((error) => {
        reject(error);
    });;
});
export default new Realm(databaseOptions);
