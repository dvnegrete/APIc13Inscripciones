const { ObjectId } = require("mongodb")
const { Database } = require("../database/index");

const COLLECTION = "specialties"

class Specialtie {
  constructor(){
    console.log("modulo de servicios-Specialties");
  }
  async getAll(){
    const specialities = await Database(COLLECTION);
    const allCollections = await specialities.find({}).toArray();
    //con toArray, convierto toda la Base de datos a un array para poder mostrarla
    return allCollections
  }

  async create(name){
    const specialities = await Database(COLLECTION);
    let result = specialities.insertOne(name);
    //insertedId es el identificador que asigno Mongo a esta insercion
    return result.insertedId;
  }

  async findOne(id){
    const specialitie = await Database(COLLECTION);
    return specialitie.findOne({ _id: ObjectId(id) })
  }

  //es la misma que findOne?
  async getOne(name){
    const specialitie = await Database(COLLECTION);
    return specialitie.findOne(name)
  }

  async update(id, body){
    const specialitie = await Database(COLLECTION).updateOne(
      { _id: id },
    {

    })

    console.log(body)
    //console.log(specialitie.name)
    //specialtie.updateOne(obj);

  }
}

module.exports = Specialtie;
