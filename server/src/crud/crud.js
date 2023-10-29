const { Datastore } = require('@google-cloud/datastore');
const datastoreCredential = require("../../database/datastore-credentials.json")

const datastore = new Datastore({
    projectId: "fitness-solution-jaras",
    credentials: datastoreCredential
});

const buildConfig = (namespace, kind, id) => {
    const path = [kind];

    if (id) {
        path.push(id);
    }

    const entityKey = datastore.key({
        path,
        namespace,
    });

    return entityKey;
};

const create = async (user, kind, data) => {
    const namespace = user.Namespace;

    const key = buildConfig(namespace, kind);

    data.z_Inserted_Date = new Date();
    data.z_Create_UserId = user.Id;

    const entity = {
        key,
        data,
    };

    const response = await datastore.save(entity);
    return response;
};

const getById = async (user, kind, id) => {
    const namespace = user.Namespace;

    const key = buildConfig(namespace, kind, id);

    const response = await datastore.get(key);
    return response;
};

const get = async (user, kind) => {
    const namespace = user.Namespace;

    const query = datastore.createQuery(namespace, kind);

    const [entities] = await datastore.runQuery(query);
    return entities;
};

const update = async (user, kind, id, data) => {
    const namespace = user.Namespace;

    const key = buildConfig(namespace, kind, id);

    const entity = {
        key,
        data,
    };

    data.z_LastChange_Date = new Date();
    data.z_LastChange_UserId = user.Id;

    const response = await datastore.update(entity);
    return response;
};

const remove = async (user, kind, id) => {
    const namespace = user.Namespace;

    const key = buildConfig(namespace, kind, id);

    const response = await datastore.delete(key);
    return response;
};

const getByFilter = async (user, kind, filterProperty, filterValue) => {
    const namespace = user.Namespace;

    const query = datastore.createQuery(namespace, kind).filter(filterProperty, "=", filterValue);

    const [entities] = await datastore.runQuery(query);

    const entitiesWithId = entities.map(entity => {
        entity.id = parseInt(entity[datastore.KEY].id);
        return entity;
    });

    return entitiesWithId;
};

module.exports = {
    create,
    getById,
    get,
    update,
    remove,
    getByFilter
}