import { Router } from 'express';
import usersRouter from './user.route.js';
import noteRouter from './note.route.js';
import tagRouter from './tag.route.js';
import siteRouter from './site.route.js';

export const router = Router();

router.use('/users', usersRouter);
router.use('/notes', noteRouter);
router.use('/tags', tagRouter);
router.use('/sites', siteRouter);
