
import Realm from 'realm';
export const SURVEY_SCHEMA = "Surveys";
// Define your models and their properties
export const SurveySchema = {
    name: SURVEY_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',    // primary key
        q1:'string',
        q2_goal1: 'int',
        q2_goal2: 'int',
        q2_goal3: 'int',
        q2_goal4: 'int',
        q2_goal5: 'int',
        q2_goal6: 'int',
        q2_goal7: 'int',
        q2_goal8: 'int',
        q2_goal9: 'int',
        q2_goal10: 'int',
        q2_goal11: 'int',
        q2_goal12: 'int',
        q2_goal13: 'int',
        q2_goal14: 'int',
        q2_goal15: 'int',
        q2_goal16: 'int',
        q2_goal17: 'int',
        q3_goal1: 'int',
        q3_goal2: 'int',
        q3_goal3: 'int',
        q3_goal4: 'int',
        q3_goal5: 'int',
        q3_goal6: 'int',
        q3_goal7: 'int',
        q3_goal8: 'int',
        q3_goal9: 'int',
        q3_goal10: 'int',
        q3_goal11: 'int',
        q3_goal12: 'int',
        q3_goal13: 'int',
        q3_goal14: 'int',
        q3_goal15: 'int',
        q3_goal16: 'int',
        q3_goal17: 'int',
        gender: 'string',
        age: 'int',
        education_level: 'int',
        country: 'string',
        city: 'string',
        disability: 'string',
        disability_type: 'int',
        partner_id: 'string',
        user_id: 'string',
        method: 'string',
        start: 'int',
        end: 'int',
        submission_date: 'int'
    }
};
const databaseOptions = {
    path: 'survey.realm',
    schema: [SurveySchema],
    schemaVersion: 0, //optional
};
//functions for TodoLists
export const insertSurvey = survey => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(SURVEY_SCHEMA, survey);
            resolve(survey);
        });
    }).catch((error) => reject(error));
});


export const deleteAll = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allPeople = realm.objects(SURVEY_SCHEMA);
            realm.delete(allPeople);
            resolve();
        });
    }).catch((error) => reject(error));;
});

export const queryAll = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let surveys = realm.objects(SURVEY_SCHEMA);
        resolve(surveys);
    }).catch((error) => {
        reject(error);
    });;
});
export default new Realm(databaseOptions);
