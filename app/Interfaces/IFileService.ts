


interface IFileService {
    createFiles(N: number, M: number): Promise<object>
    getAllFiles(): Promise<object>
    getSpecificFile(I: number): Promise<object>
  }
  