import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nombre, email, password } = req.body

    try {
      // Crear el nuevo usuario en la base de datos
      const user = await prisma.usuario.create({
        data: {
          nombre,
          email,
          password,
        },
      })

      // Retornar el mensaje de éxito
      res.status(201).json({ message: 'Usuario registrado exitosamente', user })
    } catch (error: unknown) {
      // Comprobación de tipo para asegurar que 'error' sea una instancia de Error
      if (error instanceof Error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error: error.message })
      } else {
        // En caso de que el error no sea un Error estándar
        res.status(500).json({ message: 'Error desconocido al registrar el usuario' })
      }
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' })
  }
}
