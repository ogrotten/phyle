migrate((db) => {
  const collection = new Collection({
    "id": "tq9imhmolci4x81",
    "created": "2022-12-23 04:55:51.501Z",
    "updated": "2022-12-23 04:55:51.501Z",
    "name": "files_to_tags",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "df3eoueq",
        "name": "file_id",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "sos7gws2enuwx38",
          "cascadeDelete": false
        }
      },
      {
        "system": false,
        "id": "lgdmhocm",
        "name": "tags_set",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": null,
          "collectionId": "nj7t2hm5q2246sf",
          "cascadeDelete": false
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("tq9imhmolci4x81");

  return dao.deleteCollection(collection);
})
