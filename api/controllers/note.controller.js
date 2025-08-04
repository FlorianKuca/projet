import { Note } from '../models/note.model.js';
import '../models/index.js';
export default {
    async getAll(_req, res) {
        try {
            const notes = await Note.findAll();
            res.status(200).json(notes);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving notes', error });
        }
    },
    async getById(req, res) {
        try {
            const note = await Note.findByPk(req.params.id, {
                include: req.query.include ?? []
            });
            if (!note) {
                return res.status(404).json({ message: 'Note not found' });
            }
            res.status(200).json(note);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving note', error });
        }
    },
    async create(req, res) {
        try {
            const note = await Note.create(req.body);
            res.status(201).json(note);
        } catch (error) {
            res.status(400).json({ message: 'Error creating note', error });
        }
    },
    async update(req, res) {
        try {
            const [updatedCount, updateRows] = await Note.update(req.body, {
                where: { id: req.params.id },
                returning: true,
            });
            if (!updatedCount) {
                return res.status(404).json({ message: 'Note not found' });
            }
            res.status(200).json(updateRows[0]);
        } catch (error) {
            res.status(500).json({ message: 'Error updating note', error });
        }
    },
    async delete(req, res) {
        try {
            const note = await Note.destroy({ where: { id: req.params.id } });
            if (!note) {
                return res.status(404).json({ message: 'Note not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting note', error });
        }
    }
}