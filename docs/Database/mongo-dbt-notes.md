```js
db.students.find({age:{$lte:23}},{name:1,age:1}).sort({name:-1})
```

**MongoDB comparison operators**, **logical operators**, and **element operators**

| Operator   | Description                                           | Example Usage                                 |
|------------|-------------------------------------------------------|-----------------------------------------------|
| `$eq`      | Matches values **equal to** a specified value         | `{ age: { $eq: 25 } }`                        |
| `$ne`      | Matches values **not equal to** a specified value     | `{ name: { $ne: "Bob" } }`                    |
| `$gt`      | Matches values **greater than** a specified value     | `{ age: { $gt: 30 } }`                        |
| `$gte`     | Matches values **greater than or equal to** a value   | `{ age: { $gte: 18 } }`                       |
| `$lt`      | Matches values **less than** a specified value        | `{ age: { $lt: 60 } }`                        |
| `$lte`     | Matches values **less than or equal to** a value      | `{ age: { $lte: 23 } }`                       |
| `$in`      | Matches any value in an array                         | `{ laptop: { $in: ["Dell", "HP"] } }`         |
| `$nin`     | Matches values **not in** the specified array         | `{ age: { $nin: [20, 21, 22] } }`             |

| Operator   | Description                                           | Example Usage                                 |
|------------|-------------------------------------------------------|-----------------------------------------------|
| `$and`     | Joins query clauses with logical AND                  | `{ $and: [ { age: { $gt: 20 } }, { age: { $lt: 30 } } ] }` |
| `$or`      | Joins query clauses with logical OR                   | `{ $or: [ { age: 23 }, { name: "Bob" } ] }`   |
| `$not`     | Inverts the effect of a query expression              | `{ age: { $not: { $gt: 30 } } }`              |
| `$nor`     | Matches documents that **fail all** query expressions | `{ $nor: [ { age: 23 }, { name: "Bob" } ] }`  |

| Operator   | Description                                           | Example Usage                                 |
|------------|-------------------------------------------------------|-----------------------------------------------|
| `$set`     | Sets the value of a field                             | `{ $set: { age: 30 } }`                        |
| `$unset`   | Removes the specified field                           | `{ $unset: { laptop: "" } }`                  |
| `$inc`     | Increments a field by a specified value               | `{ $inc: { age: 1 } }`                         |
| `$mul`     | Multiplies the value of a field                       | `{ $mul: { score: 2 } }`                       |
| `$rename`  | Renames a field                                       | `{ $rename: { name: "fullName" } }`           |
| `$min`     | Updates field only if the specified value is lower    | `{ $min: { age: 25 } }`                        |
| `$max`     | Updates field only if the specified value is higher   | `{ $max: { age: 40 } }`                        |
| `$currentDate` | Sets the field to the current date or timestamp   | `{ $currentDate: { lastModified: true } }`    |

| Method                  | Description                                         | Example Usage                                 |
|-------------------------|-----------------------------------------------------|-----------------------------------------------|
| `countDocuments()`      | Returns the number of documents that match a query | `db.students.countDocuments({ age: { $lt: 25 } })` |
| `estimatedDocumentCount()` | Returns an estimate of the total number of documents in a collection | `db.students.estimatedDocumentCount()`        |


| Operator     | Description                                           | Example Usage                                 |
|--------------|-------------------------------------------------------|-----------------------------------------------|
| `$exists`    | Checks if a field is present                          | `{ laptop: { $exists: true } }`               |
| `$type`      | Matches documents with a field of a specific BSON type| `{ age: { $type: "int" } }`                   |

**insert many**
```js
db.movies.insertMany([ 
{ title: "Inception", year: 2010, genre: ["Sci-Fi","Thriller"], rating: 8.8, director: "Christopher 
Nolan" }, 
{ title: "Interstellar", year: 2014, genre: ["Sci-Fi","Drama"], rating: 8.6, director: 
"Christopher Nolan" }
]) 
```
**date time**
```js
db.readings.find({ location: "Room1", timestamp: { $gte: ISODate("2022-09
20T10:00:00Z"), $lte: ISODate("2025-09-20T10:00:00+05:30") } }) 
```
**date time**
```js
db.readings.find({ location: "Room1", timestamp: { $gte: ISODate("2025-09
20T10:00:00Z"), $lte: ISODate("2025-09-20T10:15:00Z") } }) 
```
**delete one**
```js
db.students.deleteOne({_id:ObjectId('68d818935c7b464da1cebea5')})
```
**update many**
```js
db.students.updateMany({_id:1},{$set:{age:56,laptop:"Alien"}})
```
**2 to 4**
```js
db.Students.find().sort({name:1}).skip(2).limit(2)
```
```js
db.contacts.find({ _id: { $gte: 2, $lte: 4 } })
```
**upsert**
```js
db.users.updateOne(
  { username: "johndoe" },
  { $set: { age: 30 } },
  { upsert: true }
)
```
**distinct**
```js
db.students.distinct("age")
```
**create index**
```js
db.participants.createIndex({'age':1})
```
**get index**
```js
db.participants.getIndexes()
```
**count documents**
```js
db.participants.countDocuments({age:{$lt:35}})
```
