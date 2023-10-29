const { Datastore } = require('@google-cloud/datastore');
const datastoreCredential = require("../../database/datastore-credentials.json");
const helper = require("../helper/helper");

const datastore = new Datastore({
    projectId: "fitness-solution-jaras",
    credentials: datastoreCredential
});

const ensureDataHasKeys = (data) => {
    if (!helper.checkIfObjectHasKeys(data)) {
        throw new Error("Data must have valid keys.");
    }
};

const ensureIdIsDefined = (id) => {
    if (!id) {
        throw new Error("Entity requires a valid ID.");
    }
};

const validateFunctionArguments = (type, data, id) => {
    if(type === "create" || type === "update") {
        ensureDataHasKeys(data);
    }

    if(type === "update" || type === "getById" || type === "remove") {
        ensureIdIsDefined(id);
    }
}

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
    try {
        const namespace = user.Namespace;

        validateFunctionArguments("create", data);

        const key = buildConfig(namespace, kind);

        data.z_Inserted_Date = new Date();
        data.z_Create_UserId = user.Id;

        const entity = {
            key,
            data,
        };

        const [response] = await datastore.save(entity);

        const returnData = {
            ...data,
            Id: response.mutationResults[0].key.path[0].id
        }

        return returnData;
    } catch (error) {
        return helper.buildErrorReturn(error);
    }
};

const getById = async (user, kind, id) => {
    try {
        validateFunctionArguments("getById", {}, id);

        const namespace = user.Namespace;

        const key = buildConfig(namespace, kind, id);

        const response = await datastore.get(key);
        return response;
    } catch (error) {
        return helper.buildErrorReturn(error);
    }
};

const get = async (user, kind) => {
    try {
        const namespace = user.Namespace;

        validateFunctionArguments("get");

        const query = datastore.createQuery(namespace, kind);

        const [entities] = await datastore.runQuery(query);
        return entities;
    } catch (error) {
        return helper.buildErrorReturn(error);
    }
};

const update = async (user, kind, data) => {
    try {
        const namespace = user.Namespace;

        validateFunctionArguments("update", data, data.Id);

        const id = Number(data.Id);

        const key = buildConfig(namespace, kind, id);

        const entity = {
            key,
            data,
        };

        data.z_LastChange_Date = new Date();
        data.z_LastChange_UserId = user.Id;

        await datastore.update(entity);
        
        return data;
    } catch (error) {
        return helper.buildErrorReturn(error);
    }
};

const remove = async (user, kind, id) => {
    try {
        validateFunctionArguments("remove", {}, id);

        const namespace = user.Namespace;

        const key = buildConfig(namespace, kind, id);

        const response = await datastore.delete(key);
        return response;
    } catch (error) {
        return helper.buildErrorReturn(error);
    }
};

// TODO: Yago improve this filter
// const getByFilter = async (user, kind, filterProperty, filterValue) => {
//     try {
//         const namespace = user.Namespace;

//         const query = datastore.createQuery(namespace, kind).filter(filterProperty, "=", filterValue);

//         const [entities] = await datastore.runQuery(query);

//         const entitiesWithId = entities.map(entity => {
//             entity.id = parseInt(entity[datastore.KEY].id);
//             return entity;
//         });

//         return entitiesWithId;
//     } catch (error) {
//         return helper.buildErrorReturn(error);
//     }
// };

module.exports = {
    create,
    getById,
    get,
    update,
    remove,
    // getByFilter
}