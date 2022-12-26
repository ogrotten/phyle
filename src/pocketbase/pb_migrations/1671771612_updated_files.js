migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sos7gws2enuwx38")

  // remove
  collection.schema.removeField("nbglopua")

  // remove
  collection.schema.removeField("6fduf429")

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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jvhauedu",
    "name": "tags_manual",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "tq9imhmolci4x81",
      "cascadeDelete": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "svg8akrg",
    "name": "field",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("sos7gws2enuwx38")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nbglopua",
    "name": "tags_auto",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6fduf429",
    "name": "tags_manual",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("dnqk9cfz")

  // remove
  collection.schema.removeField("jvhauedu")

  // remove
  collection.schema.removeField("svg8akrg")

  return dao.saveCollection(collection)
})
