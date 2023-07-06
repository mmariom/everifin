import FileService from 'App/Services/FileService';
import CreateFileValidator from 'App/Validators/CreateFileValidator'


export default class ControllerFiles {


  public async create({ request }) {
      const payload = await request.validate(CreateFileValidator);
      return await FileService.createFiles(payload.N,payload.M)


  }

  public async getAll() {

      return await FileService.getAllFiles()
  
  }

  public async getFile({ params }) {
      // console.log(params.I);
      return await FileService.getSpecificFile(params.I);
  
  }
}
