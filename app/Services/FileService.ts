

import FileException from 'App/Exceptions/FileException'
import { promises as fileSys } from 'fs'
import { createReadStream } from 'fs'
import { join } from 'path'


 
// Prepare a simple HTTP server in NodeJS (+ Typescript, ideally but not required AdonisJS framework) with 3 exposed endpoints.
// The first endpoint accepts POST requests with input numbers N and M. It creates N different files with a random number <0, M>.
// The second endpoint returns an array of all previously generated random numbers in N files. Apart from the array, the response must contain the sum of all values, minimum and maximum values.
// The third endpoint accepts a number I, where I <= N, and returns the value of the I-th file that was previously generated.
 
// Please name all endpoints, parameters and attributes as you wish. The names used in this text are technical examples only.
 
class FileService implements IFileService {

      
    private listFileNames: string[] = []


      async createFiles(N: number, M: number): Promise<object> {

        // if (!Number.isFinite(N) || !Number.isFinite(M) || N <= 0 || M <= 0) {
        //     throw new FileException('Parameters must be numbers higher than 0', 400)
        // }
      
        try {

            const pathFile = join(__dirname, '../Files/')
            for (let idx = 0; idx < N; idx++) {
              const fileName = `${pathFile}file${idx + 1}.txt`
              this.listFileNames.push(fileName)
              const numRandom = Math.floor(Math.random() * M)
              await fileSys.writeFile(fileName, numRandom.toString(), 'utf8')
            }
        
            return {response: "Files created successfully"}
        } catch (error) {
          throw new FileException('Failed to create files', 500)
        }
      }



    async getAllFiles(): Promise<object> {

        if (this.listFileNames.length === 0) {
          throw new FileException('No files to retrieve', 404);
        }
        
        let total = 0
        let min: number = Infinity
        let max: number = -Infinity
        const listNumbers: number[] = []
      
        // console.log(this.listFileNames);
      
        for (let fileName of this.listFileNames) {
          const readStream = createReadStream(fileName, { encoding: 'utf8' })
          let strNum = ''
          for await (const chunk of readStream) {
            strNum += chunk
          }
      
          const num = Number(strNum)
          listNumbers.push(num)
          total += num
      
          if (num < min) min = num
          if (num > max) max = num
        }
      
        return {
          numbers: listNumbers,
          total,
          min,
          max,
        }
      }
      

        
      async getSpecificFile(I: number): Promise<object> {

        if (I > this.listFileNames.length) {
          throw new FileException('The requested file number does not exist',404)
        }
    
        const readStream = createReadStream(this.listFileNames[I - 1], { encoding: 'utf8' })
        let strNum = ''
        for await (const chunk of readStream) {
          strNum += chunk
        }
    
        return {
          number: Number(strNum)
        }
      }
    }
    
    export default new FileService()
    