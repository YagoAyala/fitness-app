// const { datastore } = require("./database/database");

const { Datastore } = require('@google-cloud/datastore');
const datastoreCredential = require("./database/datastore-credentials.json")

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

const createEntity = async (user, kind, data) => {
    const namespace = user.Namespace;

    const key = buildConfig(namespace, kind);

    data.z_creation_date = new Date();
    data.z_Create_UserId = user.Id;

    const entity = {
        key,
        data,
    };

    console.log(datastore, "datastore")

    const response = await datastore.save(entity);
    console.log("d boa")
    return response;
};
