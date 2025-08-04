import { Router } from 'express';
import tagsController from '../controllers/tag.controller.js';

const router = Router();

router.get('/', tagsController.getAll);
router.get('/:id', tagsController.getById);
router.post('/', tagsController.create);
router.patch('/:id', tagsController.update);
router.delete('/:id', tagsController.delete);

export default router;