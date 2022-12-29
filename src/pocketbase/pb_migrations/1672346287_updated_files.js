migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sos7gws2enuwx38")

  // remove
  collection.schema.removeField("dnqk9cfz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zxb31o1u",
    "name": "tags_auto",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sos7gws2enuwx38")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dnqk9cfz",
    "name": "tags_auto",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "tq9imhmolci4x81",
      "cascadeDelete": false
    }
  }))

  // remove
  collection.schema.removeField("zxb31o1u")

  return dao.saveCollection(collection)
})
