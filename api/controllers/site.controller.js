import { Site } from '../models/site.model.js';
import '../models/index.js';

export default {
    async getAll(_req, res) {
        try {
            const sites = await Site.findAll();
            res.status(200).json(sites);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving sites', error });
        }
    },
    async getById(req, res) {
        try {
            const site = await Site.findByPk(req.params.id, {
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
            const site = await Site.create(req.body);
            res.status(201).json(site);
        } catch (error) {
            res.status(400).json({ message: 'Error creating site', error });
        }
    },
    async update(req, res) {
        try {
            const [updatedCount, updateRows] = await Site.update(req.body, {
                where: { id: req.params.id },
                returning: true,
            });
            if (!updatedCount) {
                return res.status(404).json({ message: 'Site not found' });
            }
            res.status(200).json(updateRows[0]);
        } catch (error) {
            res.status(500).json({ message: 'Error updating site', error });
        }
    },
    async delete(req, res) {
        try {
            const site = await Site.destroy({ where: { id: req.params.id } });
            if (!site) {
                return res.status(404).json({ message: 'Site not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting site', error });
        }
    }
}