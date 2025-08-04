import { Tag } from '../models/tag.model.js';
import '../models/index.js';

export default {
    async getAll(_req, res) {
        try {
            const tags = await Tag.findAll();
            res.status(200).json(tags);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving tags', error });
        }
    },
    async getById(req, res) {
        try {
            const site = await Tag.findByPk(req.params.id, {
                include: req.query.include ?? []
            });
            if (!site) {
                return res.status(404).json({ message: 'Site not found' });
            }
            res.status(200).json(site);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving site', error });
        }
    },
    async create(req, res) {
        try {
            const tag = await Tag.create(req.body);
            res.status(201).json(tag);
        } catch (error) {
            res.status(400).json({ message: 'Error creating tag', error });
        }
    },
    async update(req, res) {
        try {
            const [updatedCount, updateRows] = await Tag.update(req.body, {
                where: { id: req.params.id },
                returning: true,
            });
            if (!updatedCount) {
                return res.status(404).json({ message: 'Tag not found' });
            }
            res.status(200).json(updateRows[0]);
        } catch (error) {
            res.status(500).json({ message: 'Error updating tag', error });
        }
    },
    async delete(req, res) {
        try {
            const tag = await Tag.destroy({ where: { id: req.params.id } });
            if (!tag) {
                return res.status(404).json({ message: 'Tag not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting tag', error });
        }
    }
}