import app from '@/app';
import BadRequestError from '@/errors/BadRequestError';
import NotFoundError from '@/errors/NotFoundError';
import { getDadosServidoresComissionados } from '@/services/dados-abertos-br/senado-gestao-pessoas';

async function getDadosComissionados(request, response) {
  try {
    const result = await getDadosServidoresComissionados();
    return response.status(result.status).json(result.data);
  } catch (error) {
    if (error.response.status === 400) {
      throw new BadRequestError({ message: error.response.data.message });
    }
    if (error.response.status === 404) {
      throw new NotFoundError({ message: error.response.data.message });
    }
    throw error;
  }
}

export default app().get(getDadosComissionados);
