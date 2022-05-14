const Espacio = require('../models/Espacio');
const BaseRepository = require('../repositories/BaseRepository');
const EspacioDTO = require('../dto/EspacioDTO');
const Repofunciones = require('../extras/EspacioExtrasRepo');
class EspacioRepository extends BaseRepository {
    constructor() {
        super(Espacio);
    }

    async updateEspacio(id, newespacio) {
        try {

            let espacioActual = await this.model.findByPk(id);
            const capacidad_espacio = newespacio.cantidad_de_personas;
            const diferenciaCapacidad = capacidad_espacio - espacioActual.cantidad_de_personas;
            if(diferenciaCapacidad != 0){
                const permiteActualizar  = await Repofunciones._permiteActualizar(espacioActual.idsector, diferenciaCapacidad)
                if(permiteActualizar){
                    const updatedEspacio = await this.model.update(newespacio, {
                        where: { idespacio: id }
                    });
                    await Repofunciones._actualizarSectorCapacidad(newespacio.idsector, diferenciaCapacidad);
                    return updatedEspacio;    
                }else{
                    throw { status: 400, message: 'No hay suficientes espacios disponibles en el sector' };
                }
            }else{
                const updatedEspacio = await this.model.update(newespacio, {
                    where: { idespacio: id }
                });
                return updatedEspacio;
            }
        } catch (e) {
            throw e;
        }

    }

    async deleteEspacio(id) {
        try {
            const espacio = await this.model.findByPk(id);
            
            const deletedEspacio = await this.model.destroy({
                where: { idespacio: id }
            });

            await Repofunciones._actualizarSectorCapacidad(espacio.idsector, -espacio.cantidad_de_personas);
            return deletedEspacio;
        } catch (e) {
            throw e;
        }
    }

    async createAllEspacios(cantidad, espacio) {
        try {
            let espacios = [];
            for (let i = 1; i <= cantidad; i++) {
                let newEspacio = new EspacioDTO(espacio);
                newEspacio._identificador = espacio.identificador + i;
                espacios.push(newEspacio.toJSON());
            }
            const cantidadEspacios = Repofunciones._cantidadEspacios(espacios);
            const espaciosDiponibles = await Repofunciones._existsEspaciosDisponibles(cantidadEspacios, espacio.idsector);
            if(espaciosDiponibles){
                const createdEspacios = await this.model.bulkCreate(espacios);
                await Repofunciones._actualizarSectorCapacidad(espacio.idsector, cantidadEspacios);
                return createdEspacios;
            }

            throw { status: 400 , message: 'No hay suficientes espacios disponibles' };
        } catch (e) {
            throw e;
        }
    }
}

module.exports = EspacioRepository;
