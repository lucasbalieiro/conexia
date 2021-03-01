import { Router } from 'express';

import MusicRecomendationController from '../controllers/MusicRecomendationController';
import ensureAuthentication from '../middlewares/ensureAthentication'

const musicRouter = Router();
const musicRecomendationController = new MusicRecomendationController();

musicRouter.get('/', ensureAuthentication, musicRecomendationController.create);

export default musicRouter;