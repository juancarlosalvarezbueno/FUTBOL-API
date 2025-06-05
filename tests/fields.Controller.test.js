import {beforeEach, expect, jest} from '@jest/globals';


jest.unstable_mockModule("../services/fileService.js", () => ({ // Mocking the fileService module
    readJSON: jest.fn(), // Mocking readJSON function
    writeJSON: jest.fn(), // Mocking writeJSON function
}));

const fileService = await import("../services/fileService.js") // esta linea importa el módulo importado
// anteriormente, que ahora está siendo "mockeado" por jest.
const {getFields, createFields} = await import ("../controllers/fieldsController.js") // Importing 
// the controller functions

describe("fieldsController", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })


test("getFields responde con los campos correspondientes", () => {
    const mockFields = [ { id: 1, name: "Campo 1" } ]; //declaramos un mock de los campos que queremos que
    // devuelva la función getFields.
    
    fileService.readJSON.mockReturnValue(mockFields); // explicación: Esta línea simula que la función 
    // readJSON devuelve mockFields cuando se llama.
    const req = {};
    const res = {json:jest.fn()} // Simulamos el objeto de respuesta con un método json que es una función mock
    // de jest, para poder verificar que se llama con los datos correctos.
    getFields(req, res);

    expect(fileService.readJSON).toHaveBeenCalledWith("./data/fields.json"); // Verifica que se llama a readJSON con el archivo correcto linea 5 de fieldsController.js
    expect(res.json).toHaveBeenCalledWith(mockFields);

});

test("createFields agrega un nuevo campo", () => {
    const existingFields = [ { id: 1, name: "Campo 1" } ];
    const newField = { id: 2, name: "Campo 2" };
    const fieldsClone = [...existingFields]; // Clonamos existingFields para no modificar el original

    fileService.readJSON.mockReturnValue(fieldsClone); // Simula que readJSON devuelve existingFields
    fileService.writeJSON.mockImplementation(() => {}); // Simula que writeJSON no hace nada
    const req = { body: newField}
    const res = {
        status: jest.fn(() => res), // Simula el método status para encadenar llamadas
        json: jest.fn() // Simula el método json
    }
    createFields(req, res);

    expect(fileService.readJSON).toHaveBeenCalledWith("./data/fields.json");
    expect(res.json). toHaveBeenCalledWith(newField); // Verifica que se llama a json con el nuevo campo
    expect(res.status).toHaveBeenCalledWith(201); // Verifica que se llama a status con el código 201
});

});

