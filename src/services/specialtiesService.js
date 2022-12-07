const { database } = require("./../database/firestore");

const COLLECTION = "especialidades"

class Specialtie {
  constructor(){}
  
  async getAll(){
    const specialities = await Database(COLLECTION);
    const allCollections = await specialities.find({}).toArray();
    //con toArray, convierto toda la Base de datos a un array para poder mostrarla
    return allCollections
  }

  async create(name, data){
    const specialitie = await this.findSpecialitie(name);
    const doc = specialitie.set(data);
    const response = {
      create: true,
      id: name,
      date: doc.writeTime

    }    
    return response;    
  }

  async findSpecialitie(name) {
    const specialities = await database.collection(COLLECTION).doc(name);
    return specialities;
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

  async update(name, data){
    const specialitie = await this.findSpecialitie(name);
    const doc = specialitie.update(data);
    const response = {
      update: true,
      id: name,
      date: doc.writeTime
    }    
    return response;
  }
}

module.exports = Specialtie;
