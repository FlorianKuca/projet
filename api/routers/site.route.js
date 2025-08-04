import { Router } from 'express';
import siteController from '../controllers/site.controller.js';

const router = Router();

router.get('/', siteController.getAll);
router.get('/:id', siteController.getById);
router.post('/', siteController.create);
router.patch('/:id', siteController.update);
router.delete('/:id', siteController.delete);

export default router;