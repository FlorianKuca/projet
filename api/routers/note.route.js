import { Router } from 'express';
import notesController from '../controllers/note.controller.js';
const router = Router();

router.get('/', notesController.getAll);
router.get('/:id', notesController.getById);
router.post('/', notesController.create);
router.patch('/:id', notesController.update);
router.delete('/:id', notesController.delete);
export default router;