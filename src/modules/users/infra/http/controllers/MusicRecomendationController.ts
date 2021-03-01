import { Request, Response } from 'express'
import { container } from 'tsyringe';

import MusicRecomendationService from '@modules/users/services/MusicRecomendationService';

export default class MusicRecomendationController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const musicRecomendation = container.resolve(MusicRecomendationService);

        const musics = await musicRecomendation.execute({ user_id: id })

        return response.json(musics);
    }
}