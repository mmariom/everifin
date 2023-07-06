
import { Exception } from '@poppinss/utils'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FileException extends Exception {
  constructor(message: string, code: number) {
    super(message, code)
  }

  public async handle(error: this, { response }: HttpContextContract) {
    response.status(error.status).send({ error: error.message })
  }
}
